const ICONS = {
  navigation: [
    { id: 'home', name: '首页', path: '/assets/icons/home.png' },
    { id: 'home-active', name: '首页-选中', path: '/assets/icons/home-active.png' },
    { id: 'todo', name: '待办', path: '/assets/icons/todo.png' },
    { id: 'todo-active', name: '待办-选中', path: '/assets/icons/todo-active.png' },
    { id: 'calendar', name: '日历', path: '/assets/icons/calendar.png' },
    { id: 'calendar-active', name: '日历-选中', path: '/assets/icons/calendar-active.png' },
    { id: 'budget', name: '预算', path: '/assets/icons/budget.png' },
    { id: 'budget-active', name: '预算-选中', path: '/assets/icons/budget-active.png' },
    { id: 'settings', name: '设置', path: '/assets/icons/settings.png' },
    { id: 'settings-active', name: '设置-选中', path: '/assets/icons/settings-active.png' }
  ],
  
  categories: [
    { id: 'location', name: '场地', unicode: 'e602' },
    { id: 'camera', name: '摄影', unicode: 'e608' },
    { id: 'gift', name: '礼物', unicode: 'e609' },
    { id: 'star', name: '星星', unicode: 'e60a' },
    { id: 'diamond', name: '钻石', unicode: 'e60b' },
    { id: 'calendar', name: '日历', unicode: 'e60c' },
    { id: 'friends', name: '朋友', unicode: 'e60d' },
    { id: 'plane', name: '飞机', unicode: 'e60e' },
    { id: 'document', name: '文档', unicode: 'e60f' },
    { id: 'more', name: '更多', unicode: 'e610' }
  ],
  
  actions: [
    { id: 'add', name: '添加', unicode: 'e611' },
    { id: 'edit', name: '编辑', unicode: 'e612' },
    { id: 'delete', name: '删除', unicode: 'e613' },
    { id: 'search', name: '搜索', unicode: 'e614' },
    { id: 'filter', name: '筛选', unicode: 'e615' },
    { id: 'sort', name: '排序', unicode: 'e616' },
    { id: 'check', name: '完成', unicode: 'e617' },
    { id: 'close', name: '关闭', unicode: 'e618' }
  ],
  
  status: [
    { id: 'success', name: '成功', unicode: 'e619' },
    { id: 'warning', name: '警告', unicode: 'e61a' },
    { id: 'error', name: '错误', unicode: 'e61b' },
    { id: 'info', name: '信息', unicode: 'e61c' },
    { id: 'pending', name: '待处理', unicode: 'e61d' }
  ],
  
  misc: [
    { id: 'heart', name: '心形', unicode: 'e61e' },
    { id: 'ring', name: '戒指', unicode: 'e61f' },
    { id: 'cake', name: '蛋糕', unicode: 'e620' },
    { id: 'flower', name: '花朵', unicode: 'e621' },
    { id: 'car', name: '汽车', unicode: 'e622' },
    { id: 'hotel', name: '酒店', unicode: 'e623' },
    { id: 'brush', name: '画笔', unicode: 'e624' },
    { id: 'mic', name: '麦克风', unicode: 'e625' },
    { id: 'video', name: '视频', unicode: 'e626' },
    { id: 'phone', name: '电话', unicode: 'e627' }
  ]
};

const EMOJIS = {
  celebration: ['🎉', '💒', '👰', '🤵', '💐', '🎊', '🥂', '💍', '🎁', '🌹'],
  happy: ['😊', '🥰', '😘', '🤗', '😄', '🙂', '✨', '💫', '🌟', '⚡'],
  time: ['⏰', '📅', '⏳', '🕐', '📆', '🗓️', '⏱️', '⌛', '💭'],
  money: ['💰', '💵', '💴', '💶', '💷', '💸', '💳', '🧾', '💹'],
  location: ['📍', '🏨', '🏰', '🏩', '💒', '⛪', '🗺️', '🌍', '✨']
};

module.exports = {
  ICONS,
  EMOJIS
};
