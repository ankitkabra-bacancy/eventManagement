<template>
  <v-navigation-drawer
    app
    clipped
    permanent
    expand-on-hover
    rail
    class="bg-deep-purple"
  >
    <v-list v-if="authToken !== null">
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        :title="user.name"
        :subtitle="user.email"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list v-if="authToken !== null" density="compact" nav>
      <v-list-item
        prepend-icon="mdi-account"
        title="My Profile"
        value="profile"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Following"
        value="following"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-calendar"
        title="All Events"
        value="events"
      ></v-list-item>
    </v-list>

    <v-list>
      <v-list-item
        v-if="authToken == null"
        prepend-icon="mdi-key"
        title="Login"
        value="login"
        @click="loginpopUp = !loginpopUp"
      ></v-list-item>

      <v-dialog transition="dialog-top-transition" width="auto"> </v-dialog>
    </v-list>
    <template v-slot:append>
      <v-divider></v-divider>
      <v-list v-if="authToken !== null" density="compact" nav>
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
          :loading="loading"
          @click="logMeOut((loginpopUp = !loginpopUp))"
        ></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>

  <LoginDialog
    @closeLoginPopup="loginpopUp = !loginpopUp"
    :loginpopUp="loginpopUp"
  />
</template>
<script setup>
import LoginDialog from "../Dialogs/LoginDialog.vue";
import { computed, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import authApi from "@/services/authApi";
import router from "@/router";
const store = useStore();
const authToken = computed(() => store.state.authStore.authToken);

const user = computed(() => store.state.userDetail.user);

const loginpopUp = ref(false);

const loading = ref(false);

const emit = defineEmits(["logMeOut"]);

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
