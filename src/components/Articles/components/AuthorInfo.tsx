import { UserIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { formatAuthor } from '../utils/formatters';

interface AuthorInfoProps {
  author: string;
  showTooltip: boolean;
  onToggleTooltip: () => void;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ 
  author, 
  showTooltip, 
  onToggleTooltip 
}) => {
  const authorName = formatAuthor(author);
  const isLongAuthor = authorName.length > 20;

  return (
    <div className="flex items-center text-sm text-gray-500 group relative">
      <UserIcon className="h-4 w-4 mr-1 flex-shrink-0" />
      <div className="flex items-center">
        <span className={isLongAuthor ? 'truncate max-w-[150px]' : ''}>
          {authorName}
        </span>
        {isLongAuthor && (
          <button
            className="ml-1 p-1 hover:bg-gray-100 rounded-full"
            onClick={onToggleTooltip}
            aria-label="Show full author name"
          >
            <InformationCircleIcon className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>
      {isLongAuthor && showTooltip && (
        <div className="absolute left-0 top-full mt-1 p-2 bg-gray-800 text-white 
                     text-xs rounded shadow-lg z-10 w-max max-w-[250px]">
          {authorName}
        </div>
      )}
    </div>
  );
};