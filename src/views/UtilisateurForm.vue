<template>
    <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="title">
          {{title}}
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
                        name="login"
                        label="Login"
                        hint="Login is required"
                        v-model="getSelectedUser.login"
                        class="input-group--focused"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex v-if="edit" md12 sm12 class="mx-1 px-0">
                        <v-row align="center">
                        <v-checkbox
                         v-model="enabled"
                        hide-details
                         class="mr-0 mt-0"
                         ></v-checkbox>
                      <v-text-field v-model="getSelectedUser.password" :disabled="!enabled" :append-icon="show1?'mdi-eye':'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                        </v-row>
                    </v-flex>
                    
                    <v-flex v-if="!edit" md12 sm12 class="mx-1 px-0">
                        
                      <v-text-field v-model="getSelectedUser.password" :disabled="!enabled" :append-icon="show1?'mdi-eye':'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                     
                    </v-flex>

                    <v-flex md12 sm12 class="mx-1 px-0">
                      <v-select required  label="Role" v-model="role" @change="isAdmin"
                 :items="items"
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
           edit:false,
           title:'',
           bool:false,color:'',notice:'',
           items:["ADMIN","USER"],
           show1: false,
           enabled: false,
           role:'',
           rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 4) || "Min 4 characters"
    },loginPassword:'',
           }
   },
   computed: mapGetters(['getSelectedUser','getUser','getToken']),
   methods:{
       ...mapActions(['addUser','getUserById',"setAdmin",'resetUser','whoAMI','setUserInfo','fetchAllTypeChambres']),
       cancel(){
           this.$router.push("/utilisateurs");
           this.resetUser();
           this.edit=false;
       },
       isAdmin(){
           if(this.role==="ADMIN"){
               this.setAdmin(true)
           }else{
               this.setAdmin(false)
           }
       },
       save(){
            let ar={idhotel:this.getUser.hotelCode,username:this.getUser.sub};
            this.setUserInfo(ar);
            console.log(this.getSelectedUser)
            let ar2={user:this.getSelectedUser,token:this.getToken,pwchanged:this.enabled}
           this.addUser(ar2);
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
        console.log(this.getSelectedUser)
    if (this.$route.params.id) {
        this.edit=true;
      this.title = "Modifier utilisateur";
      // this.customerAvatar();
    } else {this.title = " Nouveau Utilisateur";
            this.edit=false;
    }
      }
  },
  created(){
    this.whoAMI();
    if(this.getUser!=null){
      console.log(this.getSelectedUser)
      console.log(this.$route.params.id)
      let ar={id:this.$route.params.id,idhotel:this.getUser.hotelCode,token:this.getToken}
       if (this.$route.params.id) {
      this.getUserById(ar);
       }
     // console.log(this.oneChambre);
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