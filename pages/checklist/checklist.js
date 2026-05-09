const app = getApp();
const { WEDDING_CHECKLISTS, TIMELINE_INFO } = require('../../data/templates');
const { generateId } = require('../../utils/id');

Page({
  data: {
    timelines: TIMELINE_INFO,
    selectedTimeline,
    checklistItems,
    expandedTimelines,
    applying: false,
    loading: true
  },

  onLoad() {
    this.loadData();
  },

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  loadData() {
    this.setData({ loading: false });
  },

  toggleTimeline(e) {
    const timelineId = e.currentTarget.dataset.id;
    const expandedTimelines = this.data.expandedTimelines;
    
    const index = expandedTimelines.indexOf(timelineId);
    if (index === -1) {
      expandedTimelines.push(timelineId);
    } else {
      expandedTimelines.splice(index, 1);
    }
    
    this.setData({ expandedTimelines });
  },

  getTimelineItems(timelineId) {
    const checklist = WEDDING_CHECKLISTS[timelineId 'general'];
    if (!checklist) return [];
    
    return checklist.map(item => ({
      ...item,
      id: generateId(),
      completed: false
    }));
  },

  applyTimeline(e) {
    const timelineId = e.currentTarget.dataset.id;
    const items = this.getTimelineItems(timelineId);
    
    wx.showModal({
      title: '应用清单模板',
      content: `确定要应用"${this.getTimelineName(timelineId)}"清单吗？将添加 ${items.length} 项待办事项。`,
      success: (res) => {
        if (res.confirm) {
          this.doApplyTimeline(timelineId, items);
        }
      }
    });
  },

  getTimelineName(timelineId) {
    const timeline = TIMELINE_INFO.find(t => t.id === timelineId);
    return timeline ? timeline.name : '';
  },

  doApplyTimeline(timelineId, items[]) {
    this.setData({ applying: true });
    
    const todoList = wx.getStorageSync('todo_list') || [];
    const now = this.formatDate(new Date());
    const settings = wx.getStorageSync('wedding_settings') || {};
    
    let weddingDate = '';
    if (settings.weddingDate) {
      const date = new Date(settings.weddingDate);
      date.setDate(date.getDate() - TIMELINE_INFO.find(t => t.id === timelineId)?.days || 0);
      weddingDate = this.formatDate(date);
    }
    
    const newTodos = items.map(item => ({
      id: item.id,
      title: item.title,
      category: item.category,
      priority: item.priority,
      dueDate: weddingDate,
      completed: false,
      completedAt,
      supplierId,
      budget,
      notes: '',
      subtasks,
      createdAt: now,
      updatedAt: now
    }));
    
    todoList.push(...newTodos);
    wx.setStorageSync('todo_list', todoList);
    
    this.setData({ applying: false });
    
    wx.showToast({
      title: `已添加 ${newTodos.length} 项待办`,
      icon: 'success'
    });
  },

  applyAllTimelines() {
    wx.showModal({
      title: '应用完整清单',
      content: '确定要应用所有时间段的清单吗？这将添加大量待办事项。',
      success: (res) => {
        if (res.confirm) {
          this.doApplyAllTimelines();
        }
      }
    });
  },

  doApplyAllTimelines() {
    this.setData({ applying: true });
    
    const todoList = wx.getStorageSync('todo_list') || [];
    const now = this.formatDate(new Date());
    const settings = wx.getStorageSync('wedding_settings') || {};
    
    let totalAdded = 0;
    
    Object.keys(WEDDING_CHECKLISTS).forEach(timelineId => {
      const items = this.getTimelineItems(timelineId);
      const timeline = TIMELINE_INFO.find(t => t.id === timelineId);
      
      let weddingDate = '';
      if (settings.weddingDate && timeline) {
        const date = new Date(settings.weddingDate);
        date.setDate(date.getDate() - timeline.days);
        weddingDate = this.formatDate(date);
      }
      
      const newTodos = items.map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        priority: item.priority,
        dueDate: weddingDate,
        completed: false,
        completedAt,
        supplierId,
        budget,
        notes: '',
        subtasks,
        createdAt: now,
        updatedAt: now
      }));
      
      todoList.push(...newTodos);
      totalAdded += newTodos.length;
    });
    
    wx.setStorageSync('todo_list', todoList);
    
    this.setData({ applying: false });
    
    wx.showToast({
      title: `已添加 ${totalAdded} 项待办`,
      icon: 'success'
    });
  },

  goToTodo() {
    wx.switchTab({
      url: '/pages/todo/todo'
    });
  }
});
