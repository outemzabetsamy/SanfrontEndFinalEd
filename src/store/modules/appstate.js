const SUCCESS = "success";
const ERROR = "error";
const state={
appState:{
    loading:false,
    mode:'',
    snackbar:'false',
    notice:''
}
}

const getters={
    getMode:(state)=>state.mode,
    getSnackBar:(state)=>state.snackBar,
    getNotice:(state)=>state.notice,
    getLoading:(state)=>state.loading,

}

const actions={
async closeNotice({commit}){
commit('setNotice');
commit('setMode');
commit('setSnackBar');
},
async closeNoticeWithDelay({commit}){
    setTimeout(()=>{
        commit('setEmptyNotice');
        commit('setEmptyMode');
        commit('setEmptySnackBar');
    },2000)
},
async sendSuccessNotice({commit},msg){
    commit('setNotice',msg);
    commit('setMode',SUCCESS);
    commit('setSnackBar',true);
    this.closeNoticeWithDelay();
},
async sendErrorNotice({commit},msg){
    commit('setNotice',msg);
    commit('setMode',ERROR);
    commit('setSnackBar',true);
    this.closeNoticeWithDelay();
}
}

const mutations={
setEmptyNotice:(state)=>state.appState.notice='',
setEmptyMode:(state)=>state.appState.mode='',
setEmptySnackBar:(state)=>state.appState.snackbar=false,
setNotice:(state,msg)=>state.appState.notice=msg,
setMode:(state,mode)=>state.appState.mode=mode,
setSnackBar:(state,bool)=>state.appState.snackbar=bool,
}

export default{
    state,
    getters,
    actions,
    mutations
}