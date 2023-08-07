<template>
  <BaseLayout>
    <template v-slot:pageTitle>
      <h3 class="mb-3">Dashboard</h3>
    </template>

    <template v-slot:content>
      <DashboardWidgetsVue
        :users="users"
        :events="events"
        :posts="comments"
        :comments="posts"
      />
    </template>
  </BaseLayout>
</template>
<script setup>
import BaseLayout from "@/layouts/AdminLayout.vue";
import DashboardWidgetsVue from "@/components/Admin/DashboardWidgets.vue";
import states from "@/services/states";
import { onMounted, ref } from "vue";

const users = ref("");
const events = ref("");
const comments = ref("");
const posts = ref("");

onMounted(async () => {
  const {
    users: userCount,
    events: eventCount,
    comments: commentCount,
    posts: postsCount,
  } = await states.fetchStats();

  users.value = userCount;
  events.value = eventCount;
  comments.value = commentCount;
  posts.value = postsCount;
});
</script>
