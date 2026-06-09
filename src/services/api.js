const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, options = {}) {
  const token = localStorage.getItem('tc_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(json.message || 'Request failed', res.status);
  }
  return json.data;
}

// ── Products ────────────────────────────────────────────────────
export const productsApi = {
  list:        (params = {}) => request(`/products${buildQuery(params)}`),
  bundles:     ()            => request('/products/bundles'),
  individual:  ()            => request('/products/individual'),
  getById:     (id)          => request(`/products/${id}`),
};

// ── Health Concerns ─────────────────────────────────────────────
export const healthConcernsApi = {
  list:    () => request('/health-concerns'),
  getById: (id) => request(`/health-concerns/${id}`),
};

// ── Subscription Plans ──────────────────────────────────────────
export const subscriptionPlansApi = {
  list:    () => request('/subscription-plans'),
  getById: (id) => request(`/subscription-plans/${id}`),
};

// ── Care Services ───────────────────────────────────────────────
export const careServicesApi = {
  list:    () => request('/care-services'),
  getById: (id) => request(`/care-services/${id}`),
};

// ── FAQs ────────────────────────────────────────────────────────
export const faqsApi = {
  list:       (params = {}) => request(`/faqs${buildQuery(params)}`),
  categories: ()            => request('/faqs/categories'),
  getById:    (id)          => request(`/faqs/${id}`),
};

// ── Site Config ─────────────────────────────────────────────────
export const siteConfigApi = {
  list:    (group) => request(`/site-config${group ? `?group=${group}` : ''}`),
  getByKey:(key)   => request(`/site-config/${key}`),
};

// ── Health 360 ──────────────────────────────────────────────────
export const health360Api = {
  list: () => request('/health360'),
};

// ── Testimonials ────────────────────────────────────────────────
export const testimonialsApi = {
  list: (params = {}) => request(`/testimonials${buildQuery(params)}`),
};

// ── Navigation ──────────────────────────────────────────────────
export const navApi = {
  tree: () => request('/nav/tree'),
  flat: () => request('/nav'),
};

// ── Footer ──────────────────────────────────────────────────────
export const footerApi = {
  list: () => request('/footer'),
};

// ── Highlights ──────────────────────────────────────────────────
export const highlightsApi = {
  list:            () => request('/highlights'),
  showcaseBullets: () => request('/highlights/showcase-bullets'),
};

// ── Status Cards ────────────────────────────────────────────────
export const statusCardsApi = {
  list:    (type) => request(`/status-cards${type ? `?type=${type}` : ''}`),
  getById: (id)   => request(`/status-cards/${id}`),
};

// ── Orders ──────────────────────────────────────────────────────
export const ordersApi = {
  create:       (body) => request('/orders', { method: 'POST', body: JSON.stringify(body) }),
  getById:      (id)   => request(`/orders/${id}`),
  getByNumber:  (n)    => request(`/orders/number/${n}`),
  myOrders:     ()     => request('/orders/my'),
};

// ── Payments ────────────────────────────────────────────────────
export const paymentsApi = {
  initiate:     (body)   => request('/payments', { method: 'POST', body: JSON.stringify(body) }),
  updateStatus: (id, body) => request(`/payments/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  getById:      (id)     => request(`/payments/${id}`),
};

// ── Users ────────────────────────────────────────────────────────
export const usersApi = {
  register:  (body) => request('/users/register', { method: 'POST', body: JSON.stringify(body) }),
  login:     (body) => request('/users/login',    { method: 'POST', body: JSON.stringify(body) }),
  me:        ()     => request('/users/me'),
  update:    (body) => request('/users/me',        { method: 'PUT',  body: JSON.stringify(body) }),
  subscriptions: () => request('/users/me/subscriptions'),
  subscribe: (planId) => request('/users/me/subscribe', { method: 'POST', body: JSON.stringify({ planId }) }),
};

// ── Helper ──────────────────────────────────────────────────────
function buildQuery(params) {
  const q = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v != null))
  ).toString();
  return q ? `?${q}` : '';
}

export { ApiError };
