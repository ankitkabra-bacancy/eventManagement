<template>
    <v-app-bar app class="bg-deep-purple">
      <v-app-bar-title> poscancy </v-app-bar-title>

      <v-row class="flex-row-reverse">
        <v-col md="8" lg="6" class="mr-5 mt-5">
          <v-text-field
            density="compact"
            label=""
            placeholder="Search Events"
            append-icon="mdi-calendar-search-outline"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-app-bar>
</template>
