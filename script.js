const form = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const togglePasswordButton = document.querySelector('.toggle-password');
const googleButton = document.getElementById('googleButton');
const appleButton = document.getElementById('appleButton');
const googleCreateButton = document.getElementById('googleCreateButton');

const setFieldError = (field, message) => {
  const errorElement = document.querySelector(`[data-error-for="${field}"]`);
  const inputElement = document.getElementById(field);

  if (errorElement) {
    errorElement.textContent = message;
  }

  if (inputElement) {
    inputElement.classList.toggle('input-error', Boolean(message));
    inputElement.setAttribute('aria-invalid', String(Boolean(message)));
  }
};

const clearFieldError = (field) => {
  setFieldError(field, '');
};

const validateEmail = () => {
  const value = emailInput.value.trim();
  if (!value) {
    setFieldError('email', 'Email is required.');
    return false;
  }

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!isValid) {
    setFieldError('email', 'Please enter a valid email address.');
    return false;
  }

  clearFieldError('email');
  return true;
};

const validatePassword = () => {
  const value = passwordInput.value;
  if (!value) {
    setFieldError('password', 'Password is required.');
    return false;
  }

  if (value.length < 8) {
    setFieldError('password', 'Password must be at least 8 characters.');
    return false;
  }

  clearFieldError('password');
  return true;
};

if (emailInput) {
  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim()) {
      clearFieldError('email');
    }
  });
}

if (passwordInput) {
  passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length > 0) {
      clearFieldError('password');
    }
  });
}

if (togglePasswordButton && passwordInput) {
  togglePasswordButton.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePasswordButton.textContent = isPassword ? 'Hide' : 'Show';
    togglePasswordButton.setAttribute('aria-pressed', String(isPassword));
    togglePasswordButton.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });
}

const redirectToHome = (button, label, color = '#1fa77a') => {
  if (!button) return;

  button.disabled = true;
  button.style.opacity = '0.8';
  const originalText = button.innerHTML;
  button.innerHTML = `<span>${label}</span>`;

  setTimeout(() => {
    window.location.href = 'home.html';
  }, 1000);

  setTimeout(() => {
    button.innerHTML = originalText;
    button.disabled = false;
    button.style.opacity = '1';
  }, 1600);
};

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    loginButton.disabled = true;
    loginButton.classList.add('loading');
    loginButton.querySelector('.button-text').textContent = 'Logging in...';

    setTimeout(() => {
      loginButton.classList.remove('loading');
      loginButton.disabled = false;
      loginButton.querySelector('.button-text').textContent = 'Login successful';

      loginButton.style.background = 'linear-gradient(135deg, #1fa77a 0%, #148963 100%)';
      loginButton.style.boxShadow = '0 20px 24px rgba(31, 167, 122, 0.22)';

      setTimeout(() => {
        window.location.href = 'home.html';
      }, 900);
    }, 1500);
  });
}

if (googleButton) {
  googleButton.addEventListener('click', () => {
    redirectToHome(googleButton, 'Google login successful');
  });
}

if (appleButton) {
  appleButton.addEventListener('click', () => {
    redirectToHome(appleButton, 'Apple login successful');
  });
}

if (googleCreateButton) {
  googleCreateButton.addEventListener('click', () => {
    redirectToHome(googleCreateButton, 'Google sign up successful');
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = document.getElementById('fullName');
    const nameValue = fullName ? fullName.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const passwordVal = passwordInput ? passwordInput.value : '';
    const confirmPassword = document.getElementById('confirmPassword');
    const confirmValue = confirmPassword ? confirmPassword.value : '';

    if (!nameValue) {
      setFieldError('fullName', 'Full name is required.');
      return;
    }

    if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      setFieldError('email', 'Please enter a valid email address.');
      return;
    }

    if (passwordVal.length < 8) {
      setFieldError('password', 'Password must be at least 8 characters.');
      return;
    }

    if (confirmValue !== passwordVal) {
      setFieldError('confirmPassword', 'Passwords do not match.');
      return;
    }

    const submitButton = signupForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Creating account...';
    }

    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1000);
  });
}
