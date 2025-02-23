export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const formatDate = {
  newsApi: (dateString: string | null): string | undefined => {
    if (!dateString) return undefined;
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      console.log(`${year}-${month}-${day}`);
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Date formatting error:', error);
      return undefined;
    }
  },
  nyTimes: (dateString: string | null): string | undefined => {
    if (!dateString) return undefined;
    return dateString.replace(/-/g, '');
  },

  guardian: (dateString: string | null) => dateString || undefined
};