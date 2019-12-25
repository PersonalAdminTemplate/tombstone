import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { post } from './utils/request'
import moment from 'moment'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import BaiduMap from 'vue-baidu-map'
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
  Upload,
  Switch
} from 'ant-design-vue'

Vue.config.productionTip = false
Vue.prototype.$post = post
Vue.prototype.$message = Message
Vue.prototype.$notification = Notification

Vue.use(VueQuillEditor)
  .use(BaiduMap, { ak: 'LGDmcEvlEAVLFuEYyGsXQDj7dFlu2Hxm' })
  .use(Button)
  .use(Layout)
  .use(Icon)
  .use(Form)
  .use(Input)
  .use(Menu)
  .use(Message)
  .use(Card)
  .use(Modal)
  .use(Table)
  .use(Dropdown)
  .use(Select)
  .use(Avatar)
  .use(Badge)
  .use(Notification)
  .use(DatePicker)
  .use(Row)
  .use(Col)
  .use(InputNumber)
  .use(Tabs)
  .use(Cascader)
  .use(Upload)
  .use(Switch)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
