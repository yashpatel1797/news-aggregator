
import type {
  NewsAPIArticle,
  GuardianArticle,
  NYTimesArticle
} from '@/types';
  
export const isNewsAPIArticle = (article: unknown): article is NewsAPIArticle => {
  const a = article as NewsAPIArticle;
  return (
    a !== null &&
    typeof a === 'object' &&
    typeof a.url === 'string' &&
    typeof a.title === 'string' &&
    typeof a.publishedAt === 'string' &&
    a.source !== undefined
  );
};
  
export const isGuardianArticle = (article: unknown): article is GuardianArticle => {
  const a = article as GuardianArticle;
  return (
    a !== null &&
    typeof a === 'object' &&
    typeof a.id === 'string' &&
    typeof a.webTitle === 'string' &&
    typeof a.webPublicationDate === 'string' &&
    typeof a.webUrl === 'string'
  );
};
  
export const isNYTimesArticle = (article: unknown): article is NYTimesArticle => {
  const a = article as NYTimesArticle;
  return (
    a !== null &&
    typeof a === 'object' &&
    typeof a._id === 'string' &&
    typeof a.headline?.main === 'string' &&
    typeof a.pub_date === 'string' &&
    typeof a.web_url === 'string'
  );
};