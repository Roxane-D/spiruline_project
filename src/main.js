import App from './App.vue'
import VueRouter from 'vue-router'
import SuppliersList from "./components/SuppliersList.vue";
import SuppliersMap from "./components/SuppliersMap.vue";
import Supplier from "./components/Supplier.vue";
import Vue from "vue";
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {path: '/list', component: SuppliersList},
  {path: '/map', component: SuppliersMap},
  {path: '/supplier', component: Supplier},
];

const router = new VueRouter(
    {routes}
);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// Resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
