import axios from "axios";
import {bus} from '../../main';
const noms=[];
const state={
 typeChambres:[],
 typeChambre:{id:'',nomType:'',nbMaxPers:'',prixAdulte:'',prixEnfant:'',idHotel:'',username:''},
 typeChambreReset:{id:'',nomType:'',nbMaxPers:'',prixAdulte:'',prixEnfant:'',idHotel:'',username:''},
 nomTypeChambres:[],
}

const getters={
    oneTypeChambre:(state)=>state.typeChambre,
    allTypeChambres:(state)=>state.typeChambres,
    allnomTypeChambres:(state)=>state.nomTypeChambres,
    
}

const actions={
    async fetchAllTypeChambres({commit},ar){
        const response = await axios.get(`https://sanhoteltypechambre.herokuapp.com/api/typechambres/all?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}});
        console.log(response.data);
             commit('setTypeChambres',response.data);
             console.log("avant adikchem ar foreeaaach")
             response.data.forEach(element => {
                 noms.push(element.nomType);
             });
             console.log("apres foreaaach")
             console.log("noooooooooooooooooooooom type");
             console.log(noms);
             commit('setNomType',noms)
             console.log(response.data);
     },

     async getTypeChambreById({commit},ar){
        const response=await axios.get(`https://sanhoteltypechambre.herokuapp.com/api/typechambres/all/${ar.id}?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}});
        console.log('getTypeChambreById');
        console.log(response.data)
        commit('setOneTypeChambre',response.data);
    },

    async addTypeChambre({commit},ar){
        if(!ar.typeChambre.id){
        await axios.post('https://sanhoteltypechambre.herokuapp.com/api/typechambres/add',ar.typeChambre
        ,{headers:{Authorization:ar.token}})
        .then(res=>{console.log(res)
            //const response2=  axios.get(`https://sanhoteltypechambre.herokuapp.com/api/typechambres/all/${response1.data.id}`
            //,{headers:{Authorization:ar.token}} );
            bus.$emit('successAdd',{bool:true,color:'success',notice:"Nouveau type chambre ajouté avec succès."})
            commit('newTypeChambre',res.data)
        })
        .catch(err=>{
            console.log(err);
            console.log("erreur ajout")
            bus.$emit('errorAdd',{bool:true,color:'error',notice:"Echec ajout nouveau type chambre."})
        })
        
        }else{
            await axios.put(`https://sanhoteltypechambre.herokuapp.com/api/typechambres/edit`,ar.typeChambre)
            .then(res=>{console.log(res);
                bus.$emit('successEdit',{bool:true,color:'success',notice:"Type chambre modifié avec succès."})
                commit('newTypeChambre',res.data)
            })
            .catch(err=>{
                console.log(err);
                bus.$emit('erroredit',{bool:true,color:'error',notice:"Echec modification du type chambre"})
                
            })  
        }
    },
    async resetTypeChambre({commit}){
        commit('clearTypeChambre',state.typeChambreReset);
    },

    async deleteTypeChambre({commit},ar){
        await axios.delete(`https://sanhoteltypechambre.herokuapp.com/api/typechambres/delete/${ar.id}?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}}).then(res=>{
            commit('removeTypeChambre',ar.id);
            console.log(res);
            bus.$emit('successDelete',{bool:true,color:'success',notice:"Operation faite avec succès."})
        })
        .catch(err=>{
            console.log(err);
            bus.$emit('errorDelete',{bool:true,color:'error',notice:"Echec operation! Veuillez réessayer ulterieurement."})
        })
    },
    async setTypeChambreUserInfo({commit},ar){
        commit('setIdHotel',ar.idhotel);
        commit('setUserName',ar.username);
    }
}
const mutations={
    setTypeChambres:(state,typeChambres)=>state.typeChambres=typeChambres,
    setOneTypeChambre:(state,typeChambre)=>state.typeChambre=typeChambre,
    newTypeChambre:(state,typeChambre)=>state.typeChambres.push(typeChambre),
    clearTypeChambre:(state,typeChambre)=>state.typeChambre=typeChambre,
    removeTypeChambre:(state,id)=>(state.typeChambres=state.typeChambres.filter(typechambre=>typechambre.id!==id)),
    setNomType:(state,noms)=>state.nomTypeChambres=noms,
    setIdHotel:(state,idhotel)=>state.typeChambre.idHotel=idhotel,
    setUserName:(state,username)=>state.typeChambre.username=username,
}


export default{
    state,
    getters,
    actions,
    mutations
}