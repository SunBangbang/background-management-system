/** When your routing table is too long, you can split it into small modules **/

// 管理工具列表
import Layout from '@/layout'
// 链管理 
const ChainManagementRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: '链管理',
    icon: 'component'
  },
  children: [{
    path: 'tinymce',
    component: () =>
      import('@/views/components-demo/tinymce'),
    name: 'TinymceDemo',
    meta: {
      title: '节点管理'
    }
  }, ]
}

// 合约管理
const ContractManagementRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: '合约管理',
    icon: 'component'
  },
  children: [{
    path: 'tinymce',
    component: () =>
      import('@/views/components-demo/tinymce'),
    name: 'TinymceDemo',
    meta: {
      title: '合约列表'
    }
  }, ]
}


// 存证管理
const CertificateStorageManagementRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: '存证管理',
    icon: 'component'
  },
  children: [{
      path: 'tinymce',
      component: () =>
        import('@/views/components-demo/tinymce'),
      name: 'TinymceDemo',
      meta: {
        title: '异常合约'
      }
    },
    {
      path: 'markdown',
      component: () =>
        import('@/views/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: {
        title: '异常用户'
      }
    },
  ]
}
export default ChainManagementRouter;
ContractManagementRouter;
PrivateKeyManagementRouter;
CertificateStorageManagementRouter;
