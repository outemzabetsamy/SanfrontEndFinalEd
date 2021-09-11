import axios from "axios"

const state={
    factures:[],
    facture:[],

}
const getters={
    getFactures:(state)=>state.factures,
    getFacture:(state)=>state.facture,
}
const actions={
    async fetchAllFactures({commit},ar){
        console.log("fetchAllFactures");
        await axios.get(`https://sanhotelfacture.herokuapp.com/api/facture/all?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}}).then(
            res=>{
                console.log(res);
                commit('setFactures',res.data);
            }
        )
    },
    async fetchOneFactureById({commit},ar){
        await axios.get(`https://sanhotelfacture.herokuapp.com/api/facture/all/id/${ar.id}?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}}).then(
            res=>{
                console.log(res);
                commit('setFacture',res.data);
            }
        )
    },
    async fetchOneFacture({commit},fact){
        commit('setFacture',fact);
    },
    async confirmFacture({commit},ar){
        ar.fact.paid=true;
        ar.fact.datePaiement=new Date();
        await axios.put(`https://sanhotelfacture.herokuapp.com/api/facture/edit`,ar.fact
        ,{headers:{Authorization:ar.token}});
        
        commit('setFacture',ar.fact);
    }
}
const mutations={
    setFactures:(state,facts)=>(state.factures=facts),
    setFacture:(state,fact)=>(state.facture=fact),


}

export default{
    state,
    getters,
    actions,
    mutations
}