<template>
    <v-container fluid>
        <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="title">
            Chambres ({{allChambres.length}})
          </span>
          <v-spacer></v-spacer>
          <table-header-buttons
            :add="add"
            :reloadData="reloadData"
            :updateSearchPanel="updateSearchPanel"
            :rowsPerPage="rowsPerPage"
          ></table-header-buttons>
        </v-card-title>
	<tabledata :headers="headers" :items="allChambres"  @edit="edit"
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
import TableData from '../components/TableData.vue'
import TableHeaderButtons from '../components/TableHeaderButtons.vue'
import ConfirmDialogVue from '../components/ConfirmDialog.vue';
import {mapGetters,mapActions} from 'vuex';
import {bus} from '../main'
export default {
    name:'Chambres',
    components:{
    'tabledata':TableData,
    'table-header-buttons':TableHeaderButtons,
        'confirm-dialog':ConfirmDialogVue,

    },

    
    data() {
        return {
            headers:[
                {text:"id",value:"id",sortable:true},
                {text:"numChambre",value:"numChambre",sortable:true},
                {text:"etage",value:"numEtage",sortable:true},
                {text:"type",value:"typeChambre.nomType",sortable:false},
                {text:"Etat",value:"etatChambre",sortable:false},
                {text:"",value:"actions",sortable:false},


            ],
            bool:false,color:'',notice:'',itemId:'',dialog:false,
            dialogTitle:'Customer delete dialog',
            dialogText:'Do you want to delete this customer ?',
        }
    },
     created(){
        this.whoAMI();
    if(this.getUser!=null){
        let ar={idhotel:this.getUser.hotelCode,token:this.getToken}
        this.fetchAllChambres(ar);
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
    computed:mapGetters(['allChambres','getUser','getToken']),
    methods:{
      ...mapActions(['fetchAllChambres','deleteChambre','whoAMI']),
      add(){
            console.log("ikechmed")
            this.$router.push({name:'ChambreForm'});
        },
        edit(item){
            console.log(item);
            this.$router.push(`/chambres/${item.id}`)
        },
        remove(item){
            this.itemId=item.id;
            this.dialog=true;
            
        },
        reloadData(){
            console.log("reloadData")
            this.fetchAllChambres();
        },closeSnackbar(){
            this.bool= !this.bool;
        },
        onConfirm(){
           let ar={id:this.itemId,idhotel:this.getUser.hotelCode,token:this.getToken}
            this.deleteChambre(ar);
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
        },
        print(){
            /*let docpdf = new jsPDF();
            let tab=document.querySelector(".v-data-table__wrapper").childNodes[0]
             //bus.$emit('perPageChanged','All')
            docpdf.autoTable({html:tab});
            docpdf.save('tableClient.pdf');*/
            
        }
    }
}
</script>