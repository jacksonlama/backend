import * as cheerio from "cheerio";
import Parser from "rss-parser";

// Add requestOptions with User-Agent
const parser = new Parser({
  requestOptions: {
    headers: {
      "User-Agent": "Mozilla/5.0 (Node.js Server)",
    },
  },
  customFields: {
    item: ["image"],
  },
});

const RSS_FEEDS = [
  { source: "OnlineKhabar", url: "https://www.onlinekhabar.com/rss" },
  { source: "Setopati", url: "https://setopati.com/rss" },
  { source: "Ratopati", url: "https://www.ratopati.com/rss" },
];

function extractImage(item) {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item.image) return item.image;

  const html =
    item["content:encoded"] || item.content || item.description || "";
  if (html) {
    const $ = cheerio.load(html);
    const src = $("img").first().attr("src");
    if (src) return src;
  }

  return null;
}

function cleanHTML(htmlString) {
  const $ = cheerio.load(htmlString);
  return $.text().trim();
}

export default async function fetchNews() {
  let allNews = [];

  for (const feed of RSS_FEEDS) {
    try {
      const data = await parser.parseURL(feed.url);

      const articles = data.items.slice(0, 10).map((item) => ({
        title: item.title || "No Title",
        link: item.link || "",
        pubDate: item.pubDate || "",
        source: feed.source,
        image: extractImage(item),
        description: cleanHTML(
          item.contentSnippet || item.content || item.description || ""
        ),
      }));

      allNews = allNews.concat(articles);
    } catch (err) {
      console.error(`Error fetching from ${feed.source}:`, err.message);
    }
  }

  return allNews;
}
