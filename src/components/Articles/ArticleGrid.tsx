import React from 'react';
import { Article } from '@/types';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {articles.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ))}
  </div>
);

export default ArticleGrid;