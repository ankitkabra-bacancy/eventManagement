<template>
  <BaseLayout>
    <template v-slot:pageTitle>
      <h3 class="mb-3">Users</h3>
    </template>
    <template v-slot:action>
      <v-btn prepend-icon="mdi-plus" color="deep-purple-lighten-1">
        Create
      </v-btn>
    </template>
    <template v-slot:content>
      <v-row justify="space-between">
        <v-col sm="2">
          <v-select
            label="Per Page"
            variant="outlined"
            v-model="perPage"
            density="compact"
            :items="['10', '25', '50', '100']"
          ></v-select>
        </v-col>
        <v-col sm="4">
          <v-text-field
            placeholder="Search users"
            density="compact"
            variant="outlined"
            color="success"
            v-model="search"
            @change="searchUsers"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-table>
        <thead class="bg-deep-purple-lighten-1">
          <tr>
            <th class="text-white">#</th>
            <th class="text-white">Name</th>
            <th class="text-white">Email</th>
            <th class="text-white">Role</th>
            <th class="text-white">Action</th>
          </tr>
        </thead>
        <tbody v-if="loading">
          <td colspan="5">
            <v-progress-linear
              color="deep-purple-accent-3"
              indeterminate
              rounded
              height="3"
            ></v-progress-linear>
          </td>
        </tbody>
        <tbody v-if="users.length > 0">
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ (page - 1) * perPage + index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <v-chip
                v-if="user.role == 'admin'"
                prepend-icon="mdi-shield-crown-outline"
                class="ma-2"
                color="red"
                text-color="white"
              >
                {{ user.role.toUpperCase() }}
              </v-chip>
              <v-chip
                v-else-if="user.role == 'user'"
                prepend-icon="mdi-account-outline"
                class="ma-2"
                color="primary"
                text-color="white"
              >
                {{ user.role.toUpperCase() }}
              </v-chip>
            </td>
            <td>
              <v-col cols="auto">
                <v-btn
                  icon="mdi-pencil-outline"
                  color="primary"
                  size="x-small"
                ></v-btn>
                <v-btn
                  class="ms-1"
                  icon="mdi-delete-outline"
                  color="red"
                  size="x-small"
                ></v-btn>
              </v-col>
            </td>
          </tr>
        </tbody>
        
      </v-table>
      <v-row v-if="users.length > 0" justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              rounded="circle"
              v-model="page"
              class="my-0"
              @click="getData"
              :length="paginationLength"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </template>
  </BaseLayout>
</template>
<script setup>
import BaseLayout from "@/layouts/AdminLayout.vue";
import user from "@/store/modules/userprofile";
import { inject, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { load } from "webfontloader";

const users = ref([]);
const search = ref('');
const paginationLength = ref(0);

const axios = inject("axios");
const cookies = inject("cookies");

const loading = ref(true);

const page = ref(1);

const perPage = ref(10);

const store = useStore();


const getData = () => {
  fetchUsers(page.value, perPage.value,search.value);
};

const searchUsers = () => {
   page.value = 1;
   fetchUsers(page.value, perPage.value,search.value);
}

watch(perPage, (newval) => {
  page.value = 1;
  fetchUsers(page.value, newval,search.value);
});

const fetchUsers = async (page = 1, perPage = 10, search = '') => {
  loading.value = true;
  
  await axios
    .get(
      `api/admin/users?page=${page}&perpage=${perPage}&search=${search}`,
      {
        headers: {
          Authorization: cookies.get("token"),
        },
      }
    )
    .then((res) => {
      paginationLength.value = res.data.last_page;
      users.value = res.data.data;
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        store.dispatch("updateErrorSnackBar", {
          status: true,
          msg: "Unauthrorized !",
        });
      }
    });

  loading.value = false;
};

fetchUsers();
</script>
