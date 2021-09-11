<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="title">
          Reservation
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
                    <v-text-field lazy v-on="on" label="Check in date" v-model="oneReservation.dateDebut" prepend-icon="mdi-calendar" ></v-text-field>
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
                      prepend-icon="mdi-calendar"
                      v-model="oneReservation.datefin"
                    ></v-text-field>
                  </template>
                  <v-date-picker no-title scrollable v-model="oneReservation.datefin"> </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field required  label="Type chambre" v-model="oneReservation.chambre.typeChambre.nomType"
                 class="input-group--focused" hint="Type is required"
                 ></v-text-field >
              </v-flex>
              <v-flex md4 xs12>
                  <v-text-field required  label="Chambre"   v-model="oneReservation.chambre.numChambre"
                 class="input-group--focused" hint="room is required"
                 ></v-text-field >
                
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
         datedeb:null,
         datefin:null,
         reservation:null,
         itemsCivilite:['Monsieur','Madame'],
         typeResItems:['All inclusive','Demi-pension','Pension complète'],
         typeClientItems:['Clientele d affaires','Clientele loisir','Baby boomers','VIP','Generation Z','Millienals'],
         etatResItems:['Option','Validé','Confirmé','Annulé'] ,
         title:'',
           bool:false,color:'',notice:'', 
        }
    },
    computed:{ ...mapGetters(['oneReservation','allChambres','allTypeChambres','allnomTypeChambres','getNumChambres','getDialogLoader','getReservationToPost','getLastNumChambre','getUser','getToken']),
    getDateDeb() {
     if(!this.oneReservation.dateDebut){
        return null;
      }else{
        const[dd,mm,yyyy]=this.oneReservation.dateDebut.split('-');
        return `${yyyy}-${mm}-${dd}`;
      }
    },
    getDateFin() {
     if(!this.oneReservation.datefin){
        return null;
      }else{
        const[dd,mm,yyyy]=this.oneReservation.datefin.split('-');
        return `${yyyy}-${mm}-${dd}`;
      }
    }
    },
    created(){
     //let a= new Date().toISOString().substr(0, 10);
     //console.log(a);
     this.whoAMI();
    if(this.getUser!=null){
     console.log("created")
     console.log("this.$route.query.numChambre")
     console.log(this.$route.query.numChambre)
      //this.fetchAllTypeChambres();
      console.log("this.allTypeChambres");
      console.log("");

    if(!this.$route.query.start){
        this.datedeb=null;
      }else{
        const[dd,mm,yyyy]=this.$route.query.start.split('-');
        this.datedeb=`${yyyy}-${mm}-${dd}`;
      }
      if(!this.$route.query.end){
        this.datefin=null;
      }else{
        const[dd,mm,yyyy]=this.$route.query.end.split('-');
        this.datefin=`${yyyy}-${mm}-${dd}`;
      }

      this.reservation={idReservation:'',typeReservation:'',dateDebut:this.datedeb,
    datefin:this.datefin,etatReservation:'',client:{nomClient:'',
    prenomClient:'',typeClient:'',civiliteClient:'',
    ageClient:'',numIDNational:'',adresseClient:'',
    numTelClient:'',idHotel:this.getUser.hotelCode,username:this.getUser.sub},chambre:{id:'',numChambre:this.$route.query.numChambre,
    numEtage:'',etatChambre:'',
    typeChambre:{id:'',nomType:this.$route.query.typeChambre,
    nbMaxPers:'',prixAdulte:'',prixEnfant:''}},idHotel:'',username:''};
    this.setOneRes(this.reservation);
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
     /* if(this.$route.params.id){
    if(this.allnomTypeChambres.length>0){
      console.log("this.oneReservation.chambre.typeChambre.nomType");
      console.log(this.oneReservation.chambre.typeChambre.nomType);
      this.getChambreByType(this.oneReservation.chambre.typeChambre.nomType);
    }else{
      console.log("mazaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal")
    }
      
      }*/
    },
    methods:{

      ...mapActions(['addReservation','getReservationById','resetReservation',
      'fetchAllTypeChambres','getChambreByType','buildReservationToPost','roomChanged','editReservation','setOneRes','addResInFrontDesk','whoAMI','setReservationUserInfo']),
        cancel(){
            this.$router.push("/frontdesk");
             this.resetReservation();
        },
        getChambreWithType(item){
          let ar={type:item,idhotel:this.getUser.hotelCode,token:this.getToken};
           this.getChambreByType(ar);
    },
     save(){
        
            console.log("this.oneReservation");
           console.log(this.oneReservation);
           console.log("this.getReservationToPost");
           let ar1={idhotel:this.getUser.hotelCode,username:this.getUser.sub}
           this.setReservationUserInfo(ar1);
        
           this.buildReservationToPost(this.oneReservation);
           console.log(this.getReservationToPost);
          //this.getReservationToPost.dateDebut= this.parseDate( this.getReservationToPost.dateDebut);
           //this.getReservationToPost.datefin= this.parseDate( this.getReservationToPost.datefin);
           
           let ar2={reservationToPost:this.getReservationToPost,token:this.getToken}
           this.addReservation(ar2).then(
             res=>{
               console.log(res);
               let ar={res:this.oneReservation,ind:this.$route.query.selectedRow}
            this.addResInFrontDesk(ar)

                          }
           )
           ;

       },
    parseDate(d){
      if(!d){
        return null;
      }else{
        const[dd,mm,yyyy]=d.split('-');
        return `${yyyy}-${mm}-${dd}`;
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