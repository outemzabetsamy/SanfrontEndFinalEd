import axios from "axios"
import { bus } from "../../main"

const state={
    hotelRegistration:{
        nomHotel:"",
        adresseHotel:"",
        logo:"",
        nbEtoiles:"",
        nomGerant:"",
        prenomGerant:"",
        userName:"",
        pw:"",
        email:""
    },
    admin:"",
    logoInfo:"",
    currentHotel:'',
    currentLogo:'',
    loaded:false,
}
const getters={
    getRegistration:(state)=>state.hotelRegistration,
    getLogoInfo:(state)=>state.logoInfo,
    getLogoName:(state)=>state.hotelRegistration.logo.name,
    getCurrentHotel:(state)=>state.currentHotel,
    getCurrentLogo:(state)=>state.currentLogo,
    isItLoaded:(state)=>state.loaded
}
const actions={
    async addHotelRegistration({commit},ar){
        console.log("ar")
        console.log(ar)
    await axios.post("https://sanhotelhotel.herokuapp.com/api/hotel/add",ar.registration).then(res=>{
        console.log("ikechmed ar dayi");
        console.log(res);
         axios.post("https://sanhotelimage.herokuapp.com/image/upload",ar.img).then(r=>{
             console.log("logo ajouté avec succes")
             console.log(r)
         })
        commit("setAdmin",res.data);
        console.log(res.data)
    })
    },
    async setLogoName({commit},n){
        commit('setNameOfLogo',n);
        commit('setHotelLogoOnly',n);
    },
    async getHotelById({commit},ar){
        await axios.get(`https://sanhotelhotel.herokuapp.com/api/hotel/all/${ar.id}`)
        .then(res=>{
            console.log(res);
             axios.get(`https://sanhotelimage.herokuapp.com/image/get/${res.data.logo}`)
            .then(r=>{console.log(r);
                let retrievedImg='data:image/jpeg;base64,'+r.data.picByte;
               let info={logo:retrievedImg,hotelName:res.nomHotel}
                bus.$emit('setProfil',info)
                commit('setCurrentHotel',res.data)
                commit('setCurrentLogo',retrievedImg)
                commit('setLoaded',true);
            })
            
        })
    },
    async addHotelOnly({commit},ar){
        console.log("ar")
        console.log(ar)
    await axios.post("https://sanhotelhotel.herokuapp.com/api/hotel/addhotelonly",ar.hotel).then(res=>{
        console.log("ikechmed ar dayi");
        console.log(res);
         axios.post("https://sanhotelimage.herokuapp.com/image/upload",ar.img).then(r=>{
             console.log("logo ajouté avec succes")
             console.log(r)
             commit("setHotel",res.data);
        console.log(res.data)
         })
        
    })
    },
}
const mutations={
    setAdmin:(state,admin)=>(state.admin=admin),
    setNameOfLogo:(state,n)=>(state.hotelRegistration.logo=n),
    setCurrentHotel:(state,h)=>(state.currentHotel=h),
    setCurrentLogo:(state,l)=>(state.currentLogo=l),
    setLoaded:(state,bool)=>(state.loaded=bool),
    setHotel:(state,h)=>(state.currentHotel=h),
    setHotelLogoOnly:(state,h)=>(state.currentHotel.logo=h)
}
export default{
    state,
    getters,
    actions,
    mutations
}