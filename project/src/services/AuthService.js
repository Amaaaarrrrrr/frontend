
export const authService = {
  login: async (email, password, role) => {
    const response = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Login failed');

    const { access_token, user, redirect_url } = data;

    // Save token here
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    return { access_token, user, redirect_url };
  },

  async register(data) {
    try {
      const response = await post('http://127.0.0.1:5000/api/register', data);
      const { access_token, user } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      const message =
        error.response?.data?.error || 'Registration failed. Please check your details and try again.';
      throw new Error(message);
    }
  },

  async getCurrentUser() {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return null;

      const response = await get('http://127.0.0.1:5000/api/profile');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch current user:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      return null;
    }
  },

  logout() {
    localStorage.removeItem('access_token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },
};
