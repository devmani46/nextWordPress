import { Page } from "@/lib/wordpress";
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "../animate-ui/primitives/base/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface OurNCCTemplateProps {
  page: Page;
}

export default async function OurNCCTemplate({ page }: OurNCCTemplateProps) {
  const testelements = [];
  for (let i = 0; i < 10; i++) {
    testelements.push(
      <TableRow key={i}>
        <TableCell>whatever</TableCell>
        <TableCell>whatever</TableCell>
        <TableCell>whatever</TableCell>
        <TableCell>whatever</TableCell>
        <TableCell>whatever</TableCell>
        <TableCell>whatever</TableCell>
      </TableRow>,
    );
  }

  return (
    <div>
      <section className="2023-25 m-auto w-[70%]">
        <p className="h2 mb-3">NRNA NCCs Tenure</p>
        <Tabs>
          <TabsList>
            <div className="flex gap-2">
              <TabsTab value="african">African Region</TabsTab>
              <TabsTab value="american">American Region</TabsTab>
              <TabsTab value="asia-pacific">Asia Pacific Region</TabsTab>
              <TabsTab value="europe">Europe Region</TabsTab>
              <TabsTab value="middle-east">Middle East Region</TabsTab>
              <TabsTab value="oceania">Oceania Region</TabsTab>
            </div>
          </TabsList>
          <TabsPanels>
            <TabsPanel value="african">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S.N.</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>NCC Est. Date</TableHead>
                    <TableHead>Official Email</TableHead>
                    <TableHead>Website</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{testelements}</TableBody>
              </Table>
            </TabsPanel>
            <TabsPanel value="american">This is content for american</TabsPanel>
          </TabsPanels>
        </Tabs>
      </section>
    </div>
  );
}
