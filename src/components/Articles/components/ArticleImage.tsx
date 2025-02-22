
import { NewspaperIcon } from '@heroicons/react/24/outline';
import { isValidImageUrl } from '../utils/imageutils';

interface ArticleImageProps {
  imageUrl?: string;
  title: string;
  onError: () => void;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({ imageUrl, title, onError }) => {
  const validImageUrl = isValidImageUrl(imageUrl);

  if (!validImageUrl) {
    return (
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <NewspaperIcon className="h-12 w-12 text-gray-400" />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-48 object-cover"
      onError={onError}
      loading="lazy"
    />
  );
};
