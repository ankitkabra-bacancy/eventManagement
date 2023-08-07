<template>
  <BaseLayout>
    <template v-slot:pageTitle>
      <h3 class="mb-3">Dashboard</h3>
    </template>

    <template v-slot:content>
      <DashboardWidgetsVue :users="state.users" :events="state.events" :posts="state.posts" :comments="state.comments" />
    </template>
  </BaseLayout>
</template>
<script setup>
import BaseLayout from "@/layouts/AdminLayout.vue";
import DashboardWidgetsVue from "@/components/Admin/DashboardWidgets.vue";
import state from "@/mixins/states";
</script>
