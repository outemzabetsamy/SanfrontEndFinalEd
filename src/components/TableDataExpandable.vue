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
      :single-expand="singleExpand"
      :items-per-page="5"
      item-key="idReservation"
      show-expand
      
    >
    <template v-slot:[`item.montantSejour`]="{ item }">
      <span>{{item.montantSejour}}.00 <b>DZD</b></span>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
           
            <v-container ma-0>
              <v-row>
                <v-col cols="4"></v-col>
                <v-col cols="4"><h1>Détails de reservation</h1></v-col>

                <v-col cols="4"></v-col>
              </v-row>
                <v-row >
                <v-col cols="5" >
                  
                    <v-simple-table>
                <tr>
                    <td>
                        <v-simple-table>
                            
                            <tbody>
                               
                               <tr >
                                   <td :colspan="headers.length"  class="titles"  >
                                        Client
                                    </td>
                                
                                </tr>
                                <tr >
                                    <td>Nom Client</td>
                                    <td> {{item.client.nomClient}}</td>
                                </tr>
                                <tr >
                                    <td>Prenom Client</td>
                                    <td> {{item.client.prenomClient}}</td>
                                </tr>
                                    <tr >
                                    <td>Age Client</td>
                                    <td> {{item.client.ageClient}}</td>
                                </tr>
                                <tr >
                                    <td>adresse Client</td>
                                    <td> {{item.client.adresseClient}}</td>
                                </tr>
                                <tr >
                                    <td>Mobile</td>
                                    <td> {{item.client.numTelClient}}</td>
                                </tr>
                                <tr >
                                    <td>ID National</td>
                                    <td> {{item.client.numIDNational}}</td>
                                </tr>
                                 <tr >
                                    <td :colspan="headers.length" class="titles" >
                                        Reservation
                                    </td>
                                    
                                </tr>
                                <tr >
                                    <td colspan="1">{{headers[2].text}}</td>
                                    <td colspan="8">{{ item.typeReservation}}</td>
                                </tr>
                                <tr >
                                    <td>CHECK IN</td>
                                    <td> {{item.dateDebut}}</td>
                                </tr>
                                <tr >
                                    <td>CHECK OUT</td>
                                    <td> {{item.datefin}}</td>
                                </tr>
                                <tr >
                                    <td>Montant Sejour</td>
                                    <td> {{item.montantSejour}}.00 <b>DZD</b></td>
                                </tr>
                                <tr >
                                    <td>{{headers[5].text}}</td>
                                    <td> {{item.etatReservation}}</td>
                                </tr>
                                <tr >
                                   <td :colspan="headers.length"  class="titles"  >
                                        Chambre
                                    </td>
                                
                                </tr>
                                 <tr >
                                    <td>Numero chambre</td>
                                    <td> {{item.chambre.numChambre}}</td>
                                </tr>
                                <tr >
                                    <td>Type Chambre</td>
                                    <td> {{item.chambre.typeChambre.nomType}}</td>
                                </tr>
                                <tr >
                                    <td>Nb Max personnes</td>
                                    <td> {{item.chambre.typeChambre.nbMaxPers}}</td>
                                </tr>
                                <tr >
                                    <td>Prix adulte</td>
                                    <td> {{item.chambre.typeChambre.prixAdulte}}.00 <b>DZD</b></td>
                                </tr>
                                <tr >
                                    <td>Prix enfant</td>
                                    <td> {{item.chambre.typeChambre.prixEnfant}}.00 <b>DZD</b></td>
                                </tr>
                                

                            </tbody>
                        </v-simple-table>
                       
                    </td>
                    <td>

                    </td>
                </tr>
            </v-simple-table>
                </v-col>
                <v-col cols="7">
                 <!--
    
                     <v-simple-table>
                <tr>
                    <td>
                        <v-simple-table>
                            
                            <tbody>
                               
                                 
                                <tr >
                                   <td :colspan="headers.length"  class="titles"  >
                                        Client
                                    </td>
                                
                                </tr>
                                <tr >
                                    <td>Nom Client</td>
                                    <td> {{item.client.nomClient}}</td>
                                </tr>
                                <tr >
                                    <td>Prenom Client</td>
                                    <td> {{item.client.prenomClient}}</td>
                                </tr>
                                    <tr >
                                    <td>Age Client</td>
                                    <td> {{item.client.ageClient}}</td>
                                </tr>
                                <tr >
                                    <td>adresse Client</td>
                                    <td> {{item.client.adresseClient}}</td>
                                </tr>
                                <tr >
                                    <td>Mobile</td>
                                    <td> {{item.client.numTelClient}}</td>
                                </tr>
                                <tr >
                                    <td>ID National</td>
                                    <td> {{item.client.numIDNational}}</td>
                                </tr>
                                
                            </tbody>
                        </v-simple-table>
                       
                    </td>
                    <td>

                    </td>
                </tr>
            </v-simple-table>
            -->
                </v-col>
            </v-row>
            </v-container>
        </td>
         </template>
      <!--
       <template v-slot:[`item.client`]="{ item }">
         <v-simple-table
          
          :items="item.client">
           <template v-slot:default>
      <thead>
        <tr>
          <td>
            <tr v-for="(it,index) in headersClient" :key="index">
          <td>
            {{it.text}}
          </td>
        </tr>
          </td>
          <td><tr v-for="(client,index) in clients"  :key="index">
          <td>{{client.id}}</td>
          <td>{{client.nomClient}}</td>
          <td>{{client.prenomClient}}</td>
          <td>{{client.typeClient}}</td>
          <td>{{client.adresseClient}}</td>
          <td>{{client.numIDNational}}</td>

          
        </tr></td>
        </tr>
        
      </thead>
      <tbody>
        
      </tbody>
           </template>
         </v-simple-table>
       </template>
      -->
      
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

export default {
props:['headers','items'],
data() {
  return {
    search:"",
    singleExpand:true,
  }
},
}
</script>
<style scoped>
.titles{
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    border-radius: 5px;
}

</style>