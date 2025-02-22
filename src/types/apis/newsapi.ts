export interface NewsAPISource {
    id: string | null;
    name: string;
  }
  
  export interface NewsAPIArticle {
    source: NewsAPISource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
    category?: string;
  }