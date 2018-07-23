import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import {
  Col,
  Row,
  Card,
  Form,
  Main,
  Menu,
  Icon,
  Radio,
  Aside,
  Table,
  Input,
  Header,
  Footer,
  Button,
  Select,
  Option,
  Dialog,
  Switch,
  Submenu,
  Tooltip,
  Checkbox,
  FormItem,
  MenuItem,
  Container,
  Pagination,
  Breadcrumb,
  TableColumn,
  MenuItemGroup,
  BreadcrumbItem
} from 'element-ui'
Vue.use(Col)
Vue.use(Row)
Vue.use(Card)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Input)
Vue.use(Table)
Vue.use(Radio)
Vue.use(Aside)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Submenu)
Vue.use(Tooltip)
Vue.use(Checkbox)
Vue.use(FormItem)
Vue.use(MenuItem)
Vue.use(Container)
Vue.use(Breadcrumb)
Vue.use(Pagination)
Vue.use(TableColumn)
Vue.use(MenuItemGroup)
Vue.use(BreadcrumbItem)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
