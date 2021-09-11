import axios from "axios"

const state={
    scheduler:[],
    tableOfDays:null,
    dayRects:null,
    firstRect:null,
    bool:false,
    copyRes:null,
    upbool:false,
}

const getters={
    getScheduler:(state)=>state.scheduler,
    getTableOfDays:(state)=>state.tableOfDays,
    getDayRects:(state)=>state.dayRects,
    getFirstRect:(state)=>state.firstRect,
    getBool:(state)=>state.bool,
    getCopyRes:(state)=>state.copyRes,
    //getCopyResWithIndex:(state,index)=>state.copyRes[index],
    
}

const actions ={
    async fetchAllFrontDesk1({commit},ar){
        await axios.get(`https://sanhotelchambre.herokuapp.com/api/rooms/all/frontdesk?startmonth=${ar.start}&endmonth=${ar.end}&idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}})
        .then(res=>{
            console.log(res);
            res.data.forEach(e => {
                console.log(e);
                e.reservation=[];
                
            });
            commit('setScheduler',res.data);
            
        })
    },
    async fetchAllFrontDesk2({commit},ar){
        commit('setBool',false);
        await axios.get(`https://sanhotelchambre.herokuapp.com/api/rooms/all/frontdesk?startmonth=${ar.start}&endmonth=${ar.end}&idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}})
        .then(res=>{
            console.log(res);
            res.data.forEach(e => {
                console.log(e);
                
                e.reservation.forEach(r=>{
                    //juste pour eviter qlq erreurs adesneqsssagh 2px pour le width akni adifagh toujours exacte vec le right ev
                    console.log(findTheCoordsOfTheDate(r.dateDebut));
                    r.left=findTheCoordsOfTheDate(r.dateDebut).leftbd-state.firstRect;
                    r.width=findTheCoordsOfTheDate(r.datefin).rightbd-findTheCoordsOfTheDate(r.dateDebut).leftbd-2;
                    r.top=8;
                    r.height=15;
                })
               
            });
            commit('setScheduler',res.data);
            commit('setBool',true);
        })
    },
    async fetchTableOfTheDays({commit},ar){
        commit('setTableOfTheDays',ar);
    },
    async fetchDayRects({commit},ar){
        
        commit('setDaysRects',ar);
    },
    async fetchFirstRect({commit},rect){
        commit('setFirstRect',rect);
    },
    async addResInFrontDesk({commit},ar){
         commit('initializeCopyRes');
        
        //console.log(this.co.copyRes)
       // commit('setCopyRes',res,ind)
        console.log("verification copyRes")
        //console.log(state.copyRes[0].reservation)
        console.log(ar.ind)
        state.copyRes[ar.ind].reservation.push(ar.res);
        console.log(ar.res);
        console.log(ar.ind)
        //this.state.copyRes[ind].reservation.push(res);
       commit('setScheduler',state.copyRes);
    }
}

const mutations={
    setScheduler:(state,scheduler)=>(state.scheduler=scheduler),
    setBool:(state,bool)=>(state.bool=bool),
    setTableOfTheDays:(state,days)=>(state.tableOfDays=days),
    setDaysRects:(state,rects)=>(state.dayRects=rects),
    setFirstRect:(state,rect)=>(state.firstRect=rect),
    setCopyRes:(state,res,ind)=>(state.copyRes=getters.getCopyResWithIndex(ind).reservation.push(res)),
    initializeCopyRes:(state,)=>(state.copyRes=state.scheduler),
}
const findTheCoordsOfTheDate=(date)=>{
    console.log("findTheCoordsOfTheDate")
    function indexOfTheDate(dom){
        return dom===date;
    }
    let DateIndex=state.tableOfDays.findIndex(indexOfTheDate);
    console.log(state.dayRects[DateIndex]);
    return state.dayRects[DateIndex];
};
export default{
    state,
    getters,
    actions,
    mutations
}