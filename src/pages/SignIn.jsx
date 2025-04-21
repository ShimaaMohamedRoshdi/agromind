import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import './Signup.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      alert('Sign-In Successful');
      navigate('/dashboard');
    } catch (error) {
      alert('Error during sign-in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="square"></div>
      </div>
    );
  }

  return (
    <div className="signin-container">
      <div className="logo-div">
        <img className="logo-img" src={logo} alt="Logo" />
      </div>
      <div className="signin-wrapper">
        <div className="left-section">
          <h2>Welcome Back!</h2>
          <p>Sign in to your account</p>
          <div className="social-buttons">
            <button className="social-btn facebook">
              <FaFacebook size={20} /> Sign in with Facebook
            </button>
            <button className="social-btn twitter">
              <FaTwitter size={20} /> Sign in with Twitter
            </button>
            <button className="social-btn google">
              <FaGoogle size={20} /> Sign in with Google
            </button>
            <button className="social-btn instagram">
              <FaInstagram size={20} /> Sign in with Instagram
            </button>
          </div>
        </div>
        <div className="right-section">
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="form-group">
                  <Field name="username" placeholder="Username" />
                  <ErrorMessage name="username" component="div" className="error" />
                  {errors.username && touched.username && <div className="error">{errors.username}</div>}
                </div>
                <div className="form-group">
                  <Field name="password" type="password" placeholder="Password" />
                  <ErrorMessage name="password" component="div" className="error" />
                  {errors.password && touched.password && <div className="error">{errors.password}</div>}
                </div>
                <button type="submit" disabled={isSubmitting} className="submit-btn">
                  Sign In
                </button>
                <p className="py-3">
                  Forgot your password?{' '}
                  <Link to="/reset" className="text-success d-inline text-decoration-none">
                    Reset here
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="login-here-div">
        <p>
          Don't have any Account? <Link to="/signup">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
