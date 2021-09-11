<template>
    <v-container fluid>
        <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="title">
            Factures ({{getFactures.length}})
          </span>
          <v-spacer></v-spacer>
          <table-header-buttons
            :add="add"
            :reloadData="reloadData"
            :updateSearchPanel="updateSearchPanel"
          ></table-header-buttons>
        </v-card-title>
	<tabledata :headers="headers" :items="getFactures"   @view="view"
          @remove="remove" :confirmPaid="confirmPaid" :printInvoice="printInvoice"></tabledata>
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
    <v-dialog
      v-model="foo"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
    <v-card >
        
        <!--<FactureForm :item="item"/>-->
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="foo = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
    </v-card>
    
    </v-dialog>
    
    </v-container>
</template>
<script>
import TableHeaderButtons from '../components/TableHeaderButtonsFacture.vue'
import {mapGetters,mapActions} from 'vuex';
import {bus} from '../main'
import ConfirmDialogVue from '../components/ConfirmDialog.vue';
import TableDataExpandableFactureVue from '../components/TableDataExpandableFacture.vue';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
//import FactureForm from './FactureForm.vue'
import html2canvas from 'html2canvas'
export default {
    name:'TableData',
    components:{
    'tabledata':TableDataExpandableFactureVue,
    'table-header-buttons':TableHeaderButtons,
    'confirm-dialog':ConfirmDialogVue,
    //FactureForm
    },
    computed:{
        ...mapGetters(['getFactures','getUser','getToken']),},
        isPaid(){
            if(this.getFactures.paid){
                return "Non payé" 
            }else{
                return "Payé"
            }
        },
    created(){
        this.whoAMI();
    if(this.getUser!=null){
        let ar={idhotel:this.getUser.hotelCode,token:this.getToken}
        this.fetchAllFactures(ar);
        bus.$on('successDelete',e=>{
            console.log("ikechmed ar emit ayini n delete")
            this.color=e.color;
            this.bool=e.bool;
            this.notice=e.notice;
        });
        bus.$on('setFoo',e=>{
            this.foo=e;
        })
        bus.$on('errorDelete',e=>{
            console.log("ikechmed ar emit ayini n delete")
            this.setSnackbar(e);
        });


        

    }  
    },
    methods:{
        ...mapActions(['fetchAllFactures','fetchOneFacture','confirmFacture','whoAMI']),
        add(){
            console.log("ikechmed")
            //this.$router.push({name:'ReservationForm'});
        },
        view(item){
            console.log(item);
            this.foo=true
            //this.lastNumChambre(item.chambre.numChambre)
           // this.$router.push(`/reservations/${item.idReservation}`)
        },
        remove(item){
            console.log(item)
            //this.itemId=item.idReservation;
            //this.dialog=true;
            
        },
        printInvoice(item){
            /*
            let docpdf = new jsPDF();
            let tab=document.querySelector(`#${CSS.escape(item.idFacture)}`).childNodes[0]
             //bus.$emit('perPageChanged','All')
            docpdf.autoTable({html:tab});
            docpdf.save('invoice.pdf');
            */
          // this.item=item;
           //this.foo=true;
          // console.log(item)
            window.html2canvas=html2canvas;
            var doc =new jsPDF("p","pt","a3");
            //console.log(document.querySelector(`#${CSS.escape(item.idFacture)}`));
            
            doc.html(document.querySelector(`#${CSS.escape(item.idFacture)}`),{
                callback:function(pdf){
                    pdf.save("invooice.pdf");
                }
            })
            
          // let h=this.$html2canvas(document.querySelector(`#${CSS.escape(item.idFacture)}`));
           //doc.html(h);
           //doc.save("saha.pdf")
        
        },
        confirmPaid(item){
            console.log(item)
            console.log(new Date());
            let ar={fact:item,token:this.getToken}
            this.confirmFacture(ar);

        },
        reloadData(){
            console.log("reloadData")
            let ar={idhotel:this.getUser.hotelCode,token:this.getToken}
            this.fetchAllFactures(ar);
        },closeSnackbar(){
            this.bool= !this.bool;
        },
        onConfirm(){
            //this.deleteReservation(this.itemId);
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
            foo:false,
            item:null,
            headers:[
                {text:"idFacture",value:"idFacture",sortable:true},
                {text:"Date facture",value:"dateFacture",sortable:true},
                {text:"Type paiement",value:"typePaiement",sortable:true},
                {text:"Etat",value:"paid",sortable:false},
                {text:"Montant facture",value:"montantFacture",sortable:false},
                {text:"Client",value:"client.id",sortable:false},
                {text:"",value:"factureActions",sortable:false},


            ],bool:false,color:'',notice:'',itemId:'',dialog:false,
            dialogTitle:'Facture delete dialog',
            dialogText:'Do you want to delete this invoice ?',
            
            items:[
                {typeReservation:"simple",dateDebut:"05-06-2021",datefin:"13-02-2021",etatReservation:"option",
                client:{nomClient:"outemzabet",
                prenomClient:"samy",typeClient:"vip",civiliteClient:"monsieur",ageClient:22,numIDNational:"213556699",adresseClient:"Bejaia",numTelClient:"0782951562"},numChambre:"202"}],
            
           
            
        }
    },
}
</script>