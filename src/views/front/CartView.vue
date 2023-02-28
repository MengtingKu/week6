<template>
  <h1>這是一個「購物車」頁面</h1>
  <div class="loading" v-if="isLoading">
    <div class="bounceBall me-2"></div>
    <div class="text h5">NOW LOADING...ʕ̯•͡ˑ͓•̯᷅ʔ</div>
  </div>
  <div v-else>
    <table class="table align-middle">
      <thead>
        <tr>
          <th width="10%">選項</th>
          <th>品名</th>
          <th width="15%">單價</th>
          <th width="20%" class="text-end">數量/單位</th>
          <th width="20%" class="text-end">金額</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="carts.length">
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                aria-label="btn"
                @click="delItem(item)"
                :disabled="item.id === loadingItem"
              >
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success">已套用優惠券</div>
            </td>
            <td>NT$ {{ item.product.price }}</td>
            <td>
              <div class="input-group input-group-sm">
                <select
                  name=""
                  id=""
                  class="form-select"
                  v-model="item.qty"
                  aria-label="qty"
                  @change="cartQty(item)"
                  :disabled="item.id === loadingItem"
                >
                  <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
                </select>
                <span class="ms-3">{{ item.product.unit }}</span>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success">折扣價：</small>
              NT$ {{ thousands(item.total) }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="5" class="text-center text-warning text-bolder h5">
              尚未選擇商品
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-end">總計</td>
          <td class="text-end fw-bold">NT$ {{ thousands(cart.total) }}</td>
        </tr>
        <tr>
          <td colspan="4" class="text-end text-success">折扣價</td>
          <td class="text-end text-success fw-bold">
            NT$ {{ thousands(cart.final_total) }}
          </td>
        </tr>
      </tfoot>
    </table>
    <!-- 表單 -->
    <div class="my-5 row justify-content-center">
      <div class="loading" v-if="isLoading">
        <div class="bounceBall me-2"></div>
        <div class="text h5">NOW CHECKING...ʕ̯•͡ˑ͓•̯᷅ʔ</div>
      </div>
      <the-form
        ref="form"
        class="col-md-6"
        v-slot="{ errors }"
        @submit="onSubmit"
      >
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <the-field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="user.email"
          ></the-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <the-field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="user.name"
          ></the-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <the-field
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            v-model="user.tel"
            :rules="isPhone"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
          ></the-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <the-field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="user.address"
          ></the-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="message"
          ></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">
            送出訂單 <i class="fa-solid fa-file-import"></i>
          </button>
        </div>
      </the-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      isLoading: true,
      products: [],
      productId: "",
      page: {},
      cart: {},
      carts: [],
      hasItem: true,
      loadingItem: "",
      user: {
        email: "",
        name: "",
        address: "",
        tel: "",
      },
      message: "",
    };
  },
  methods: {
    thousands(x) {
      let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
      return x?.toString()?.replace(comma, ",");
    },
    getCartList() {
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.isLoading = true;
          this.cart = res.data.data;
          this.carts = this.cart.carts;
          this.isLoading = false;
          if (this.cart.carts.length) {
            this.hasItem = false;
          } else {
            this.hasItem = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cartQty(item) {
      const data = {
        product_id: item.product_id,
        qty: item.qty,
      };
      (this.loadingItem = item.id),
        axios
          .put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
          .then((res) => {
            alert(`${item.product.title}${res.data.message}`);
            (this.loadingItem = ""), this.getCartList();
          })
          .catch((err) => {
            console.log(err);
          });
    },
    delItem(item) {
      this.loadingItem = item.id;
      axios
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then((res) => {
          alert(`${item.product.title}${res.data.message}`);
          this.loadingItem = "";
          this.getCartList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delAllItem() {
      axios
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`)
        .then((res) => {
          console.log(res.data);
          alert(`已經把所有商品移除囉！ ʕ·͡ˑ·ཻʔ `);
          this.getCartList();
        })
        .catch((err) => {
          console.log(err);
          alert(err.data.message);
        });
    },
    onSubmit(value) {
      console.log(value);
      this.isLoading = true;
      const data = {
        user: {
          name: this.user.name,
          email: this.user.email,
          tel: this.user.tel,
          address: this.user.address,
        },
        message: this.message,
      };
      if (this.carts.length === 0) {
        return alert(`購物車內無資料，請選擇一樣商品吧~`);
      }
      axios
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/order`, { data })
        .then((res) => {
          this.carts = [];
          this.getCartList();
          alert(res.data.message);
          this.$refs.form.resetForm();
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          alert(err.data.message);
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
  },
  mounted() {
    this.getCartList();
  },
};
</script>
