<template>
  <div>
    <v-dialog
      v-model="loginpopUpRef"
      max-width="500px"
      transition="dialog-transition"
      persistent
    >
      <div>
        <v-card
          class="mx-auto pa-8 pb-8"
          elevation="8"
          max-width="448"
          rounded="lg"
        >
          <v-card-item>
            <template v-slot:prepend>
              <v-card-title>
                <v-icon icon="mdi-clipboard-account-outline" start></v-icon>
                Login
              </v-card-title>
            </template>
            <template v-slot:append>
              <v-btn
                @click="closeLoginPopup((loginpopUpRef = !loginpopUpRef))"
                icon="$close"
                size="large"
                variant="text"
              ></v-btn>
            </template>
          </v-card-item>
          <v-form v-model="valid" @submit.prevent="processLogin">
            <div class="d-block text-subtitle-1 text-medium-emphasis">
              Account
            </div>

            <v-text-field
              density="compact"
              v-model="formData.email"
              placeholder="Email address"
              :rules="emailRules"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              required
              :error-messages="errorBag.email ? errorBag.email[0] : []"
            ></v-text-field>

            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
            >
              Password

              <a
                class="text-caption text-decoration-none text-blue"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
              >
                Forgot login password?</a
              >
            </div>

            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              required
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              :rules="passwordRules"
              v-model="formData.password"
              @click:append-inner="visible = !visible"
              :error-messages="errorBag.password ? errorBag.password[0] : []"
            >
            </v-text-field>

            <v-btn
              type="submit"
              block
              class="mb-8"
              color="blue"
              size="large"
              variant="tonal"
              :loading="loading"
            >
              Log In
            </v-btn>
          </v-form>
          <v-card-actions>
            <v-card-text class="text-center">
              &copy; 2023 | poscancy | v1.0
            </v-card-text>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, watch, inject } from "vue";
import { useStore } from "vuex";

const store = useStore();
const axios = inject("axios");
const cookies = inject("cookies");
const valid = ref(false);
const emit = defineEmits(["closeLoginPopup"]);

const props = defineProps({
  loginpopUp: Boolean,
});

const emailRules = [
  (value) => {
    if (value) {
      valid.value = true;
      return true;
    }

    return "Email is required.";
  },
  (value) => {
    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) {
      valid.value = true;
      return true;
    }

    return "Must be a valid e-mail.";
  },
];

const passwordRules = [
  (value) => {
    if (value) return true;

    return "Pasword is required.";
  },
];

const errorBag = ref([]);
const visible = ref(false);
const loginpopUpRef = ref(false);
const loading = ref(false);
const formData = ref({
  email: "",
  password: "",
});

watch(
  () => props.loginpopUp,
  (newValue, oldValue) => {
    loginpopUpRef.value = newValue;
  }
);

const closeLoginPopup = (close) => {
  emit("closeLoginPopup", close);
  formData.value.email = "";
  formData.value.password = "";
};

const processLogin = async () => {
  if (!valid.value) {
    return false;
  }

  loading.value = true;

  await store.dispatch("authStore/processLogin", formData.value);

  const loginStatus = store.getters["authStore/loginStatus"];

  loginStatus == true
    ? (loginpopUpRef.value = false)
    : (loginpopUpRef.value = true);

  errorBag.value = store.state.authStore.errorBag;

  loading.value = false;

};
</script>
