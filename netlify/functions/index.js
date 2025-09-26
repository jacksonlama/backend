export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Welcome to the News API",
      endpoints: ["/.netlify/functions/news"],
    }),
  };
}
