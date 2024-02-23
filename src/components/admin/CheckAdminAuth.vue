<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  emits: ['isValidAuth'],
  methods: {
    async checkAuth() {
      this.isLoading = true;
      const res = await this.$adminRequest.checkAuth();
      if (res.nothasToken) {
        this.isLoading = false;
        if (this.$route.name !== 'adminLogin') {
          this.$router.replace({ name: 'adminLogin' });
        }
        return;
      }
      if (res.success) {
        if (this.$route.name === 'adminLogin') {
          this.$router.replace('/admin/products');
        } else {
          this.$emit('isValidAuth');
        }
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.$refs.SweetAlert.showErrorAlert(res.errorMessage, 'replace', 'adminLogin');
      }
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>

<template>
  <loading-view :active="isLoading"/>
</template>
