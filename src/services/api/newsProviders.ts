import { Article, SearchParams } from '@/types';
import { newsApiClient, guardianApiClient, nytimesApiClient } from './client';
import { formatDate, delay } from './utils';
import { 
    transformNewsApiArticle,
    transformGuardianArticle,
    transformNYTimesArticle 
  } from '../transformer/articleTransformer.ts';
import axios from 'axios';

export const fetchFromNewsApi = async (params: SearchParams): Promise<Article[]> => {
    
  try {
    const endpoint = params.categories?.length ? '/top-headlines' : '/everything';
    const response = await newsApiClient.get(endpoint, {
      params: {
        ...(endpoint === '/top-headlines' ? {
          country: 'us',
          category: params.categories?.[0] || 'general',
        } : {
          q: params.query || 'news',
          from: formatDate.newsApi(params.dateFrom),
          to: formatDate.newsApi(params.dateTo),
        }),
        page: params.page,
        pageSize: params.pageSize,
        language: 'en',
        sortBy: 'publishedAt'
      }
    });

    if (response.data.status === 'error') {
      console.error('NewsAPI Error:', response.data.message);
      return [];
    }

    return response.data.articles.map(transformNewsApiArticle);
  } catch (error) {
    console.error('NewsAPI Error:', error);
    return [];
  }
};

export const fetchFromGuardian = async (params: SearchParams): Promise<Article[]> => {

  try {
    const response = await guardianApiClient.get('/search', {
      params: {
        q: params.query || 'news',
        'section': params.categories?.join('|') || ['technology', 'health', 'general', 'science', 'sports'],
        'from-date': formatDate.guardian(params.dateFrom),
        'to-date': formatDate.guardian(params.dateTo),
        'show-fields': 'all',
        'page': params.page,
        'page-size': params.pageSize
      }
    });
    return response.data.response.results.map(transformGuardianArticle);
  } catch (error) {
    console.error('Guardian API Error:', error);
    return [];
  }
};

export const fetchFromNYTimes = async (params: SearchParams): Promise<Article[]> => {
  try {
    await delay(1000);

    const queryParams: Record<string, string | number | undefined> = {
      q: params.query || 'news',
      sort: 'newest',
      fl: 'headline,abstract,web_url,pub_date,byline,section_name,multimedia,lead_paragraph,_id',
      page: params.page ? params.page - 1 : 0,
    };

    if (params.dateFrom) {
      queryParams.begin_date = formatDate.nyTimes(params.dateFrom);
    }
    if (params.dateTo) {
      queryParams.end_date = formatDate.nyTimes(params.dateFrom);
    }

    if (params.categories?.length) {
      queryParams.fq = `news_desk:(${params.categories.map(c => `"${c}"`).join(' OR ')})`;
    }
    
    const response = await nytimesApiClient.get('/articlesearch.json', {
      params: queryParams
    });

    if (!response.data.response?.docs) {
      console.warn('No docs in NY Times response');
      return [];
    }

    return response.data.response.docs.map(transformNYTimesArticle);
  } catch (error) {
    console.error('NY Times API Error:', error);
    if (axios.isAxiosError(error)) {
      console.error('NY Times API Response:', error.response?.data);
    }
    return [];
  }
};