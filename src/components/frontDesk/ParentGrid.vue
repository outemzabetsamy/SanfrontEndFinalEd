<template>
    <div>
        
        <grid :days="days" :cmonth="cmonth" :cyear="cyear" :daysInMonth="daysInMonth"></grid>
        
    </div>
</template>
<script>



import GridVue from './Grid.vue'
import {bus} from '../../main'
import {mapGetters,mapActions} from 'vuex';

export default {
  name: 'ParentGrid',
  components: {
    'grid':GridVue,
    
    
  },
  data() {
        return {

            today:0,
            currentMonth:0,
            currentYear:0,
            firstDay:0,
            daysInMonth:32-new Date(this.currentYear,this.currentMonth,32).getDate(),
            days:[],
            month:0,
            year:0,
            cmonth:0,
            cyear:0
            
            
        }
    },
    beforeMount(){
        this.today=new Date();
        this.currentMonth=this.today.getMonth();
        this.currentYear=this.today.getFullYear();
        this.firstDay=new Date(this.currentYear,this.currentMonth).getDay();
        //this.daysInMonth=32-new Date(this.currentYear,this.currentMonth,32).getDate();
        //bus.$emit('changeTheGrid',this.daysInMonth);
        this.daysOfMonth(this.currentMonth,this.currentYear);
        
        
    },
    mounted(){
        //bus.$emit('changeTheGrid',this.daysInMonth);
       // bus.$emit('changeStyle',{x:"57",y:"180"});
    },
     created(){
         
        bus.$on('nextFired',()=>{
            this.next();
        });
        bus.$on('prevFired',()=>{
            this.prev();
        });
    },
   updated(){
       
   },
   computed:{
       ...mapGetters(['getScheduler','getTableOfDays','getDayRects','getFirstRect','getBool',
            'oneReservation','getReservationToPost','getLastNumChambre']),
   },
    methods:{
       ...mapActions(['fetchAllFrontDesk1','fetchAllFrontDesk2']),
        
        daysOfMonth:function(month,year){
          
       
        this.firstDay=new Date(year,month).getDay();
        this.daysInMonth=32-new Date(year,month,32).getDate();
        console.log("days in month"+this.daysInMonth+" month "+month+" year "+year)
        
            let d=1;
     
        for(let j=0;j<=42;j++){
        if(j<this.firstDay){
           console.log("rien")
        }else if (d> this.daysInMonth) {
            break;
        } else {
            let weekdayy=new Date(year,month,d);
            this.days.push({weekday: weekdayy.getDay(),day:d,completeDate: weekdayy,daysInMonth:this.daysInMonth})
            this.cmonth=month;
            this.cyear=year;
                d++;
        }
        
    }
    //bus.$emit('changeTheGrid',this.daysInMonth);
        //document.querySelector(".header").style.setProperty('--grid-template-columns','repeat('+this.daysInMonth+',1fr)');
        console.log(this.days)    
        
        
        },
        next:function(){
          this.currentYear= this.currentMonth===11? this.currentYear+1:this.currentYear
          this.currentMonth= (this.currentMonth+1)%12;
          this.days=[];
        // let dm=this.currentMonth+1;
           // let ar={start:`01-${dm}-${this.currentYear}`,end:`${this.daysInMonth}-${dm}-${this.cyear}`,days:this.days}
         //bus.$emit('changeEvent',ar);
          
          //this.daysInMonth=this.days[0].daysInMonth;
          
          console.log(this.days);
          console.log("this.currentMonth");
          console.log(this.currentMonth);
          console.log("this.currentYear");
          console.log(this.currentYear);
          this.daysOfMonth(this.currentMonth,this.currentYear);
          console.log("this.days.daysInMonth")
          console.log(this.daysInMonth)
        

        },
        prev:function(){
          this.currentYear=(this.currentMonth === 0)?this.currentYear-1:this.currentYear
          this.currentMonth=this.currentMonth ===0?11:this.currentMonth-1;
          this.days=[];
          let dm=this.currentMonth+1;
          let ar={start:`01-${dm}-${this.currentYear}`,end:`${this.daysInMonth}-${dm}-${this.cyear}`}
         bus.$emit('changeEvent',ar);
          //this.daysInMonth=this.days.daysInMonth;
           this.daysOfMonth(this.currentMonth,this.currentYear);
           console.log("this.days.daysInMonth")
          console.log(this.daysInMonth)
        },
    }
}
</script>
<style src="./Liste.css" >

</style>