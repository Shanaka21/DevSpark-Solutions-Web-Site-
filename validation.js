// Helper: show toast inside the nearest form
function showToast(el, msg, type='success'){
  const form = el.closest('form');
  const toast = form.querySelector('.toast') || document.createElement('div');
  toast.className = 'toast ' + (type==='success' ? 'success' : 'error');
  toast.textContent = msg;
  toast.style.display = 'block';
  form.appendChild(toast);
  setTimeout(()=>{ toast.style.display='none'; }, 3000);
}

// Email & phone patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const phonePattern = /^\d{10}$/;
const nicPattern = /^([0-9]{9}[vVxX]|[0-9]{12})$/;

// Contact
function validateContactForm(){
  const name = document.getElementById('ct_name').value.trim();
  const email = document.getElementById('ct_email').value.trim();
  const phone = document.getElementById('ct_phone').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !phone || !message){
    showToast(document.getElementById('contactForm'), 'All fields are required!', 'error');
    return false;
  }
  if(!emailPattern.test(email)){
    showToast(document.getElementById('contactForm'), 'Invalid email format!', 'error');
    return false;
  }
  if(!phonePattern.test(phone)){
    showToast(document.getElementById('contactForm'), 'Phone number must be 10 digits!', 'error');
    return false;
  }
  showToast(document.getElementById('contactForm'), 'Thanks! We will get back to you soon.');
  return false; // prevent actual submission for demo
}

// Register
function validateRegisterForm(){
  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const nic = document.getElementById('nic').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if(!fullname || !email || !phone || !nic || !password || !confirmPassword){
    showToast(document.getElementById('registerForm'), 'All fields are required!', 'error');
    return false;
  }
  if(!emailPattern.test(email)){
    showToast(document.getElementById('registerForm'), 'Invalid email format!', 'error');
    return false;
  }
  if(!phonePattern.test(phone)){
    showToast(document.getElementById('registerForm'), 'Phone number must be 10 digits!', 'error');
    return false;
  }
  if(!nicPattern.test(nic)){
    showToast(document.getElementById('registerForm'), 'Invalid NIC format!', 'error');
    return false;
  }
  if(password.length < 6){
    showToast(document.getElementById('registerForm'), 'Password must be at least 6 characters!', 'error');
    return false;
  }
  if(password !== confirmPassword){
    showToast(document.getElementById('registerForm'), 'Passwords do not match!', 'error');
    return false;
  }
  showToast(document.getElementById('registerForm'), 'Registration successful!');
  return false; // prevent actual submission for demo
}

// Feedback
function validateFeedbackForm(){
  const name = document.getElementById('fb_name').value.trim();
  const email = document.getElementById('fb_email').value.trim();
  const phone = document.getElementById('fb_phone').value.trim();
  const feedback = document.getElementById('fb_feedback').value.trim();
  if(!name || !email || !phone || !feedback){
    showToast(document.getElementById('feedbackForm'), 'All fields are required!', 'error');
    return false;
  }
  if(!emailPattern.test(email)){
    showToast(document.getElementById('feedbackForm'), 'Invalid email format!', 'error');
    return false;
  }
  if(!phonePattern.test(phone)){
    showToast(document.getElementById('feedbackForm'), 'Phone number must be 10 digits!', 'error');
    return false;
  }
  showToast(document.getElementById('feedbackForm'), 'Thank you for your feedback!');
  return false; // prevent actual submission for demo
}

// Password strength indicator
const pwd = document.getElementById('password');
if(pwd){
  pwd.addEventListener('input', ()=>{
    const s = document.getElementById('pwdStrength');
    const val = pwd.value;
    let score = 0;
    if(val.length >= 6) score++;
    if(/[A-Z]/.test(val)) score++;
    if(/[0-9]/.test(val)) score++;
    if(/[^A-Za-z0-9]/.test(val)) score++;
    const labels = ['—','Weak','Fair','Good','Strong'];
    s.textContent = 'Strength: ' + labels[score];
  });
}
