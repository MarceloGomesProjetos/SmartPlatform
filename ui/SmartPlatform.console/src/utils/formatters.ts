
export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  export const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  