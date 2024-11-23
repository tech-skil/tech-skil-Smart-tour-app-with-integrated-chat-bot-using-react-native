import { config } from "../../config";

export const fetchArticles = async (query) => {
  const API_URL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    query
  )}&apiKey=${config.ARTICLE_API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data.status === "ok") {
      return data.articles.map((article) => ({
        title: article.title,
        author: article.author || "Unknown",
        thumbnail: article.urlToImage || "https://via.placeholder.com/150",
      }));
    } else {
      throw new Error(data.message || "Failed to fetch articles.");
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};
