import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./hooks/useAuth";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./components/common";
import IconBell from "./components/ui/IconBell";
import { useTheme } from "./context/ThemeContext";
import bellsLogo from "./assets/images/bells-logo.png";

// College Icons/Badges Data
const COLLEGES = [
  { id: 1, name: "Natural & Applied Sciences", icon: "🔬", accent: "#4a90e2" },
  { id: 2, name: "Engineering", icon: "⚙️", accent: "#e94e77" },
  { id: 3, name: "Food Technology", icon: "🌾", accent: "#50c878" },
  { id: 4, name: "Management Sciences", icon: "📊", accent: "#f39c12" },
  { id: 4, name: "Environmental Sciences", icon: "📊", accent: "#1252f3ff" },
];

// Password Strength Calculator
function calculatePasswordStrength(password) {
  if (!password) return { strength: 0, label: "", color: "" };

  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;

  const levels = [
    { strength: 0, label: "Very Weak", color: "#ff4444" },
    { strength: 1, label: "Weak", color: "#ff8844" },
    { strength: 2, label: "Fair", color: "#ffbb44" },
    { strength: 3, label: "Good", color: "#88cc44" },
    { strength: 4, label: "Strong", color: "#44cc44" },
    { strength: 5, label: "Very Strong", color: "#22aa22" },
  ];

  return levels[strength];
}

// Enhanced Input Component with validation feedback
function LoginInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  icon: Icon,
  autoComplete,
  isValid,
  showPasswordToggle,
  onTogglePassword,
  showPasswordVisible,
  autoFocus,
  onKeyDown,
  disabled,
}) {
  return (
    <div className="login-input-group">
      <label htmlFor={id} className="login-input-label">
        {label}
        {required && <span className="login-required">*</span>}
      </label>
      <div className="login-input-wrapper">
        {Icon && <Icon className="login-input-icon" />}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`login-input-field ${error ? "login-input-error" : ""} ${
            isValid && value ? "login-input-valid" : ""
          }`}
          required={required}
          autoComplete={autoComplete}
          aria-describedby={error ? `${id}-error` : undefined}
          autoFocus={autoFocus}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
        {isValid && value && !error && (
          <span className="login-input-checkmark">✓</span>
        )}
        {showPasswordToggle && (
          <button
            type="button"
            className="login-password-toggle"
            onClick={onTogglePassword}
            aria-label={showPasswordVisible ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPasswordVisible ? "👁️" : "👁️‍🗨️"}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="login-error-message">
          {error}
        </p>
      )}
    </div>
  );
}

// Left Panel - Branding with Tech Pattern
function BrandingPanel() {
  return (
    <div className="login-branding-panel">
      {/* Watermark Logo */}
      <div className="login-watermark" aria-hidden="true">
        <img src={bellsLogo} alt="" />
      </div>

      <div className="login-branding-content">
        <div className="login-brand-info">
          <div className="login-brand-label">Bells University</div>
          <h1 className="login-brand-title">Timetable Generator</h1>
          <p className="login-brand-tagline">
            Institutional scheduling made dependable.
          </p>
        </div>

        <div className="login-brand-features">
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Intelligent Scheduling</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Conflict Resolution</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Real-time Management</span>
          </div>
        </div>

        {/* College Representation Badges */}
        <div className="login-colleges-section">
          <p className="colleges-label">Serving Colleges:</p>
          <div className="colleges-grid">
            {COLLEGES.map((college) => (
              <div
                key={college.id}
                className="college-badge"
                title={college.name}
                style={{ "--college-accent": college.accent }}
              >
                <span className="college-name-display">{college.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="login-brand-footer">
        <p className="login-brand-copyright">
          © 2026 Bells University. All rights reserved.
        </p>
      </div>
    </div>
  );
}

// Right Panel - Auth Form with Enhanced Features
function AuthCard({
  onSubmit,
  username,
  setUsername,
  password,
  setPassword,
  isLoading,
}) {
  const { theme, toggle } = useTheme();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    label: "",
    color: "",
  });
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const usernameInputRef = useRef(null);

  // Auto-focus username field on mount
  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  // Calculate password strength whenever password changes
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e);
    }
  };

  const handleThemeToggle = () => {
    setBellRinging(true);
    toggle();
    setTimeout(() => setBellRinging(false), 600);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setIsUsernameValid(value.trim().length >= 3);
    if (errors.username) {
      setErrors({ ...errors, username: "" });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (errors.password) {
      setErrors({ ...errors, password: "" });
    }
  };

  const handleKeyDown = (e, nextFieldId) => {
    if (e.key === "Enter" && nextFieldId) {
      e.preventDefault();
      const nextField = document.getElementById(nextFieldId);
      if (nextField) nextField.focus();
    }
  };

  return (
    <div className="login-form-panel">
      <div className="login-form-header">
        <div className="login-form-title-section">
          <h2 className="login-form-title">Welcome Back</h2>
          <p className="login-form-subtitle">
            Sign in to your account to continue
          </p>
        </div>
        <button
          className={`login-theme-toggle ${bellRinging ? "bell-ringing" : ""}`}
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          disabled={isLoading}
        >
          <IconBell active={theme === "dark"} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <LoginInput
          id="login-username"
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
          error={errors.username}
          required
          autoComplete="username"
          isValid={isUsernameValid}
          autoFocus={true}
          onKeyDown={(e) => handleKeyDown(e, "login-password")}
          disabled={isLoading}
        />

        <div>
          <LoginInput
            id="login-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            error={errors.password}
            required
            autoComplete="current-password"
            showPasswordToggle={true}
            onTogglePassword={() => setShowPassword(!showPassword)}
            showPasswordVisible={showPassword}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            disabled={isLoading}
          />

          {/* Password Strength Indicator */}
          {password && !errors.password && (
            <div className="password-strength-container">
              <div className="password-strength-bar">
                <div
                  className="password-strength-fill"
                  style={{
                    width: `${(passwordStrength.strength / 5) * 100}%`,
                    backgroundColor: passwordStrength.color,
                  }}
                />
              </div>
              <p
                className="password-strength-label"
                style={{ color: passwordStrength.color }}
              >
                {passwordStrength.label}
              </p>
            </div>
          )}
        </div>

        <div className="login-form-actions">
          <label className="login-remember">
            <input
              type="checkbox"
              aria-label="Remember me"
              disabled={isLoading}
            />
            <span>Remember me</span>
          </label>
          <a href="#forgot" className="login-forgot-link">
            Forgot password?
          </a>
        </div>

        <Button
          variant="brand"
          type="submit"
          disabled={isLoading}
          className={`login-submit-button ${isLoading ? "loading" : ""}`}
        >
          {isLoading ? (
            <>
              <span className="button-spinner"></span>
              <span>Signing in...</span>
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="login-form-divider">
        <span>Need help?</span>
      </div>

      <div className="login-support-info">
        <p className="login-support-text">
          Contact the IT Support Team at{" "}
          <a
            href="mailto:support@bellsuniversity.edu"
            className="login-support-link"
          >
            support@bellsuniversity.edu
          </a>
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(username, password);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Invalid username or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <BrandingPanel />
      <AuthCard
        onSubmit={handleSubmit}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        isLoading={isLoading}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
