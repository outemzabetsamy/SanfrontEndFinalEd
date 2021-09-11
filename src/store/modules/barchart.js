import axios from "axios"

const state={
    datachart:[],
    labels:[],
    values:[],
    chartdata:{
        labels: [],
        datasets: [
            {
                label: 'Data One',
                backgroundColor: '#f87979',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                pointBorderColor: '#249EBF',
                data:[],
            }
]
    },
    chartdata2:[],
    
}
const getters={
    getAllDataCharts:(state)=>state.datachart,
    getLabels:(state)=>state.labels,
    getValues:(state)=>state.values,
    getChartData:(state)=>state.chartdata,
    getChartData2:(state)=>state.chartdata2,
}
const actions={
    async fetchAllBarChartValues({commit},ar){
        console.log("datefin = "+ar.dateDebut)
        const response= await axios.get(`https://sanhotelreservation.herokuapp.com/api/reservation/bar?deb=${ar.dateDebut}&fin=${ar.dateFin}&idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}})
        commit('setDataCharts',response.data)
        let lab=[];
        response.data.forEach((el) => {
            lab.push(el.dateValue)
        });
        commit('setLabels',lab)
        
        let val=[];
        response.data.forEach((el) => {
            val.push(el.countValue)
        });
        commit('setValues',val)
        commit('setchartData2')
    }
}
const mutations={
    setDataCharts:(state,res)=>(state.datachart=res),
    setLabels:(state,lab)=>(state.chartdata.labels=lab),
    setValues:(state,val)=>(state.chartdata.datasets[0].data=val),
    setchartData2:(state)=>state.chartdata2=state.chartdata,
}
export default{
    state,
    getters,
    actions,
    mutations
}