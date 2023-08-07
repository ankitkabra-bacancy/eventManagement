import cookies from "vue-cookies";
const authStore = {
  namespaced: true, // Set namespaced to true
  state: {
    authToken: cookies.get("token") ?? null,
    errorBag: [],
  },
  mutations: {
    storeToken(state, token) {
      state.authToken = token;
    },

    updateErrorBag(state, errorBagPayload) {
      state.errorBag = errorBagPayload;
    },
  },
  getters: {
    loginStatus(state) {
      return state.authToken ? true : false;
    },
  },
  actions: {
    storeToken({ commit }, token) {
      commit("storeToken", token);
    },

    updateErrorBag({ commit }, errorBagPayload) {
      commit("updateErrorBag", errorBagPayload);
    },
  },
};

export default authStore;
