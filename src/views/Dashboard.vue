<template>
  <div>
    
   <!-- <h1 class="subheading grey--text">Dashboard</h1>-->
   <br>
    <v-container fluid>
      <v-layout row wrap>
         <v-flex sm6 xs12 md4 lg4>
          <v-card class="ma-5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7" width="80" height="80">
                <v-sheet
                elevation="20"
                rounded
                color="orange"
                height="80"
                width="80">
                  <v-icon dark large>mdi-bed</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="text-right">Chambres louées</div>
                <v-list-item-title class="headline mb-1 text-right">{{this.getStatistics.nbRoomsBookedOfTheDay}}</v-list-item-title>
                <div><v-divider> </v-divider></div>

              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-icon text class="ma-2" >mdi-bed</v-icon>
              <div class="overline">{{today}} </div>
            </v-card-actions>
          </v-card>
        </v-flex>


         <v-flex  sm6 xs12 md4 lg4>
          <v-card class="ma-5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7" width="80" height="80">
                <v-sheet
                elevation="20"
                rounded
                class="info"
                height="80"
                width="80">
                  <v-icon dark large>mdi-bed-empty</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="text-right">Chambres Disponible</div>
                <v-list-item-title class="headline mb-1 text-right"> {{this.getStatistics.nbRoomsDispoOfTheDay}}</v-list-item-title>
                <div><v-divider> </v-divider></div>

              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-icon text class="ma-2" >mdi-bed-empty</v-icon>
              <div class="overline">{{today}} </div>
            </v-card-actions>
          </v-card>
        </v-flex>


         <v-flex  sm6 xs12 md4 lg4>
          <v-card class="ma-5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7" width="80" height="80">
                <v-sheet
                elevation="20"
                rounded
                class="pink"
                height="80"
                width="80">
                  <v-icon dark large>mdi-account-group</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="text-right">Clients présents</div>
                <v-list-item-title class="headline mb-1 text-right"> {{this.getStatistics.nbClientsPresent}}</v-list-item-title>
                <div><v-divider> </v-divider></div>

              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-icon text class="ma-2" >mdi-account-group</v-icon>
              <div class="overline">{{today}} </div>
            </v-card-actions>
          </v-card>
        </v-flex>


          <v-flex sm6 xs12 md6 lg6>
          <v-card class="ma-5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7" width="80" height="80">
                <v-sheet
                elevation="20"
                rounded
                color="green"
                height="80"
                width="80">
                  <v-icon dark large>mdi-airplane-landing</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="text-right">Arrivées</div>
                <v-list-item-title class="headline mb-1 text-right"> {{this.getStatistics.nbArrivals}}</v-list-item-title>
                <div><v-divider> </v-divider></div>

              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-icon text class="ma-2" >mdi-airplane-landing</v-icon>
              <div class="overline">{{today}} </div>
            </v-card-actions>
          </v-card>
        </v-flex>


         <v-flex sm6 xs12 md6 lg6>
          <v-card class="ma-5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7" width="80" height="80">
                <v-sheet
                elevation="20"
                rounded
                color="red"
                height="80"
                width="80">
                  <v-icon dark large>mdi-airplane-takeoff</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="text-right">Départs</div>
                <v-list-item-title class="headline mb-1 text-right">  {{this.getStatistics.nbDepartures}}</v-list-item-title>
                <div><v-divider> </v-divider></div>

              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-icon text class="ma-2" >mdi-airplane-takeoff</v-icon>
              <div class="overline">{{today}} </div>
            </v-card-actions>
          </v-card>
        </v-flex>

      
        <v-flex sm6 xs12 md6 lg6>
          <v-card class="ma-5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7 ml-7 mr-7" width="100%" height="80">
                <v-sheet
                class="overline"
                elevation="20"
                rounded
                color="green"
                height="80"
                width="100%"
                dark >
                  <div class="mt-5"><v-icon text class="ma-2" >mdi-airplane-landing</v-icon>Arrivées du jour</div>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              
              <div>  <TableData :headers="headers" :items="getArrivals"></TableData> </div>
            </v-card-actions>
          </v-card>
        </v-flex>


         <v-flex sm6 xs12 md6 lg6>
          <v-card class="ma-5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7 ml-7 mr-7" width="100%" height="80">
                <v-sheet
                class="overline"
                elevation="20"
                rounded
                color="red"
                height="80"
                width="100%"
                dark >
                  <div class="mt-5"><v-icon text class="ma-2" >mdi-airplane-takeoff</v-icon>Départs du jour</div>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              
              <div >  <TableData :headers="headers" :items="getDepartures"></TableData> </div>
            </v-card-actions>
          </v-card>
        </v-flex>
        <!--/////////////////////////////////////////////////////////////////-->

        <v-flex sm6 xs12 md6 lg6>
          <v-card class="ma-5" >
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7 ml-7 mr-7" width="100%" height="80">
                <v-sheet
                class="overline"
                elevation="20"
                rounded
                color="#7E909A"
                height="80"
                width="100%"
                dark >
                  <div class="mt-5">Statistiques reservations du mois</div>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
              </v-list-item-content>
            </v-list-item>
            <Barr v-if="loaded" :chartdata="chartdata" :options="options"></Barr>
            <div><v-divider> </v-divider></div>
            <v-card-actions>
              
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          type="month"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @mouseup="$refs.menu.save(date)"
            @click="setBars"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
              
            </v-card-actions>
          </v-card>
        </v-flex>
        
        

        
        <v-flex sm6 xs12 md6 lg6>
          <v-card class="ma-5" >
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7 ml-7 mr-7" width="100%" height="80">
                <v-sheet
                class="overline"
                elevation="20"
                rounded
                color="#488A99"
                height="80"
                width="100%"
                dark >
                  <div class="mt-5">TAUX D occupation</div>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
              </v-list-item-content>
            </v-list-item>
            <Doughnutt v-if="this.getShowDonut"  :chartdata="this.getDonutData" :options="donutoptions"></Doughnutt>
            <div><v-divider> </v-divider></div>
            <v-card-actions>
              <div class="overline ">Taux Occupation du mois: {{this.getStatistics.nbTauxOccupation}}%</div>
             <!-- <div class="overline ">Taux Occupation du mois: 51%</div>-->
            </v-card-actions>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
    
  </div>
