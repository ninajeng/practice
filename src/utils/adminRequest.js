import axios from 'axios';
import * as cookie from '@/utils/cookie';

const URL = import.meta.env.VITE_API_URL;
const PATH = import.meta.env.VITE_API_PATH;
const LOGIN_PATH = `${URL}/v2/admin/signin`;
const PRODUCTS_PATH = `${URL}/v2/api/${PATH}/admin/product`;
const CHECKAUTH_PATH = `${URL}/v2/api/user/check`;

function setResData(res) {
  const response = {
    success: true,
    data: res.data || '',
  };
  return response;
}

function setResError(res) {
  const response = {
    success: false,
    errorMessage: res.data.message || res.data,
  };
  return response;
}

function setCatchError(e) {
  const response = {
    success: false,
    errorMessage: e.response?.data?.message || e.response || e,
  };
  return response;
}

function axiosFunction(method, path, data = null) {
  return axios[method](path, data).then((res) => {
    if (res.data.success) {
      return setResData(res);
    }
    return setResError(res);
  }).catch((e) => setCatchError(e));
}

export function checkAuth() {
  const token = cookie.getAdminCookie();
  if (!token) {
    const response = {
      nothasToken: true,
    };
    return response;
  }
  axios.defaults.headers.common.Authorization = token;
  return axiosFunction('post', CHECKAUTH_PATH);
}

export function login(user) {
  return axiosFunction('post', LOGIN_PATH, user);
}

export function getProducts(page = 1) {
  return axiosFunction('get', `${PRODUCTS_PATH}s?page=${page}`);
}

export function updateProduct(data) {
  const product = { ...data };
  const httpMethod = product.id ? 'put' : 'post';
  const path = `${PRODUCTS_PATH}${product.id ? `/${product.id}` : ''}`;
  return axiosFunction(httpMethod, path, { data: product });
}

export function deleteProduct(id) {
  return axiosFunction('delete', `${PRODUCTS_PATH}/${id}`);
}
