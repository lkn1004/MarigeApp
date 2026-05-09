const app = getApp();
const { TODO_CATEGORIES } = require('../../data/categories');
const { generateId } = require('../../utils/id');

Page({
  data: {
    todos: [],
    filteredTodos: [],
    categories: TODO_CATEGORIES,
    selectedCategory: 'all',
    selectedPriority: 'all',
    selectedStatus: 'all',
    searchKeyword: '',
    showFilter: false,
    showAddModal: false,
    editingTodo: null,
    newTodo: {
      title: '',
      category: 'other',
      priority: 'medium',
      dueDate: '',
      notes: '',
      budget: ''
    },
    showCategoryPicker: false,
    showPriorityPicker: false,
    currentDate: '',
    sortBy: 'dueDate',
    sortOrder: 'asc',
    viewMode: 'list',
    showBatchActions: false,
    selectedTodos: [],
    loading: true
  },

  onLoad() {
    this.setData({ currentDate: this.formatDate(new Date()) });
  },

  onShow() {
    this.loadTodos();
  },

  onPullDownRefresh() {
    this.loadTodos();
    wx.stopPullDownRefresh();
  },

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  loadTodos() {
    this.setData({ loading: true });
    
    const todoList = wx.getStorageSync('todo_list') || [];
    
    const todosWithCategory = todoList.map((todo) => {
      const category = TODO_CATEGORIES.find(c => c.id === todo.category);
      return {
        ...todo,
        categoryName: category ? category.name : '其他',
        categoryColor: category ? category.color : '#D4D4D4'
      };
    });
    
    this.setData({
      todos: todosWithCategory,
      loading: false
    });
    
    this.applyFilters();
  },

  applyFilters() {
    let filtered = [...this.data.todos];
    
    if (this.data.selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === this.data.selectedCategory);
    }
    
    if (this.data.selectedPriority !== 'all') {
      filtered = filtered.filter(t => t.priority === this.data.selectedPriority);
    }
    
    if (this.data.selectedStatus !== 'all') {
      if (this.data.selectedStatus === 'completed') {
        filtered = filtered.filter(t => t.completed);
      } else if (this.data.selectedStatus === 'pending') {
        filtered = filtered.filter(t => !t.completed);
      } else if (this.data.selectedStatus === 'overdue') {
        const today = this.formatDate(new Date());
        filtered = filtered.filter(t => !t.completed && t.dueDate && t.dueDate < today);
      }
    }
    
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(keyword) ||
        t.notes.toLowerCase().includes(keyword)
      );
    }
    
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (this.data.sortBy === 'dueDate') {
        if (!a.dueDate && !b.dueDate) comparison = 0;
        else if (!a.dueDate) comparison = 1;
        else if (!b.dueDate) comparison = -1;
        else comparison = a.dueDate.localeCompare(b.dueDate);
      } else if (this.data.sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (this.data.sortBy === 'createdAt') {
        comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      
      return this.data.sortOrder === 'asc' ? comparison : -comparison;
    });
    
    this.setData({ filteredTodos: filtered });
  },

  onSearch(e) {
    this.setData({ searchKeyword: e.detail.value });
    this.applyFilters();
  },

  toggleFilter() {
    this.setData({ showFilter: !this.data.showFilter });
  },

  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ selectedCategory: category });
    this.applyFilters();
  },

  selectPriority(e) {
    const priority = e.currentTarget.dataset.priority;
    this.setData({ selectedPriority: priority });
    this.applyFilters();
  },

  selectStatus(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({ selectedStatus: status });
    this.applyFilters();
  },

  changeSort(e) {
    const sortBy = e.currentTarget.dataset.sort;
    if (this.data.sortBy === sortBy) {
      this.setData({ 
        sortOrder: this.data.sortOrder === 'asc' ? 'desc' : 'asc' 
      });
    } else {
      this.setData({ 
        sortBy,
        sortOrder: 'asc'
      });
    }
    this.applyFilters();
  },

  toggleViewMode() {
    this.setData({ 
      viewMode: this.data.viewMode === 'list' ? 'grid' : 'list' 
    });
  },

  openAddModal() {
    this.setData({
      showAddModal: true,
      editingTodo: null,
      newTodo: {
        title: '',
        category: 'other',
        priority: 'medium',
        dueDate: '',
        notes: '',
        budget: ''
      }
    });
  },

  closeAddModal() {
    this.setData({ showAddModal: false });
  },

  onTitleInput(e) {
    this.setData({
      'newTodo.title': e.detail.value
    });
  },

  onNotesInput(e) {
    this.setData({
      'newTodo.notes': e.detail.value
    });
  },

  onBudgetInput(e) {
    this.setData({
      'newTodo.budget': e.detail.value
    });
  },

  selectNewCategory(e) {
    this.setData({
      'newTodo.category': e.currentTarget.dataset.category
    });
  },

  selectNewPriority(e) {
    this.setData({
      'newTodo.priority': e.currentTarget.dataset.priority
    });
  },

  onDueDateChange(e) {
    this.setData({
      'newTodo.dueDate': e.detail.value
    });
  },

  saveTodo() {
    const { newTodo } = this.data;
    
    if (!newTodo.title.trim()) {
      wx.showToast({
        title: '请输入待办标题',
        icon: 'none'
      });
      return;
    }
    
    const todoList = wx.getStorageSync('todo_list') || [];
    const now = this.formatDate(new Date());
    
    if (this.data.editingTodo) {
      const index = todoList.findIndex((t) => t.id === this.data.editingTodo.id);
      if (index !== -1) {
        todoList[index] = {
          ...todoList[index],
          title: newTodo.title.trim(),
          category: newTodo.category,
          priority: newTodo.priority,
          dueDate: newTodo.dueDate,
          notes: newTodo.notes,
          budget: newTodo.budget ? parseFloat(newTodo.budget) : 0,
          updatedAt: now
        };
      }
    } else {
      const newTodoItem = {
        id: generateId(),
        title: newTodo.title.trim(),
        category: newTodo.category,
        priority: newTodo.priority,
        dueDate: newTodo.dueDate,
        completed: false,
        completedAt: null,
        notes: newTodo.notes,
        budget: newTodo.budget ? parseFloat(newTodo.budget) : 0,
        subtasks: [],
        createdAt: now,
        updatedAt: now
      };
      todoList.push(newTodoItem);
    }
    
    wx.setStorageSync('todo_list', todoList);
    this.loadTodos();
    this.closeAddModal();
    
    wx.showToast({
      title: this.data.editingTodo ? '更新成功' : '添加成功',
      icon: 'success'
    });
  },

  toggleTodoComplete(e) {
    const todoId = e.currentTarget.dataset.id;
    const todoList = wx.getStorageSync('todo_list') || [];
    const now = this.formatDate(new Date());
    
    const updatedList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? now : null
        };
      }
      return todo;
    });
    
    wx.setStorageSync('todo_list', updatedList);
    this.loadTodos();
  },

  goToDetail(e) {
    const todoId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/todo/todo-detail/todo-detail?id=${todoId}`
    });
  },

  editTodo(e) {
    const todoId = e.currentTarget.dataset.id;
    const todo = this.data.todos.find((t) => t.id === todoId);
    
    if (todo) {
      this.setData({
        showAddModal: true,
        editingTodo: todo,
        newTodo: {
          title: todo.title,
          category: todo.category,
          priority: todo.priority,
          dueDate: todo.dueDate || '',
          notes: todo.notes || '',
          budget: todo.budget ? String(todo.budget) : ''
        }
      });
    }
  },

  deleteTodo(e) {
    const todoId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个待办事项吗？',
      success: (res) => {
        if (res.confirm) {
          const todoList = wx.getStorageSync('todo_list') || [];
          const updatedList = todoList.filter((t) => t.id !== todoId);
          wx.setStorageSync('todo_list', updatedList);
          this.loadTodos();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  toggleBatchSelect() {
    this.setData({
      showBatchActions: !this.data.showBatchActions,
      selectedTodos: []
    });
  },

  selectTodo(e) {
    const todoId = e.currentTarget.dataset.id;
    const selectedTodos = this.data.selectedTodos;
    
    const index = selectedTodos.indexOf(todoId);
    if (index === -1) {
      selectedTodos.push(todoId);
    } else {
      selectedTodos.splice(index, 1);
    }
    
    this.setData({ selectedTodos });
  },

  batchComplete() {
    if (this.data.selectedTodos.length === 0) return;
    
    const todoList = wx.getStorageSync('todo_list') || [];
    const now = this.formatDate(new Date());
    
    const updatedList = todoList.map((todo) => {
      if (this.data.selectedTodos.includes(todo.id)) {
        return {
          ...todo,
          completed: true,
          completedAt: now
        };
      }
      return todo;
    });
    
    wx.setStorageSync('todo_list', updatedList);
    this.loadTodos();
    this.toggleBatchSelect();
    
    wx.showToast({
      title: `${this.data.selectedTodos.length} 项已完成`,
      icon: 'success'
    });
  },

  batchDelete() {
    if (this.data.selectedTodos.length === 0) return;
    
    wx.showModal({
      title: '确认批量删除',
      content: `确定要删除选中的 ${this.data.selectedTodos.length} 项待办事项吗？`,
      success: (res) => {
        if (res.confirm) {
          const todoList = wx.getStorageSync('todo_list') || [];
          const updatedList = todoList.filter(
            (t) => !this.data.selectedTodos.includes(t.id)
          );
          wx.setStorageSync('todo_list', updatedList);
          this.loadTodos();
          this.toggleBatchSelect();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  resetFilters() {
    this.setData({
      selectedCategory: 'all',
      selectedPriority: 'all',
      selectedStatus: 'all',
      searchKeyword: ''
    });
    this.applyFilters();
  },

  goToChecklist() {
    wx.navigateTo({
      url: '/pages/checklist/checklist'
    });
  }
});
