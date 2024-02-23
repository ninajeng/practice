<script>
import CheckAdminAuth from '@/components/admin/CheckAdminAuth.vue';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  emits: ['isValidAuth', 'showAlert'],
  components: {
    CheckAdminAuth,
  },
  methods: {
    validAuth() {
      this.$emit('isValidAuth');
      // this.getData();
    },
  },
};
</script>

<template>
  <loading-view :active="isLoading"/>
  <CheckAdminAuth @isValidAuth="validAuth"/>
  Coupon
</template>
