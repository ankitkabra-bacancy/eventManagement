<template>
  <v-breadcrumbs class="float-right" :items="items">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>
<script>
export default {
  setup() {
    const items = [
      {
        title: "Dashboard",
        disabled: false,
        href: "breadcrumbs_dashboard",
      },
    ];

    return {
        items
    }
  },
};
</script>
