import React, { useState, useEffect } from 'react';
import logo from '../Images/Flyvia Logo.png';

export const Login = () => {
  // Predefined user data
  const predefinedUsers = [
    { id: 1, email: 'user1@gmail.com', password: 'password12333345879', name: 'User 1 ' },
    { id: 2, email: 'user2@gmail.com', password: 'password123456789', name: 'User 2 ' },
    { id: 3, email: 'user3@gmail.com', password: 'password123456789123456', name: 'User 3' }
  ];

  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Load remembered email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Validate inputs
      if (!email || !password) {
        setError('Please enter both email and password');
        setLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Check user credentials
      const user = predefinedUsers.find(
        user => user.email === email && user.password === password
      );

      if (user) {
        setSuccess(`Welcome back, ${user.name}! Login successful.`);
  setTimeout(() => {
                        window.location.href = '/#dashboard';
                        window.location.reload();
                    }, 2500);        // Save email if "Remember me" is checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Clear password field
        setPassword('');
      } else {
        setError('Invalid email or password. Please try again.');
      }

      setLoading(false);
    }, 1000);
  };

  // Fill form with test user credentials
  const fillCredentials = (userIndex) => {
    if (userIndex >= 0 && userIndex < predefinedUsers.length) {
      const user = predefinedUsers[userIndex];
      setEmail(user.email);
      setPassword(user.password);
      setError('');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      {/* Video Background */}
      {/* <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-geometric-shapes-moving-in-a-gradient-45066-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div> */}

      {/* Main Content */}
      <div className="main-content">
        {/* Welcome Text */}
        <div className="welcome-section">
            <img 
                    //   className='navbar-brand-custom' 
                    //   ref={brandRef} 
                      style={{width:'120px',height:'120px'}} 
                      src={logo} 
                      alt='logo'
                    />
          <h1 className="welcome-title">Welcome Back</h1>
          <p className="welcome-subtitle">Sign in to access your personalized dashboard</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🚀</span>
              <span>Fast & Secure Login</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Data Protection</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💎</span>
              <span>Premium Experience</span>
            </div>
          </div>
        </div>

        {/* Login Form with Uiverse Design */}
        <form className="form_main" onSubmit={handleLogin}>
          <p className="heading" style={{color:"#FFBEA8"}}>Dashboard Login</p>
          
          {/* Email Field */}
          <div className="inputContainer">
            <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <input 
              type="text" 
              className="inputField" 
              id="username" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Password Field */}
          <div className="inputContainer">
            <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <input 
              type={showPassword ? "text" : "password"} 
              className="inputField" 
              id="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              className="password-toggle-uv" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          
          {/* Additional Options */}
          <div className="form-options-uv">
            <div className="remember-me-uv">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="checkbox-label-uv">
                Remember me
              </label>
            </div>
          </div>

          {/* Messages */}
          {error && <div className="error-message-uv">{error}</div>}
          {success && <div className="success-message-uv">{success}</div>}
          
          {/* Submit Button */}
          <button id="button" type="submit" disabled={loading}>
            {loading ? (
              <div className="loading-content">
                <div className="spinner-small"></div>
                Signing in...
              </div>
            ) : (
              'Submit'
            )}
          </button>
          
        
          
          <p className="signup-link" style={{color:"#FFBEA8"}}>
           Go To  <a href="#/" className="signup-link-a">FlyVia Website</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;