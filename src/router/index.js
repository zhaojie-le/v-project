import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/RequestList'
import ObjectList from '@/components/ObjectList'
import RequestDetail from '@/components/RequestDetail'
import ObjectDetail from '@/components/ObjectDetail'
import New from '@/components/NewRequest'
import NewObject from '@/components/NewObject'
import NewCluster from '@/components/NewCluster'
import ClusterList from '@/components/ClusterList'
import RequestAll from '@/components/RequestAll'
import EntityAll from '@/components/EntityAll'
import Test from '@/components/Test'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/object',
      name: 'object',
      component: ObjectList
    },
    {
      path: '/detail',
      name: 'detail',
      component: RequestDetail
    },
    {
      path: '/objdel',
      name: 'objdel',
      component: ObjectDetail
    },
    {
      path: '/new',
      name: 'new',
      component: New
    },
    {
      path: '/newobject',
      name: 'newobject',
      component: NewObject
    },
    {
      path: '/cluster',
      name: 'cluster',
      component: NewCluster
    },
    {
      path: '/clulist',
      name: 'clulist',
      component: ClusterList
    },
    {
      path: '/reqall',
      name: 'reqall',
      component: RequestAll
    },
    {
      path: '/entall',
      name: 'entall',
      component: EntityAll
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '*',
      redirect: '/test'
    }
    // {
    //   path: '*',
    //   redirect: '/clulist'
    // }
  ]
})
export default router
