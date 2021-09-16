<template>
 <div>
   <!-- class="deep-purple accent-4 pl-0"-->
    <v-navigation-drawer
      :v-model="drawer"
      class="blue lighten-5"
      light
      permanent
      :mini-variant.sync="mini"
      app
    >
      <perfect-scrollbar>
      <v-list nav dense class="scroll-me">
           <v-list-item class="px-2" v-if="isItLoaded">
        <v-list-item-avatar class="ml-0 mt-0 pl-0 pt-0">
         <!-- <v-img :src="require('../assets/Hotel.jpg')"></v-img>-->
         <v-img :src="getCurrentLogo"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{getCurrentHotel.nomHotel}}</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
          
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
     
        <v-list-group
        
        prepend-icon="mdi-cog"
      >
        <template v-slot:activator>
          <v-list-item-title>Parametrage</v-list-item-title>
        </template>
        
        <v-list-item
            v-for="(item,i) in parametres"
            :key="i"
            link
            :to="item.path"
          >
            <v-list-item-title v-text="item.title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
      </perfect-scrollbar>
      <template v-slot:append>
        <div class="pa-2">
          <v-list-item link
          
          @click="seDeconnecter"
          >

            <v-list-item-icon>

              <v-icon light>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline ">Logout</v-list-item-title>
          </v-list-item>
        </div>
      </template>
    </v-navigation-drawer>
     
  </div>
</template>
<script>
import {bus} from '../main';
import {mapGetters,mapActions} from 'vuex';
  export default {
      name:'NavSideBar',
      components: { },
      computed:{
        ...mapGetters(['getCurrentHotel','getCurrentLogo','isItLoaded']),

      },
    data () {
      return {
        
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard',path:'/dashboard' },
          { title: 'Clients', icon: 'mdi-account-box',path:'/clients' },
          { title: 'Reservation', icon: 'mdi-calendar-blank-outline',path:'/reservations' },
          { title: 'Chambres', icon: 'mdi-bed',path:'/chambres' },
          { title: 'Utilisateurs', icon: 'mdi-account-group',path:'/utilisateurs' },
          { title: 'FrontDesk', icon: 'mdi-chart-gantt',path:'/frontdesk' },
          { title: 'Ressources', icon: 'mdi-room-service',path:'/ressources' },
          { title: 'Housekeeping', icon: 'mdi-spray-bottle',path:'/tachemenageres' },
          { title: 'Facture', icon: 'mdi-file-document',path:'/factures' },
          { title: 'Channel manager', icon: 'fas fa-sitemap',path:'/channelmanager' },
          { title: 'Tresorerie', icon: 'mdi-cash-multiple',path:'/tresorerie' },
         // { title: 'Parametrage', icon: 'mdi-cog',path:'/parametrage' },
        ],
        parametres: [
            { title: 'Type chambres', icon: 'mdi-bed-empty',path:'/typechambres' },
            { title: 'Emails', icon: 'mdi-email-plus',path:'/emails' },
            { title: 'Hotel', icon: 'mdi-office-building',path:'/hotel' },
        ],
        mini:true,
        drawer:true,
        logo:'',
        hotelName:''
      }
    },
    created(){
      bus.$on('hideDrawerevent',()=>{this.hideit})
      bus.$on('setLogoProfil',(info)=>{this.logo=info.logo;
      this.hotelName=info.hotelName;
      })
    },
    methods:{
      ...mapActions(['logout']),
      hideit(){
        console.log("hideDrawer NavSideBar.vue")
        this.drawer=!this.drawer
      },
      scrollHanle(evt) {
      console.log(evt)
    },seDeconnecter(){
      this.logout();
    },
    }
  }
</script>
<style >
.ps {
  height: 100%;
  width: 100%;
}
/*
.v-navigation-drawer__content::-webkit-scrollbar{
  width: 10px;
}
.v-navigation-drawer__content::-webkit-scrollbar-track{
  border-radius: 5px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.25);
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb{
  border-radius: 5px;
  background-color: #B0BEC5;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb:hover{
  border-radius: 5px;
  background-color: #607D8B;
}
.v-navigation-drawer__content{
  overflow-y: scroll;
  scrollbar-color:#B0BEC5  rgba(0, 0, 0, 0.25);
  scrollbar-width: 5px;
 
  
}
*/
</style>