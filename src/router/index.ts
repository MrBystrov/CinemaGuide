import { createRouter, createWebHashHistory} from 'vue-router'


const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name: 'main',
      component:() => import('../views/MainView.vue')
    },
    {
      path: '/genres/',
      name: 'genres',
      component: () => import('../views/GenresView.vue'),
      children: [
        {
          name: 'genre',
          path: ':genre',
          component: ()  => import('../views/GenreView.vue')
        }
      ]
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component:() => import('../views/MovieView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component:() => import('../views/AccountView.vue'),
      children: [
        {
          name: 'favorite',
          path: 'favorite',
          component: ()  => import('../components/AccountFavorite.vue')
        },
        {
          name: 'settings',
          path: 'settings',
          component: ()  => import('../components/AccountSettings.vue')
        },
      ]


    },
  ]
})
export default router
