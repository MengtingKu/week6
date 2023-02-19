<template>
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link> |
  <button class="btn btn-outline-primary">234234</button>
  <router-view></router-view>
</template>

<script>
import { RouterView, RouterLink } from "vue-router";
export default {
  components: {
    RouterView,
    RouterLink,
  },
};
</script>

<style lang="scss"></style>
