<template>
  <Login v-if="!user"/>
  <ListView v-else/>
</template>

<script>
// Components

import { mapState } from "vuex";
import ListView from "@/views/ListView.vue"
import Login from "@/components/Login.vue";
export default {
name: "HomeView",
components: {
  Login, ListView
},
computed: {
  ...mapState("auth", ["user"]),
},
};
</script>
