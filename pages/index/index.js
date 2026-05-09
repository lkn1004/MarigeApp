const app = getApp();

Page({
  data: {
    weddingDate: '',
    daysUntilWedding: 0,
    groomName: '',
    brideName: '',
    progress: 0,
    todayTodos as any[],
    recentTodos as any[],
    upcomingEvents as any[],
    quickStats: {
      totalTodos: 0,
      completedTodos: 0,
      totalBudget: 0,
      spentBudget: 0,
      guestCount: 0,
      confirmedGuests: 0
    },
    showOnboarding: false,
    loading: true
  },

  onLoad() {
    this.checkOnboarding();
  },

  onShow() {
    this.loadData();
  },

  onPullDownRefresh() {
    this.loadData();
    wx.stopPullDownRefresh();
  },

  checkOnboarding() {
    const completed = wx.getStorageSync('onboarding_completed');
    const settings = wx.getStorageSync('wedding_settings');
    
    if (!completed || !settings || !settings.weddingDate) {
      this.setData({ showOnboarding: true });
    } else {
      this.setData({ showOnboarding: false });
    }
  },

  loadData() {
    this.setData({ loading: true });
    
    const settings = wx.getStorageSync('wedding_settings') || {};
    const todoList = wx.getStorageSync('todo_list') || [];
    const budget = wx.getStorageSync('budget') || {};
    const guestList = wx.getStorageSync('guest_list') || [];
    
    const today = this.formatDate(new Date());
    const todayTodos = todoList.filter((todo) => 
      todo.dueDate === today && !todo.completed
    ).slice(0, 5);
    
    const recentTodos = todoList
      .filter((todo) => todo.completed)
      .sort((a, b) => 
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      )
      .slice(0, 5);
    
    const completedTodos = todoList.filter((todo) => todo.completed).length;
    const totalTodos = todoList.length;
    const progress = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
    
    const confirmedGuests = guestList.filter((guest) => 
      guest.status === 'confirmed'
    ).length;
    
    const weddingDate = settings.weddingDate || '';
    let daysUntilWedding = 0;
    
    if (weddingDate) {
      daysUntilWedding = this.getDaysUntil(weddingDate);
    }
    
    this.setData({
      weddingDate,
      daysUntilWedding,
      groomName: settings.groomName || '',
      brideName: settings.brideName || '',
      todayTodos,
      recentTodos,
      progress,
      quickStats: {
        totalTodos,
        completedTodos,
        totalBudget: budget.totalBudget || 0,
        spentBudget: budget.totalSpent || 0,
        guestCount: guestList.length,
        confirmedGuests
      },
      loading: false
    });
  },

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  getDaysUntil(dateStr) {
    if (!dateStr) return 0;
    
    const target = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  goToTodo() {
    wx.switchTab({
      url: '/pages/todo/todo'
    });
  },

  goToCalendar() {
    wx.switchTab({
      url: '/pages/calendar/calendar'
    });
  },

  goToBudget() {
    wx.switchTab({
      url: '/pages/budget/budget'
    });
  },

  goToSettings() {
    wx.switchTab({
      url: '/pages/settings/settings'
    });
  },

  completeTodo(e) {
    const todoId = e.currentTarget.dataset.id;
    const todoList = wx.getStorageSync('todo_list') || [];
    
    const updatedList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: true,
          completedAt: this.formatDate(new Date())
        };
      }
      return todo;
    });
    
    wx.setStorageSync('todo_list', updatedList);
    this.loadData();
    
    wx.showToast({
      title: '任务完成！',
      icon: 'success'
    });
  },

  startOnboarding() {
    wx.navigateTo({
      url: '/pages/settings/settings?action=setup'
    });
  },

  formatCurrency(amount) {
    return `¥${Number(amount || 0).toLocaleString('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  }
});
