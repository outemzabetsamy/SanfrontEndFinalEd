<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="title"
            >Utilisateurs ({{getUsers.length}})
          </span>
          <v-spacer></v-spacer>
          <table-header-buttons
            :add="add"
            :reloadData="reloadData"
            :updateSearchPanel="updateSearchPanel"
            :print="print"
            :rowsPerPage="rowsPerPage"
            
          ></table-header-buttons>
        </v-card-title>
        <tabledata
          :headers="headers"
          :items="getUsers"
           @edit="edit"
          @remove="remove"
          
        ></tabledata>
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
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
export default {

    
    components:{'tabledata':TableData,
    'table-header-buttons':TableHeaderButtons,
    'confirm-dialog':ConfirmDialogVue,
        },
         computed:{
        ...mapGetters(['getUsers','getUser','getToken']),},
        created(){
            this.whoAMI();
    if(this.getUser!=null){
        let ar={idhotel:this.getUser.hotelCode,token:this.getToken}
        this.fetchAllUsers(ar);
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

    data() {
        return {
           headers:[
    {
      text: "",
      value: "avatar",
      sortable: false
    },
    {
      text: "ID",
      left: true,
      value: "id"
    },
    { text: "Login", value: "login" },
    { text: "Role", value: "admin" },
    
    { text: "", value: "actions", sortable: false }
  ],bool:false,color:'',notice:'',itemId:'',dialog:false,
            dialogTitle:'Customer delete dialog',
            dialogText:'Do you want to delete this customer ?',
   
        }
    },
    methods:{
        ...mapActions(['fetchAllUsers','deleteUser','whoAMI']),
        add(){
            console.log("ikechmed")
            this.$router.push("/newUtilisateur");
        },
        edit(item){
            console.log(item);
            this.$router.push(`/utilisateurs/${item.id}`)
        },
        remove(item){
            this.itemId=item.id;
            this.dialog=true;
            
        },
        reloadData(){
            console.log("reloadData")
            this.fetchAllClients();
        },closeSnackbar(){
            this.bool= !this.bool;
        },
        onConfirm(){
           let ar={id:this.itemId,idhotel:this.getUser.hotelCode,token:this.getToken}
            this.deleteUser(ar);
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
            let docpdf = new jsPDF();
            let tab=document.querySelector(".v-data-table__wrapper").childNodes[0]
             //bus.$emit('perPageChanged','All')
            docpdf.autoTable({html:tab});
            docpdf.save('tableClient.pdf');
            
        }
        }
}
</script>