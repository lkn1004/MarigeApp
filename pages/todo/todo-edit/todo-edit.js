const app = getApp();
const { TODO_CATEGORIES, PRIORITIES } = require('../../../data/categories');

Page({
  data: {
    todoId: '',
    todo,
    categories: TODO_CATEGORIES,
    priorities: PRIORITIES,
    formData: {
      title: '',
      category: 'other',
      priority: 'medium',
      dueDate: '',
      notes: '',
      budget: ''
    }
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ todoId: options.id });
      this.loadTodo();
    }
  },

  loadTodo() {
    const todoList = wx.getStorageSync('todo_list') || [];
    const todo = todoList.find(t => t.id === this.data.todoId);
    
    if (todo) {
      this.setData({
        todo,
        formData: {
          title: todo.title || '',
          category: todo.category || 'other',
          priority: todo.priority || 'medium',
          dueDate: todo.dueDate || '',
          notes: todo.notes || '',
          budget: todo.budget ? String(todo.budget) : ''
        }
      });
    }
  },

  onTitleInput(e) {
    this.setData({ 'formData.title': e.detail.value });
  },

  onNotesInput(e) {
    this.setData({ 'formData.notes': e.detail.value });
  },

  onBudgetInput(e) {
    this.setData({ 'formData.budget': e.detail.value });
  },

  selectCategory(e) {
    this.setData({ 'formData.category': e.currentTarget.dataset.category });
  },

  selectPriority(e) {
    this.setData({ 'formData.priority': e.currentTarget.dataset.priority });
  },

  onDateChange(e) {
    this.setData({ 'formData.dueDate': e.detail.value });
  },

  saveTodo() {
    const { formData } = this.data;
    
    if (!formData.title.trim()) {
      wx.showToast({ title: '请输入待办标题', icon: 'none' });
      return;
    }
    
    const todoList = wx.getStorageSync('todo_list') || [];
    const now = new Date().toISOString().split('T')[0];
    
    if (this.data.todoId) {
      const index = todoList.findIndex(t => t.id === this.data.todoId);
      if (index !== -1) {
        todoList[index] = {
          ...todoList[index],
          title: formData.title.trim(),
          category: formData.category,
          priority: formData.priority,
          dueDate: formData.dueDate,
          notes: formData.notes,
          budget: formData.budget ? parseFloat(formData.budget) ,
          updatedAt: now
        };
      }
    } else {
      todoList.push({
        id: Date.now().toString(),
        title: formData.title.trim(),
        category: formData.category,
        priority: formData.priority,
        dueDate: formData.dueDate,
        completed: false,
        completedAt,
        notes: formData.notes,
        budget: formData.budget ? parseFloat(formData.budget) ,
        subtasks,
        createdAt: now,
        updatedAt: now
      });
    }
    
    wx.setStorageSync('todo_list', todoList);
    
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
    
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
});
