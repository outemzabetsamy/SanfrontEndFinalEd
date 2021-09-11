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
      :items-per-page="rowsPerPage"
      :id="id"
      
    >
    <template v-slot:[`item.avatar`]="{ item }">
        <v-img 
          small
          max-width="2em"
          :src="require(`../assets/${item.avatar}`)"
          class="avatar "
          
        />
      </template>

      <template v-slot:[`item.logoCanal`]="{ item }">
        <v-img 
          
          large
          width="80px"
          height="80px"
          :src="require(`../assets/${item.logoCanal}`)"
          class="avatar  "
          
        />
      </template>

      <template v-slot:[`item.etatCanal`]="{ item }">
          <v-container
    class="px-0"
    fluid
  >
     <v-switch
              v-model="item.etatCanal"
              
              color="success"
              value="success"
              hide-details
            ></v-switch>
  </v-container>
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
import {bus} from '../main'
export default {
props:['headers','items','headersClient','clients','id'],
data() {
  return {
    search:"",
    rowsPerPage:5,
  }
},
created(){
bus.$on('perPageChanged',(n)=>{
  console.log(n);
  this.changeRowsPerpage(n);
})
},
methods:{
  changeRowsPerpage(n){
    this.rowsPerPage=n;
  }
}
}
</script>