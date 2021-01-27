/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'Complex Table' }
    },
    {
      path: 'frozen-loan',
      component: () => import('@/views/table/frozen-loan'),
      name: 'Frozen Loan',
      meta: { title: 'Frozen Loan' }
    },
    {
      path: 'return-loan',
      component: () => import('@/views/table/return-loan'),
      name: 'Return Loan',
      meta: { title: 'Return Loan' }
    }
  ]
};
export default tableRouter
