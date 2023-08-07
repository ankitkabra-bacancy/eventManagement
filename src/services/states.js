import store from "@/store";
import axios from "axios";
import cookies from "vue-cookies";

const fetchStats = async () => {
  const res = await axios
    .get(`${import.meta.env.VITE_API_URL}api/admin/dashboard/states`, {
      headers: {
        Authorization: cookies.get("token"),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      store.dispatch("updateErrorSnackBar", {
        status: true,
        msg: err,
      });

      return err;
    });

  return res;
};

const state = {
  fetchStats,
};

export default state;
