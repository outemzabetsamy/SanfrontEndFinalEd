<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="title">
         {{title}}
          <v-spacer></v-spacer>
          <v-btn   elevation="4" fab small dark class="grey mr-2" @click.native="cancel()">
            <v-icon dark="">mdi-close-circle-outline</v-icon>
          </v-btn>
          <v-btn   elevation="4"  fab small dark class="purple mr-2" @click.native="save()">
            <v-icon>mdi-content-save-all</v-icon>
          </v-btn>
          
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex md4 xs12>
                <v-text-field
                  name="nomClient"
                  label="Nom du client"
                  hint="name is required"
                  v-model="oneReservation.client.nomClient"
                  
                  class="input-group--focused"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                  name="prenomClient"
                  v-model="oneReservation.client.prenomClient"
                  label="Prenom"
                  hint="firstname is required"
                  
                  
                  class="input-group--focused"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                lazy
                  name="numTelClient"
                  label="Mobile Client"
                  hint="number is required"
                  v-model="oneReservation.client.numTelClient"
                  class="input-group--focused"
                  required
                ></v-text-field>
              </v-flex>

              
              <v-flex md4 xs12>
                <v-menu
                  lazy
                  :close-on-content-click="true"
                  
                  transition="v-scale-transition"
                  offset-y
                  full-width
                  :nudge-left="40"
                  max-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field lazy v-on="on" label="Check in date" v-model="oneReservation.dateDebut"  prepend-icon="mdi-calendar" ></v-text-field>
                  </template>
                  <v-date-picker  no-title scrollable v-model="oneReservation.dateDebut"> </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md4 xs12>
                <v-menu
                  lazy
                  :close-on-content-click="true"
                  
                  transition="v-scale-transition"
                  offset-y
                  full-width
                  :nudge-left="40"
                  max-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      lazy
                      v-on="on"
                      label="Check out Date"
                      :value="oneReservation.datefin"
                      prepend-icon="mdi-calendar"
                      
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="oneReservation.datefin"> </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md4 xs12>
                <v-select required  label="Type chambre" v-model="oneReservation.chambre.typeChambre.nomType"
                 :items="allnomTypeChambres" @change="getChambreWithType"
                 ></v-select>
              </v-flex>
              <v-flex md4 xs12>
                <v-select required  label="Chambre" v-model="oneReservation.chambre.numChambre" :items="getNumChambres" :value="oneReservation.chambre.numChambre" ></v-select>
              </v-flex>
              <v-flex md4 xs12>
                <v-select required  label="Type reservation" v-model="oneReservation.typeReservation" :items="typeResItems" ></v-select>
              </v-flex>
              <v-flex md4 xs12>
                <v-select required  label="Etat reservation" v-model="oneReservation.etatReservation" :items="etatResItems" ></v-select>
              </v-flex>
              <v-flex md4 xs12>
                <v-select required  label="Type client" v-model="oneReservation.client.typeClient" :items="typeClientItems" ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card class="grey lighten-4 elevation-0">
          <v-card-title class="title"> Informations supplémentaires du client</v-card-title>
          <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
                 <v-flex md4 xs12>
                <v-select
                         v-model="oneReservation.client.civiliteClient"
                         label="Civilité"
                         :items="itemsCivilite"
                        ></v-select>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                lazy
                v-model="oneReservation.client.adresseClient"
                  name="adresseClient"
                  label="Adresse"
                  class="input-group--focused"
                  
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                lazy
                  name="numIDNational"
                  label="ID National"
                  v-model="oneReservation.client.numIDNational"
                  class="input-group--focused"
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                lazy
                  name="emailClient"
                  label="Email"
                  class="input-group--focused"
                  
                ></v-text-field>
              </v-flex>
              
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-dialog
      v-model="getDialogLoader"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Veuillez attendre SVP
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    
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
         dialog:false,
         itemsCivilite:['Monsieur','Madame'],
         typeResItems:['All inclusive','Demi-pension','Pension complète'],
         typeClientItems:['Clientele d affaires','Clientele loisir','Baby boomers','VIP','Generation Z','Millienals'],
         etatResItems:['Option','Validé','Confirmé','Annulé'] ,
         title:'',
           bool:false,color:'',notice:'', 
        }
    },
    computed:{ ...mapGetters(['oneReservation','allChambres','allTypeChambres','allnomTypeChambres','getNumChambres','getDialogLoader','getReservationToPost','getLastNumChambre','getUser','getToken']),
    getDateFin:{

    }
    },
    created(){
     //let a= new Date().toISOString().substr(0, 10);
     //console.log(a);
     this.whoAMI();
     if(this.getUser!=null){
     console.log("created")
      if(this.$route.params.id){
        let ar={id:this.$route.params.id,idhotel:this.getUser.hotelCode,token:this.getToken}
      console.log(this.getReservationById(ar))
      this.getReservationById(ar);
      setTimeout(()=>{
        console.log("this.oneReservation.chambre.typeChambre.nomType");
      console.log(this.oneReservation.chambre.typeChambre.nomType);
      let ar={type:this.oneReservation.chambre.typeChambre.nomType,idhotel:this.getUser.hotelCode,token:this.getToken}
      this.getChambreByType(ar);
      },5000)
      console.log("this.oneReservation.chambre.typeChambre.nomType");
      //console.log(this.oneReservation.chambre.typeChambre.nomType);
      //this.getChambreByType(this.oneReservation.chambre.typeChambre.nomType);
      
      }
      let ar={idhotel:this.getUser.hotelCode,token:this.getToken}
      this.fetchAllTypeChambres(ar);
      console.log("this.allTypeChambres");
      console.log("");
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
    },
    mounted(){
    if(this.getUser!=null){
        console.log("mounted")
        
    if (this.$route.params.id) {
      this.title = "Modifier Reservation";
      // this.customerAvatar();
    } else this.title = "Nouvelle Reservation";
      }
    },
    methods:{
      ...mapActions(['addReservation','getReservationById','setDateDebut','setDatefin','resetReservation',
      'fetchAllTypeChambres','getChambreByType','buildReservationToPost','roomChanged','editReservation','whoAMI','setReservationUserInfo']),
        cancel(){
            this.$router.push({name:'Reservations'});
             this.resetReservation();
        },
        getChambreWithType(item){
          let ar={type:item,idhotel:this.getUser.hotelCode,token:this.getToken}
           this.getChambreByType(ar);
    },
     save(){
        if(this.$route.params.id){
          console.log("edite reservation");
          if(this.oneReservation.chambre.numChambre!==this.getLastNumChambre){
            this.roomChanged(true);
            
          }
            let ar1={idhotel:this.getUser.hotelCode,username:this.getUser.sub}
            this.setReservationUserInfo(ar1);
            this.buildReservationToPost(this.oneReservation);
           console.log(this.getReservationToPost);
           let ar2={reservationToPost:this.getReservationToPost,token:this.getToken}
           this.editReservation(ar2);
        }else{
            console.log("this.oneReservation");
           console.log(this.oneReservation);
           console.log("this.getReservationToPost");
           let ar3={idhotel:this.getUser.hotelCode,username:this.getUser.sub}
            this.setReservationUserInfo(ar3);
           this.buildReservationToPost(this.oneReservation);
           console.log(this.getReservationToPost);
          
            let ar4={reservationToPost:this.getReservationToPost,token:this.getToken}
           this.addReservation(ar4);}

       },
    parseDate(d){
      if(!d){
        return null;
      }else{
        const[yyyy,mm,dd]=d.split('-');
        return `${dd}-${mm}-${yyyy}`;
      }
    },
    setSnackbar(obj){
            this.bool=obj.bool;
            this.notice=obj.notice;
            this.color=obj.color;
        },
        closeSnackbar(){
            this.bool= !this.bool;
        },     
    }
}
</script>