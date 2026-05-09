const app = getApp();
const { getDaysUntil, getTimeUntil, formatDate } = require('../../utils/date');

Page({
  data: {
    weddingDate: '',
    daysUntil: 0,
    timeUntil: null,
    settings: null,
    countdownEvents: [],
    milestones: [],
    timer: null,
    currentTime: null,
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
      .filter((t) => t.dueDate && !t.completed && t.dueDate >= formatDate(new Date()))
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
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        this.setData({
          timeUntil,
          currentTime: formatDate(now) + ' ' + hours + ':' + minutes + ':' + seconds
        });
      }
    }, 1000);
    
    this.setData({ timer });
  },

  stopTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({ timer: null });
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
