import axios from "axios"
import {bus} from '../../main';
const state={
    emails:[],
    email:{
        "idEmail":null,
        "modelName":"",
        "bodyEmail":"",
        "subjectEmail":"",
        "toEmail":"",
        "idhotel":null,
        "username":""
    },
    emailReset:{
        "idEmail":null,
        "modelName":"",
        "bodyEmail":"",
        "subjectEmail":"",
        "toEmail":"",
        "idhotel":null,
        "username":""
    },
    emailTemplate:"",
    oneEmailTemplate:
        {
            "toEmailForTemplate":"",
            "emailInfo":{
            "idEmail":null,
            "modelName":"",
            "bodyEmail":"",
            "subjectEmail":"",
            "toEmail":"",
            "idhotel":null,
            "username":""
        },
        "reservation":{"idReservation":null,"typeReservation":"","dateDebut":"","datefin":"","etatReservation":"","nbJours":null,"montantSejour":null,"idFacture":"","idHotel":null,"username":"sheraton_admin","client":{"id":"1631137399617","nomClient":"John","prenomClient":"Doe","typeClient":"VIP","civiliteClient":"Monsieur","ageClient":0,"numIDNational":"213995588964995","adresseClient":"Londre","numTelClient":"0782951869","idHotel":8,"username":""},"chambre":""},
        "hotel": {
            "idHotel": "",
            "nomHotel": "",
            "adresseHotel": "",
            "logo": "",
            "nbEtoiles": "",
            "nomGerant": "",
            "prenomGerant": "",
            "email": ""
          }
        
        },
        mailResponse:"",
    
}
const getters={
    getEmails:(state)=>state.emails,
    getEmail:(state)=>state.email,
    getEmailTemplate:(state)=>state.oneEmailTemplate,
}
const actions={
    async getAllEmails({commit},ar){
     await  axios.get(`https://sanhotelsemails.herokuapp.com/api/mail/all?idhotel=${ar.idhotel}`,{headers:{Authorization:ar.token}})
     .then(res=>{
         console.log(res);
         commit('setEmails',res.data);
     }).catch(err=>{
        console.log(err);
    })
    },
    async getEmailById({commit},ar){
        await axios.get(`https://sanhotelsemails.herokuapp.com/api/mail/all/${ar.id}?idhotel=${ar.idhotel}`,{headers:{Authorization:ar.token}})
        .then(res=>{
            commit('setEmail',res.data)
        }).catch(err=>{
            console.log(err);
        })
       
    },
    async getEmailByModelName({commit},ar){
        await axios.get(`https://sanhotelsemails.herokuapp.com/api/mail/all/${ar.modelName}?idhotel=${ar.idhotel}`,{headers:{Authorization:ar.token}})
        .then(res=>{
            commit('setEmail',res.data)
        }).catch(err=>{
            console.log(err);
        })
       
    },
    async addEmail({commit},ar){
        if(!ar.email.id){
        await axios.post("https://sanhotelsemails.herokuapp.com/api/mail/add",ar.email,{headers:{Authorization:ar.token}}).then(
            res=>{
                console.log(res);
                commit('addEmail',res.data);
                bus.$emit('successAdd',{bool:true,color:'success',notice:"New email has been added."})
            }
        ).catch(err=>{
            console.log(err);
            console.log("erreur ajout")
            bus.$emit('errorAdd',{bool:true,color:'error',notice:"Failed to add new email."})
        } );
    }else{
        await axios.put(`https://sanhotelsemails.herokuapp.com/api/mail/edit`,ar.email,{headers:{Authorization:ar.token}})
        .then(res=>{console.log(res);
            bus.$emit('successEdit',{bool:true,color:'success',notice:"Email has been updated with success."})
            commit('addEmail',res.data)
        })
        .catch(err=>{
            console.log(err);
            bus.$emit('erroredit',{bool:true,color:'error',notice:"Failed to update email."})
            
        })  
    }
       
    },
    async resetEmail({commit}){
        commit('clearEmail',state.emailReset);
    },
    async deleteEmail({commit},ar){
        await axios.delete(`https://sanhotelsemails.herokuapp.com/api/mail/delete/${ar.id}?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}}).then(res=>{
            commit('removeEmail',ar.id);
            console.log(res);
            bus.$emit('successDelete',{bool:true,color:'success',notice:"Operation is done."})
        })
        .catch(err=>{
            console.log(err);
            bus.$emit('errorDelete',{bool:true,color:'error',notice:"Operation failed! Please try again later."})
        })
    },
    async setEmailUserInfo({commit},ar){
        commit('setIdHotel',ar.idhotel);
        commit('setUserName',ar.username);
    },
    async sendReservationEmail({commit},ar){
        await (await axios.post("https://sanhotelsemails.herokuapp.com/api/mail/add",ar.emailTemplate ,{headers:{Authorization:ar.token}}))
        .then(res=>{
            console.log(res)
            bus.$emit('successDelete',{bool:true,color:'success',notice:"Email sent with success."})
            commit('setMailResponse',res.data)
        }).catch(err=>{
            bus.$emit('errorDelete',{bool:true,color:'error',notice:"Operation failed! Please try again later."})
            console.log(err);
        })
    }
}
const mutations={
    setEmails:(state,emails)=>(state.emails=emails),
    addEmail:(state,email)=>state.emails.push(email),
    setEmail:(state,email)=>(state.email=email),
    clearEmail:(state,email)=>(state.email=email),
    removeEmail:(state,id)=>(state.emails=state.emails.filter(email=>email.id!==id)),
    setIdHotel:(state,idhotel)=>(state.email.idHotel=idhotel),
    setUserName:(state,username)=>(state.email.username=username),
    setMailResponse:(state,r)=>(state.mailResponse=r),
    
    
}

export default{
    state,
    getters,
    actions,
    mutations
}