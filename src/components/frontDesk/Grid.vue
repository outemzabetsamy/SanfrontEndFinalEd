<template>
    <div class="grid pa-0 ml-0 mt-0">
        <div class="vide">
            
        </div >

        <div class="headerparent" @scroll="syncTheHorizontanlScroll">
           <monthandyear :cmonth="cmonth" :cyear="cyear"></monthandyear>
        <div class="header blue lighten-5" :style="style">
            <div class="days overline text-center text-wrap pt-2" dense v-for="(day,index) in days" :key="index" >
       
                {{weekdays[day.weekday]}} {{day.day}} 
                
            </div>
        </div>
        </div>

        <div class="ressources">
                <div class="ressourcesList" :style="rowstyle" @scroll="syncScrollVertical">
                <div class="ressource overline text-center" v-for="(res,index) in getScheduler" :key="index+155" @click="getResItem(res)" >
                    <div ref="ressourceliste" >
                        {{res.numChambre}}
                    </div>
                </div>
            </div>
        </div>
        <div class="bodyy"  @scroll="syncScrollBody">
            <!--div class="bodyDaysParent">
                <div class="dayBody" :name="day.completeDate" v-for="(day,index) in days" v-bind:key="index+1" :index="index">
                     
                </div>
            </div>
            class="bodyRowsparent"
            -->
            
                <div 
                :id="'row'+ind"
                class="roww" 
                 v-for="(res,ind) in getScheduler" 
                :key="ind+1" :index="ind"
                 
                :name="res.numChambre">
               <div class="bodyDaysParent" :style="style" ref="bodydaysparent">
                <div class="dayBody" :name="day.completeDate" v-for="(day,index) in days" v-bind:key="'row'+res.numChambre+index+1" :index="index" :rowIndex="ind" :room="res.numChambre" @click="getRows(day,res,$event,ind)" @mouseup="getIndexofTheRow">
                     
                </div>
            </div>
            <div v-if="getBool">
                <event 
                v-for="(e,index) in res.reservation "
                :key="index" :test="'test'"
                :xleft="e.left"
                :ytop="e.top"
                :propheight="e.height"
                :propwidth="e.width" :id="e.id"
                :res="res"
                :ind="ind"
                :reservation="e"
                >
                </event>
                </div>
            </div>
        </div>
        <confirm-dialog
      :dialog="dialog"
      :dialogTitle="dialogTitle"
      :dialogText="dialogText"
      @onConfirm="onConfirm"
      @onCancel="onCancel"
    />
    <reservation-choice :choiceDialog="choiceDialog"></reservation-choice>
    </div>
    
</template>
<script>
import OneEvent from './OneEvent.vue'
/*var componentEvent=Vue.extend(OneEvent);
var instanceEvent=new componentEvent();
instanceEvent.$mount();
this.$refs.container.appendChild(instanceEvent.$el);*/
import ConfirmDialogVue from '../ConfirmDialog.vue';
import ReservationChoice from '../ReservationChoice.vue';
import {bus} from '../../main'
import monthAndYear from './MonthAndYear.vue'
import {mapGetters,mapActions} from 'vuex';



