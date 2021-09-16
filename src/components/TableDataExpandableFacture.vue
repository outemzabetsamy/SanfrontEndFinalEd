<template>
  <div>
    <v-card-text>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-text>
    <v-data-table
      class="elevation-1"
      :search="search"
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :single-expand="singleExpand"
      item-key="idFacture"
      show-expand
      
    >
    <template v-slot:[`item.montantFacture`]="{ item }">
      <span>{{item.montantFacture}}.00 <b>DZD</b></span>
    </template>

    <template v-slot:[`item.paid`]="{ item }">
      <span>{{item.paid?"Payé":"Non payé"}}</span>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
           
            <v-container ma-0 pa-30 :id="item.idFacture">
              
               <div class="invoice-box">
                 <v-row>
                   <v-col cols="5"></v-col>
                   <v-col cols="2">
                      <v-img :src="getCurrentLogo"
                      :aspect-ratio="1"
                       contain
                     ></v-img>
                   </v-col>
                   <v-col cols="5"></v-col>
                
              </v-row>
  <table cellpadding="0" cellspacing="0" > 
    <tr class="information">
      <td colspan="4">
        <table>
          <tr>
            <td >
              <v-row>
                <v-col>{{getCurrentHotel.adresseHotel}}</v-col>
                <v-col></v-col>
                <v-col></v-col>
              
              </v-row>
            </td>

            <td>
              {{item.client.nomClient}} {{item.client.prenomClient}}.<br>{{item.client.adresseClient}}<br> {{item.client.numTelClient}}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr class="heading">
      <td colspan="3">Invoice details</td>
      <td></td>
    </tr>

    <tr class="details">
      <td colspan="3">Invoice</td>
      <td>{{item.idFacture}}</td>
    </tr>
    <tr class="details">
      <td colspan="3">Type paiement</td>
      <td>{{item.typePaiement}}</td>
    </tr>
    <tr class="details">
      <td colspan="3">Created</td>
      <td>{{datee(item)}}</td>
    </tr>

    <tr class="heading">
      <td>Reservation</td>
      <td>Prix par nuitée</td>
      <td>nuitées</td>
      <td>montant sejour</td>
    </tr>

    <tr class="item" v-for="(it,ind) in item.reservation" :key="ind">
      <td>{{it.typeReservation}}</td>
      <td>{{it.chambre.typeChambre.prixAdulte}} DZD</td>
      <td>{{nbJours(it.nbJours)}}</td>
      <td>{{ it.chambre.typeChambre.prixAdulte * it.nbJours | currency }} DZD </td>
    </tr>

    <tr>
      <td colspan="4">
        <!--<v-btn class="btn-add-row" light @click="addRow">Add row</v-btn>-->
      </td>
    </tr>

    <tr class="heading">
      <td>Consommation</td>
      <td>Prix unitaire</td>
      <td>Quantité</td>
      <td>montant Consommation</td>
    </tr>

    <tr class="item" v-for="(ic,ind) in item.consommation" :key="ind">
      <td><input v-model="ic.nomConso" /></td>
      <td><b>DZD</b><input type="number" v-model="ic.montantConso" /></td>
      <td><input type="number"  />1</td>
      <td><b>DZD</b>{{ ic.montantConso | currency }}</td>
    </tr>

    <tr>
      <td colspan="4">
        <!--<v-btn class="btn-add-row" light @click="addRow">Add row</v-btn>-->
      </td>
    </tr>


    <tr class="total">
      <td colspan="3"></td>
      <td>Total: {{ item.montantFacture | currency }} DZD </td>
    </tr>
  </table>
  <v-row class="mt-5">
  <v-col cols="3"> <v-select light :items="selectionItems" v-model="item.typePaiement" @change="test(item)"></v-select></v-col>
  <v-col cols="3"> <v-btn light @click.native="confirmPaid(item)">Confirmer paiement</v-btn></v-col>
  <v-col cols="3"></v-col>
  <v-col cols="3"><v-btn light @click.native="printInvoice(item)"> Imprimer</v-btn></v-col>
 </v-row>
</div>
            </v-container>
        </td>
         </template>
      <template v-slot:[`item.factureActions`]="{ item }">
        <v-btn
         elevation="4"
          fab
          class="teal mr-2"
          small
          dark
          @click.native="$emit('view', item)">
            <v-icon>
            mdi-eye-outline
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          elevation="4"
          fab
          class="teal mr-2"
          small
          dark
          @click.native="$emit('edit', item)"
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          elevation="4"
          fab
          class="cyan"
          small
          @click.native="$emit('remove', item)"
        >
          <v-icon>
            mdi-trash-can-outline
          </v-icon>
        </v-btn>
      </template>
      <template slot="no-data">
        <span>
          <p class="pt-2 blue--text subheading">
            <v-icon medium class="blue--text">mdi-info</v-icon>Sorry, nothing to
            display here :(
          </p>
        </span>
      </template>
    </v-data-table>
    
  </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
export default {
props:{'headers':{type:Array,required:true},
        'items':{type:Array,required:true},
        'confirmPaid':Function,
        'printInvoice':Function},

data() {
        return { 
                selectionItems:['chèque','espèce','virement','Carte credit'],
                singleExpand:true,search:"",
    }},
  computed: {
    ...mapGetters(['getCurrentHotel','getUser','getToken','getCurrentLogo']),
    
  },
  created(){
    this.whoAMI();
    if(this.getUser!=null){
      //console.log(this.oneTypeChambre)
      console.log(this.$route.params.id)
      let ar1={id:this.getUser.hotelCode,token:this.getToken}
      //this.fetchAllTypeChambres(ar1);
      this.getHotelById(ar1)
  }},
  methods: {
     ...mapActions(['getHotelById','addHotelOnly','setLogoName','whoAMI','setHotelUserInfo']),
    addRow() {
      this.items.push({ description: "", quantity: 1, price: 0 });
    },
    nbJours(i) {
      return i<10?"0"+i:i+"";
    },
    datee(item){
        return item.dateFacture.substring(0,9);
    },
    test(item){
        console.log(item);
    },
    total(item){
        let s=0
        item.reservation.forEach(e => {
            s=s+e.montantSejour;
        });
        return s;
    }
  },
  filters: {
    currency(value) {
      return value.toFixed(2);
    }
  }
        
    
}
</script>
<style scoped>
.titles{
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    border-radius: 5px;
}
.invoice-box {
  max-width: 800px;
  margin: 5px;
  padding: 10px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 13px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
  /*height: 11in;*/
  /*width: 8.5in;*/
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
  text-overflow: clip;
}

.invoice-box table tr td:nth-child(n + 2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.item input {
  padding-left: 5px;
}

.invoice-box table tr.item td:first-child input {
  margin-left: -5px;
  width: 100%;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

.invoice-box input[type="number"] {
  width: 60px;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
    sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}
.dz{
  display: inline;
  font:bolder;

}
</style>