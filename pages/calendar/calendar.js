const app = getApp();
const { getWeekDays, getMonthDays, getMonthName, formatDate } = require('../../utils/date');
const { TODO_CATEGORIES } = require('../../data/categories');

Page({
  data: {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    weekDays: getWeekDays(),
    monthDays,
    selectedDate: '',
    selectedTodos,
    selectedEvents,
    viewMode: 'month',
    showEventModal: false,
    newEvent: {
      title: '',
      type: 'deadline',
      time: ''
    },
    eventTypes: [
      { id: 'milestone', name: '重要节点', color: '#E8B4B8' },
      { id: 'deadline', name: '截止日期', color: '#FA8C16' },
      { id: 'meeting', name: '沟通会议', color: '#1890FF' },
      { id: 'payment', name: '付款日期', color: '#D4AF37' }
    ],
    weddingSettings,
    loading: true
  },

  onLoad() {
    this.initCalendar();
  },

  onShow() {
    this.loadData();
  },

  initCalendar() {
    const now = new Date();
    this.setData({
      currentYear: now.getFullYear(),
      currentMonth: now.getMonth(),
      selectedDate: formatDate(now)
    });
    this.renderCalendar();
  },

  loadData() {
    this.setData({ loading: true });
    
    const settings = wx.getStorageSync('wedding_settings');
    const todoList = wx.getStorageSync('todo_list') || [];
    
    this.setData({
      weddingSettings: settings,
      loading: false
    });
    
    this.renderCalendar();
    this.loadSelectedDateTodos();
  },

  renderCalendar() {
    const { currentYear, currentMonth } = this.data;
    const days = getMonthDays(currentYear, currentMonth);
    const todoList = wx.getStorageSync('todo_list') || [];
    
    const daysWithTodos = days.map(day => {
      const dayTodos = todoList.filter((todo) => todo.dueDate === day.fullDate);
      const hasHighPriority = dayTodos.some((t) => t.priority === 'high' && !t.completed);
      const hasCompleted = dayTodos.some((t) => t.completed);
      
      return {
        ...day,
        todoCount: dayTodos.length,
        hasHighPriority,
        hasCompleted,
        isWeddingDay: this.isWeddingDay(day.fullDate)
      };
    });
    
    this.setData({ monthDays: daysWithTodos });
  },

  isWeddingDay(dateStr): boolean {
    const settings = wx.getStorageSync('wedding_settings');
    return settings && settings.weddingDate === dateStr;
  },

  loadSelectedDateTodos() {
    const todoList = wx.getStorageSync('todo_list') || [];
    const { selectedDate } = this.data;
    
    const dayTodos = todoList
      .filter((todo) => todo.dueDate === selectedDate)
      .map((todo) => {
        const category = TODO_CATEGORIES.find(c => c.id === todo.category);
        return {
          ...todo,
          categoryName: category ? category.name : '其他',
          categoryColor: category ? category.color : '#D4D4D4'
        };
      });
    
    this.setData({ selectedTodos: dayTodos });
  },

  prevMonth() {
    let { currentYear, currentMonth } = this.data;
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    this.setData({ currentYear, currentMonth });
    this.renderCalendar();
  },

  nextMonth() {
    let { currentYear, currentMonth } = this.data;
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    this.setData({ currentYear, currentMonth });
    this.renderCalendar();
  },

  goToToday() {
    const now = new Date();
    this.setData({
      currentYear: now.getFullYear(),
      currentMonth: now.getMonth(),
      selectedDate: formatDate(now)
    });
    this.renderCalendar();
    this.loadSelectedDateTodos();
  },

  selectDate(e) {
    const dateStr = e.currentTarget.dataset.date;
    this.setData({ selectedDate: dateStr });
    this.loadSelectedDateTodos();
  },

  toggleViewMode() {
    this.setData({
      viewMode: this.data.viewMode === 'month' ? 'week' : 'month'
    });
  },

  openEventModal() {
    this.setData({
      showEventModal: true,
      newEvent: {
        title: '',
        type: 'deadline',
        time: ''
      }
    });
  },

  closeEventModal() {
    this.setData({ showEventModal: false });
  },

  onEventTitleInput(e) {
    this.setData({
      'newEvent.title': e.detail.value
    });
  },

  selectEventType(e) {
    this.setData({
      'newEvent.type': e.currentTarget.dataset.type
    });
  },

  onEventTimeChange(e) {
    this.setData({
      'newEvent.time': e.detail.value
    });
  },

  createEventFromTodo(e) {
    const todoId = e.currentTarget.dataset.id;
    const todo = wx.getStorageSync('todo_list').find((t) => t.id === todoId);
    
    if (todo) {
      this.setData({
        showEventModal: true,
        newEvent: {
          title: todo.title,
          type: 'deadline',
          time: todo.dueDate || ''
        }
      });
    }
  },

  formatCurrency(amount) {
    return `¥${Number(amount || 0).toLocaleString('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  }
});
