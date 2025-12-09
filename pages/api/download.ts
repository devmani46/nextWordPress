import type { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url, filename } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid url parameter" });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Failed to fetch file: ${response.statusText}` });
    }

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";
    const contentDisposition = `attachment; filename="${
      filename || "download"
    }"`;

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", contentDisposition);

    // Stream the response body to the client
    if (response.body) {
      Readable.fromWeb(response.body as any).pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    console.error("Download proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
