<script>
import ProductCard from '@/components/user/ProductCard.vue';
import ProductModal from '@/components/user/ProductModal.vue';

export default {
  data() {
    return {
      PRODUCTLIST_PATH: `${import.meta.env.VITE_API_URL}/v2/api/${import.meta.env.VITE_API_PATH}/products/all`,
      products: [],
      isLoading: false,
    };
  },
  components: {
    ProductCard,
    ProductModal,
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      this.axios.get(this.PRODUCTLIST_PATH)
        .then((res) => {
          this.products = [...res.data.products];
          this.isLoading = false;
        }).catch((e) => {
          alert(e);
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<template>
  <LoadingView :active="isLoading"/>
  <ProductModal/>
  <div class="container py-4">
    <h1 class="mb-3">產品列表</h1>
    <div class="row row-cols-1 row-cols-md-1 g-4" v-if="products.length">
      <div class="col" v-for="productInfo in products" :key="productInfo.id">
        <ProductCard :product-info="productInfo" />
      </div>
    </div>
  </div>
</template>
