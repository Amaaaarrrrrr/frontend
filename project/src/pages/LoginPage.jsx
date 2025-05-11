import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        const { access_token, user, redirect_url } = data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate(redirect_url);
      } else {
        setError(data.error || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar/Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">University Portal</h1>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="/courses" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Courses
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 bg-blue-600 text-white text-center">
              <GraduationCap className="h-12 w-12 mx-auto mb-3" />
              <h1 className="text-2xl font-bold">
                {role === 'lecturer' ? 'Lecturer Portal' : role === 'admin' ? 'Admin Portal' : 'Student Portal'}
              </h1>
              <p className="text-blue-100 mt-1">
                {role === 'lecturer'
                  ? 'Access your lecturer dashboard'
                  : role === 'admin'
                  ? 'Manage administrative tasks'
                  : 'Access your academic information'}
              </p>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Login as</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['student', 'lecturer', 'admin'].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`p-3 rounded-lg border transition-colors ${
                          role === r
                            ? 'bg-blue-50 border-blue-300 text-blue-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    icon={<Mail className="h-5 w-5 text-gray-400" />}
                  />
                </div>

                <div className="mb-6">
                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center text-sm text-gray-700">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </a>
                </div>

                <Button type="submit" variant="primary" fullWidth disabled={isLoading} className="py-3">
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
                        />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm text-gray-600">
                Don’t have an account?{' '}
                <a href="/register" className="text-blue-600 hover:text-blue-800">
                  Register here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">University Portal</span>
            </div>
            <p className="text-gray-400">
              Empowering students with tools for academic success and campus engagement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {/* Facebook Icon */}
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {/* Twitter Icon */}
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {/* Instagram Icon */}
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Academic Calendar</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Library Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Campus Map</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Career Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">IT Help Desk</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Student Handbook</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Academic Policies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Financial Aid</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Health Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Campus Events</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates on campus events and important announcements.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 flex-grow"
              />
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} University Portal. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;