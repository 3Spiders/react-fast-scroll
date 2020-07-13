export const exampleList = [
  { name: '基础列表页示例', path: '/BasicList', extra: '最简单的列表实现' },
  { name: 'axios 分页示例', path: '/axiosList', extra: '简单的axios 分页实现' },
  { name: 'options-list 列表配置项示例', path: '/optionsList', extra: '演示了所有options的配置' },
  { name: '成功动画列表示例', path: '/list1', extra: '带下拉成功动画的列表' },
  { name: 'translate动画列表示例', path: '/list2', extra: '带下拉成功动画的列表' },
  { name: '单容器示例', path: '/lis3t', extra: '单个容器实现多个列表' },
  { name: '多容器示例', path: '/list4', extra: '多个容器实现多个列表' },
  { name: 'Vue组件示例', path: '/list5', extra: '支持在Vue下使用' },
];

export const optionsType = [
  { name: '默认状态', key:'STATE_DEFAULT'},
  { name: '锁定下拉', key: 'STATE_LOCK_DOWN' },
  { name: '锁定上拉', key: 'STATE_LOCK_UP' },
  { name: '允许上拉时下拉', key: 'STATE_DOWN_ALWAYS' },
  { name: '开启下拉成功动画', key: 'STATE_DOWN_SUCCESS_ANIM' },
  { name: '延长下拉动画时间', key: 'STATE_DOWN_DURATION' },
  { name: '隐藏toTop', key: 'STATE_UP_TOTOP_HIDE' },
  { name: '关闭自动满屏', key: 'STATE_UP_LOADFULL_DISABLE' },
  { name: '隐藏上拉动画', key: 'STATE_UP_LOADING_HIDE' }
];