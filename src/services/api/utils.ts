export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const formatDate = {
  newsApi: (dateString: string | null): string | undefined => {
    if (!dateString) return undefined;
    const date = new Date(dateString);
    return dateString === date.toISOString().split('T')[0] ? date.toISOString() : undefined;
  },

  nyTimes: (dateString: string | null): string | undefined => {
    if (!dateString) return undefined;
    return dateString.split('-').join('');
  },

  guardian: (dateString: string | null) => dateString || undefined
};