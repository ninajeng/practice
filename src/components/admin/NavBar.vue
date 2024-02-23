<script>
import SweetAlert from '@/components/SweetAlert.vue';

export default {
  data() {
    return {
      isShowMenu: true,
    };
  },
  props: ['isValid'],
  components: {
    SweetAlert,
  },
  methods: {
    logout() {
      this.isLoading = true;
      const API_LOGOUT = `${import.meta.env.VITE_API_URL}/v2/logout`;
      this.axios
        .post(API_LOGOUT)
        .then(() => {
          this.$router.push({ name: 'adminLogin' });
          this.$cookie.delAdminCookie();
          this.isLoading = false;
        })
        .catch((e) => {
          this.isLoading = false;
          this.$refs.SweetAlert.showErrorAlert(e.response?.data?.message || e);
        });
    },
  },
  mounted() {
    const navbarHeight = this.$refs.navbar.offsetHeight;
    this.$refs.list.style.height = `calc(100vh - ${navbarHeight}px )`;
    this.$refs.list.style.top = `${navbarHeight}px`;
  },
};
</script>

<template>
  <SweetAlert ref="SweetAlert"/>
  <nav class="navbar bg-body-tertiary sticky-top" ref="navbar">
    <div class="container-fluid justify-content-start">
      <button class="btn me-1" @click="isShowMenu = !isShowMenu" v-if="isValid">
        <i class="bi bi-list"></i>
      </button>
      <p class="mb-0 h5 text-primary-dark me-2">Juice Oasis</p>
      <p class="mb-0 h5">後台管理</p>
      <div class="ms-auto">
        <router-link class="btn btn-outline-dark btn-sm me-3" to="/">
          回到前台
        </router-link>
        <button class="btn btn-outline-dark btn-sm" @click="logout" v-if="isValid">
          登出
        </button>
      </div>
    </div>
  </nav>
  <div class="flex-fill d-flex flex-column">
    <div class="d-flex flex-fill">
      <div class="bg-light" :class="{show: isShowMenu && isValid}">
        <div class="list-group overflow-y-auto sticky-top" ref="list">
          <div v-if="isValid">
            <RouterLink class="list-group-item list-group-item-action btn-primary border-0"
              to="products">
              產品列表
            </RouterLink>
            <RouterLink class="list-group-item list-group-item-action btn-primary border-0"
              to="coupons">
              優惠券列表
            </RouterLink>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-group {
  width: 0px;
  text-wrap: nowrap;
  overflow-x: hidden;
  transition: width 0.5s;
}
.show .list-group {
  width: 250px;
}
</style>
