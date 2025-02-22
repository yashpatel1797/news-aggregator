export const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Date unavailable';
    }
  };
  
  export const formatAuthor = (author: string): string => {
    if (!author || author === 'Unknown') return 'Unknown Author';
    return author;
  };