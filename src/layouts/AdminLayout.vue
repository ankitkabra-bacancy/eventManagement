<template>
  <v-layout>
    <Sidebar />

    <v-main class="ma-5">
      <v-row class="header-container" align="center">
        <v-col>
          <slot name="pageTitle"></slot>
        </v-col>
        <v-col class="text-right">
          <slot name="action"></slot>
        </v-col>
      </v-row>

      <slot name="content"></slot>

      <v-snackbar v-model="store.state.errorSnackBar" multi-line>
        {{ store.state.errorMsg }}

        <template v-slot:actions>
          <v-btn
            type="button"
            color="red"
            variant="text"
            @click="closeErrorSnackBar"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar v-model="store.state.successSnackBar" multi-line>
        {{ store.state.successMsg }}

        <template v-slot:actions>
          <v-btn
            type="button"
            color="green"
            variant="text"
            @click="closeSuccessSnackBar"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-layout>
</template>
<script setup>
import Sidebar from "@/components/Admin/AdminNavbar.vue";
import { useStore } from "vuex";
const store = useStore();
const errorMsg = store.state.errorMsg;
const errorSnackBar = store.state.errorSnackBar;

const successMsg = store.state.successMsg;
const successSnackBar = store.state.successSnackBar;

const closeErrorSnackBar = () => {
  store.dispatch("updateErrorSnackBar", {
    status: false,
    msg: null,
  });
};
const closeSuccessSnackBar = () => {
  store.dispatch("updateSuccessSnackBar", {
    status: false,
    msg: null,
  });
};
</script>
