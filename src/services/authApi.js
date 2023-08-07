import axios from "@/services/axios";
import store from "@/store";
import cookies from "vue-cookies";

const logout = async () => {
  return await axios
    .post(
      `api/logout`,
      {},
      {
        headers: {
          Authorization: cookies.get("token"),
        },
      }
    )
    .then((res) => {
      store.dispatch("updateSuccessSnackBar", {
        status: true,
        msg: res.data.msg,
      });

      store.dispatch("updateErrorSnackBar", {
        status: false,
        msg: null,
      });

      store.dispatch("authStore/storeToken", null);
      store.dispatch("userDetail/storeUser", {});
      cookies.remove("token");
      cookies.remove("user");
      return "success";
    })
    .catch((err) => {
      // loading.value = false;
      if (err.response && err.response.status === 401) {
        cookies.remove("token");
        cookies.remove("user");

        return "401";
      } else {
        store.dispatch("updateErrorSnackBar", {
          status: true,
          msg: err,
        });

        return "fail";
      }
    });
};

const processLogin = async (formdata) => {
  const response = await axios
    .post(`api/login`, {
      email: formdata.email,
      password: formdata.password,
    })
    .then((res) => {
      const loginResponse = res.data;

      if (loginResponse) {
        if (typeof loginResponse.token !== "undefined") {
          store.dispatch("authStore/storeToken", loginResponse.token);
          store.dispatch("userDetail/storeUser", loginResponse.user);

          cookies.set("token", `Bearer ${loginResponse.token}`, {
            expires: "1d",
          });
          cookies.set("user", loginResponse.user, {
            expires: "1d",
          });
          store.dispatch("authStore/updateErrorBag", []);
          return {
            user : loginResponse.user,
            loginStatus: true,
          };
        }
      }
      if (loginResponse.status == "fail") {
        store.dispatch("updateErrorSnackBar", {
          status: true,
          msg: loginResponse.msg,
        });

        return {
          loginStatus: false,
        };
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 422) {
        store.commit("authStore/updateErrorBag", err.response.data.errors);
      } else {
        store.dispatch("updateErrorSnackBar", {
          status: true,
          msg: err,
        });
      }

      return {
        loginStatus: false,
      };
    });

    return response;
};

const auth = {
  logout,
  processLogin,
};

export default auth;
