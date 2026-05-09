const TODO_CATEGORIES = [
  { 
    id: 'venue', 
    name: '场地预订', 
    icon: 'location', 
    color: '#E8B4B8',
    description: '酒店、婚礼堂、户外场地等'
  },
  { 
    id: 'photo', 
    name: '婚纱摄影', 
    icon: 'camera', 
    color: '#F5D5D8',
    description: '婚纱照、婚礼当天跟拍'
  },
  { 
    id: 'dress', 
    name: '婚纱礼服', 
    icon: 'gift', 
    color: '#E8C4D4',
    description: '婚纱、礼服、西装、鞋配'
  },
  { 
    id: 'planner', 
    name: '婚庆策划', 
    icon: 'star', 
    color: '#D4E8B4',
    description: '婚庆公司、婚礼布置、流程'
  },
  { 
    id: 'jewelry', 
    name: '珠宝首饰', 
    icon: 'diamond', 
    color: '#B4D4E8',
    description: '钻戒、对戒、金饰、头饰'
  },
  { 
    id: 'banquet', 
    name: '婚宴筹备', 
    icon: 'calendar', 
    color: '#D4B4E8',
    description: '婚宴菜单、酒水、甜品台'
  },
  { 
    id: 'guest', 
    name: '宾客邀请', 
    icon: 'friends', 
    color: '#E8B4D4',
    description: '请柬、宾客名单、座位安排'
  },
  { 
    id: 'honeymoon', 
    name: '蜜月旅行', 
    icon: 'plane', 
    color: '#B4E8D4',
    description: '目的地、行程、签证、酒店'
  },
  { 
    id: 'legal', 
    name: '法律手续', 
    icon: 'document', 
    color: '#E8D4B4',
    description: '领证、户口迁移、婚姻公证'
  },
  { 
    id: 'other', 
    name: '其他杂项', 
    icon: 'more', 
    color: '#D4D4D4',
    description: '红包、婚车、鞭炮等'
  }
];

const PRIORITIES = [
  { id: 'high', name: '高', color: '#F5222D', icon: 'up' },
  { id: 'medium', name: '中', color: '#FA8C16', icon: 'minus' },
  { id: 'low', name: '低', color: '#52C41A', icon: 'down' }
];

const SUPPLIER_TYPES = [
  { id: 'hotel', name: '婚宴酒店', icon: 'hotel' },
  { id: 'planner', name: '婚庆策划', icon: 'flag' },
  { id: 'photo', name: '婚纱摄影', icon: 'camera' },
  { id: 'video', name: '摄像摄影', icon: 'video' },
  { id: 'makeup', name: '化妆造型', icon: 'brush' },
  { id: 'host', name: '主持司仪', icon: 'mic' },
  { id: 'florist', name: '花艺装饰', icon: 'flower' },
  { id: 'car', name: '婚车租赁', icon: 'car' },
  { id: 'jewelry', name: '珠宝定制', icon: 'diamond' },
  { id: 'cake', name: '甜品蛋糕', icon: 'cake' }
];

const GUEST_GROUPS = [
  { id: 'family', name: '家人', icon: 'home' },
  { id: 'friend', name: '朋友', icon: 'friends' },
  { id: 'colleague', name: '同事/同学', icon: 'briefcase' }
];

const INVITE_STATUS = [
  { id: 'pending', name: '待发送', color: '#999999' },
  { id: 'sent', name: '已发送', color: '#1890FF' },
  { id: 'confirmed', name: '已确认', color: '#52C41A' },
  { id: 'declined', name: '已婉拒', color: '#F5222D' }
];

const PAYMENT_STATUS = [
  { id: 'paid', name: '已付款', color: '#52C41A' },
  { id: 'pending', name: '待付款', color: '#FA8C16' }
];

const EVENT_TYPES = [
  { id: 'milestone', name: '重要节点', color: '#E8B4B8' },
  { id: 'deadline', name: '截止日期', color: '#FA8C16' },
  { id: 'meeting', name: '沟通会议', color: '#1890FF' },
  { id: 'payment', name: '付款日期', color: '#D4AF37' }
];

module.exports = {
  TODO_CATEGORIES,
  PRIORITIES,
  SUPPLIER_TYPES,
  GUEST_GROUPS,
  INVITE_STATUS,
  PAYMENT_STATUS,
  EVENT_TYPES
};
