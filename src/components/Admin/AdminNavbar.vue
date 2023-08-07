<template>
  <v-navigation-drawer app clipped permanent class="bg-deep-purple">
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
        :title="user.name"
        subtitle="Logged in"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        value="Dashboard"
        :active="$route.name == 'admin.dashboard'"
        :to="{ name: 'admin.dashboard' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-box"
        title="All Users"
        value="Users"
        :active="$route.name == 'admin.users'"
        :to="{ name: 'admin.users' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-calendar"
        title="All Events"
        value="Events"
        :active="$route.name == 'admin.events'"
        :to="{ name: 'admin.events' }"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          @click="logMeOut"
          :loading="loading"
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
        ></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
  <v-app-bar flat class="bg-deep-purple" elevation="4">
    <v-app-bar-title> Admin Dashboard </v-app-bar-title>
  </v-app-bar>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import authApi from "@/services/authApi";
import router from "@/router";
const store = useStore();
const user = store.state.userDetail.user;
const loading = ref(false);
const logMeOut = async () => {
  loading.value = true;
  const res = await authApi.logout();
  loading.value = false;

  switch (res) {
    case "success":
      router.push({ name: "Home" });
      break;

    case "401":
      router.push({ name: "Home" });
      break;
  }
};
</script>
