import HomeView from '../views/HomeView.vue'
import CharacterDetail from '../views/CharacterDetail.vue'

export const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/character/:id', name: 'Detail', component: CharacterDetail, props: true },
]
