export const getDateConstraints = () => {
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
  
    return {
      maxDate: today.toISOString().split('T')[0],
      minDate: threeMonthsAgo.toISOString().split('T')[0]
    };
  };