<script>
import CheckAdminAuth from '@/components/admin/CheckAdminAuth.vue';
import ProductModal from '@/components/admin/ProductModal.vue';
import DeleteModal from '@/components/admin/DeleteModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  data() {
    return {
      products: {},
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
      nowPage: 1,
      isLoading: false,
    };
  },
  emits: ['isValidAuth', 'showAlert'],
  components: {
    CheckAdminAuth,
    ProductModal,
    DeleteModal,
    PaginationComponent,
  },
  methods: {
    validAuth() {
      this.$emit('isValidAuth');
      this.getData();
    },
    async getData() {
      this.isLoading = true;
      const res = await this.$adminRequest.getProducts();
      if (res.success) {
        this.pagination = res.data.pagination;
        this.products = res.data.products;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.$emit('showAlert', { type: 'Error', title: res.errorMessage });
      }
    },
    editProduct(data = {}) {
      this.tempProduct = { ...data };
      if (!Array.isArray(this.tempProduct.imagesUrl)) {
        this.tempProduct.imagesUrl = [];
      }
      this.$refs.ProductModal.show();
    },
    async updateProduct(data) {
      this.isLoading = true;
      const product = { ...data };
      if (product.imagesUrl?.length) {
        this.product.imagesUrl = product.imagesUrl.filter((url) => url !== '');
      }
      const res = await this.$adminRequest.updateProduct(product);
      if (res.success) {
        this.$refs.ProductModal.hide();
        this.isLoading = false;
        this.$emit('showAlert', { type: 'Success', title: res.data.message });
        this.getData();
      } else {
        this.isLoading = false;
        this.$emit('showAlert', { type: 'Error', title: res.errorMessage });
      }
    },
    deleteConfirm(data) {
      this.$refs.DeleteModal.show(data);
    },
    async deleteProduct(id) {
      this.isLoading = true;
      const res = await this.$adminRequest.deleteProduct(id);
      if (res.success) {
        this.$emit('showAlert', { type: 'Success', title: res.data.message });
        this.getData();
      } else {
        this.isLoading = false;
        this.$emit('showAlert', { type: 'Error', title: res.errorMessage });
      }
    },
    setPage(page) {
      this.nowPage = page;
      this.getData();
    },
  },
};
</script>

<template>
  <loading-view :active="isLoading" />
  <CheckAdminAuth @isValidAuth="validAuth" />
  <product-modal :temp-product="tempProduct" ref="ProductModal" @update-product="updateProduct" />
  <delete-modal ref="DeleteModal" @delete-product="deleteProduct" />
  <sweet-alert ref="SweetAlert" />
  <div class="container p-5">
    <div class="d-flex justify-content-between mb-2 align-items-center flex-wrap">
      <h2 class="mb-0">產品列表</h2>
      <button type="button" class="btn btn-primary btn-sm" @click="editProduct">建立新的產品</button>
    </div>
    <div class="text-nowrap overflow-x-auto">
      <table class="table table-hover align-middle">
        <thead>
        </thead>
        <tbody class="border-top">
          <tr v-for="product in products" :key="product.id">
            <td>
              <div class="d-flex align-items-center position-relative">
                <button type="button" class="btn mx-3 stretched-link border-0"
                  @click="editProduct(product)">
                  <div class="bg-light text-start" style="width: 150px; height: 150px;">
                    <img :src="product.imageUrl" :alt="product.title" class="w-100 h-100"
                    style="object-fit: cover;">
                  </div>
                  <div class="bg-success bg-opacity-50 text-white" v-if="product.is_enabled">
                    啟用
                  </div>
                  <div class="bg-gray text-white" v-else>未啟用</div>
                </button>
                <div>
                  <h4 class="mb-2">{{ product.title }}
                    <span class="productBadge secondaryOutlineBadge">{{ product.category }}</span>
                  </h4>
                  <p class="mb-2" v-if="product.type === 'fruit'">{{ product.unit }}</p>
                  <p class="mb-1">
                    <span v-if="product.origin_price === product.price">
                      {{ `NT$ ${product.origin_price}` }}
                    </span>
                    <span v-else>
                      <del class="me-2 text-muted">
                        {{ $filters.currency(product.origin_price) }}
                      </del>
                      {{ `NT$ ${$filters.currency(product.price)}` }}
                    </span>
                  </p>
                </div>
              </div>
            </td>
            <td width="50">
              <button type="button" class="btn btn-sm btn-outline-gray-dark"
                @click="deleteConfirm(product)">
                <i class="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-3">
      <pagination-component :pagination="pagination" @set-page="setPage"></pagination-component>
    </div>
  <pre>
    {{ products }}
  </pre>
  </div>
</template>
