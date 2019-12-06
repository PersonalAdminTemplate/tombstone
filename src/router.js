import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './404.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import cookie from 'js-cookie'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  // mode: "history",
  // base: "/advert/",
  /*   
    path: 路由
    meta: { authority: ["user", "admin"] }, 路由权限判断
    hideInMenu：是否在左侧菜单隐藏
    component：页面组件
    children：[
      {
        path：路由
        redirect：重定向
      }
    ] 
  */
  routes: [
    {
      path: '/user',
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/UserLayout'),
      children: [
        {
          path: '/user',
          redirect: '/user/login'
        },
        {
          path: '/user/login',
          name: 'login',
          component: () =>
            import(/* webpackChunkName: "user" */ './views/User/Login')
        }
      ]
    },
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/BasicLayout'),
      children: [
        // 信息管理
        {
          path: '/',
          redirect: '/info/info'
        },
        {
          path: '/info',
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/info/info',
              name: 'info',
              meta: { icon: 'database', title: '信息管理' },
              component: () =>
                import(/* webpackChunkName: "info" */ './views/Info/Info')
            }
          ]
        }
      ]
    },
    {
      path: '/addInfo',
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/BasicLayout'),
      children: [
        // 添加信息
        {
          path: '/addInfo',
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/info/addInfo',
              name: 'AddInfo',
              meta: { icon: 'database', title: '添加信息' },
              component: () =>
                import(/* webpackChunkName: "info" */ './views/Info/AddInfo')
            }
          ]
        }
      ]
    },
    {
      path: '/editPassword',
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/BasicLayout'),
      children: [
        // 添加信息
        {
          path: '/editPassword',
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/user/editPassword',
              name: 'EditPassword',
              meta: { icon: 'database', title: '修改密码' },
              component: () =>
                import(
                  /* webpackChunkName: "info" */ './views/User/EditPassword'
                )
            }
          ]
        }
      ]
    },
    {
      path: '*',
      name: '404',
      hideInMenu: true,
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  // 如果有roleId并且去登录页面
  if (cookie.get('roleId') && to.path === '/user/login') {
    next('/')
  } else {
    if (!cookie.get('roleId') && to.path !== '/user/login') {
      next('/user/login')
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
