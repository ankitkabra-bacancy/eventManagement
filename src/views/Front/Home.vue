<template>
  <v-layout>
    <Appbar />

    <Sidebar />

    <v-main>
      <v-container>
        <v-card class="mb-3" v-for="(i, index) in msg" :key="index">
          <v-banner
            avatar="https://randomuser.me/api/portraits/women/85.jpg"
            lines="three"
            stacked
            lazy
          >
            <v-banner-text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              delectus at quae perspiciatis libero incidunt quod aut tempora,
              qui, eveniet distinctio inventore quis nam obcaecati quibusdam
              commodi. Expedita deserunt amet, tempore a, quod labore sunt
              reiciendis eligendi quas suscipit sit inventore ullam dolorum,
              doloremque ut quibusdam nihil corrupti eum perferendis.
            </v-banner-text>
            <v-banner-actions class="float-left">
              <v-row>
                <v-col cols="2">
                  <v-btn
                    title="Like"
                    density="compact"
                    icon="mdi-thumb-up-outline"
                  ></v-btn>
                </v-col>
                <v-col cols="2">
                  <v-btn
                    title="Dislike"
                    density="compact"
                    icon="mdi-thumb-down-outline"
                  ></v-btn>
                </v-col>

                <v-col cols="2">
                  <v-btn
                    title="Loved it"
                    density="compact"
                    icon="mdi-heart-outline"
                  ></v-btn>
                </v-col>

                <v-col cols="2">
                  <v-btn
                    title="Share"
                    density="compact"
                    icon="mdi-share-variant-outline"
                  ></v-btn>
                </v-col>
              </v-row>
            </v-banner-actions>
            <v-banner-actions class="float-right">
              <v-btn @click="openCommentDialog(index)">
                <v-icon
                  icon="mdi-comment-multiple-outline"
                  class="mr-2"
                ></v-icon>
                Comment
              </v-btn>
            </v-banner-actions>
          </v-banner>
        </v-card>

        <v-dialog persistent density="compact" v-model="dialog" width="800px">
          <v-card>
            <v-card-item>
              <template v-slot:prepend>
                <v-card-title>
                  <v-icon icon="mdi-comment-processing-outline" start></v-icon>
                  Post a comment
                </v-card-title>
              </template>
              <template v-slot:append>
                <v-btn
                  @click="dialog = false"
                  icon="$close"
                  size="large"
                  variant="text"
                ></v-btn>
              </template>
            </v-card-item>
            <v-form class="mt-n5" @submit.prevent>
              <v-container fluid>
                <v-textarea
                  clearable
                  v-model="comment"
                  rows="5"
                  cols="10"
                  class="ma-2"
                  color="primary"
                  label="Please enter comment !"
                  :rules="[
                    (v) => !!v || 'Comment is required',
                    (v) =>
                      (v && v.length >= 10) ||
                      'Comment must have atleast 10 characters',
                  ]"
                ></v-textarea>
                <v-btn type="submit" md class="bg-deep-purple ma-2 mt-2"
                  >Post</v-btn
                >
              </v-container>
            </v-form>
          </v-card>
        </v-dialog>
      </v-container>
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
import { useStore } from "vuex";
import { computed, inject, onMounted, ref } from "vue";
import Appbar from "@/components/Front/Appbar.vue";
import Sidebar from "@/components/Front/Sidebar.vue";

const store = useStore();

const cookies = inject("cookies");
const axios = inject("axios");
const dialog = ref(false);
const msg = ref(50);
const formid = ref("");
const comment = ref("comment");
const loading = ref(false);
const errorMsg = store.state.errorMsg;
const errorSnackBar = store.state.errorSnackBar;

const successMsg = store.state.successMsg;
const successSnackBar = store.state.successSnackBar;

const openCommentDialog = (id) => {
  dialog.value = true;
  formid.value = id;
  comment.value = "";
};

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
