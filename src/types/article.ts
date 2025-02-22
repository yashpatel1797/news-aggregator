import { BaseEntity } from './common';

export interface Article extends BaseEntity {
  title: string;
  description: string;
  content: string;
  author: string;
  source: string;
  category: string;
  publishedAt: string;
  url: string;
  urlToImage?: string;
}