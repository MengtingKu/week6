<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
      <div class="col-10">
        <form id="form" class="form-login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              v-model="user.username"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="user.password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="button"
            @click="login"
          >
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted text-center">
      <img
        src="https://gifimage.net/wp-content/uploads/2018/04/login-gif-13.gif"
        alt="login-gif"
        width="100"
      />
    </p>
  </div>
</template>

<script>
const { VITE_APP_URL } = import.meta.env;
import axios from "axios";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      if (this.user.username === "" || this.user.password === "") {
        alert(`請先填寫資料再登入`);
        return;
      }
      axios
        .post(`${VITE_APP_URL}admin/signin`, this.user)
        .then((res) => {
          const { expired, token } = res.data;
          document.cookie = `tokenId=${token}; expires=${new Date(expired)}`;
          alert(res.data.message);
          this.$router.push("/admin/products");
        })
        .catch((err) => {
          console.log(err.response.data.message);
          alert(err.response.data.message);
        });
    },
  },
  mounted() {},
};
</script>
