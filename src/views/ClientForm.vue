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
              <v-flex md9 sm12>
                <v-container fluid grid-list-sm>
                  <v-layout row wrap>
                    <v-flex md4 sm12 xs12 class="mx-1 px-0">
                      <v-text-field
                        name="prenomClient"
                        label="Prenom du client"
                        hint="Firstname name is required"
                        v-model="oneClient.prenomClient"
                        
                        class="input-group--focused"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12 class="mx-1 px-0">
                      <v-text-field
                        name="nomClient"
                        label="Nom du client"
                        maxlength="15"
                        hint="Last name is required"
                        v-model="oneClient.nomClient"
                        
                        class="input-group--focused"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12 xs12 class="mx-1 px-0">
                      <v-text-field
                        name="emailClient"
                        type="email"
                        label="Email"
                        
                       
                        class="input-group--focused"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12 xs12 class="mx-1 px-0">
                      <v-text-field
                        name="numTelClient"
                        type="text"
                        label="Numero du mobile"
                        v-model="oneClient.numTelClient"
                        class="input-group--focused"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12 class="mx-1 px-0">
                      <v-text-field
                        name="typeClient"
                        type="text"
                        label="Type du client Phone"
                        v-model="oneClient.typeClient"
                        class="input-group--focused"
                        
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4 sm12 xs12 class="mx-1 px-0">
                     <v-select
                         :items="items"
                         label="Civilité"
                         v-model="oneClient.civiliteClient"
                        ></v-select>
                    </v-flex>
                    <v-flex md4 sm12 class="mx-1 px-0">
                      <v-text-field
                        name="ageClient"
                        label="Age client"
                        maxlength="10"
                        hint="Age is required"
                        v-model="oneClient.ageClient"
                        
                        class="input-group--focused"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12 class="mx-1 px-0">
                      <v-text-field
                        name="numIDNational"
                        label="Numero ID National"
                        maxlength="20"
                        hint="ID National is required"
                        v-model="oneClient.numIDNational"
                        
                        class="input-group--focused"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex md4 sm12 class="mx-1 px-0">
                      <v-text-field
                        name="adresseClient"
                        label="Adresse "
                        maxlength="30"
                        hint="Adresse is required"
                        v-model="oneClient.adresseClient"
                        
                        class="input-group--focused"
                        required
                      ></v-text-field>
                    </v-flex>
                    
                    
                  </v-layout>
                </v-container>
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
           items:['Monsieur','Madame'],
           title:'',
           bool:false,color:'',notice:'',
           }
   },
   computed: mapGetters(['oneClient','getUser','getToken']),
   methods:{
       ...mapActions(['addClient','getClientById','resetClient','whoAMI','setClientUserInfo']),
       cancel(){
           this.$router.push({name:'Clients'});
           this.resetClient();
       },
       save(){
            let ar={idhotel:this.getUser.hotelCode,username:this.getUser.sub};
            this.setClientUserInfo(ar);
            let ar2={client:this.oneClient,token:this.getToken}
           this.addClient(ar2);
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
        console.log(this.oneClient)
    if (this.$route.params.id) {
      this.title = "Modifier Client";
      // this.customerAvatar();
    } else this.title = " Nouveau Client";
      }
  },
  created(){
    this.whoAMI();
    if(this.getUser!=null){
      console.log(this.oneClient)
      console.log(this.$route.params.id)
      let ar={id:this.$route.params.id,idhotel:this.getUser.hotelCode,token:this.getToken}
      this.getClientById(ar);
      console.log(this.oneClient);
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