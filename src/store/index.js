import { createStore } from "vuex";

import authStore from "../store/modules/authStore";
import testStore from "../store/modules/anotherStore";
import userDetail from "../store/modules/userprofile";

export default createStore({
  namespaced: true,
  state : { 
    errorSnackBar : false,
    errorMsg : '',
    successSnackBar : false,
    successMsg : ''
  },
  mutations : {
    updateErrorSnackBar(state,payload){
      state.errorSnackBar = payload.status;
      state.errorMsg = payload.msg;
    },
    updateSuccessSnackBar(state,payload){
      state.successSnackBar = payload.status;
      state.successMsg = payload.msg;
    },
  },
  actions : {
    updateErrorSnackBar({commit},errorPayload){
      commit('updateErrorSnackBar',errorPayload);
    },
    updateSuccessSnackBar({commit},successPayload){
      commit('updateSuccessSnackBar',successPayload);
    }
  },
  modules: {
    authStore,
    testStore,
    userDetail
  },
});


