<script>
import Swal from 'sweetalert2/dist/sweetalert2';

export default {
  methods: {
    showSuccess(title) {
      Swal.fire({
        title,
        confirmButtonText: '確認',
        icon: 'success',
        timer: 1500,
        timerProgressBar: true,
      });
    },
    showError(title, router) {
      this.isLoading = false;
      Swal.fire({
        icon: 'error',
        title,
        confirmButtonText: '確認',
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        const { method, path } = router;
        if (method && path) {
          this.$router[method](path);
        }
      });
    },
  },
};
</script>

<template></template>
