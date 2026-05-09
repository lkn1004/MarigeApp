const app = getApp();
const { TODO_CATEGORIES, PRIORITIES } = require('../../data/categories');
const { generateId } = require('../../utils/id');

Page({
  data: {
    todoId: '',
    todo,
    categoryInfo,
    priorityInfo,
    supplier,
    editing: false,
    editingSubtask as string | null,
    newSubtaskTitle: '',
    showAddSubtask: false,
    currentDate: ''
  },

  onLoad(options) {
    this.setData({ 
      todoId: options.id,
      currentDate: this.formatDate(new Date())
    });
    this.loadTodo();
  },

  onShow() {
    this.loadTodo();
  },

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  loadTodo() {
    const todoList = wx.getStorageSync('todo_list') || [];
    const todo = todoList.find((t) => t.id === this.data.todoId);
    
    if (todo) {
      const category = TODO_CATEGORIES.find(c => c.id === todo.category);
      const priority = PRIORITIES.find(p => p.id === todo.priority);
      
      let supplier = null;
      if (todo.supplierId) {
        const supplierList = wx.getStorageSync('supplier_list') || [];
        supplier = supplierList.find((s) => s.id === todo.supplierId);
      }
      
      this.setData({
        todo,
        categoryInfo: category,
        priorityInfo: priority,
        supplier
      });
    } else {
      wx.showToast({
        title: '待办不存在',
        icon: 'none'
      });
      wx.navigateBack();
    }
  },

  toggleComplete() {
    const todoList = wx.getStorageSync('todo_list') || [];
    const now = this.formatDate(new Date());
    
    const updatedList = todoList.map((t) => {
      if (t.id === this.data.todoId) {
        return {
          ...t,
          completed: !t.completed,
          completedAt: !t.completed ? now 
        };
      }
      return t;
    });
    
    wx.setStorageSync('todo_list', updatedList);
    this.loadTodo();
    
    wx.showToast({
      title: this.data.todo.completed ? '已取消完成' : '已完成',
      icon: 'success'
    });
  },

  deleteTodo() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个待办事项吗？',
      success: (res) => {
        if (res.confirm) {
          const todoList = wx.getStorageSync('todo_list') || [];
          const updatedList = todoList.filter((t) => t.id !== this.data.todoId);
          wx.setStorageSync('todo_list', updatedList);
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
          
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      }
    });
  },

  goToSupplier() {
    if (this.data.supplier) {
      wx.navigateTo({
        url: `/pages/supplier/supplier-detail/supplier-detail?id=${this.data.supplier.id}`
      });
    } else {
      wx.navigateTo({
        url: '/pages/supplier/supplier/supplier'
      });
    }
  },

  showAddSubtaskModal() {
    this.setData({ showAddSubtask: true, newSubtaskTitle: '' });
  },

  hideAddSubtaskModal() {
    this.setData({ showAddSubtask: false, newSubtaskTitle: '' });
  },

  onSubtaskTitleInput(e) {
    this.setData({ newSubtaskTitle: e.detail.value });
  },

  addSubtask() {
    if (!this.data.newSubtaskTitle.trim()) {
      wx.showToast({
        title: '请输入子任务标题',
        icon: 'none'
      });
      return;
    }
    
    const todoList = wx.getStorageSync('todo_list') || [];
    const now = this.formatDate(new Date());
    
    const updatedList = todoList.map((t) => {
      if (t.id === this.data.todoId) {
        const newSubtask = {
          id: generateId(),
          title: this.data.newSubtaskTitle.trim(),
          completed: false
        };
        return {
          ...t,
          subtasks: [...(t.subtasks || []), newSubtask],
          updatedAt: now
        };
      }
      return t;
    });
    
    wx.setStorageSync('todo_list', updatedList);
    this.loadTodo();
    this.hideAddSubtaskModal();
    
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });
  },

  toggleSubtaskComplete(e) {
    const subtaskId = e.currentTarget.dataset.id;
    const todoList = wx.getStorageSync('todo_list') || [];
    const now = this.formatDate(new Date());
    
    const updatedList = todoList.map((t) => {
      if (t.id === this.data.todoId) {
        const subtasks = (t.subtasks || []).map((s) => {
          if (s.id === subtaskId) {
            return { ...s, completed: !s.completed };
          }
          return s;
        });
        return { ...t, subtasks, updatedAt: now };
      }
      return t;
    });
    
    wx.setStorageSync('todo_list', updatedList);
    this.loadTodo();
  },

  deleteSubtask(e) {
    const subtaskId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个子任务吗？',
      success: (res) => {
        if (res.confirm) {
          const todoList = wx.getStorageSync('todo_list') || [];
          const now = this.formatDate(new Date());
          
          const updatedList = todoList.map((t) => {
            if (t.id === this.data.todoId) {
              const subtasks = (t.subtasks || []).filter((s) => s.id !== subtaskId);
              return { ...t, subtasks, updatedAt: now };
            }
            return t;
          });
          
          wx.setStorageSync('todo_list', updatedList);
          this.loadTodo();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  copyTodo() {
    const todoList = wx.getStorageSync('todo_list') || [];
    const now = this.formatDate(new Date());
    
    const newTodo = {
      ...this.data.todo,
      id: generateId(),
      title: `${this.data.todo.title} (副本)`,
      completed: false,
      completedAt,
      dueDate: '',
      createdAt: now,
      updatedAt: now
    };
    
    todoList.push(newTodo);
    wx.setStorageSync('todo_list', todoList);
    
    wx.showToast({
      title: '复制成功',
      icon: 'success'
    });
  },

  formatCurrency(amount) {
    return `¥${Number(amount || 0).toLocaleString('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  }
});
