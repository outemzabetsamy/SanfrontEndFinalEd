<template>
  <v-app>
    <template v-if="!signedIn">
      <router-view></router-view>
    </template>
    <template v-else>
    <NavSideBar></NavSideBar>
    <v-app-bar app
      color=""
      dense
      light
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title class="overline">SANHOTELS</v-toolbar-title>

      <v-spacer></v-spacer>
    <!--
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on:click="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      -->
      <v-btn icon @click="seDeconnecter">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    
    <v-main>
      <router-view/>
    </v-main>
    </template>
  </v-app>
</template>

<script>
import NavSideBar from './components/NavSideBar.vue'
import {mapGetters,mapActions} from 'vuex';
import {bus} from './main';
export default {
  name: 'App',
  components:{
    NavSideBar,
  },

  data: () => ({
    //
  }),
  computed:mapGetters(['signedIn']),
  methods:{
    ...mapActions(['logout']),
    fireHideit(){
      console.log("emitHideDrawer App.vue")
      bus.$emit('hideDrawerevent');
    },
    seDeconnecter(){
      this.logout();
    },
    },
    created() {
    /*  if(this.signedIn){
        this.$router.push({name:'Dashboard'})
      }else{
        this.$router.push({name:'Login'})
      }
      */
    
  }
};
</script>
