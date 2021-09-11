<template>
    <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="title">
         <!-- {{title}}-->
          <v-spacer></v-spacer>
          <v-btn elevation="4" fab small dark class="grey mr-2" @click.native="cancel()">
            <v-icon dark="">mdi-close-circle-outline</v-icon>
          </v-btn>
          &nbsp;
          <v-btn elevation="4" fab small dark class="blue" @click.native="save()">
            <v-icon>mdi-content-save-all</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
            <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex md3 sm12>
               


              </v-flex>
              <v-flex md6 sm12>
                <v-container fluid grid-list-sm>
                  <v-layout row wrap>
                    <v-flex md12 sm12 xs12 class="mx-1 px-0">
                      <v-text-field
                        name="numChambre"
                        label="Numero chambre"
                        hint="Number is required"
                        v-model="oneChambre.numChambre"
                        class="input-group--focused"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12 sm12 class="mx-1 px-0">
                      <v-text-field
                        name="numEtage"
                        label="Numero etage"
                        maxlength="15"
                        hint="Number is required"
                        v-model="oneChambre.numEtage"
                        
                        class="input-group--focused"
                        required
                      ></v-text-field>
                    </v-flex>
                    
                    <v-flex md12 sm12 xs12 class="mx-1 px-0">
                     <v-select
                        :items="allnomTypeChambres"
                         label="Type chambre"
                         v-model="oneChambre.typeChambre.nomType"
                        ></v-select>
                    </v-flex>  
                    <v-flex md12 sm12 xs12 class="mx-1 px-0">
                     <v-select
                     :items="items"
                         label="Etat chambre"
                         v-model="oneChambre.etatChambre"
                        ></v-select>
                    </v-flex>    
                  </v-layout>
                </v-container>
              </v-flex>
              <v-flex md3 sm12>
               


              </v-flex>
            </v-layout>
            </v-container>
            
        </v-card-text>
        
      </v-card>
      
    </v-flex>
    <v-snackbar
      :right="true"
      :color="color"
      v-model="bool">
      {{ notice }}
      <v-btn dark text @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import {bus} from '../main'
export default {
   data() {
       return {
           items:['occupe','libre'],
           title:'',
           bool:false,color:'',notice:'',
           }
   },
   computed: mapGetters(['oneChambre','getUser','getToken','allnomTypeChambres','getChambreToPost']),
   methods:{
       ...mapActions(['addChambre','getChambreById','resetChambre','whoAMI','setChambreUserInfo','fetchAllTypeChambres','buildChambreToPost']),
       cancel(){
           this.$router.push({name:'Chambres'});
           this.resetChambre();
       },
       save(){
            let ar={idhotel:this.getUser.hotelCode,username:this.getUser.sub};
            this.setChambreUserInfo(ar);
            this.buildChambreToPost(this.oneChambre)
            let ar2={chambreToPost:this.getChambreToPost,token:this.getToken}
           this.addChambre(ar2);
       },
       setSnackbar(obj){
            this.bool=obj.bool;
            this.notice=obj.notice;
            this.color=obj.color;
        },
        closeSnackbar(){
            this.bool= !this.bool;
        },     
   },
    mounted() {
      if(this.getUser!=null){
        console.log("mounted")
        console.log(this.oneChambre)
    if (this.$route.params.id) {
      this.title = "Modifier Client";
      // this.customerAvatar();
    } else this.title = " Nouveau Client";
      }
  },
  created(){
    this.whoAMI();
    if(this.getUser!=null){
      console.log(this.oneChambre)
      console.log(this.$route.params.id)
      let ar1={idhotel:this.getUser.hotelCode,token:this.getToken}
      this.fetchAllTypeChambres(ar1);
      if(this.$route.params.id){
      let ar={id:this.$route.params.id,idhotel:this.getUser.hotelCode,token:this.getToken}
      this.getChambreById(ar);
      console.log(this.oneChambre);
    }
      bus.$on('successAdd',e=>{
            console.log("ikechmed ar emit ayini n add")
            this.setSnackbar(e);
        });
         bus.$on('errorAdd',e=>{
            console.log("ikechmed ar emit ayini n error add")
            this.setSnackbar(e);
        });

        bus.$on('successEdit',e=>{
            console.log("ikechmed ar emit ayini n success edit")
            this.setSnackbar(e);
        });

        bus.$on('errorEdit',e=>{
            console.log("ikechmed ar emit ayini n error edit")
            this.setSnackbar(e);
        });
    }
  }
}
</script>
<style scoped>

</style>