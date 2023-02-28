<template>
  <div>這是一個後台頁面</div>
  <router-link to="/admin/products">後台產品列表</router-link> |
  <router-link to="/admin/orders">後台訂單列表</router-link> |
  <router-link to="/">回前台</router-link> |
  <a href="#" @click.prevent="logout">登出</a>
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
    logout() {
      document.cookie = `tokenId=; expires=${new Date()}`;
      this.$router.push("/login");
    },
    checkLogin() {
      axios
        .post(`${VITE_APP_URL}/api/user/check`)
        .then((res) => {
          if (!res.data.success) {
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)tokenId\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkLogin();
  },
};
</script>
