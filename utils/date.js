function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

function getDaysUntil(targetDate) {
  if (!targetDate) return null;
  
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

function getTimeUntil(targetDate) {
  if (!targetDate) return null;
  
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = new Date();
  
  const diffTime = target.getTime() - now.getTime();
  
  if (diffTime <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
}

function isToday(dateStr) {
  if (!dateStr) return false;
  
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const today = new Date();
  
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate();
}

function isPast(dateStr) {
  if (!dateStr) return false;
  
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  
  return date < today;
}

function isFuture(dateStr) {
  if (!dateStr) return false;
  
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  
  return date > today;
}

function getWeekDays() {
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
}

function getMonthDays(year, month) {
  const days = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeek = firstDay.getDay();
  
  for (let i = startWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push({
      date: date.getDate(),
      fullDate: formatDate(date),
      isCurrentMonth: false,
      isToday: isToday(date),
      isPast: isPast(date)
    });
  }
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({
      date: i,
      fullDate: formatDate(date),
      isCurrentMonth: true,
      isToday: isToday(date),
      isPast: isPast(date)
    });
  }
  
  const endWeek = lastDay.getDay();
  for (let i = 1; i < 7 - endWeek; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date: i,
      fullDate: formatDate(date),
      isCurrentMonth: false,
      isToday: isToday(date),
      isPast: isPast(date)
    });
  }
  
  return days;
}

function getMonthName(month) {
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', 
                  '七月', '八月', '九月', '十月', '十一月', '十二月'];
  return months[month] || '';
}

function getRelativeDate(dateStr) {
  if (!dateStr) return '';
  
  const days = getDaysUntil(dateStr);
  
  if (days === null) return '';
  if (days === 0) return '今天';
  if (days === 1) return '明天';
  if (days === -1) return '昨天';
  if (days > 0 && days <= 7) return `${days}天后`;
  if (days < 0 && days >= -7) return `${Math.abs(days)}天前`;
  
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  return formatDate(date, 'MM月DD日');
}

module.exports = {
  formatDate,
  getDaysUntil,
  getTimeUntil,
  isToday,
  isPast,
  isFuture,
  getWeekDays,
  getMonthDays,
  getMonthName,
  getRelativeDate
};
