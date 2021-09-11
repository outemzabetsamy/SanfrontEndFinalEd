import axios from "axios";
const state={
    statistics:[],
    donutData:null,
    showDonut:false,
    

}

const getters={
    getStatistics:(state)=>state.statistics,
    getDonutData:(state)=>state.donutData,
    getShowDonut:(state)=>state.showDonut,
}

const actions={
    async fetchAllStats({commit},ar){
        await axios.get(`https://sanhotelreservation.herokuapp.com/api/reservation/stats?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}})
        .then(res=>{
            console.log(res);
            commit("setStats",res.data);
            let vals=[];
                vals.push(res.data.nbRoomsBookedOfTheMonth);
                vals.push(res.data.nbTotalRoomsOfTheMonth-res.data.nbRoomsBookedOfTheMonth);
            
            let d={
                labels: ['Nb chambres louée', 'Nb chambres Dispo'],
                datasets: [
                    {
                      backgroundColor: [
                        '#41B883',
                        '#E46651',],
                      data: vals
                    }
                  ]

            }
            commit("setDonutData",d);
            commit("setShowDonut",true);
        }).catch(err=>{
            console.log(err);
        })

    }
}

const mutations={
    setStats:(state,res)=>(state.statistics=res),
    setDonutData:(state,data)=>(state.donutData=data),
    setShowDonut:(state,bool)=>(state.showDonut=bool)
}

export default{
    state,
    getters,
    actions,
    mutations
}