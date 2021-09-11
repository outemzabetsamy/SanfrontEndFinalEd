<template>
    <v-container ma-0 pa-30 :id="item.idFacture">
               <div class="invoice-box">
  <table cellpadding="0" cellspacing="0" >
    <tr class="top">
      <td colspan="4">
        <table>
          <tr>
            <td class="title">
              <img src="https://www.sparksuite.com/images/logo.png" style="width:100%; max-width:300px;">
            </td>
<!--
            <td>
              Invoice #: {{item.idFacture}}<br> Created: {{datee(item)}}<br> Due: February 1, 2015
            </td>-->
          </tr>
        </table>
      </td>
    </tr>

    <tr class="information">
      <td colspan="4">
        <table>
          <tr>
            <td>
              Sparksuite, Inc.<br> 12345 Sunny Road<br> Sunnyville, CA 12345
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
      <td><input v-model="it.typeReservation" /></td>
      <td><b>DZD </b><input type="number" v-model="it.chambre.typeChambre.prixAdulte"  /></td>
      <td><input type="number" v-model="it.nbJours"  /></td>
      <td><b>DZD </b>{{ it.chambre.typeChambre.prixAdulte * it.nbJours | currency }}</td>
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
      <td>Total: <b>DZD </b>{{ item.montantFacture | currency }}</td>
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
</template>
<script>
import { bus } from '../main';

export default {
props:['item'],
        

data() {
        return { 
                selectionItems:['chèque','espèce','virement','Carte credit'],
                //item:{"idFacture":"299a7bca-ef8f-4db7-8794-22b5a1fc3268","dateFacture":"2021-06-26T01:34:49.382+00:00","typePaiement":null,"paid":false,"montantFacture":24000.0,"client":{"id":"1624671281433","nomClient":"booobi","prenomClient":"glouglou","typeClient":"VIP","civiliteClient":"Monsieur","ageClient":0,"numIDNational":"556644998877","adresseClient":"bonoju","numTelClient":"856974123"},"reservation":[{"idReservation":27,"typeReservation":"All inclusive","dateDebut":"08-06-2021","datefin":"11-06-2021","etatReservation":"Validé","nbJours":3,"montantSejour":24000.0,"idFacture":"299a7bca-ef8f-4db7-8794-22b5a1fc3268","client":{"id":"1624671281433","nomClient":"booobi","prenomClient":"glouglou","typeClient":"VIP","civiliteClient":"Monsieur","ageClient":0,"numIDNational":"556644998877","adresseClient":"bonoju","numTelClient":"856974123"},"chambre":{"id":3,"numChambre":103,"numEtage":1,"etatChambre":"occupe","typeChambre":{"id":2,"nomType":"Chambre triple","nbMaxPers":3,"prixAdulte":8000.0,"prixEnfant":4000.0}}}],"consommation":[]},
    }},
  computed: {
    totale() {
      return 50000;
    },
    
  },
  mounted(){
    
    setTimeout(()=>{
      print();
      bus.$emit('setFoo',false);
    },5000)
    
  },
  methods: {
    addRow() {
      this.items.push({ description: "", quantity: 1, price: 0 });
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
.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
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

</style>