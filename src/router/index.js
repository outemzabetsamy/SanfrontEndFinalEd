import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Chambre from '../views/Chambre.vue'
import Client from '../views/Client.vue'
import ClientForm from '../views/ClientForm.vue'
import ChambreForm from '../views/ChambreForm.vue'
import Reservation from '../views/Reservation.vue'
import ReservationForm from '../views/ReservationForm.vue'
import TypeChambreForm from '../views/TypeChambreForm.vue'
import TypeChambre from '../views/TypeChambre.vue'
import GanttFrontDesk from '../views/GanttFrontDesk.vue'
import Ressource from '../views/Ressource.vue'
import Facture from '../views/Facture.vue'
import Utilisateur from '../views/Utilisateur.vue'
import UtilisateurForm from '../views/UtilisateurForm.vue'
import ReservationFrontDeskForm from '../views/ReservationFrontDeskForm.vue'
import Login from '../views/Login.vue'
import Hotel from '../views/Hotel.vue'
import ChannelManager from '../views/ChannelManager.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Client
  },
  {
    path: '/newclient',
    name: 'ClientForm',
    component: ClientForm
  },
  {
    path: '/newtypechambre',
    name: 'TypeChambreForm',
    component: TypeChambreForm
  },
  {
    path: '/typechambres/:id',
    name: 'TypeChambreForm',
    component: TypeChambreForm
  },
  {
    path: '/typechambres',
    name: 'TypeChambres',
    component: TypeChambre
  },
  {
    path: '/newchambre',
    name: 'ChambreForm',
    component: ChambreForm
  },
  {
    path: '/chambres/:id',
    name: 'Chambre',
    component: ChambreForm
  },
  {
    path: '/newreservation',
    name: 'ReservationForm',
    component: ReservationForm
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/newreservationfrontdesk',
    name: 'ReservationFrontDeskForm',
    component: ReservationFrontDeskForm
  },
  {
    path: '/clients/:id',
    name: 'Client',
    component: ClientForm
  },
  {
    path: '/reservations/:id',
    name: 'Reservation',
    component: ReservationForm
  },
  {
    path: '/ressources',
    name: 'Ressource',
    component: Ressource
  },
  {
    path: '/utilisateurs',
    name: 'Utilisateur',
    component: Utilisateur
  },
  {
    path: '/utilisateurs/:id',
    name: 'UtilisateurForm',
    component: UtilisateurForm
  },
  {
    path: '/newUtilisateur',
    name: 'UtilisateurForm',
    component: UtilisateurForm
  },
  
  {
    path: '/frontdesk',
    name: 'GanttFrontDesk',
    component: GanttFrontDesk
  },
  {
    path: '/factures',
    name: 'Facture',
    component: Facture
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: Reservation
  },
  {
    path: '/channelmanager',
    name: 'ChannelManager',
    component: ChannelManager,
  },
  {
    path: '/hotel',
    name: 'Hotel',
    component: Hotel,
  },
  {
    path: '/chambres',
    name: 'Chambres',
    component: Chambre
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
