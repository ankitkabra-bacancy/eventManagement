<template>
  <v-row>
    <v-col sm="3">
      <v-card
        v-ripple
        class="bg-deep-purple-lighten-0"
        elevation="4"
        rounded="md"
      >
        <v-card-title> Total Users </v-card-title>
        <v-card-text>
          <span class="text-h2">{{ users }}</span>
        </v-card-text>
        <v-card-actions>
          <v-btn :to="{ name: 'admin.users' }">View</v-btn>
          <v-spacer></v-spacer>

          <v-icon class="text-h4 mr-2">mdi-account-multiple</v-icon>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col sm="3">
      <v-card
        v-ripple
        class="bg-deep-purple-lighten-0"
        elevation="4"
        rounded="md"
      >
        <v-card-title> Total Events </v-card-title>
        <v-card-text>
          <span class="text-h2">{{ events }}</span>
        </v-card-text>
        <v-card-actions>
          <v-btn :to="{ name: 'admin.events' }">View</v-btn>
          <v-spacer></v-spacer>

          <v-icon class="text-h4 mr-2">mdi-calendar-blank-multiple</v-icon>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col sm="3">
      <v-card
        v-ripple
        class="bg-deep-purple-lighten-0"
        elevation="4"
        rounded="md"
      >
        <v-card-title> Total Posts </v-card-title>
        <v-card-text>
          <span class="text-h2">{{ posts }}</span>
        </v-card-text>
        <v-card-actions>
          <v-btn>View</v-btn>
          <v-spacer></v-spacer>

          <v-icon class="text-h4 mr-2">mdi-post-outline</v-icon>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col sm="3">
      <v-card
        v-ripple
        class="bg-deep-purple-lighten-0"
        elevation="4"
        rounded="md"
      >
        <v-card-title> Total Comments </v-card-title>
        <v-card-text>
          <span class="text-h2">{{ comments }}</span>
        </v-card-text>
        <v-card-actions>
          <v-btn>View</v-btn>
          <v-spacer></v-spacer>

          <v-icon class="text-h4 mr-2"
            >mdi-comment-text-multiple-outline</v-icon
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
   const {users,events,comments,posts} = defineProps(['users','events','comments','posts']);
</script>