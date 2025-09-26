import fetchNews from "../../src/newsFetcher.js";

export async function handler() {
  try {
    const news = await fetchNews();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // CORS
      },
      body: JSON.stringify(news),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
}