</template>
<script>
import TableData from '../components/TableData.vue'
import {mapGetters,mapActions} from 'vuex';
import Barr from '../components/Barr.vue'
import Doughnutt from '../components/Doughnutt.vue'
import axios from 'axios';
export default {
  components:{
    TableData,Barr,Doughnutt},
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      today:new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      headers:[
                {text:"ID",value:"client.id",sortable:true},
                {text:"Nom",value:"client.nomClient",sortable:true},
                {text:"Prenom",value:"client.prenomClient",sortable:true},
                {text:"Type",value:"client.typeClient",sortable:false},
                {text:"Mobile",value:"client.numTelClient",sortable:false},
                
                

            ],
      chartdata:null,
      options:null,
      loaded:false,
      donutdata:{
      labels: ['Nb total chambres louée', 'Nb total chambres Dispo'],
      datasets: [
        {
          backgroundColor: [
            '#41B883',
            '#E46651',],
          data: [80, 20]
        }
      ]
    },
    donutoptions:{responsive: true, maintainAspectRatio: false},
  }},
  async mounted() {
    if(this.getUser!=null){
    let date= new Date();
    this.today=this.parseTheDateToDDMMYYYY(this.today);
    console.log(date);
    const deb=new Date(date.getFullYear(),date.getMonth(),1).toLocaleDateString('en-CA');
    console.log(deb)
     const fin=new Date(date.getFullYear(),date.getMonth()+1,0).toLocaleDateString('en-CA');
      console.log(fin)
   await axios.get(`https://sanhotelreservation.herokuapp.com/api/reservation/bar?deb=${deb}&fin=${fin}&idhotel=${this.getUser.hotelCode}`
    ,{headers:{Authorization:this.getToken}})
   .then(res=>{
     let labs=[];
     let vals=[]
     res.data.forEach(element => {
       labs.push(element.dateValue);
       vals.push(element.countValue);
     });
     this.loaded=true;
     console.log(res);
      this.chartdata={
        labels:labs,
        datasets: [
          {label:"Data One",
          data:vals,
          backgroundColor: '#f87979',
          pointBackgroundColor: 'white',
					borderWidth: 1,
					pointBorderColor: '#249EBF',}

        ]
      };
      this.options={
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: false
						}
					}]
				},
				legend: {
					display: false
				},
				tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
						label: function(tooltipItems,) {
							return '$' + tooltipItems.yLabel;
						}
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				height: 200
};
   }).catch(err=>{
     console.log(err)
   })
    }
  },
  beforeCreate(){
    
  },
  methods:{
    ...mapActions(['fetchAllClients','deleteClient','fetchAllBarChartValues','fetchAllArrivals','fetchAllDepartures','fetchAllStats','whoAMI','getHotelById']),
    setBars(){
      console.log("this.daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaate")
      console.log(this.date)
      const[year,month]=this.date.split('-');
     let df=new Date(year,month-1,1).toLocaleDateString('en-CA');
     let db=new Date(year,month,0).toLocaleDateString('en-CA');
     console.log(df)
     console.log(db)
     let ar={dateDebut:df,dateFin:db,idhotel:this.getUser.hotelCode,token:this.getToken}
      this.fetchAllBarChartValues(ar);
    },
    parseTheDateToDDMMYYYY(d){
      if(!d){
          return null;
        }else{
          const[yyyy,mm,dd]=d.split('-');
          return `${dd}/${mm}/${yyyy}`;
        }
    },
    
  },
  computed:mapGetters(['allClients','getLabels','getValues','getChartData2','getStatistics','getDonutData','getShowDonut','getUser','getDepartures','getArrivals','getToken']),
  created(){
    let token=localStorage.getItem("token");
    console.log(token);
    this.whoAMI();
    if(this.getUser!=null){
    let currentUser=this.getUser;
    console.log("currentUseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer");
    console.log(currentUser);
    let ar={idhotel:this.getUser.hotelCode,token:this.getToken}
    this.fetchAllStats(ar);
    let ar6={id:this.getUser.hotelCode,token:this.getToken}
    this.getHotelById(ar6);
    let date= new Date();
    console.log(date.toLocaleDateString('en-CA'));
    let ar3={arrivalDate:date.toLocaleDateString('en-CA'),idhotel:this.getUser.hotelCode,token:this.getToken}
    this.fetchAllArrivals(ar3);
    let ar4={departureDate:date.toLocaleDateString('en-CA'),idhotel:this.getUser.hotelCode,token:this.getToken}
    this.fetchAllDepartures(ar4);
    }
    /*let date= new Date();
    console.log(date);
    const deb=new Date(date.getFullYear(),date.getMonth(),1).toLocaleDateString('en-CA');
    console.log(deb)
     const fin=new Date(date.getFullYear(),date.getMonth()+1,0).toLocaleDateString('en-CA');
    let ar={dateDebut:deb,dateFin:fin}
    console.log(ar);
    this.fetchAllBarChartValues(ar);*/
    
    
  }
}
</script>