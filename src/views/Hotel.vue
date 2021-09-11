<template>
    <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="title">
         
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
                        <!-- <div class="mr-20">-->
                            <v-row>
                                <v-col cols="4"></v-col>
                                <v-col cols="4">
              <v-img :src="getCurrentLogo"
              :aspect-ratio="1"
              contain
              ></v-img>
              </v-col>
              <v-col cols="4"></v-col>
              </v-row>
               </v-flex>
                     <v-flex md12 sm12 xs12 class="mx-1 px-0">
                                        <v-file-input
                                        
                                            accept="image/png, image/jpeg, image/bmp"
                                            placeholder="Pick your logo here"
                                            prepend-icon="mdi-camera"
                                            label="Hotel logo"
                                            v-model="logo"
                                            @change="getTheLogo">
                                            </v-file-input>
                    </v-flex>
                    <v-flex md12 sm12 class="mx-1 px-0">
                       <v-text-field  label="First Name"
                       v-model="getCurrentHotel.nomGerant"
                        maxlength="20" required>
                        </v-text-field>
                    </v-flex>

                    <v-flex md12 sm12 class="mx-1 px-0">
                      <v-text-field label="Last Name"
                      v-model="getCurrentHotel.prenomGerant"
                       maxlength="20" required>
                       </v-text-field>
                    </v-flex>
                    
                    <v-flex md12 sm12 class="mx-1 px-0">
                       <v-text-field  label="Adress"
                       v-model="getCurrentHotel.adresseHotel"
                        required></v-text-field>
                    </v-flex> 
                      
                      <v-flex md12 sm12 class="mx-1 px-0">
                       <v-text-field  label="Email"
                       v-model="getCurrentHotel.email"
                        required></v-text-field>
                    </v-flex> 
                     <v-text-field label=" Stars number"
                     v-model="getCurrentHotel.nbEtoiles" 
                     required></v-text-field>
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
           rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 4) || "Min 4 characters"
    },
           title:'',
           bool:false,color:'',notice:'',
           logo:"",
           dataUploading:'',
           
           }
   },
   computed: {
     ...mapGetters(['getCurrentHotel','getUser','getToken','getCurrentLogo']),
     getLogoName(){
        return()=> this.getCurrentHotel.logo=this.logo.name;
    }
   },
   methods:{
       ...mapActions(['getHotelById','addHotelOnly','setLogoName','whoAMI','setHotelUserInfo']),
       cancel(){
           //this.$router.push({name:'TypeChambres'});
           //this.resetTypeChambre();
       },
       save(){
            //let ar={idhotel:this.getUser.hotelCode,username:this.getUser.sub};
           //console.log(JSON.parse(JSON.stringify(this.getRegistration)))
            let ar={hotel:JSON.parse(JSON.stringify(this.getCurrentHotel)),img:this.dataUploading}
            console.log(ar)
           //console.log(ar.registration)
            this.addHotelOnly(ar);
       },
       setSnackbar(obj){
            this.bool=obj.bool;
            this.notice=obj.notice;
            this.color=obj.color;
        },
        closeSnackbar(){
            this.bool= !this.bool;
        },
        getTheLogo(){
        console.log(this.logo.name)
        this.setLogoName(this.logo.name);
        this.dataUploading=new FormData();
        this.dataUploading.append('imageFile',this.logo,this.logo.name);
        console.log(this.dataUploading)
    },     
   },
    mounted() {
      if(this.getUser!=null){
        console.log("mounted")
       // console.log(this.oneTypeChambre)
    if (this.$route.params.id) {
      this.title = "Modifier Type chambre";
      // this.customerAvatar();
    } else this.title = " Nouveau Type de chambre";
      }
  },
  created(){
    this.whoAMI();
    if(this.getUser!=null){
      //console.log(this.oneTypeChambre)
      console.log(this.$route.params.id)
      let ar1={id:this.getUser.hotelCode,token:this.getToken}
      //this.fetchAllTypeChambres(ar1);
      this.getHotelById(ar1)
      //let ar={id:this.$route.params.id,idhotel:this.getUser.hotelCode,token:this.getToken}
      //this.getTypeChambreById(ar);
      //console.log(this.oneChambre);
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