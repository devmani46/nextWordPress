import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const secret = req.headers["x-webhook-secret"];

    if (secret !== process.env.WORDPRESS_WEBHOOK_SECRET) {
      console.error("Invalid webhook secret");
      return res.status(401).json({ message: "Invalid webhook secret" });
    }

    const { contentType, contentId, slug } = req.body;

    if (!contentType) {
      return res.status(400).json({ message: "Missing content type" });
    }

    console.log(
      `Revalidating content: ${contentType}${
        contentId ? ` (ID: ${contentId})` : ""
      }`
    );

    // Revalidate paths based on content type
    // This is a simplified version. In a real app, you'd map IDs/slugs to paths.
    // Since we don't have easy access to revalidateTag in Pages Router,
    // we try to revalidate common paths.

    const pathsToRevalidate: string[] = [];

    if (contentType === "post") {
        pathsToRevalidate.push("/posts");
        if (slug) pathsToRevalidate.push(`/posts/${slug}`);
    } else if (contentType === "page") {
        pathsToRevalidate.push("/pages"); // The list of pages
        if (slug) pathsToRevalidate.push(`/${slug}`); // The page itself (root slug)
    } else if (contentType === "notice") {
        pathsToRevalidate.push("/notices");
        if (slug) pathsToRevalidate.push(`/notices/${slug}`);
    } else if (contentType === "activity") {
        if (slug) pathsToRevalidate.push(`/activities/${slug}`);
    }

    // Revalidate home
    pathsToRevalidate.push("/");

    try {
        await Promise.all(pathsToRevalidate.map(path => res.revalidate(path)));
        return res.json({ revalidated: true, paths: pathsToRevalidate });
    } catch (err) {
        console.error("Error revalidating paths", err);
        return res.status(500).json({ message: "Error revalidating", error: err });
    }

  } catch (error) {
    console.error("Revalidation error:", error);
    return res.status(500).json({
      message: "Error revalidating content",
      error: (error as Error).message,
    });
  }
}
