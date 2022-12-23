import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: '后台概览',
    icon: 'component'
  },
  children: [{
      path: 'tinymce',
      component: () =>
        import('@/views/components-demo/tinymce'),
      name: 'TinymceDemo',
      meta: {
        title: '概览内容'
      }
    },
    {
      path: 'markdown',
      component: () =>
        import('@/views/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: {
        title: '最近七天存证量'
      }
    },
    {
      path: 'json-editor',
      component: () =>
        import('@/views/components-demo/json-editor'),
      name: 'JsonEditorDemo',
      meta: {
        title: '节点列表'
      }
    },
    {
      path: 'split-pane',
      component: () =>
        import('@/views/components-demo/split-pane'),
      name: 'SplitpaneDemo',
      meta: {
        title: '区块信息'
      }
    },
    {
      path: 'avatar-upload',
      component: () =>
        import('@/views/components-demo/avatar-upload'),
      name: 'AvatarUploadDemo',
      meta: {
        title: '存证信息'
      }
    },
  ]
}

export default componentsRouter
