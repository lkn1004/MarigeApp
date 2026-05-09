const app = getApp();
const { getDaysUntil, getTimeUntil, formatDate } = require('../../utils/date');

Page({
  data: {
    weddingDate: '',
    daysUntil: 0,
    timeUntil,
    settings,
    countdownEvents,
    milestones,
    timer as null,
    currentTime,
    loading: true
  },

  onLoad() {
    this.loadData();
    this.startTimer();
  },

  onShow() {
    this.loadData();
  },

  onUnload() {
    this.stopTimer();
  },

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  loadData() {
    this.setData({ loading: true });
    
    const settings = wx.getStorageSync('wedding_settings') || {};
    const todoList = wx.getStorageSync('todo_list') || [];
    const weddingDate = settings.weddingDate || '';
    
    let daysUntil = 0;
    let timeUntil = null;
    
    if (weddingDate) {
      daysUntil = getDaysUntil(weddingDate);
      timeUntil = getTimeUntil(weddingDate + ' 00:00:00');
    }
    
    const upcomingTodos = todoList
      .filter((t) => t.dueDate && !t.completed && t.dueDate >= this.formatDate(new Date()))
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 5);
    
    this.setData({
      weddingDate,
      daysUntil,
      timeUntil,
      settings,
      countdownEvents: upcomingTodos,
      loading: false
    });
  },

  startTimer() {
    this.stopTimer();
    
    const timer = setInterval(() => {
      if (this.data.weddingDate) {
        const timeUntil = getTimeUntil(this.data.weddingDate + ' 00:00:00');
        this.setData({
          timeUntil,
          currentTime: this.formatDate(new Date()) + ' ' + 
            `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`
        });
      }
    }, 1000);
    
    this.setData({ timer });
  },

  stopTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({ timer });
    }
  },

  goToSettings() {
    wx.switchTab({
      url: '/pages/settings/settings'
    });
  },

  goToTodo() {
    wx.switchTab({
      url: '/pages/todo/todo'
    });
  },

  formatCurrency(amount) {
    return `¥${Number(amount || 0).toLocaleString('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  }
});
