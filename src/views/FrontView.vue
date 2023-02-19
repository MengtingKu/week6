<template>
  <div>這是一個前台頁面</div>
  <router-link to="/">首頁</router-link> |
  <router-link to="/about">關於我們</router-link> |
  <router-link to="/products">產品列表</router-link> |
  <router-link to="/cart">購物車</router-link>
  <hr />
  <router-view></router-view>
</template>

<script>
import { RouterView } from "vue-router";
export default {
  components: {
    RouterView,
  },
};
</script>
