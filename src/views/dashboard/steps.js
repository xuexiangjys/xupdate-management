const steps = [{
    element: '#hamburger-container',
    popover: {
      title: '侧滑栏',
      description: '打开或者关闭侧滑菜单',
      position: 'bottom'
    }
  },
  {
    element: '#breadcrumb-container',
    popover: {
      title: '导航栏',
      description: '页面导航栏，指示当前页面所处的位置',
      position: 'bottom'
    }
  },
  {
    element: '#screenfull',
    popover: {
      title: '全屏切换',
      description: '可切换页面全屏模式',
      position: 'left'
    }
  },
  {
    element: '#tags-view-container',
    popover: {
      title: '选项卡',
      description: '历史访问的页面, 点击自由切换',
      position: 'bottom'
    },
    padding: 0
  }
]

export default steps
