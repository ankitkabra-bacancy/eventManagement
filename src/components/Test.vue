<template>
    <div>
        <v-list>
        {{ store.state.counter }}
        <v-btn @click="increase" small elevation="4" color="red">
            +
        </v-btn>
        
        </v-list>
    </div>
</template>
<script setup>
import { useStore } from "vuex";

const store = useStore();

const increase = () => {
    store.dispatch('increase',10);
}

</script>