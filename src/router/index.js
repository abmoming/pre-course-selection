import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/operator/courses',
        name: 'Courses',
        component: () => import('../views/operate/Courses')
      },
      {
        path: '/operator/teachers',
        name: 'Teachers',
        component: () => import('../views/operate/Teachers')
      },
      {
        path: '/operator/students',
        name: 'Students',
        component: () => import('../views/operate/Students')
      },
      {
        path: '/teacher/courses',
        name: 'TCourses',
        component: () => import('../views/teacher/Courses')
      },
      {
        path: '/teacher/students',
        name: 'TStudents',
        component: () => import('../views/teacher/Students')
      },
      {
        path: '/student/courses',
        name: 'SCourses',
        component: () => import('../views/student/Courses')
      },
      {
        path: '/student/myCourses',
        name: 'MyCourses',
        component: () => import('../views/student/MyCourses')
      },
    ]
  },


  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
  }*/
]

const router = new VueRouter({
  routes
})

export default router
