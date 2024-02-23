<script>
import productStore from '@/stores/productStore';
import { mapActions } from 'pinia';

export default {
  props: ['productInfo'],
  methods: {
    ...mapActions(productStore, ['setProductData']),
  },
};
</script>

<template>
  <div class="card">
    <div class="row g-0">
      <div class="col-auto">
        <img :src="productInfo.imageUrl"
        class="img-fluid"
        :alt="productInfo.title"
        style="width: 200px; height: 200px; object-fit: cover;">
      </div>
      <div class="col">
        <div class="card-body d-flex flex-column h-100">
          <h5 class="card-title">{{ productInfo.title }}</h5>
          <div class="mt-auto">
            <p class="card-text">{{ `NT$ ${productInfo.price}` }}</p>
            <a href="#"
              class="btn btn-primary stretched-link"
              @click.prevent="setProductData(productInfo)">
              查看細節
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
