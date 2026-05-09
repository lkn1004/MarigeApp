function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '¥0.00';
  }
  
  return `¥${Number(amount).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function formatPhone(phone) {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
  }
  
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{3})/, '$1 $2 $3');
  }
  
  return phone;
}

function formatPercentage(value, total) {
  if (!total || total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(1)}%`;
}

function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) {
    return '0';
  }
  return Number(num).toLocaleString('zh-CN');
}

function formatCount(count) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
}

function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  formatCurrency,
  formatPhone,
  formatPercentage,
  truncateText,
  pluralize,
  formatNumber,
  formatCount,
  capitalizeFirst
};
