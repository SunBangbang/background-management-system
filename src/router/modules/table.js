import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '统计工具',
    icon: 'table'
  },
  children: [{
    path: 'dynamic-table',
    component: () =>
      import('@/views/table/dynamic-table/index'),
    name: 'DynamicTable',
    meta: {
      title: '统计工具'
    }
  }, ]
}
export default tableRouter
