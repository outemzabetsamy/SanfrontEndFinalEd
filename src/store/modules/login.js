import axios from "axios"
import {bus} from '../../main'
import router from '../../router'
const state={
    logged:false,
    user:null,
    token:null,
    users:[],
    selectedUser:{id:'',login:'',password:'',idHotel:'',admin:''},
    userReset:{id:'',login:'',password:'',idHotel:'',admin:''},
}
const getters={
signedIn:(state)=>state.logged,
getUser:(state)=>state.user,
getToken:(state)=>state.token,
getUsers:(state)=>state.users,
getSelectedUser:(state)=>state.selectedUser,

}
const actions={
async login({commit},user){
 await axios.post('https://sanhoteljwtgat.herokuapp.com/auth/login',user).then(res=>{
     console.log(res);
     console.log("authorization")
     console.log(res.headers.authorization)
     let token=res.headers.authorization;
     
     commit('setLogged',true);
     localStorage.setItem('token',res.headers.authorization);
     if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
        console.log("token without Bearer ");
        console.log(token);
        var tokens = token.split(".");
        console.log(atob(tokens[0]));
        console.log(JSON.parse(atob(tokens[1])));
        commit('setUser',JSON.parse(atob(tokens[1])));
     }
     bus.$emit("justGetLogged")

 })
 console.log("full response");
 
},
async whoAMI({commit}){
    let tok=localStorage.getItem("token");
    if(tok && tok.startsWith('Bearer ')){
        commit('setAuthorizationHeader',tok);
        tok = tok.slice(7, tok.length)
        var toks = tok.split(".");
        commit('setUser',JSON.parse(atob(toks[1])));
        commit('setLogged',true);
        
    }else{
        commit('setUser',null);
        commit('setLogged',false);
        commit('setAuthorizationHeader',null);
        router.push("/login");
        
    }
    
},async logout({commit}){
    localStorage.removeItem('token');
        commit('setUser',null);
        commit('setLogged',false);
        commit('setAuthorizationHeader',null);
        router.push("/login");
},
async fetchAllUsers({commit},ar){
    await axios.get(`https://sanhoteljwtgat.herokuapp.com/auth/all?idhotel=${ar.idhotel}`
        ,{headers:{Authorization:ar.token}}).then(
            res=>{
                let u=[];
                console.log(res);
                res.data.forEach(e => {
                    e.avatar="User_Avatar_2.png"
                    if(e.admin){
                        e.admin="ADMIN"
                    }else{
                        e.admin="USER"
                    }
                    u.push(e);
                });
                commit('setUsers',u);
            }
        )
},
async getUserById({commit},ar){
    const response=await axios.get(`https://sanhoteljwtgat.herokuapp.com/auth/all/${ar.id}?idhotel=${ar.idhotel}`,{headers:{Authorization:ar.token}});
    console.log('getUserById');
    console.log(response.data)
    commit('setSelectedUser',response.data);
},
async deleteUser({commit},ar){
    await axios.delete(`https://sanhoteljwtgat.herokuapp.com/auth/delete/${ar.id}?idhotel=${ar.idhotel}`
    ,{headers:{Authorization:ar.token}}).then(res=>{
        commit('removeUser',ar.id);
        console.log(res);
        bus.$emit('successDelete',{bool:true,color:'success',notice:"Operation is done."})
    })
    .catch(err=>{
        console.log(err);
        bus.$emit('errorDelete',{bool:true,color:'error',notice:"Operation failed! Please try again later."})
    })
    

},
async addUser({commit},ar){
    if(!ar.user.id){
    await axios.post('https://sanhoteljwtgat.herokuapp.com/auth/register',ar.user,{headers:{Authorization:ar.token}})
    .then(res=>{console.log(res);
        bus.$emit('successAdd',{bool:true,color:'success',notice:"New customer has been added."})
        commit('newUser',res.data)
    })
    .catch(err=>{
        console.log(err);
        console.log("erreur ajout")
        bus.$emit('errorAdd',{bool:true,color:'error',notice:"Failed to add new customer."})
    })
    
    }else{
        await axios.put(`https://sanhoteljwtgat.herokuapp.com/auth/edit?id=${ar.user.id}&pwc=${ar.pwchanged}`,ar.user,{headers:{Authorization:ar.token}})
        .then(res=>{console.log(res);
            bus.$emit('successEdit',{bool:true,color:'success',notice:"Customer has been updated with success."})
            commit('newUser',res.data)
        })
        .catch(err=>{
            console.log(err);
            bus.$emit('erroredit',{bool:true,color:'error',notice:"Failed to update customer."})
            
        })  
    }
},
async resetUser({commit}){
commit("reseThetUser")
},
async setUserInfo({commit},ar){
    commit('setUserinfos',ar.idhotel)
},
async setAdmin({commit},bool){
    commit("setAdmin",bool)
}

}
const mutations={
    setUser:(state,user)=>(state.user=user),
    setLogged:(state,bool)=>(state.logged=bool),
    setAuthorizationHeader:(state,tok)=>(state.token=tok),
    setUsers:(state,users)=>(state.users=users),
    setSelectedUser:(state,user)=>(state.selectedUser=user),
    removeUser:(state,id)=>(state.users=state.users.filter(user=>user.id!==id)),
    newUser:(state,user)=>(state.users.push(user)),
    reseThetUser:(state)=>(state.selectedUser=state.userReset),
    setUserinfos:(state,idhotel)=>(state.selectedUser.idHotel=idhotel),
    setAdmin:(state,bool)=>state.selectedUser.admin=bool,

}

export default{
    state,
    getters,
    actions,
    mutations
}