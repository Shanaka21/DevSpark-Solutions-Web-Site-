// js/validation.js (simple, easy to follow)
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // stop the default submit (no refresh)

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const nic = document.getElementById('nic').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    const phonePattern = /^\d{10}$/; // change if you want +94 or 0xxx
    const nicPattern = /^([0-9]{9}[vVxX]|[0-9]{12})$/;

    if (!fullname || !email || !phone || !nic || !password || !confirmPassword) {
      showToast(form, 'All fields are required!', 'error'); return;
    }
    if (!emailPattern.test(email)) {
      showToast(form, 'Invalid email format!', 'error'); return;
    }
    if (!phonePattern.test(phone)) {
      showToast(form, 'Phone number must be 10 digits!', 'error'); return;
    }
    if (!nicPattern.test(nic)) {
      showToast(form, 'Invalid NIC format!', 'error'); return;
    }
    if (password.length < 6) {
      showToast(form, 'Password must be at least 6 characters!', 'error'); return;
    }
    if (password !== confirmPassword) {
      showToast(form, 'Passwords do not match!', 'error'); return;
    }

    showToast(form, 'Registration successful!', 'success');
    // if you want to actually send to server, use: form.submit();
  });

  // password strength small helper
  const pwd = document.getElementById('password');
  const s = document.getElementById('pwdStrength');
  if (pwd && s) {
    pwd.addEventListener('input', function () {
      const val = pwd.value;
      let score = 0;
      if (val.length >= 6) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      const labels = ['—', 'Weak', 'Fair', 'Good', 'Strong'];
      s.textContent = 'Strength: ' + labels[score];
    });
  }

  // showToast: simple, appended to the form
  function showToast(formEl, msg, type = 'success') {
    let toast = formEl.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      formEl.appendChild(toast);
    }
    toast.className = 'toast ' + (type === 'success' ? 'success' : 'error');
    toast.textContent = msg;
    toast.style.display = 'block';
    if (toast._timer) clearTimeout(toast._timer);
    toast._timer = setTimeout(() => (toast.style.display = 'none'), 3000);
  }
});
