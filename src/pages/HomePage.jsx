import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award, 
  Globe, 
  Calendar, 
  ChevronsRight, 
  Menu, 
  X 
} from 'lucide-react';
import axios from 'axios'; 

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/courses'); 
        setCourses(response.data); 
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">University Portal</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#courses" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Courses
              </a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Features
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Contact
              </a>
            </nav>

            <div className="hidden md:flex">
              <Link to="/login">
                <Button variant="primary">Log in</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-700">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2">
            <div className="container mx-auto px-4">
              <nav className="flex flex-col space-y-2">
                <a href="#courses" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium" onClick={toggleMenu}>
                  Courses
                </a>
                <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium" onClick={toggleMenu}>
                  Features
                </a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium" onClick={toggleMenu}>
                  About
                </a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium" onClick={toggleMenu}>
                  Contact
                </a>
                <Link to="/login" className="mt-2">
                  <Button variant="primary" fullWidth>Log in</Button>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Welcome to University Student Portal
              </h1>
              <p className="mt-4 text-xl text-blue-100">
                Your gateway to academic excellence and campus resources
              </p>
              <div className="mt-8">
                <Link to="/login">
                  <Button variant="outline" className="mr-4 bg-white text-blue-700 hover:bg-blue-50 border-white">
                    Log in to Portal
                  </Button>
                </Link>
                <a href="#courses">
                  <Button variant="secondary" className="bg-blue-700 hover:bg-blue-800">
                    Explore Courses
                  </Button>
                </a>
              </div>
            </div>
            <div className="md:w-5/12 flex justify-center md:justify-end">
              <div className="w-full max-w-md relative">
                <div className="bg-white p-8 rounded-lg shadow-lg transform rotate-3 absolute -top-4 -right-4 w-full h-full z-0"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg relative z-10">
                  <div className="flex items-center text-blue-600 mb-4">
                    <GraduationCap className="h-6 w-6 mr-2" />
                    <h3 className="font-bold">Student Portal</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Current Term</span>
                      <span className="font-medium">Fall 2025</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-500">Registration</span>
                      <span className="font-medium text-green-600">Open</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Available Programs</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of academic programs designed to prepare you for success in your chosen field.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {courses.map((course) => (
                <Card key={course.id} className="transition-transform hover:shadow-md hover:-translate-y-1">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-500">{course.code}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 flex-grow mb-4">{course.description}</p>
                    <Link to="/login" className="text-blue-600 flex items-center text-sm font-medium">
                      Learn more <ChevronsRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Portal Features</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our student portal offers a comprehensive suite of tools to enhance your academic journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Course Registration</h3>
              <p className="text-gray-600">
                Easily browse and register for courses each semester, with real-time availability updates.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Grade Management</h3>
              <p className="text-gray-600">
                View your academic progress, grades, and transcript information in one convenient location.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Student Community</h3>
              <p className="text-gray-600">
                Connect with fellow students, join clubs, and participate in campus events through the portal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
