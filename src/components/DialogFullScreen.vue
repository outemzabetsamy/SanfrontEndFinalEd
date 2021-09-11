<template>
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
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
      </v-card>
    </v-dialog>
  </v-row>
</template>