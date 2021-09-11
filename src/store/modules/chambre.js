import axios from "axios";
import {bus} from '../../main';
let nums=[];
const state={
    chambres:[],
   chambre: {id:'',numChambre:'',numEtage:'',etatChambre:'',typeChambre:{id:'',nomType:'',nbMaxPers:'',prixAdulte:'',prixEnfant:''},idHotel:'',username:''},
   chambreToPost: {id:'',numChambre:'',numEtage:'',etatChambre:'',typeChambre:'',idHotel:'',username:''},
   chambreReset: {id:'',numChambre:'',numEtage:'',etatChambre:'',typeChambre:{id:'',nomType:'',nbMaxPers:'',prixAdulte:'',prixEnfant:''},idHotel:'',username:''},
    numChambres:[],
    dialogLoader:false,
}

const getters={
    oneChambre:(state)=>state.chambre,
    allChambres:(state)=>state.chambres,
    getChambreToPost:(state)=>state.chambreToPost,
    getNumChambres:(state)=>state.numChambres,
    getDialogLoader:(state)=>state.dialogLoader,
}

const actions={
    async fetchAllChambres({commit},ar){
        const response = await axios.get(`https://sanhotelchambre.herokuapp.com/api/rooms/all?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}});
        console.log(response.data);
             commit('setChambres',response.data);
             /*
             */
             console.log(response.data);
     },

     async getChambreById({commit},ar){
        const response=await axios.get(`https://sanhotelchambre.herokuapp.com/api/rooms/all/${ar.id}?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}});
        console.log('getChambreById');

        console.log(response.data)
        commit('setOneChambre',response.data);
    },

    async getChambreByType({commit},ar){
        commit('setLoader',true);
        console.log("ikechmeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed")
        const response=await axios.get(`https://sanhotelchambre.herokuapp.com/api/rooms/all/typechambre/${ar.type}?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}});
        console.log('getChambreByType');

        console.log(response.data)
        commit('setChambres',response.data);
        nums=[];
        response.data.forEach(element => {
            nums.push(element.numChambre);
        });
        commit('setNumChambres',nums);
        console.log('getChambreByType commiiiiiiiiiiited');
        commit('setLoader',false);
    },
    async getChambreByEtat({commit},ar){
        const response=await axios.get(`https://sanhotelchambre.herokuapp.com/api/rooms/all/etatchambre/${ar.etatChambre}?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}});
        console.log('getChambreByEtat');
        console.log(response.data)
        commit('setChambres',response.data);
    },
    async addChambre({commit},ar){
        if(!ar.chambreToPost.id){
        await axios.post('https://sanhotelchambre.herokuapp.com/api/rooms/add',ar.chambreToPost
        ,{headers:{Authorization:ar.token}})
        .then(res=>{console.log(res);
            //const response2=  axios.get(`https://sanhotelchambre.herokuapp.com/api/rooms/all/${response1.data.id}?idhotel=${ar.idhotel}`
            //,{headers:{Authorization:ar.token}});
            bus.$emit('successAdd',{bool:true,color:'success',notice:"Nouvelle Chambre ajouté avec succès."})
            commit('newChambre',res.data)
        })
        .catch(err=>{
            console.log(err);
            console.log("erreur ajout")
            bus.$emit('errorAdd',{bool:true,color:'error',notice:"Echec Ajout Nouvelle Chambre."})
        })
        
        }else{
            await axios.put(`https://sanhotelchambre.herokuapp.com/api/rooms/edit`,ar.chambreToPost
            ,{headers:{Authorization:ar.token}})
            .then(res=>{console.log(res);
                bus.$emit('successEdit',{bool:true,color:'success',notice:"Chambre modifié avec succès."})
                commit('newChambre',res.data)
            })
            .catch(err=>{
                console.log(err);
                bus.$emit('erroredit',{bool:true,color:'error',notice:"Echec modification Chambre."})
                
            })  
        }
    },
    async resetChambre({commit}){
        commit('clearChambre',state.chambreReset);
    },
    async deleteChambre({commit},ar){
        await axios.delete(`https://sanhotelchambre.herokuapp.com/api/rooms/delete/${ar.id}?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}}).then(res=>{
            commit('removeChambre',ar.id);
            console.log(res);
            bus.$emit('successDelete',{bool:true,color:'success',notice:"Operation faite avec succès."})
        })
        .catch(err=>{
            console.log(err);
            bus.$emit('errorDelete',{bool:true,color:'error',notice:"Echec operation! Veuillez réessayer ulterieurement."})
        })
    },
    async setChambreUserInfo({commit},ar){
        commit('setIdHotel',ar.idhotel);
        commit('setUserName',ar.username);
    },
    async buildChambreToPost({commit},chambre){
        let ch={id:'',numChambre:'',numEtage:'',etatChambre:'',typeChambre:'',idHotel:'',username:''};
    ch.id=chambre.id;
    ch.numChambre=chambre.numChambre;
    ch.numEtage=chambre.numEtage;
    ch.typeChambre=chambre.typeChambre.nomType;
    ch.idHotel=chambre.idHotel;
    ch.etatChambre=chambre.etatChambre;
    ch.username=chambre.username;
    commit('setTheChambreToPost',ch);
    return ch;
    },
}

const mutations={
setChambres:(state,chambres)=>state.chambres=chambres,
setOneChambre:(state,chambre)=>state.chambre=chambre,
newChambre:(state,chambre)=>state.chambres.push(chambre),
clearChambre:(state,chambre)=>state.chambre=chambre,
removeChambre:(state,id)=>(state.chambres=state.chambres.filter(chambre=>chambre.id!==id)),
setNumChambres:(state,items)=>state.numChambres=items,
setLoader:(state,bool)=>state.dialogLoader=bool,
setIdHotel:(state,idhotel)=>(state.chambre.idHotel=idhotel),
setUserName:(state,username)=>(state.chambre.username=username),
setTheChambreToPost:(state,ch)=>(state.chambreToPost=ch),
}


export default{
    state,
    getters,
    actions,
    mutations
}