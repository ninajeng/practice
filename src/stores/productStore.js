import { defineStore } from 'pinia';

export default defineStore('productStore', {
  state: () => ({
    targetProduct: null,
  }),
  actions: {
    getProducts() {
      this.axios.get(this.PRODUCTLIST_PATH)
        .then((res) => {
          this.products = res.data.products;
        }).catch((e) => {
          alert(e);
        });
    },
    setProductData(data) {
      this.targetProduct = data;
    },
  },
});
