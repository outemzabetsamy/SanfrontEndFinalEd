import axios from "axios";
//import { resolve } from "core-js/fn/promise";
import {bus} from '../../main';


const state={
    reservations:[],
    reservation:{idReservation:'',typeReservation:'',dateDebut:'',
    datefin:'',etatReservation:'',montantSejour:'',client:{nomClient:'',
    prenomClient:'',typeClient:'',civiliteClient:'',
    ageClient:'',numIDNational:'',adresseClient:'',
    numTelClient:'',emailCLient:''},chambre:{id:'',numChambre:'',
    numEtage:'',etatChambre:'',
    typeChambre:{id:'',nomType:'',
    nbMaxPers:'',prixAdulte:'',prixEnfant:''}},idHotel:'',username:''},

    reservationReset:{idReservation:'',"typeReservation":'',"dateDebut":'',
    "datefin":'',"etatReservation":'',"client":{"nomClient":'',
    "prenomClient":'',"typeClient":'',"civiliteClient":'',
    "ageClient":'',"numIDNational":'',"adresseClient":'',
    "numTelClient":''},"chambre":{"id":'',"numChambre":'',
    "numEtage":'',"etatChambre":'',
    "typeChambre":{"id":'',"nomType":'',
    "nbMaxPers":'',"prixAdulte":'',"prixEnfant":''}},idHotel:'',username:''},

    reservationToPost:{idReservation:'',typeReservation:'',dateDebut:'',
    datefin:'',etatReservation:'',client:{nomClient:'',
    prenomClient:'',typeClient:'',civiliteClient:'',
    ageClient:'',numIDNational:'',adresseClient:'',
    numTelClient:''},numChambre:'',idHotel:'',username:''},
    lastNumChambre:'',
    isRoomChanged:false,
    arrivalsOfTheDay:[],
    departuresOfTheDay:[],
    

    
}

const getters={
    oneReservation:(state)=>state.reservation,
    allReservations:(state)=>state.reservations,
    getReservationToPost:(state)=>state.reservationToPost,
    getLastNumChambre:(state)=>state.lastNumChambre,
    getIsRoomChanged:(state)=>state.isRoomChanged,
    getDepartures:(state)=>state.departuresOfTheDay,
    getArrivals:(state)=>state.arrivalsOfTheDay,
    getEmailClient:(state)=>state.reservation.client.emailCLient,
    getConfirmationEmail:(state)=>state.confirmationEmail,
    getChambreForEmail:(state)=>state.reservation.chambre.numChambre,
}

