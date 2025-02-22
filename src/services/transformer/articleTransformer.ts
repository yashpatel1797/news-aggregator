import type { Article } from '@/types';
import type {
  NewsAPIArticle,
  GuardianArticle,
  NYTimesArticle
} from '@/types';

export interface TransformerFunctions {
  transformNewsApiArticle: (article: NewsAPIArticle) => Article;
  transformGuardianArticle: (article: GuardianArticle) => Article;
  transformNYTimesArticle: (article: NYTimesArticle) => Article;
}

const DEFAULT_VALUES = {
  UNKNOWN_AUTHOR: 'Unknown',
  GENERAL_CATEGORY: 'general',
  EMPTY_STRING: '',
} as const;

export const transformNewsApiArticle = (article: NewsAPIArticle): Article => ({
  id: article.url,
  title: article.title,
  description: article.description ?? DEFAULT_VALUES.EMPTY_STRING,
  content: article.content ?? DEFAULT_VALUES.EMPTY_STRING,
  author: article.author ?? DEFAULT_VALUES.UNKNOWN_AUTHOR,
  source: article.source.name ?? 'NewsAPI',
  category: article.category ?? DEFAULT_VALUES.GENERAL_CATEGORY,
  publishedAt: article.publishedAt,
  url: article.url,
  urlToImage: article.urlToImage ?? DEFAULT_VALUES.EMPTY_STRING,
});

export const transformGuardianArticle = (article: GuardianArticle): Article => ({
  id: article.id,
  title: article.webTitle,
  description: article.fields?.trailText ?? DEFAULT_VALUES.EMPTY_STRING,
  content: article.fields?.bodyText ?? DEFAULT_VALUES.EMPTY_STRING,
  author: article.fields?.byline ?? DEFAULT_VALUES.UNKNOWN_AUTHOR,
  source: 'The Guardian',
  category: article.sectionName ?? DEFAULT_VALUES.GENERAL_CATEGORY,
  publishedAt: article.webPublicationDate,
  url: article.webUrl,
  urlToImage: article.fields?.thumbnail ?? DEFAULT_VALUES.EMPTY_STRING,
});

export const transformNYTimesArticle = (article: NYTimesArticle): Article => ({
  id: article._id,
  title: article.headline.main,
  description: article.abstract ?? DEFAULT_VALUES.EMPTY_STRING,
  content: article.lead_paragraph ?? DEFAULT_VALUES.EMPTY_STRING,
  author: article.byline?.original ?? DEFAULT_VALUES.UNKNOWN_AUTHOR,
  source: 'New York Times',
  category: article.section_name ?? DEFAULT_VALUES.GENERAL_CATEGORY,
  publishedAt: article.pub_date,
  url: article.web_url,
  urlToImage: article.multimedia?.[0]?.url ?? DEFAULT_VALUES.EMPTY_STRING,
});
