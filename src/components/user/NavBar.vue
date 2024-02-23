<script>
import cartStore from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(cartStore, ['cartItemNum']),
  },
  methods: {
    ...mapActions(cartStore, ['getCartInfo']),
  },
  created() {
    this.getCartInfo();
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <a class="navbar-brand text-primary" href="#">Juice Oasis 前台</a>
      <button class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/products">ProductList</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">
              <i class="bi bi-cart4 me-1"></i>
              <span class="badge rounded-pill bg-danger">{{ cartItemNum }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
