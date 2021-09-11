<template>
    <v-container fluid>
        <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="title">
            Reservations ({{allReservations.length}})
          </span>
          <v-spacer></v-spacer>
          <table-header-buttons
            :add="add"
            :reloadData="reloadData"
            :updateSearchPanel="updateSearchPanel"
          ></table-header-buttons>
        </v-card-title>
	<tabledata :headers="headers" :items="allReservations"   @edit="edit"
          @remove="remove"></tabledata>
      </v-card>
    </v-flex>
    <confirm-dialog
      :dialog="dialog"
      :dialogTitle="dialogTitle"
      :dialogText="dialogText"
      @onConfirm="onConfirm"
      @onCancel="onCancel"
    />
    <v-snackbar
      
      :right="true"
      :color="color"
      v-model="bool"
      
    >
      {{ notice }}
      <v-btn dark text @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
    </v-container>
</template>
<script>
import TableDataExpandable from '../components/TableDataExpandable.vue'
import TableHeaderButtons from '../components/TableHeaderButtons.vue'
import {mapGetters,mapActions} from 'vuex';
import {bus} from '../main'
import ConfirmDialogVue from '../components/ConfirmDialog.vue';

export default {
    name:'TableData',
    components:{
    'tabledata':TableDataExpandable,
    'table-header-buttons':TableHeaderButtons,
    'confirm-dialog':ConfirmDialogVue,
    },
    computed:mapGetters(['allReservations','getUser','getToken']),
    created(){
         this.whoAMI();
    if(this.getUser!=null){
         let ar={idhotel:this.getUser.hotelCode,token:this.getToken}
        this.fetchAllReservations(ar);
        bus.$on('successDelete',e=>{
            console.log("ikechmed ar emit ayini n delete")
            this.color=e.color;
            this.bool=e.bool;
            this.notice=e.notice;
        });

        bus.$on('errorDelete',e=>{
            console.log("ikechmed ar emit ayini n delete")
            this.setSnackbar(e);
        });


        

    }   
    },
    methods:{
        ...mapActions(['fetchAllReservations','deleteReservation','lastNumChambre','whoAMI']),
        add(){
            console.log("ikechmed")
            this.$router.push({name:'ReservationForm'});
        },
        edit(item){
            console.log(item);
            this.lastNumChambre(item.chambre.numChambre)
            this.$router.push(`/reservations/${item.idReservation}`)
        },
        remove(item){

            this.itemId=item.idReservation;
            this.dialog=true;
            
        },
        reloadData(){
            console.log("reloadData")
            this.fetchAllReservations();
        },closeSnackbar(){
            this.bool= !this.bool;
        },
        onConfirm(){
            let ar={id:this.itemId,idhotel:this.getUser.hotelCode,token:this.getToken}
            this.deleteReservation(ar);
            this.dialog=false;
        },
        onCancel(){
            this.dialog=false;
            this.itemId='';
        },
        setSnackbar(obj){
            this.bool=obj.bool;
            this.notice=obj.notice;
            this.color=obj.color;
        }        
    },
    
    data() {
        return {
            headers:[
                {text:"IdReservation",value:"idReservation",sortable:true},
                {text:"typeReservation",value:"typeReservation",sortable:true},
                {text:"dateDebut",value:"dateDebut",sortable:true},
                {text:"dateFin",value:"datefin",sortable:false},
                {text:"Montant",value:"montantSejour",sortable:false},
                {text:"etatRes",value:"etatReservation",sortable:false},
                {text:"numChambre",value:"chambre.numChambre",sortable:false},
                {text:"ID Client",value:"client.id",sortable:false},
                {text:"",value:"actions",sortable:false},


            ],bool:false,color:'',notice:'',itemId:'',dialog:false,
            dialogTitle:'Reservation delete dialog',
            dialogText:'Do you want to delete this reservation ?',
            
            items:[
                {typeReservation:"simple",dateDebut:"05-06-2021",datefin:"13-02-2021",etatReservation:"option",
                client:{nomClient:"outemzabet",
                prenomClient:"samy",typeClient:"vip",civiliteClient:"monsieur",ageClient:22,numIDNational:"213556699",adresseClient:"Bejaia",numTelClient:"0782951562"},numChambre:"202"}],
            
           
            
        }
    },
}
</script>