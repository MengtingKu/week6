<template>
  <div>這是一個前台頁面</div>
  <router-link to="/">首頁</router-link> |
  <router-link to="/about">關於我們</router-link> |
  <router-link to="/products">產品列表</router-link> |
  <router-link to="/cart">購物車</router-link> |
  <a href="#" @click.prevent="checkLogin">參觀後台</a>
  <!-- <router-link to="/admin">參觀後台</router-link> -->
  <hr />
  <router-view></router-view>
</template>

<script>
import { RouterView } from "vue-router";
import axios from "axios";
const { VITE_APP_URL } = import.meta.env;
export default {
  components: {
    RouterView,
  },
  methods: {
    checkLogin() {
      axios
        .post(`${VITE_APP_URL}/api/user/check`)
        .then((res) => {
          if (!res.data.success) {
            this.$router.push("/login");
          } else {
            this.$router.push("/admin");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
          this.$router.push("/login");
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)tokenId\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
  },
};
</script>