const actions={
    async fetchAllReservations({commit},ar){
        const response = await axios.get(`https://sanhotelreservation.herokuapp.com/api/reservation/all?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}});
        console.log(response.data);
             commit('setReservations',response.data);
             console.log(response.data);
     },
     async getReservationById({commit},ar){
        const response=await axios.get(`https://sanhotelreservation.herokuapp.com/api/reservation/all/${ar.id}?idhotel=${ar.idhotel}`,{headers:{Authorization:ar.token}});
        console.log('getReservationById');
        console.log(response.data)
        response.data.dateDebut=parseDate(response.data.dateDebut);
        response.data.datefin=parseDate(response.data.datefin);
        
        commit('setOneReservation',response.data);
    },
   /* async getReservationById({commit},id){
        return new Promise((resolve)=>{
            const response= await axios.get(`http://localhost:9093/api/reservation/all/${id}`);
        console.log('getReservationById');
        console.log(response.data)
        response.data.dateDebut=parseDate(response.data.dateDebut);
        response.data.datefin=parseDate(response.data.datefin);
        
        commit('setOneReservation',response.data);
            resolve('success')
        })

        
    },*/
     async addReservation({commit},ar){
        console.log("ar.reservationToPost.dateDebut")
         console.log(ar.reservationToPost.dateDebut)
         console.log(ar.reservationToPost.datefin)
        ar.reservationToPost.dateDebut=parseDateToDDMMYYYY(ar.reservationToPost.dateDebut);
        ar.reservationToPost.datefin=parseDateToDDMMYYYY(ar.reservationToPost.datefin);
        ar.reservationToPost.isRoomChanged='';
        ar.reservationToPost.lastNumChambre='';
        ar.reservationToPost.montantSejour='';
        console.log("ar.reservationToPost")
        console.log(ar.reservationToPost)
        await axios.post('https://sanhotelreservation.herokuapp.com/api/reservation/add',ar.reservationToPost
        ,{headers:{Authorization:ar.token}}).then(res=>{
            console.log(res.data);
            bus.$emit('successAdd',{bool:true,color:'success',notice:"New reservation has been added."})
            bus.$emit('setConfirmationEmail',true)
            commit('newReservation',res.data);
        }).catch(err=>{
            console.log(err);
            console.log("erreur ajout")
            bus.$emit('errorAdd',{bool:true,color:'error',notice:"Failed to add new reservation."})
        });
        
        
    },
    async setReservationUserInfo({commit},ar){
        commit('setUsername',ar.username);
        commit('setIdHotel',ar.idhotel);
    },
    async editReservation({commit},ar){
        console.log("put reservation")
        ar.reservationToPost.dateDebut=parseDateToDDMMYYYY(ar.reservationToPost.dateDebut);
        ar.reservationToPost.datefin=parseDateToDDMMYYYY(ar.reservationToPost.datefin);
        ar.reservationToPost.isRoomChanged=state.isRoomChanged;
        ar.reservationToPost.lastNumChambre=state.lastNumChambre;
        console.log(ar.reservationToPost)
        await axios.put('https://sanhotelreservation.herokuapp.com/api/reservation/edit',ar.reservationToPost
        ,{headers:{Authorization:ar.token}})
        .then(res=>{console.log(res);
            bus.$emit('successEdit',{bool:true,color:'success',notice:"reservation has been updated with success."})
            commit('newReservation',res.data)
        })
        .catch(err=>{
            console.log(err);
            bus.$emit('erroredit',{bool:true,color:'error',notice:"Failed to update reservation."})
            
        })  
    },
    async resetReservation({commit}){
        commit('clearReservation',state.reservationReset);
    },
    async deleteReservation({commit},ar){
        await axios.delete(`https://sanhotelreservation.herokuapp.com/api/reservation/delete/${ar.id}?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}}).then(res=>{
            commit('removeReservation',ar.id);
            console.log(res);
            bus.$emit('successDelete',{bool:true,color:'success',notice:"Operation is done."})
        })
        .catch(err=>{
            console.log(err);
            bus.$emit('errorDelete',{bool:true,color:'error',notice:"Operation failed! Please try again later."})
        })
    },
    async fetchAllArrivals({commit},ar){
        await axios.get(`https://sanhotelreservation.herokuapp.com/api/reservation/arrivals?arrivalDate=${ar.arrivalDate}&idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}}).then(res=>{
            console.log(res);
            commit('setArrivals',res.data);
        });
    },
    async fetchAllDepartures({commit},ar){
        await axios.get(`https://sanhotelreservation.herokuapp.com/api/reservation/departures?departureDate=${ar.departureDate}&idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}}).then(res=>{
            console.log(res);
            commit('setDepartures',res.data);
        });
    },
    async setDateDebut({commit},d){
        commit('setDateDeb',d);
    },
    async setDatefin({commit},d){
        commit('setDateFin',d);
    },
    async buildReservationToPost({commit},reserv){
        let res={idReservation:'',typeReservation:'',dateDebut:'',
        datefin:'',etatReservation:'',client:{nomClient:'',
        prenomClient:'',typeClient:'',civiliteClient:'',
        ageClient:'',numIDNational:'',adresseClient:'',
        numTelClient:''},numChambre:'',idFacture:'',idHotel:'',username:''};
    res.idReservation=reserv.idReservation;
    res.typeReservation=reserv.typeReservation;
    res.etatReservation=reserv.etatReservation;
    res.dateDebut=reserv.dateDebut;
    res.datefin=reserv.datefin;
    res.client=reserv.client;
    res.numChambre=reserv.chambre.numChambre;
    res.idFacture=reserv.idFacture;
    res.idHotel=reserv.idHotel;
    res.username=reserv.username;
    commit('setTheReservationToPost',res);
    return res;
    },
    async lastNumChambre({commit},last){
        commit('setLastNumChambre',last)
    },
    async roomChanged({commit},bool){
        commit('setIsRoomChanged',bool)
    },
    async setOneRes({commit},res){
    commit('setOneReservation',res);
    },
    emailConfirmation({commit},bool){
        commit("setEmailConfirmation",bool);
    }
}

const mutations={
    setReservations:(state,reservations)=>(state.reservations=reservations),
    newReservation:(state,reservationToPost)=>state.reservations.push(reservationToPost),
    setOneReservation:(state,reservation)=>(state.reservation=reservation),
    clearReservation:(state,reservation)=>(state.reservation=reservation),
    removeReservation:(state,id)=>(state.reservations=state.reservations.filter(reservation=>reservation.idReservation!==id)),
    setTheReservationToPost:(state,res)=>(state.reservationToPost=res),
    setLastNumChambre:(state,last)=>(state.lastNumChambre=last),
    setIsRoomChanged:(state,bool)=>(state.isRoomChanged=bool),
    setUsername:(state,username)=>(state.reservation.username=username),
    setIdHotel:(state,idhotel)=>(state.reservation.idHotel=idhotel),
    setArrivals:(state,arrivals)=>(state.arrivalsOfTheDay=arrivals),
    setDepartures:(state,departures)=>(state.departuresOfTheDay=departures),
    setDateDeb:(state,d)=>(state.reservationToPost.dateDebut=d),
    setDateFin:(state,d)=>(state.reservationToPost.datefin=d),
    setEmailConfirmation:(state,bool)=>(state.confirmationEmail=bool),


};
const parseDate=(d)=>{
    if(!d){
      return null;
    }else{
      const[dd,mm,yyyy]=d.split('-');
      return `${yyyy}-${mm}-${dd}`;
    }}
    
    const parseDateToDDMMYYYY=(d)=>{
        if(!d){
          return null;
        }else{
          const[yyyy,mm,dd]=d.split('-');
          return `${dd}-${mm}-${yyyy}`;
        }}
export default{
    state,
    getters,
    actions,
    mutations
}