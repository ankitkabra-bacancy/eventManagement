import store from "@/store";
import axios from "axios";
import { ref } from "vue";
import cookies from "vue-cookies";

const users = ref(0);
const events = ref(0);
const posts = ref(0);
const comments = ref(0);

const fetchStats = async () => {
  await axios
    .get(`${import.meta.env.VITE_API_URL}api/admin/dashboard/states`, {
      headers: {
        Authorization: cookies.get("token"),
      },
    })
    .then((res) => {
      users.value = res.data.users;
      events.value = res.data.events;
      posts.value = res.data.posts;
      comments.value = res.data.comments;
    })
    .catch((err) => {
      store.dispatch("updateErrorSnackBar", {
        status: true,
        msg: err,
      });
    });
};
fetchStats();
const state = {
  users,
  events,
  comments,
  posts,
};

export default state;
