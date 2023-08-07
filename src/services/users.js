import axios from "@/services/axios";
import cookies from "vue-cookies";
import store from "@/store";

const fetchUsers = async (page = 1, perPage = 10, search = "") => {
  
  const response = await axios
    .get(`api/admin/users?page=${page}&perpage=${perPage}&search=${search}`, {
      headers: {
        Authorization: cookies.get("token"),
      },
    })
    .then((res) => {
      return {
        paginationLength : res.data.last_page,
        users :  res.data.data
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        store.dispatch("updateErrorSnackBar", {
          status: true,
          msg: "Unauthrorized !",
        });
      }

      return err;
    });

    return response;
  
};

const userApi = {
    fetchUsers
}

export default userApi;
