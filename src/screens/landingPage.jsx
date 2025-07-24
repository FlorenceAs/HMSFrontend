import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  Shield,
  Users,
  BarChart3,
  Clock,
  CheckCircle,
  Star,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate("/onboarding");
  };

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "User Management",
      description:
        "Comprehensive role-based access control for all hospital staff with seamless user management.",
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Patient Care",
      description:
        "Digital patient records, appointment scheduling, and medical history tracking in one place.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      title: "Analytics & Reports",
      description:
        "Real-time insights, financial reports, and operational analytics to drive better decisions.",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure & Compliant",
      description:
        "HIPAA compliant security measures ensuring patient data protection and privacy.",
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "24/7 Support",
      description:
        "Round-the-clock technical support and system monitoring for uninterrupted operations.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-teal-600" />,
      title: "Easy Integration",
      description:
        "Seamless integration with existing hospital systems and medical equipment.",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer, Metro General",
      content:
        "HMS has revolutionized our hospital operations. The intuitive interface and comprehensive features have improved our efficiency by 40%.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Hospital Administrator, City Health",
      content:
        "The multi-role dashboard system is exactly what we needed. Each department can access what they need while maintaining security.",
      rating: 5,
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Nursing, Regional Medical",
      content:
        "Patient management has never been easier. The system is user-friendly and has significantly reduced our administrative burden.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Clinic",
      price: "Free",
      period: "Forever",
      description: "Perfect for small clinics and practices",
      features: [
        "Up to 5 users",
        "Basic patient management",
        "Appointment scheduling",
        "Email support",
        "Basic reporting",
      ],
      highlight: false,
    },
    {
      name: "Hospital",
      price: "$99",
      period: "per month",
      description: "Ideal for medium to large hospitals",
      features: [
        "Unlimited users",
        "Advanced patient management",
        "Full analytics suite",
        "24/7 priority support",
        "Custom integrations",
        "Advanced security features",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact us",
      description: "For large healthcare networks",
      features: [
        "Multi-hospital management",
        "Custom development",
        "Dedicated support team",
        "Advanced compliance tools",
        "API access",
        "Training & onboarding",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-600">
                HMS
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
              <button
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Reviews
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Contact
                </a>
                <button
                  onClick={handleGetStarted}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Healthcare
                  <span className="block text-blue-600">
                    Management
                  </span>
                  Made Simple
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Streamline your hospital operations with our comprehensive
                  management system. From patient care to staff coordination,
                  manage everything in one powerful platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free 30-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Hospital Dashboard
                      </h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          1,247
                        </div>
                        <div className="text-sm text-gray-600">
                          Active Patients
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          89
                        </div>
                        <div className="text-sm text-gray-600">
                          Staff Members
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          156
                        </div>
                        <div className="text-sm text-gray-600">
                          Appointments
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          98%
                        </div>
                        <div className="text-sm text-gray-600">
                          Satisfaction
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          System Performance
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          Excellent
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-11/12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything Your Hospital Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for healthcare
              professionals to manage patients, staff, and operations
              efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what healthcare leaders are saying about HMS
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your healthcare facility's needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  plan.highlight
                    ? "border-blue-500 bg-blue-50 shadow-xl"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period !== "Contact us" && (
                      <span className="text-gray-600">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleGetStarted}
                  className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-200 ${
                    plan.highlight
                      ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105"
                      : "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Hospital?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of healthcare professionals already using HMS
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
              <p className="text-gray-600">support@hms.com</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
              <p className="text-gray-600">
                123 Healthcare Ave, Medical District
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">HMS</span>
              </div>
              <p className="text-gray-400">
                Empowering healthcare facilities with modern, efficient
                management solutions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Training
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;