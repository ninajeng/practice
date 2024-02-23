<script>
import NavBar from '@/components/admin/NavBar.vue';

export default {
  data() {
    return {
      isValid: false,
      isShowMenu: false,
      isLoading: false,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    checkValid(val = true) {
      this.isValid = val;
    },
    showAlert({ type, title, router = {} }) {
      this.$refs.SweetAlert[`show${type}`](title, router);
    },
  },
};
</script>

<template>
  <loading-view :active="isLoading"/>
  <SweetAlert ref="SweetAlert"/>
  <NavBar :is-valid="isValid">
    <RouterView @isValidAuth="checkValid" @showAlert="showAlert" />
  </NavBar>
</template>
