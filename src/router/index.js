import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () =>
      import ('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () =>
    import ('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () =>
    import ('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () =>
    import ('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () =>
    import ('@/views/error-page/401'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  // redirect: '/dashboard',
    // path: 'dashboard',
    component: () =>
      import ('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: '可视化大屏',
      icon: 'dashboard',
      // affix: true
    }
},


// {
//   path: '/',
//   component: Layout,
//   redirect: '/dashboard',
//   children: [{
//     path: 'dashboard',
//     component: () =>
//       import ('@/views/dashboard/index'),
//     name: 'Dashboard',
//     meta: {
//       title: '可视化大屏',
//       icon: 'dashboard',
//       affix: true
//     }
//   }]
// },
componentsRouter,
chartsRouter,
tableRouter,
nestedRouter
]

export const asyncRoutes = [
  // {
  //     path: '/error',
  //     component: Layout,
  //     redirect: 'noRedirect',
  //     name: 'ErrorPages',
  //     hidden: false,
  //     meta: {
  //         title: '错误页面',
  //         icon: '404'
  //     },
  //     children: [{
  //             path: '401',
  //             component: () =>
  //                 import ('@/views/error-page/401'),
  //             name: 'Page401',
  //             meta: {
  //                 title: '401',
  //                 noCache: true
  //             }
  //         },
  //         {
  //             path: '404',
  //             component: () =>
  //                 import ('@/views/error-page/404'),
  //             name: 'Page404',
  //             meta: {
  //                 title: '404',
  //                 noCache: true
  //             }
  //         }
  //     ]
  // },

  // {
  //     path: '/error-log',
  //     component: Layout,
  //     children: [{
  //         path: 'log',
  //         component: () =>
  //             import ('@/views/error-log/index'),
  //         name: 'ErrorLog',
  //         meta: {
  //             title: '错误日志',
  //             icon: 'bug'
  //         }
  //     }]
  // },
  // {
  //     path: '*',
  //     redirect: '/404',
  //     hidden: false
  // }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
