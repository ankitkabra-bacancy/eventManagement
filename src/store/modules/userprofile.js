import cookies from 'vue-cookies';

const user = {
    namespaced : true,
    state : {
        user : cookies.get('user') ?? {}
    },
    mutations : {
        storeUserProfile(state,userPayload){
            state.user = userPayload;
        }
    },
    actions : {
        storeUser({commit},userPayload){
            commit('storeUserProfile',userPayload);
        }
    }
}



export default user;