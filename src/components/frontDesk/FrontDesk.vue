<template>
  <v-container fluid>
   <!--<header-top></header-top>
    <contenu></contenu>-->
    <v-row class="ma-0 pa-0" width="1300">
     <v-row>
       <v-col cols="1"></v-col>
       <v-col cols="8" class="pa-0">
       <div>
            <!--<v-btn v-on:click="prev" height="24"  dark><v-icon>mdi-chevron-left</v-icon></v-btn>-->
           <!--<v-btn v-on:click="next" height="24"  dark><v-icon>mdi-chevron-right</v-icon></v-btn>-->
         </div>
         </v-col>
         <v-col cols="2"></v-col>
     </v-row>
   
     <v-row>
       <v-col cols="2"></v-col>
       <v-col cols="8" class="pa-0">
  <parentgrid></parentgrid>
    <modal v-bind:revele="revele"  v-bind:toggleModale="toggleModale" :chambre="chambre" :arrive="arrive" :depart="depart"></modal>
  </v-col>
  <v-col cols="3"></v-col>
  </v-row>
     
  </v-row>
  </v-container>
</template>

<script>
//import ResizeVue from './components/Resize.vue';
import {bus} from '../../main';
import Modal from './Modal.vue'
//import Contenu from './components/Contenu.vue'
import ParentGrid from './ParentGrid.vue'
// import Header from './components/Header.vue'
export default {
  name: 'FrontDesk',
  data() {
    return {
     revele:false,
     
     chambre:"chambre 101",
     arrive:"01/01/2021",
     depart:"30/01/2021"
    }
  },
  components: {
    //'contenu':Contenu,
    //'header-top':Header
    'parentgrid':ParentGrid,
    'modal':Modal
   //'resize':ResizeVue
    
  },updated(){
   
  },created(){
    bus.$on("reservationModified",d=>{this.setReservation(d)});
  },
   methods:{
    next:function(){
    bus.$emit('nextFired');
  },
  prev:function(){
    bus.$emit('prevFired')
  },
  toggleModale:function(){
    this.revele=!this.revele;
  },
  setReservation:function(data){
    this.revele=true;
    this.arrive=data.start.getDate()+"/"+data.start.getMonth()+"/"+data.start.getFullYear();
    this.depart=data.end.getDate()+"/"+data.end.getMonth()+"/"+data.end.getFullYear();
  }
  },
  
}
</script>

<style>

</style>
