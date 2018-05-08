import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/RequestList'
import ObjectList from '@/components/ObjectList'
import RequestDetail from '@/components/RequestDetail'
import ObjectDetail from '@/components/ObjectDetail'
import New from '@/components/NewRequest'
import NewObject from '@/components/NewObject'
import ServerCluster from '@/components/NewCluster'
import ClusterList from '@/components/ClusterList'

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
      component: ServerCluster
    },
    {
      path: '/clulist',
      name: 'clulist',
      component: ClusterList
    },
    {
      path: '*',
      redirect: '/list'
    }
  ]
})
export default router
