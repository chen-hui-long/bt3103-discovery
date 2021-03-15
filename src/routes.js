import Home from "./components/PageContent.vue"
import Order from "./components/Orders.vue"
import Modify from "./components/Modify.vue"
import Dashboard from "./components/DashBoard.vue"

export default [
    { path: '/', component: Home },
    { path: '/orders', component: Order },
    { path: '/modify', component: Modify}, 
    { path: '/dashboard', component: Dashboard}
  ]