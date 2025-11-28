process.env.WORDPRESS_URL = "https://api.nrna.featherwebs.dev";

import { getAllPages } from "./lib/wordpress";

async function main() {
  try {
    console.log("Fetching pages from " + process.env.WORDPRESS_URL);
    const pages = await getAllPages();
    console.log(`Fetched ${pages.length} pages.`);

    pages.forEach((page, index) => {
      if (!page) {
        console.error(`Page at index ${index} is undefined/null!`);
      } else if (!page.slug) {
        console.error(`Page at index ${index} has no slug!`, page);
      } else {
        console.log(`Page ${index}: ${page.slug}`);
      }
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
  }
}

main();