export default {
    
        data(){
            return {
                
                bodyDaysRects:[],
                rowRects:[],
                ressources:["1","2","3","4","5","6","7","8","9","10"],
               weekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
               tableOfDays:[],
               dialog:false,
                dialogTitle:'',
                 dialogText:'',
                 choiceDialog:false,
                 currentItemRes:'',
                 clickedDate:null,
                 selectedRow:null,
                 eventDragging:null,
                 eventDragged:null, 
                 startOfSelectedEv:null,
                 endOfSelectedEv:null,
                 reservation:'',
                 startmonth:null,
                endmonth:null,
                up:false,

               scheduler:
               [
                   {id:0,rowIndex:0,title:"ressource 1",
                        events:[{id:0,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:58},
                                 {id:1,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:269}
                                ]
                    },
               {id:1,rowIndex:1,title:"ressource 2",
                        events: [ {id:2,text:"reserved",start:"00/00/00",end:"00/00/00",width:80,height:15,top:8,left:80},
                                  {id:3,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:269}
                                ]
                },
               {id:2,rowIndex:2,title:"ressource 3",
                        events:[{id:4,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:58},
                                    {id:5,text:"reserved",start:"00/00/00",end:"00/00/00",width:60,height:15,top:8,left:269}
                                ]
                },
                {id:3,rowIndex:3,title:"ressource 4",
                        events:[{id:6,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:78},
                                    {id:7,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:269}
                                ]
                },
                {id:4,rowIndex:4,title:"ressource 5",
                        events:[{id:8,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:78},
                                    {id:9,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:269}
                                ]
                },
                 {id:5,rowIndex:5,title:"ressource 6",
                        events:[{id:10,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:78},
                                    {id:11,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:269}
                                ]
                },
                {id:6,rowIndex:6,title:"ressource 7",
                        events:[{id:12,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:78},
                                    {id:13,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:269}
                                ]
                },
                {id:7,rowIndex:7,title:"ressource 8",
                        events:[{id:14,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:78},
                                    {id:15,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:269}
                                ]
                },
                 {id:8,rowIndex:8,title:"ressource 9",
                        events:[{id:16,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:78},
                                    {id:17,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:269}
                                ]
                },
                 {id:9,rowIndex:9,title:"ressource 10",
                        events:[{id:18,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:78},
                                    {id:19,text:"reserved",start:"00/00/00",end:"00/00/00",width:40,height:15,top:8,left:269}
                                ]
                },

                ]
            };
        },props:["days","cmonth","cyear","daysInMonth"],
        components:{
            'event':OneEvent,
            'monthandyear':monthAndYear,
            'confirm-dialog':ConfirmDialogVue,
            'reservation-choice':ReservationChoice,
            
        },watch:{
            days:{
                
                async handler(){
                console.log("waaaaaaaaaaaaaaaaaaaaaaaaatch")
                this.buildTableOfTheDays();
                this.fetchTableOfTheDays(this.tableOfDays);
                let bodyDays=this.$refs.bodydaysparent[0].childNodes;
                console.log(bodyDays); 
                this.bodyDaysRects=[];
                bodyDays.forEach(bd=>{
                       console.log(bd.getClientRects());
                        this.bodyDaysRects.push({leftbd:bd.getClientRects()[0].left,rightbd:bd.getClientRects()[0].right})
                     })
                 console.log(this.bodyDaysRects)
                 this.fetchDayRects(this.bodyDaysRects);
                 this.fetchFirstRect(this.bodyDaysRects[0].leftbd);
               let dm=this.cmonth+1;
            let ar={start:`01-${dm}-${this.cyear}`,end:`${this.daysInMonth}-${dm}-${this.cyear}`}
           await this.fetchAllFrontDesk2(ar); 
           console.log("waaaaaaaaaaaaaaaaaaaaaaaaatch")
                }
            }
        },
        beforeUpdate(){
            console.log("before updaaaaaaaaaaaate")
            let bodyDays=this.$refs.bodydaysparent[0].childNodes;
          this.bodyDaysRects=[];
                bodyDays.forEach(bd=>{
                       console.log(bd.getClientRects());
                        this.bodyDaysRects.push({leftbd:bd.getClientRects()[0].left,rightbd:bd.getClientRects()[0].right})
                     })
                 console.log(this.bodyDaysRects)
                 this.fetchDayRects(this.bodyDaysRects);
                 this.fetchFirstRect(this.bodyDaysRects[0].leftbd);
        },
        
        updated(){
            
                 console.log("updaaaaate")
                 console.log("before updaaaaaaaaaaaate")
            let bodyDays=this.$refs.bodydaysparent[0].childNodes;
          this.bodyDaysRects=[];
                bodyDays.forEach(bd=>{
                       console.log(bd.getClientRects());
                        this.bodyDaysRects.push({leftbd:bd.getClientRects()[0].left,rightbd:bd.getClientRects()[0].right})
                     })
                 console.log(this.bodyDaysRects)
                 this.fetchDayRects(this.bodyDaysRects);
                 this.fetchFirstRect(this.bodyDaysRects[0].leftbd);
        
            //let dm=this.cmonth+1;
            //let ar={start:`01-${dm}-${this.cyear}`,end:`${this.daysInMonth}-${dm}-${this.cyear}`}
            //this.fetchAllFrontDesk2(ar);
            //this.bodyDaysRects=null;
        
            
          // bus.$emit('changeTheGrid',this.daysInMonth);
          /*
          this.tableOfDays=this.buildTableOfTheDays(this.days);
            this.fetchTableOfTheDays(this.tableOfDays) ; 
            let bodyDays=this.$refs.bodydaysparent[0].childNodes;
             console.log(bodyDays); 
             this.bodyDaysRects=[];
             bodyDays.forEach(bd=>{
                       console.log(bd.getClientRects());
                        this.bodyDaysRects.push({leftbd:bd.getClientRects()[0].left,rightbd:bd.getClientRects()[0].right})
                     })
            console.log(this.bodyDaysRects)
            this.fetchDayRects(this.bodyDaysRects);
            this.fetchFirstRect(this.bodyDaysRects[0].leftbd);
            
            //let dm=this.cmonth+1;
            //let ar={start:`01-${dm}-${this.cyear}`,end:`${this.daysInMonth}-${dm}-${this.cyear}`}
           let dm=this.cmonth+1;
            let ar={start:`01-${dm}-${this.cyear}`,end:`${this.daysInMonth}-${dm}-${this.cyear}`}
           this.fetchAllFrontDesk2(ar);
           */
           ///
            
             
              
        }
       
        ,async mounted(){
            // this bus emit is for changing the css grif template of the grid
            //bus.$emit('changeTheGrid',this.daysInMonth);
            //this is for returning the daybody clientRects
            if(this.getUser!=null){
            console.log("ayoooooooooooooooooooooooooooooooooooo mounted!!!");
            console.log("debuuuuuuuuuuuuuuuuuuuuuuut")
            console.log("01-"+this.cmonth+"-"+this.cyear)
            console.log("fiiiiiiiiiiiiiiiiiiiiiiin")
            console.log(this.daysInMonth+"-"+this.cmonth+this.cyear)
            console.log("err dehnik ar dayi");
            console.log(this.days)
             
       console.log(this.$refs);

       //pushing values to bodyDaysRects array
        let dm=this.cmonth+1;
            let ar={start:`01-${dm}-${this.cyear}`,end:`${this.daysInMonth}-${dm}-${this.cyear}`
            ,idhotel:this.getUser.hotelCode,token:this.getToken}
              
       //let ar={start:"01-07-2021",end:"30-07-2021"}
               await  this.fetchAllFrontDesk1(ar).then(res=>{
                     console.log(res)
                     let bodyDays=this.$refs.bodydaysparent[0].childNodes;
                    console.log("this.bodyDays")
                     console.log(this.bodyDays)
                     this.bodyDaysRects=[]
                     bodyDays.forEach(bd=>{
                       console.log(bd.getClientRects());
                        this.bodyDaysRects.push({leftbd:bd.getClientRects()[0].left,rightbd:bd.getClientRects()[0].right})
                     })
      console.log(this.bodyDaysRects)
      this.fetchDayRects(this.bodyDaysRects);
      this.fetchFirstRect(this.bodyDaysRects[0].leftbd);
     // this.bodyDaysRects=null;
      //let ar={start:"01-07-2021",end:"30-07-2021"}
        this.fetchAllFrontDesk2(ar);
                 })
       setTimeout(()=>{console.log("attend");
      /* let bodyDays=this.$refs.bodydaysparent[0].childNodes;
      console.log("this.bodyDays")
      console.log(this.bodyDays)
      bodyDays.forEach(bd=>{
        console.log(bd.getClientRects());
        this.bodyDaysRects.push({leftbd:bd.getClientRects()[0].left,rightbd:bd.getClientRects()[0].right})
      })
      console.log(this.bodyDaysRects)
      this.fetchDayRects(this.bodyDaysRects);
      this.fetchFirstRect(this.bodyDaysRects[0].leftbd);
      let ar={start:"01-06-2021",end:"30-06-2021"}
        this.fetchAllFrontDesk2(ar);*/
       }
       ,8000)
      
      // pushing value to rowRects array
      let rowws =document.querySelectorAll(".roww");
      rowws.forEach(item=>{
          this.rowRects.push({top:item.getClientRects()[0].top,bottom:item.getClientRects()[0].bottom})
      })
      console.log(this.rowRects)
          /* 
           this.scheduler.forEach(e => {
               e.events.forEach(v=>{
                   console.log("updated");
            console.log(v.left)
            console.log("x: "+v.left+"y: "+v.top)
            //console.log("length "+this.event.length)
            bus.$emit('changeStyle',{x:v.left,y:v.top}); 
               })
               
            })
           */
            }
    
        },
        computed:{
            ...mapGetters(['getScheduler','getTableOfDays','getDayRects','getFirstRect','getBool',
            'oneReservation','getReservationToPost','getLastNumChambre','getUser','getToken']),
            style(){
               return `--grid-template-columns: repeat(${this.daysInMonth},1fr)`
               
                },
                rowstyle(){
                    console.log("this.getScheduler.length()");
                    console.log(this.getScheduler.length);
                     return `--grid-template-rows: repeat(${this.getScheduler.length},1fr)`
                },
               },
               created(){
                   this.whoAMI();
                    if(this.getUser!=null){
                   bus.$on('changeTheGrid',(n)=>{
                       this.change(n);
                   })
                   bus.$on('changeEvent',()=>{
                      //let u= this.buildTableOfTheDays(data.days);
                        //this.changeEvents(data.start,data.end,u);
                       //this.buildTableOfTheDays()
                      // this.up=true;
                       //console.log("aaaaaaaaaaaaaaaaaaaaaaa "+this.up)
                       console.log(this.cmonth);
                       console.log(this.days);
                       console.log(this.tableOfDays);
                        console.log("aaaaaaaaaaaaaaaaaaaaaaa")
                       // console.log(data.days)
                        //this.startmonth=data.start;
                        //this.endmonth=data.end;
                       // this.changeEvents()

                        
                   })
                   bus.$on('eventClicked',(data)=>{
                       console.log("ikechmed ar event Cliiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiicked")
                       console.log("dayi on initialise reservation")
                       this.reservation=data.reservation;
                        if(!this.reservation.dateDebut){
                            this.datedeb=null;
                             }else{
                             const[dd,mm,yyyy]=this.reservation.dateDebut.split('-');
                              this.reservation.dateDebut=`${yyyy}-${mm}-${dd}`;
                              }
                         if(!this.reservation.datefin){
                              this.datefin=null;
                          }else{
                               const[dd,mm,yyyy]=this.reservation.datefin.split('-');
                               this.reservation.datefin=`${yyyy}-${mm}-${dd}`;
                                }
                       this.reservation.idHotel=this.getUser.hotelCode;
                       this.reservation.username=this.getUser.sub;
                       console.log("reservatiooooooooooooooooooooooooon")
                       console.log(data.reservation);
                       this.getIntervalDate(data.leftEv,data.rightEv);
                       
                      
                   })
                   bus.$on('oldEvent',(data)=>{
                       this.eventDragging=data;
                   })
                    bus.$on('newEvent',(data)=>{
                    this.eventDragged=data;
                    this.selectedRow=this.getIndexofTheRow(data.newY);
                   })
                 
                 //let ar={start:"01-06-2021",end:"30-06-2021"}
                 //this.fetchAllFrontDesk1(ar);
                 console.log("i3edad sayi encore une fois")
                 this.buildTableOfTheDays(this.days);
                 this.fetchTableOfTheDays(this.tableOfDays) ; 
                    }
               },
               
         methods: {
             ...mapActions(['fetchAllFrontDesk1','fetchAllFrontDesk2','fetchTableOfTheDays','fetchDayRects','fetchFirstRect',
             'buildReservationToPost','roomChanged','editReservation','lastNumChambre','whoAMI','setReservationUserInfo']),
            change(num){
                console.log("faut voir aywaq wayi sexecuuuuute")
                this.h=this.d;
                document.querySelector(".header").style.setProperty('--grid-template-columns','repeat('+num+',3fr)');
                
                document.querySelectorAll(".bodyDaysParent").forEach(e=>{
                    e.style.setProperty('--grid-template-columns','repeat('+num+',3fr)');
                })

            },
            returnEvent(res,ind){
                console.log("ikechmed ar la method ayi double")
                console.log(res);
                console.log(ind);
            },
            getResItem(res){
                console.log(res);
            },
            syncScrollBody(e){
                let r=document.querySelector('.ressourcesList');
                r.scrollTop=e.target.scrollTop;
                let h=document.querySelector('.headerparent');
                h.scrollLeft=e.target.scrollLeft;
            },
            syncScrollVertical(e){
                let b=document.querySelector('.bodyy');
                b.scrollTop=e.target.scrollTop;
            },
            syncTheHorizontanlScroll(e){
                let b=document.querySelector('.bodyy');
                b.scrollLeft=e.target.scrollLeft
            },
            onCancel(){
                this.dialog=false;
            },
            onConfirm(){
                this.$router.push({path:'/newreservationfrontdesk',query:{start:this.clickedDate,end:this.clickedDate,numChambre:this.currentItemRes.numChambre,
                typeChambre:this.currentItemRes.typeChambre.nomType,selectedRow:this.selectedRow}});
            },
            changeEvents(){
               // this.tableOfDays=this.buildTableOfTheDays(days);
                //console.log(days)
                //console.log("eveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeents")
                //console.log(days)
               // console.log(this.tableOfDays)
                //console.log(this.buildTableOfTheDays(days))
                 //let ar={start:"01-06-2021",end:"30-06-2021"}
                 //this.fetchAllFrontDesk1(ar);
                 console.log("verif obligatoire")
                 console.log(this.tableOfDays)
                 this.fetchTableOfTheDays(this.tableOfDays);
            let bodyDays=this.$refs.bodydaysparent[0].childNodes;
             console.log(bodyDays); 
             this.bodyDaysRects=[];
             bodyDays.forEach(bd=>{
                       console.log(bd.getClientRects());
                        this.bodyDaysRects.push({leftbd:bd.getClientRects()[0].left,rightbd:bd.getClientRects()[0].right})
                     })
            console.log(this.bodyDaysRects)
            this.fetchDayRects(this.bodyDaysRects);
            this.fetchFirstRect(this.bodyDaysRects[0].leftbd);
            
            //let dm=this.cmonth+1;
            //let ar={start:`01-${dm}-${this.cyear}`,end:`${this.daysInMonth}-${dm}-${this.cyear}`}
            let ar={start:this.startmonth,end:this.endmonth,idhotel:this.getUser.hotelCode,token:this.getToken}
           this.fetchAllFrontDesk2(ar);
            },
            getRows(day,res,e,ind){
               // console.log(e.target.attributes.name.value+" at row "+e.target.attributes.index.value);
                //if(e.target.className=='row'){
               // console.log("aqline dayi"+e.target.attributes.index)
                //console.log(e.target.attributes.index.value);
                console.log("ajdhiiiiiidh a khali")
                console.log(e);
                console.log(day);
                console.log(res);
                console.log("ajdhiiiiiidh a khali")
                if(!this.existingEvent(e)){
                console.log("e.target ayiniiiii")
                //console.log(parseFloat(e.target.offsetWidth)-parseFloat(e.target.clientWidth));
                //this.scheduler[parseInt(e.target.attributes.rowIndex.value)].events.push({width:40,height:20,left:parseFloat(window.getComputedStyle(e.target).width)*(parseInt(e.target.attributes.index.value)),top:8});
                //console.log(this.scheduler);
               // console.log(parseFloat(window.getComputedStyle(e.target).width)+" X "+parseInt(e.target.attributes.index.value));
                //this.$router.push({name:'ReservationForm'});
                let da=day.completeDate.getDate();
                if(da<10){
                    da="0"+da;
                }
                let month=day.completeDate.getMonth()+1;
                if(month<10){
                    month="0"+month;
                }
                let year=day.completeDate.getFullYear();
                this.clickedDate=`${da}-${month}-${year}`;
                this.currentItemRes=res;
                this.selectedRow=ind;
                this.dialogTitle=`Ajouter une reservation pour la chambre ${res.numChambre} le ${da}-${month}-${year}`;
                //this.dialogText=`voulez vous ajouter une reservation pour la chambre ${res.numChambre} le ${da}-${month+1}-${year}`;
                this.dialog=true;
                console.log("clientX");
                console.log(e.clientX)
                }else{
                    console.log("existing event can't reserve")
                }
                console.log("ressourcesListRects")
                console.log(document.querySelector(".ressourcesList").getClientRects())
               // let roww=document.querySelector("#row0");
               //let res= roww.querySelectorAll(".resizable");
               //console.log(res)
               // this.getIntervalDate(e.clientX,e.clientX)
               // }
               console.log("existingEvent");
              console.log(this.existingEvent(e));
           },
          
           getIntervalDate(leftEv,rightEv){
               console.log("this.bodyDaysRects[19]");
               console.log(this.bodyDaysRects[19]);
               let bodyyElement=document.querySelector(".bodyy");
               function bodyDayIndexOfLeftEv(dom){
                   return dom.leftbd<=leftEv+bodyyElement.scrollLeft && dom.rightbd>leftEv+bodyyElement.scrollLeft;
               }
               function theBodyDayIndexOfTheRightEv(dom){
                   return dom.leftbd<rightEv+bodyyElement.scrollLeft && dom.rightbd>=rightEv+bodyyElement.scrollLeft;
               }
               let indexOfTheLeftEv= this.bodyDaysRects.findIndex(bodyDayIndexOfLeftEv);
               let indexOfTheRightEv=this.bodyDaysRects.findIndex(theBodyDayIndexOfTheRightEv);
                
           console.log("theBodyDayIndexOfTheRightEv");
           this.startOfSelectedEv=this.parseDate(this.days[indexOfTheLeftEv].completeDate);
           this.endOfSelectedEv=this.parseDate(this.days[indexOfTheRightEv].completeDate);
           console.log("toutes les infos necessaire ^pour la modif")
           console.log(this.eventDragging);
           let m={start:this.days[indexOfTheLeftEv].completeDate,
                  end:this.days[indexOfTheRightEv].completeDate,
                  oldRowIndex:this.eventDragging[0].oldRowIndex,
                  newRowIndex:this.selectedRow,
                
                }
                  
                console.log(m);
                console.log("this.$refs.ressourceliste")
                console.log(this.$refs)
                console.log(this.$refs.ressourceliste)
                this.lastNumChambre(this.$refs.ressourceliste[this.eventDragging[0].oldRowIndex].textContent);
                this.reservation.chambre.numChambre=this.$refs.ressourceliste[this.selectedRow].textContent;
               
               if(!this.startOfSelectedEv){
                            this.datedeb=null;
                             }else{
                             const[dd,mm,yyyy]=this.startOfSelectedEv.split('-');
                              this.reservation.dateDebut=`${yyyy}-${mm}-${dd}`;
                              }
                         if(!this.endOfSelectedEv){
                              this.datefin=null;
                          }else{
                               const[dd,mm,yyyy]=this.endOfSelectedEv.split('-');
                               this.reservation.datefin=`${yyyy}-${mm}-${dd}`;
                                }
               
               //this.reservation.dateDebut=this.startOfSelectedEv;
                //this.reservation.datefin=this.endOfSelectedEv;
                if(m.oldRowIndex!==m.newRowIndex){
                    this.roomChanged(true)
                }
                let ar1={idhotel:this.getUser.hotelCode,token:this.getToken,username:this.getUser.sub}
               console.log(ar1)
               this.setReservationUserInfo(ar1)
                this.buildReservationToPost(this.reservation)
                let ar2={reservationToPost:this.getReservationToPost,token:this.getToken}
            this.editReservation(ar2);
           console.log(m);
           bus.$emit("reservationModified",{start:this.days[indexOfTheLeftEv].completeDate,end:this.days[indexOfTheRightEv].completeDate})
           console.log(this.days[indexOfTheRightEv].completeDate);
           console.log(this.days[indexOfTheLeftEv].completeDate)
           },
           existingEvent(e){
               console.log("events");
                let events= e.target.parentNode.parentNode.querySelectorAll(".resizable");
            let v=[];
               events.forEach(ev=>{
                  //console.log(ev.getClientRects())
                    v.push({left:ev.getClientRects()[0].left,right:ev.getClientRects()[0].right});
                })
               console.log(events);
               console.log(v);
              return v.some(item=>{return e.clientX<=item.right && e.clientX>=item.left});

           },
           existingEventWithCoordsAndIndex(x,index){
               let row=document.querySelectorAll("#row"+index);
               let events=row.querySelectorAll(".resizable");
               let v=[];
               events.forEach(ev=>{
                   v.push({left:ev.getClientRects()[0].left,right:ev.getClientRects()[0].right})
               })
               return v.some(item=>{return x<=item.right && x>=item.left});
           },
           getIndexofTheRow(y){
               function indexOfTheRow(dom){
                   return dom.top <= y && dom.bottom>y
               }
              let indexR= this.rowRects.findIndex(indexOfTheRow);
              //console.log("the row index is "+indexR)
              return indexR;
           },
           VerifyEventDropping(oldRowIndex,oldClientX,newClientX,newClientY){
               let newRowIndex=this.getIndexofTheRow(newClientY);
               let bool=this.existingEventWithCoordsAndIndex(newClientX,newRowIndex);
               if(!bool){
                   //donc on fait le drop normal on supprime l'ancienne valeur du scheduler et on lajoute vers le nouveau rowIndex
                        
               }else{
                   //on annule le drop le sheduler reste ainsi mais on va modifier le left et le right pour le render a son ancienne place

               }
           },
           parseDate(datee){
               
               let da=datee.getDate()
               if(da<10){
                    da="0"+da;
                }
                let month=datee.getMonth()+1;
                if(month<10){
                    month="0"+month;
                }
                let year=datee.getFullYear();
                return`${da}-${month}-${year}`;

           },
           buildTableOfTheDays(){
               console.log("aqlagh g la methode buildTableOfTheDays ")
               console.log(this.days);
               this.tableOfDays=[]
               let newAr=[];
                console.log("avant adhikchem ar foreach");
               this.days.forEach(e=>{
                   console.log("ikchem ar foreach");
                   let compDate=e.completeDate;
                   let day=compDate.getDate();
                   let month=compDate.getMonth()+1;
                   console.log("monthhhhhhhhhhh")
                   console.log(month)
                   if(day<10){
                       day="0"+day;
                   }
                   
                   if(month<10){
                       month="0"+month
                   }
                   let year=compDate.getFullYear();
                   let formatedDate=day+"-"+month+"-"+year;
                   console.log(formatedDate);
                   newAr.push(formatedDate);
                   console.log("avant adifagh ar foreach");
               })
               this.tableOfDays=newAr
               console.log("ifghed  g foreach");
               console.log(this.tableOfDays)
               console.log("aqlagh g la methode buildTableOfTheDays ")
               return this.tableOfDays;
           }
          
            
            
        }
}
        

</script>

<style src="./Liste.css">

</style>