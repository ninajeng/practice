<script>
import cartStore from '@/stores/cartStore';
import { mapActions, mapState } from 'pinia';

export default {
  methods: {
    ...mapActions(cartStore, ['getCartInfo']),
  },
  computed: {
    ...mapState(cartStore, ['cartInfo', 'cartItemNum']),
  },
  created() {
    this.getCartInfo();
  },
};
</script>

<template>
  <div class="w-100 h-100 bg-light">
    <h5>購物車</h5>
    <!-- <pre>
      {{ cartInfo }}
    </pre> -->
    <pre>
      {{ cartItemNum }}
    </pre>
  </div>
</template>
