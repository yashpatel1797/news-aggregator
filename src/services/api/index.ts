import { Article, SearchParams } from '@/types';
import { delay } from './utils';
import { fetchFromNewsApi, fetchFromGuardian, fetchFromNYTimes } from './newsProviders';

export const fetchArticles = async (params: SearchParams): Promise<{
  articles: Article[];
  hasMore: boolean;
}> => {
  try {
    const sourcesToFetch = params.sources?.length ? params.sources : ['newsapi', 'guardian', 'nytimes'];
    const fetchPromises: Promise<Article[]>[] = [];

    if (sourcesToFetch.includes('newsapi')) {
        console.log("newsapi");
        
      fetchPromises.push(fetchFromNewsApi(params));
      await delay(300);
    }
    if (sourcesToFetch.includes('guardian')) {
        console.log("guardian");
        
      fetchPromises.push(fetchFromGuardian(params));
      await delay(300);
    }
    if (sourcesToFetch.includes('nytimes')) {
        console.log("nytime");
        
      fetchPromises.push(fetchFromNYTimes(params));
    }

    const results = await Promise.allSettled(fetchPromises);
    const articles = results
      .filter((result): result is PromiseFulfilledResult<Article[]> => 
        result.status === 'fulfilled'
      )
      .flatMap(result => result.value)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return {
      articles: articles.slice(0, params.pageSize),
      hasMore: articles.length >= params.pageSize
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { articles: [], hasMore: false };
  }
};