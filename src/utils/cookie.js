const AdminTokenName = import.meta.env.VITE_Admin_TokenName;

function getCookie(key) {
  const str = `; ${document.cookie}`.split(`; ${key}=`);
  if (str.length === 2) return str.pop().split(';').shift();
  return '';
}

export function setAdminCookie({ token, expired }) {
  document.cookie = `${AdminTokenName}=${token}; expires=${new Date(expired)};`;
}

export function getAdminCookie() {
  return getCookie(AdminTokenName);
}

export function delAdminCookie() {
  document.cookie = `${AdminTokenName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
