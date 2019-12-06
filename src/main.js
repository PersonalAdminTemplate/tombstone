import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { post } from './utils/request'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import {
  Button,
  Layout,
  Icon,
  Menu,
  Form,
  Input,
  Message,
  Card,
  Table,
  Modal,
  Select,
  Dropdown,
  Avatar,
  Badge,
  DatePicker,
  Notification,
  Row,
  Col,
  InputNumber,
  Tabs,
  Cascader,
  Upload
} from 'ant-design-vue'

Vue.config.productionTip = false
Vue.prototype.$post = post
Vue.prototype.$message = Message
Vue.prototype.$notification = Notification

Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Form)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Message)
Vue.use(Card)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Dropdown)
Vue.use(Select)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(Notification)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
Vue.use(InputNumber)
Vue.use(Tabs)
Vue.use(Cascader)
Vue.use(Upload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
