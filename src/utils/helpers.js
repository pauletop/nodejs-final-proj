const helpers = {
    formatCurrency: (amount) => {
      return new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(amount);
    },
    formatDate: (date) => {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
    },
    add: (a, b) => {
      return a + b;
    }
};
module.exports = helpers;