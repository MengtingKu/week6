<template>
  <div class="loading" v-if="isLoading">
    <div class="bounceBall me-2"></div>
    <div class="text h5">NOW LOADING...ʕ̯•͡ˑ͓•̯᷅ʔ</div>
  </div>
  <table class="table align-middle" v-else>
    <thead>
      <tr>
        <th width="25%">圖片</th>
        <th>商品名稱</th>
        <th width="20%">價格</th>
        <th width="20%" class="text-center">備註</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>
          <div
            style="
              height: 200px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
        </td>
        <td>
          {{ product.title }}
        </td>
        <td>
          <p v-if="product.price === product.origin_price" class="h5">
            {{ product.price }} 元
          </p>
          <div v-else>
            <p class="h6 text-decoration-line-through">
              原價 {{ product.origin_price }} 元
            </p>
            <p class="h5">現在只要 {{ product.price }} 元</p>
          </div>
        </td>
        <td class="text-center">
          <div class="btn-group btn-group-sm">
            <RouterLink
              :to="`product/${product.id}`"
              class="btn btn-outline-secondary"
              ><font-awesome-icon
                class="me-2"
                icon="fa-solid fa-magnifying-glass"
              />查看更多</RouterLink
            >
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="addToCart(product.id)"
            >
              <font-awesome-icon
                class="me-2"
                icon="fa-solid fa-cart-shopping"
              />加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      page: {},
      isLoading: true,
    };
  },
  components: [RouterLink],
  methods: {
    getProducts(page = 1) {
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products?page=${page}`)
        .then((res) => {
          this.page = res.data.pagination;
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      this.loadingItem = product_id;
      axios
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
