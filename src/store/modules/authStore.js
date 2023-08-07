import router from "@/router";
import axios from "axios";
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
    async processLogin({ commit, dispatch }, formdata) {
      await axios
        .post(`${import.meta.env.VITE_API_URL}api/login`, {
          email: formdata.email,
          password: formdata.password,
        })
        .then((res) => {
          const loginResponse = res.data;

          if (loginResponse) {
            if (typeof loginResponse.token !== "undefined") {
              commit("storeToken", loginResponse.token);
              //this.dispatch("userDetail/storeUser", loginResponse.user);
              dispatch("userDetail/storeUser", loginResponse.user, {
                root: true,
              });

              cookies.set("token", `Bearer ${loginResponse.token}`, {
                expires: "1d",
              });
              cookies.set("user", loginResponse.user, {
                expires: "1d",
              });
              commit("updateErrorBag", []);
              if (loginResponse.user.role == "admin") {
                router.push({ name: "admin.dashboard" });
              } else {
                router.push({ name: "Home" });
              }
            }
          }
          if (loginResponse.status == "fail") {
            dispatch(
              "updateErrorSnackBar",
              {
                status: true,
                msg: loginResponse.msg,
              },
              { root: true }
            );
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 422) {
            commit("updateErrorBag", err.response.data.errors);
          } else {
            dispatch(
              "updateErrorSnackBar",
              {
                status: true,
                msg: "Please try after sometime !",
              },
              { root: true }
            );
          }
        });
    },
    async logOut({ commit, dispatch }) {
      await axios
        .post(
          `${import.meta.env.VITE_API_URL}api/logout`,
          {},
          {
            headers: {
              Authorization: cookies.get("token"),
            },
          }
        )
        .then((res) => {
          dispatch(
            "updateSuccessSnackBar",
            {
              status: true,
              msg: res.data.msg,
            },
            { root: true }
          );

          dispatch(
            "updateErrorSnackBar",
            {
              status: false,
              msg: null,
            },
            { root: true }
          );

          commit("storeToken", null);
          dispatch("userDetail/storeUser", {}, { root: true });
          cookies.remove("token");
          cookies.remove("user");
          router.push({ name: "Home" });
        })
        .catch((err) => {
          // loading.value = false;
          if (err.response && err.response.status === 422) {
            commit("updateErrorBag", err.response.data.errors);
          } else {
            dispatch(
              "updateErrorSnackBar",
              {
                status: true,
                msg: "Please try after sometime !",
              },
              { root: true }
            );
          }

          cookies.remove("token");
          cookies.remove("user");
        });
    },
  },
};

export default authStore;
