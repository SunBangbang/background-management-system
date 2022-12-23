import Layout from '@/layout'

const nestedRouter = {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
        title: '管理工具',
        icon: 'nested'
    },
    children: [
        {
            path: 'contractManagement',
            name: 'ContractManagement',
            component: () =>
                import ('@/views/nested/menu2/ContractManagement'),
            meta: {
                title: '合约管理'
            }
        },
        {
            path: 'userCertificate',
            name: 'UserCertificate',
            component: () =>
                import ('@/views/nested/menu2/UserCertificate'),
            meta: {
                title: '城市存证'
            }
        }, 
        {
            path: 'accountManagement',
            name: 'AccountManagement',
            component: () =>
                import ('@/views/nested/menu2/index'),
            meta: {
                title: '账号管理'
            }
        }
    ]
}

export default nestedRouter