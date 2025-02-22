import React, { useState, useCallback } from 'react';
import { CalendarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { ArticleCardProps } from './types';
import { formatDate } from './utils/formatters';
import { ArticleImage } from './components/ArticleImage';
import { AuthorInfo } from './components/AuthorInfo';

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [imageError, setImageError] = useState(false);
  const [showFullAuthor, setShowFullAuthor] = useState(false);

  const handleImageError = useCallback(() => setImageError(true), []);
  const toggleAuthorTooltip = useCallback(() => 
    setShowFullAuthor(prev => !prev), []
  );

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg 
                     transition-shadow duration-300 flex flex-col h-full">
      <ArticleImage 
        imageUrl={!imageError ? article.urlToImage : undefined}
        title={article.title}
        onError={handleImageError}
      />
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <AuthorInfo 
            author={article.author}
            showTooltip={showFullAuthor}
            onToggleTooltip={toggleAuthorTooltip}
          />
        </div>

        <h2 className="text-lg font-semibold mb-2 line-clamp-2 flex-grow">
          {article.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">{article.source}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
            aria-label={`Read more about ${article.title}`}
          >
            Read more
            <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;