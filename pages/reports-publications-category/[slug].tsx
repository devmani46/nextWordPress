import { GetServerSideProps } from "next";
import { getAllReports, getReportsMenu, Report, ReportsMenuItem, WordPressPaginationHeaders } from "@/lib/wordpress";
import ReportsPublicationsPage from "@/components/templates/ReportsPublicationsPage";

interface PageProps {
  reports: Report[];
  pagination: WordPressPaginationHeaders;
  categoryTitle: string;
}

export default function ReportsCategoryPage({ reports, pagination, categoryTitle }: PageProps) {
  return (
    <ReportsPublicationsPage 
      reports={reports} 
      pagination={pagination}
      categoryTitle={categoryTitle}
    />
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { params, query } = context;
  const slug = params?.slug as string;
  const pageParam = query.page ? Number(query.page) : 1;
  const searchParam = query.search ? String(query.search) : undefined;

  try {
    const [allReports, menuItems] = await Promise.all([
      getAllReports(),
      getReportsMenu(),
    ]);

    // Find the current category title based on the slug from the menu
    let currentCategoryTitle = "";
    
    const findCategoryInMenu = (items: ReportsMenuItem[]): string | null => {
      for (const item of items) {
        if (item.url && item.url.includes(slug)) {
          return item.title;
        }
        if (item.children) {
          const found = findCategoryInMenu(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    const rootItem = menuItems.find(item => item.title === "Reports & Publications") || menuItems[0];
    if (rootItem && rootItem.children) {
      currentCategoryTitle = findCategoryInMenu(rootItem.children) || "";
    }

    // Get all category titles from navbar
    const navbarCategories = rootItem?.children?.map(cat => cat.title) || [];
    
    let filteredReports = allReports;
    
    // Filter by current category if found in navbar (case-insensitive)
    if (currentCategoryTitle && navbarCategories.length > 0) {
      filteredReports = allReports.filter((report) =>
        report.category_titles.some(cat => 
          cat.toLowerCase() === currentCategoryTitle.toLowerCase()
        )
      );
    } else {
      // If category not in navbar, show nothing
      filteredReports = [];
    }

    // Filter by search if provided
    if (searchParam) {
      const query = searchParam.toLowerCase();
      filteredReports = filteredReports.filter(report =>
        report.title.rendered.toLowerCase().includes(query)
      );
    }

    // Pagination
    const perPage = 12;
    const total = filteredReports.length;
    const totalPages = Math.ceil(total / perPage);
    const startIndex = (pageParam - 1) * perPage;
    const paginatedReports = filteredReports.slice(startIndex, startIndex + perPage);

    return {
      props: {
        reports: paginatedReports,
        categoryTitle: currentCategoryTitle || "Reports & Publications",
        pagination: {
          total,
          totalPages,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        reports: [],
        categoryTitle: "Reports & Publications",
        pagination: { total: 0, totalPages: 0 }
      }
    };
  }
};
