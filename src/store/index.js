import Vuex from 'vuex';
import Vue from 'vue';
import client from './modules/client';
import appstate from './modules/appstate';
import reservation from './modules/reservation';
import chambre from './modules/chambre';
import typechambre from './modules/typechambre';
import barchart from './modules/barchart';
import statistic from './modules/statistic';
import frontdesk from './modules/frontdesk';
import facture from './modules/facture';
import login from './modules/login';
import hotelRegistration from './modules/hotelRegistration';
import email from './modules/email';
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        client,
        appstate,
        reservation,
        chambre,
        typechambre,
        barchart,
        statistic,
        frontdesk,
        facture,
        login,
        hotelRegistration,
        email,


    }
})