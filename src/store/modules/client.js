import axios from "axios";
import {bus} from '../../main';

const state={
    clients:[],
    client:{id:null,nomClient:'',prenomClient:'',ageClient:'',civiliteClient:'',
    typeClient:'',adresseClient:'',numIDNational:'',numTelClient:'',idHotel:'',username:''},
    clienReset:{id:null,nomClient:'',prenomClient:'',ageClient:'',civiliteClient:'',
    typeClient:'',adresseClient:'',numIDNational:'',numTelClient:'',idHotel:'',username:''}
    

};
const getters={
    oneClient:(state)=>state.client,
    allClients:(state)=>state.clients,

};
const actions={
async fetchAllClients({commit},ar){
   const response = await axios.get(`https://sanhotelclient.herokuapp.com/api/client/all?idhotel=${ar.idhotel}`
   ,{headers:{Authorization:ar.token}});
   console.log(response.data);
        commit('setClients',response.data);
        console.log(response.data);
},
async addClient({commit},ar){
    if(!ar.client.id){
    await axios.post('https://sanhotelclient.herokuapp.com/api/client/add',ar.client,{headers:{Authorization:ar.token}})
    .then(res=>{console.log(res);
        bus.$emit('successAdd',{bool:true,color:'success',notice:"New customer has been added."})
        commit('newClient',res.data)
    })
    .catch(err=>{
        console.log(err);
        console.log("erreur ajout")
        bus.$emit('errorAdd',{bool:true,color:'error',notice:"Failed to add new customer."})
    })
    
    }else{
        await axios.put(`https://sanhotelclient.herokuapp.com/api/client/edit`,ar.client,{headers:{Authorization:ar.token}})
        .then(res=>{console.log(res);
            bus.$emit('successEdit',{bool:true,color:'success',notice:"Customer has been updated with success."})
            commit('newClient',res.data)
        })
        .catch(err=>{
            console.log(err);
            bus.$emit('erroredit',{bool:true,color:'error',notice:"Failed to update customer."})
            
        })  
    }
},
async getClientById({commit},ar){
    const response=await axios.get(`https://sanhotelclient.herokuapp.com/api/client/all/${ar.id}?idhotel=${ar.idhotel}`,{headers:{Authorization:ar.token}});
    console.log('getClientById');
    console.log(response.data)
    commit('setOneClient',response.data);
},
async resetClient({commit}){
    commit('clearClient',state.clienReset);
},
async deleteClient({commit},ar){
    await axios.delete(`https://sanhotelclient.herokuapp.com/api/client/delete/${ar.id}?idhotel=${ar.idhotel}`
    ,{headers:{Authorization:ar.token}}).then(res=>{
        commit('removeClient',ar.id);
        console.log(res);
        bus.$emit('successDelete',{bool:true,color:'success',notice:"Operation is done."})
    })
    .catch(err=>{
        console.log(err);
        bus.$emit('errorDelete',{bool:true,color:'error',notice:"Operation failed! Please try again later."})
    })
    

},

async setClientUserInfo({commit},ar){
    commit('setIdHotel',ar.idhotel);
    commit('setUserName',ar.username);
}


};
const mutations={
    setClients:(state,clients)=>(state.clients=clients),
    newClient:(state,client)=>state.clients.push(client),
    setOneClient:(state,client)=>(state.client=client),
    clearClient:(state,client)=>(state.client=client),
    removeClient:(state,id)=>(state.clients=state.clients.filter(client=>client.id!==id)),
    setIdHotel:(state,idhotel)=>(state.client.idHotel=idhotel),
    setUserName:(state,username)=>(state.client.username=username),
};
export default{
    state,
    getters,
    actions,
    mutations
}