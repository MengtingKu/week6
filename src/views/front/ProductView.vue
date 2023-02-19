<template>
  <div class="container">
    <h1>{{ product.title }}</h1>
    <div class="row">
      <div class="col-md-6">
        <img
          class="img-fluid"
          :src="product.imageUrl"
          :alt="product.title"
          aria-label="img"
        />
      </div>
      <div class="col-md-6">
        <span class="badge bg-primary rounded-pill mb-3">{{
          product.title
        }}</span>
        <p>商品描述：{{ product.description }}</p>
        <p>商品內容：{{ product.content }}</p>
        <p v-if="product.price === product.origin_price" class="h5">
          {{ product.price }} 元
        </p>
        <div v-else>
          <p class="h6 text-decoration-line-through">
            原價 {{ product.origin_price }} 元
          </p>
          <p class="h5">現在只要 {{ product.price }} 元</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import { RouterLink } from "vue-router";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getProductItem() {
      const { id } = this.$route.params;
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
        });
    },
  },
  mounted() {
    this.getProductItem();
  },
};
</script>
