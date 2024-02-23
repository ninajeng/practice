<script>
import CartList from '@/components/user/CartList.vue';
import cartStore from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';

export default {
  data() {
    return {
      user: {},
      message: '',
      isLoading: false,
    };
  },
  components: {
    CartList,
  },
  computed: {
    ...mapState(cartStore, ['cartInfo']),
  },
  methods: {
    setUserData() {
      this.isLoading = true;
      const data = {
        user: this.user,
      };
      this.axios.post(`${import.meta.env.VITE_API_URL}/v2/api/${import.meta.env.VITE_API_PATH}/order`, { data, message: this.message })
        .then(() => {
          alert('訂單已成立');
          this.getCartInfo();
          this.isLoading = false;
        }).catch((e) => {
          alert.log(e);
          this.isLoading = false;
        });
    },
    ...mapActions(cartStore, ['getCartInfo', 'removeItem', 'removeAll', 'setItemQty']),
  },
  created() {
    this.getCartInfo();
  },
};
</script>

<template>
  <LoadingView :active="isLoading"/>
  <CartList :cart-info="cartInfo"
    @remove-item="removeItem"
    @remove-all="removeAll"
    @set-item-qty="setItemQty"/>
  <div class="container" v-if="cartInfo.carts?.length">
    <h2>訂購人資料</h2>
    <div class="row py-3">
      <div class="col-5">
        <v-form v-slot="{ errors }" @submit="setUserData">
          <div class="form-floating mb-3">
            <v-field type="text" id="userName" placeholder="姓名" name="姓名"
              class="form-control" :class="{'is-invalid': errors['姓名']}"
              rules="required" v-model="user.name"></v-field>
            <label for="userName">姓名</label>
            <error-message name="姓名" class="invalid-feedback text-start"/>
          </div>
          <div class="form-floating mb-3">
            <v-field type="email" id="email" placeholder="信箱" name="信箱"
              class="form-control" :class="{'is-invalid': errors['信箱']}"
              rules="required|email" v-model="user.email"></v-field>
            <label for="email">信箱</label>
            <error-message name="信箱" class="invalid-feedback text-start"/>
          </div>
          <div class="form-floating mb-3">
            <v-field type="tel" id="tel" placeholder="電話" name="電話"
              class="form-control" :class="{'is-invalid': errors['電話']}"
              rules="required|min:8" v-model="user.tel"></v-field>
            <label for="tel">電話</label>
            <error-message name="電話" class="invalid-feedback text-start"/>
          </div>
          <div class="form-floating mb-3">
            <v-field type="text" id="address" placeholder="地址" name="地址"
              class="form-control" :class="{'is-invalid': errors['地址']}"
              rules="required" v-model="user.address"></v-field>
            <label for="address">地址</label>
            <error-message name="地址" class="invalid-feedback text-start"/>
          </div>
          <div class="form-floating mb-3">
            <textarea id="message" placeholder="留言" name="message"
              class="form-control" v-model="message" style="height: 100px;"></textarea>
            <label for="message">留言</label>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary">送出訂單</button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>
