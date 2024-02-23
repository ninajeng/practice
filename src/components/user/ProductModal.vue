<script>
import Modal from 'bootstrap/js/dist/modal';
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';

export default {
  data() {
    return {
      productData: {},
      productModal: null,
      userCustom: {},
      qty: 1,
    };
  },
  computed: {
    ...mapState(productStore, ['targetProduct']),
  },
  watch: {
    targetProduct(data) {
      if (data) {
        this.productData = { ...this.targetProduct };
        if (this.productData.type === 'drink') {
          Object.keys(this.productData.custom).forEach((option) => {
            const options = this.productData.custom[option]?.options;
            if (options !== 'extras' && Array.isArray(options)) {
              [this.userCustom[option]] = options;
            }
          });
          this.userCustom.extras = [];
        } else {
          this.userCustom = {};
        }
        this.qty = 1;
        this.show();
      } else {
        this.productData = {};
      }
    },
  },
  methods: {
    show() {
      this.productModal.show();
    },
    hide() {
      this.productModal.hide();
    },
    clearData() {
      this.setProductData(null);
    },
    addItem() {
      this.addToCart(this.productData, this.qty);
      this.hide();
    },
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(productStore, ['setProductData']),
  },
  mounted() {
    this.productModal = new Modal(this.$refs.modal);
    this.$refs.modal.addEventListener('hidden.bs.modal', this.clearData);
  },
  beforeUnmount() {
    this.$refs.modal.removeEventListener('hidden.bs.modal', this.clearData);
  },
};
</script>

<template>
  <div class="modal fade" ref="modal">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-body">
          <div class="position-relative">
            <img :src="productData.imageUrl" :alt="productData.title"
              style="width: 100%; height: 300px;
              object-fit: cover; object-position: center;" v-if="productData.imageUrl">
            <router-link :to="`product/${this.productData.id}`" @click="hide"
              class="btn btn-primary btn-sm position-absolute bottom-0 end-0 me-2 mb-2">
              查看更多<i class="bi bi-caret-right-fill"></i>
            </router-link>
          </div>

          <div class="py-3">
            <h4 class="mb-2">
              {{ productData.title }}
              <span class="productBadge secondaryOutlineBadge">
                {{ productData.category }}
              </span>
            </h4>
            <p class="mb-2 text-muted">{{ productData.description }}</p>
            <p class="mb-0 text-muted" v-if="productData.ingredients">
              {{ `成分：${productData.ingredients}` }}
            </p>
          </div>
        </div>
        <div class="modal-footer d-flex bg-light">
          <p class="ms-auto">NT$ {{ productData.price }}</p>
          <div class="input-group w-auto mb-2">
            <button class="btn btn-primary" type="button" @click="qty -= 1" :disabled="qty === 1">
              <i class="bi bi-dash"></i>
            </button>
            <span class="input-group-text d-inline-block text-center mb-0"
              style="min-width: 70px;">{{ qty }}
            </span>
            <button class="btn btn-primary" type="button" @click="qty += 1" :disabled="qty === 20">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          <button type="button" class="btn btn-primary mb-2" @click="addItem">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>
