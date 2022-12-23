import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: '节点状态',
    icon: 'chart'
  },
  children: [{
    path: 'keyboard',
    component: () =>
      import('@/views/charts/keyboard'),
    name: 'KeyboardChart',
    meta: {
      title: '节点管理',
      noCache: true
    }
  },
  {
    path: 'line',
    component: () =>
      import('@/views/charts/line'),
    name: 'LineChart',
    meta: {
      title: '节点监控',
      noCache: true
    }
  }
  ]
}

export default chartsRouter
