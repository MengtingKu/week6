<template>
  <div class="loading" v-if="isLoading">
    <div class="bounceBall me-2"></div>
    <div class="text h5">NOW LOADING...ʕ̯•͡ˑ͓•̯᷅ʔ</div>
  </div>
  <div class="container" v-else>
    <div class="text-end mt-4">
      <button
        type="button"
        class="btn btn-primary"
        @click="openModal('create')"
      >
        建立新的產品
      </button>
    </div>
    <table class="table table-striped table-hover mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th class="text-center" width="120">原價</th>
          <th class="text-center" width="120">售價</th>
          <th class="text-center" width="100">是否啟用</th>
          <th class="text-center" width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-center">{{ toThousands(product.origin_price) }}</td>
          <td class="text-center">{{ toThousands(product.price) }}</td>
          <td class="text-center">
            <span class="text-success" v-if="product.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', product)"
                data-id="item.id"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('del', product)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="page" :get-products="getProductList" />
  </div>
  <ProductModal ref="productModal"></ProductModal>
</template>

<script>
import axios from "axios";
import ProductModal from "@/components/TheModal.vue";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
import Pagination from "@/components/ThePagination.vue";
export default {
  data() {
    return {
      products: [],
      isNew: true,
      isLoading: true,
      page: {},
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  components: {
    Pagination,
    ProductModal,
  },
  methods: {
    checkLogin() {
      axios
        .post(`${VITE_APP_URL}/api/user/check`)
        .then((res) => {
          console.log(res.data);
          this.getProductList();
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    },
    getProductList(page = 1) {
      axios
        .get(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/products/?page=${page}`
        )
        .then((res) => {
          this.page = res.data.pagination;
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    },
    // openModal(status, product) {
    //   if (status === "create") {
    //     this.isNew = true;
    //     // 資料初始化，因為物件內有陣列，所以一定要重新初始化乾淨才不會出錯
    //     this.tempProduct = {
    //       imagesUrl: [],
    //     };
    //   } else if (status === "edit") {
    //     this.isNew = false;
    //     this.tempProduct = { ...product };
    //     if (!Array.isArray(this.tempProduct.imagesUrl)) {
    //       this.tempProduct.imagesUrl = [];
    //       this.tempProduct.imagesUrl.push("");
    //     }
    //   } else if (status === "del") {
    //     this.tempProduct = { ...product };
    //   }
    // },
    openModal(status, product) {
      if (status === "create") {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.productModal.openModal();
      } else if (status === "edit") {
        this.isNew = false;
        this.$refs.productModal.openModal();
        this.tempProduct = { ...product };
      } else if (status === "del") {
        this.$refs.productModal.openModal();
        this.tempProduct = { ...product };
      }
    },
    updateProduct() {
      // 運用變數少一個函式和一個 modal
      let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product`;
      let method = "post";
      if (!this.isNew) {
        method = "put";
        url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      }
      axios[method](url, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          this.getProductList();
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data.message);
        });
    },
    deleteProduct() {
      axios
        .delete(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`
        )
        .then((res) => {
          this.getProductList();
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    },
    toThousands(x) {
      let parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
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
