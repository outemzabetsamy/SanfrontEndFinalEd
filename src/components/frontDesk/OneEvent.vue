<template>
<v-tooltip bottom>
  <template v-slot:activator="{ on}">
 <VueResizable
        class="resizable"
        ref="resizableComponent"
        :dragSelector="dragSelector"
        :active="handlers"
        :fit-parent="fit"
        :max-width="maxW | checkEmpty"
        :max-height="maxH | checkEmpty"
        :min-width="minW | checkEmpty"
        :min-height="minH | checkEmpty"
        :width="width"
        :height="height"
        :left="left"
        :top="top"
        @mount="eHandler"
        @resize:move="eHandler"
        @resize:start="eHandler"
        @resize:end="eHandler"
        @drag:move="eHandler"
        @drag:start="eHandler"
        @drag:end="eHandler"
        v-on="on">
    <div :class="`event ${reservation.etatReservation}`" :res="res" :reservation="reservation" :ind="ind" v-on:mousedown="mouseDownEvent(res,ind,$event)" @mouseup="mouseUpEvent" @click="getEvent(res,ind,reservation,$event)">
      <strong>{{reservation.client.nomClient}}</strong>
      </div>
    </VueResizable>
     </template>
     <span>Tooltip</span>
     </v-tooltip>
</template>
<script>
//import Vue from 'vue';
/*
div.style.left=e.pageX-sc.offsetLeft+sc.scrollLeft-84+"px"
    div.style.top=e.pageY-sc.offsetTop+sc.scrollTop-101+"px"
*/
import VueResizable from 'vue-resizable';
//const VueResizable=require('vue-resizable');
//Vue.use(VueResizable);
import {bus} from '../../main'
export default {
    data() {
        const tW = 50;
        const tH = 20;
        
        return {
          eventDragging:[],
            leftBounding:0,
            rightBounding:0,
            init:false,
            x1:80,
            y1:80,
             handlers: ["r","l"],
      left: this.init?`calc( 50% - ${tW / 2}px)`:this.xleft,
      top: this.init?`calc(50% - ${tH / 2}px)`:this.ytop,
      height: this.propheight,
      width: this.propwidth,
      maxW: 1000,
      maxH: 20,
      minW: 10,
      minH: 20,
      fit: false,
      event: "",
      dragSelector: ".event"
        }
    },
    components:{VueResizable},
     props:[
     'xleft',
     'ytop',
     'propwidth',
     'propheight',
     'res',
     'ind',
     'reservation'
     ],
     mounted(){
       /*
      // document.querySelector('.event').style.setProperty('--x',this.xleft+'px');
      // document.querySelector('.event').style.setProperty('--y',this.ytop+'px');
      console.log("mounteeed");
      console.log(document.getElementById("row0").childNodes[0].childNodes);
      let bodyDays=document.getElementById("row0").childNodes[0].childNodes;
      bodyDays.forEach(bd=>{
        console.log(bd.getClientRects());
      })
      */
     console.log("mounteeeeeeeeeeeeeeeeeeeeeeeeed")
     let resizableR=document.querySelectorAll(".resizable-r");
     resizableR.forEach(e=>{
      
       e.addEventListener("mouseup",this.getInterval)
       
     })

     let resizableL=document.querySelectorAll(".resizable-l");
     resizableL.forEach(e=>{
       e.addEventListener("mouseup",this.getInterval)
     })
     },
  watch:{
    rightBounding:function(){
      console.log("this.eventWatch"+this.rightBounding);
      console.log("this.rightBounding")
      console.log(this.rightBounding)
      bus.$emit('eventClicked',{leftEv:this.leftBounding,rightEv:this.rightBounding});
      console.log("eventCickedemitteeed")
    }
  },
     created(){
         //console.log("the new props is "+this.test);
        console.log("createdddd1");
        bus.$on('changeStyle',(obj)=>{
        console.log("createdddd22");
        this.changeStyle(obj);
        console.log("createdddd33");
        console.log(obj);
                   });
        console.log("this.propwidth") 
        console.log(this.propwidth) 
               },
               
     updated(){
       console.log("sahitou");
     },
     methods:{
        // changeStyle:function(obj){
             /* console.log("obj"+obj);
              this.left=obj.x;
              this.top=obj.y;*/
              //console.log("x1 "+this.x1+" y1 "+this.y1);
              //document.querySelector('.event').style.setProperty('--x',obj.x+'px');//="180px";
         //document.querySelector('.event').style.setProperty('--y',obj.y+'px');
         getEvent:function(res,ind,reservation,e){
               console.log("getEvent ajdhiiiidh a khali");
               console.log(e);
               console.log(res),
               console.log(ind),
               console.log(reservation)
               console.log("getEvent ajdhiiiidh a khali"),
              console.log(e.target.getClientRects())
              console.log("e.target.getClientRects()[0].right")
              console.log(e.target.getClientRects()[0].right)
              bus.$emit('eventClicked',{leftEv:e.target.getClientRects()[0].left,rightEv:e.target.getClientRects()[0].right,reservation:reservation})

           },
         
          eHandler(data) {
      this.width = data.width;
      this.height = data.height;
      this.left = data.left;
      this.top = data.top;
      this.event = data.eventName;
      //console.log("dragging");
    },
    
           getInterval:function(e){
             console.log("getInterval");
            // bus.$emit('eventClicked',{leftEv:e.target.parentNode.childNodes[0].getClientRects()[0].left,rightEv:e.target.parentNode.childNodes[0].getClientRects()[0].right})
            this.leftBounding=e.target.parentNode.childNodes[0].getClientRects()[0].left;
            this.rightBounding=e.target.parentNode.childNodes[0].getClientRects()[0].right;   
            console.log(this.rightBounding)
           },
           canIRes(e){
               console.log(e.clientX);
           },
           mouseDownEvent(res,ind,e){
             console.log(e.clientX)
            // console.log(e.target.parentNode.parentNode.attributes.index.value);
            //this.eventDragging.push({oldRowIndex:e.target.parentNode.parentNode.parentNode.attributes.index.value,oldX:e.clientX})
           console.log("oldRooooowIndeeeeeex")
           console.log({oldRowIndex:ind,res:res,oldX:e.clientX})
            this.eventDragging.push({oldRowIndex:ind,res:res,oldX:e.clientX})
            bus.$emit("oldEvent",this.eventDragging);
           },
           mouseUpEvent(e){
             console.log(e.clientX)
             
             bus.$emit("newEvent",{newX:e.clientX,
                                  newY:e.clientY,
                                  newLeftEv:e.target.getClientRects()[0].left,
                                  newRightEv:e.target.getClientRects()[0].right
             });
           }
  },
  filters: {
    checkEmpty(value) {
      return typeof value !== "number" ? 0 : value;
    }
     }
    
}
</script>
<style scoped>
:root{
--x:0;
--y:0;
  }
.event {
    color: white;
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    /*background-color: red;*/
    /*top:var(--y);
    left: var(--x);*/
    border-radius: 25px;
    cursor: pointer;
    z-index: 3;
    
}
.Option{
  background-color: gold;
}
.Annulé {
  background-color: red;
}
.Validé{
  background-color: seagreen;
}
.Confirmé {
  background-color: blue;
}

.resizable {
  position: absolute;
    padding: 0px 0px 0px 0px;  
    }
</style>