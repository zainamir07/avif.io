import { getLinkPreview } from "link-preview-js";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { url } = request.query;
  const apiKey = process.env.LINK_RENDER_API_KEY;
  if (!apiKey || apiKey !== "506a0442-deef-472f-afb4-09758d93725f") {
    response.status(401).send({
      error: "Unauthorized",
    });
    return;
  }

  getLinkPreview(url as string, {
    imagesPropertyType: "og", // fetches only open-graph images
    headers: {
      "user-agent": "googlebot",
      "Accept-Language": "de-DE",
    },
    timeout: 10000,
    followRedirects: "follow",
  })
    .then((data) => {
      response.status(200).json({
        linkPreviewData: data,
      });
    })
    .catch((error) => {
      console.error("Error fetching link preview:", error);
      response.status(500).json({
        error: "Internal server error",
      });
    });
}
