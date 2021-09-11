<template>
    <v-container fluid>
        <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="title">
            Liste des canaux
          </span>
          <v-spacer></v-spacer>
          
        </v-card-title>
	<tabledata id="tableclient" :headers="headers" :items="items" ></tabledata>
      </v-card>
    </v-flex>
    
    </v-container>
</template>
<script>
import TableData from '../components/TableData.vue'
export default {
     name:'ChannelManager',
    components:{
        'tabledata':TableData,
    },
    data() {
        return {
            headers:[
                {text:"Canal",value:"canalName",sortable:"true"},
                {text:"Logo",value:"logoCanal",sortable:"false"},
                {text:"Etat",value:"etatCanal",sortable:"false"},
            ],
            items:[
                {canalName:"Booking.com",logoCanal:"booking3.png",etatCanal:true},
                {canalName:"Expedia",logoCanal:"expedia.jpg",etatCanal:true},
                {canalName:"Agoda",logoCanal:"agoda.png",etatCanal:true},
                {canalName:"AirBnB",logoCanal:"airbnb.jpg",etatCanal:true},
                
            ]
        }
    },
}
</script>