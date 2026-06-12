/* SAZ Enterprises Interactive JavaScript Code */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initProductFilter();
  initImageGallery();
  initEnquiryModal();
  initContactForm();
  initProductDetail();
});

/* ==========================================================================
   Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('mobile-active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('mobile-active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
   Product Catalog Filters (products.html)
   ========================================================================== */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.products-grid .product-card');

  if (filterBtns.length > 0 && productCards.length > 0) {
    // Check URL parameters for filtering on load
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');

    const filterCategory = (filterValue) => {
      // Set active button
      filterBtns.forEach(b => {
        if (b.getAttribute('data-filter') === filterValue) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    };

    if (catParam) {
      filterCategory(catParam);
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        filterCategory(filterValue);
        
        // Clean URL to keep state clean without reloading
        const newUrl = window.location.pathname + (filterValue !== 'all' ? `?cat=${filterValue}` : '');
        window.history.pushState({ path: newUrl }, '', newUrl);
      });
    });
  }
}

/* ==========================================================================
   Thumbnail Swapping (product-detail.html)
   ========================================================================== */
function initImageGallery() {
  const thumbs = document.querySelectorAll('.gallery-thumb-btn');
  const mainImageText = document.querySelector('.gallery-main .placeholder-text');

  if (thumbs.length > 0 && mainImageText) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Remove active from all thumbs
        thumbs.forEach(t => t.classList.remove('active'));
        
        // Add active to current
        thumb.classList.add('active');

        // Swap the main image description text/src (since we are using placeholders)
        const label = thumb.getAttribute('data-label');
        mainImageText.textContent = label;
      });
    });
  }
}

/* ==========================================================================
   Enquiry Modal Dialog
   ========================================================================== */
function initEnquiryModal() {
  const openBtns = document.querySelectorAll('[data-open-enquiry]');
  const modal = document.querySelector('#enquiryModal');
  const closeBtn = document.querySelector('.modal-close');
  const modalForm = document.querySelector('#modalEnquiryForm');

  if (modal) {
    // Open Modal
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = btn.getAttribute('data-product-name') || 'B2B Products';
        const productInput = modal.querySelector('#enquiry-product');
        
        if (productInput) {
          productInput.value = productName;
        }
        
        modal.style.display = 'flex';
        // Focus first field
        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
      });
    });

    // Close Modal
    const closeModal = () => {
      modal.style.display = 'none';
      if (modalForm) modalForm.reset();
      clearErrors(modalForm);
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Keydown handlers (Close modal on Esc key)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });

    // Handle Form Submission
    if (modalForm) {
      modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(modalForm, () => {
          closeModal();
        });
      });
    }
  }
}

/* ==========================================================================
   Form Handling & Validation
   ========================================================================== */
function initContactForm() {
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    // Add real-time phone formatting if present
    const phoneInput = contactForm.querySelector('input[type="tel"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Non-digits out
        if (value.length > 10) value = value.slice(0, 10);
        
        // Simple visual formatting: XXXXX XXXXX
        if (value.length > 5) {
          e.target.value = `${value.slice(0, 5)} ${value.slice(5)}`;
        } else {
          e.target.value = value;
        }
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit(contactForm);
    });
  }
}

function handleFormSubmit(form, onSuccess = null) {
  clearErrors(form);
  
  const errors = validateForm(form);
  
  if (errors.length > 0) {
    // Show errors inline
    errors.forEach(err => {
      showError(err.input, err.message);
    });
    // Focus the first invalid field
    errors[0].input.focus();
    return;
  }

  // ── Web3Forms API Integration ──────────────────────────────────────────
  // Sends form data as an email to the CEO at sazenterprises788@gmail.com
  // Get your free access key at: https://web3forms.com/
  // ──────────────────────────────────────────────────────────────────────
  const WEB3FORMS_ACCESS_KEY = '0e4b1f8d-b74d-48d9-815b-87d23cf6c2fa';

  const submitBtn = form.querySelector('[type="submit"]');
  const spinner = submitBtn.querySelector('.spinner');
  
  if (!submitBtn) return;

  // Lock button & show spinner
  submitBtn.disabled = true;
  if (spinner) {
    spinner.style.display = 'inline-block';
  }
  const originalText = submitBtn.innerText;
  
  submitBtn.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
      node.nodeValue = 'Sending enquiry…';
    }
  });

  // Collect all form fields
  const formData = new FormData(form);

  // Append Web3Forms required fields
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('subject', 'New Enquiry — SAZ Enterprises Website');
  formData.append('from_name', 'SAZ Enterprises Website');

  // Convert to JSON for Web3Forms
  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(jsonData)
  })
  .then(response => response.json())
  .then(data => {
    // Reset button state
    submitBtn.disabled = false;
    if (spinner) spinner.style.display = 'none';
    submitBtn.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
        node.nodeValue = originalText;
      }
    });

    if (data.success) {
      form.reset();
      showToast('Thank you! Your enquiry has been sent successfully. We will contact you within 24 hours.');
      if (onSuccess) onSuccess();
    } else {
      showToast('⚠️ Something went wrong. Please try again or call us directly.');
    }
  })
  .catch(error => {
    console.error('Form submission error:', error);
    // Reset button state on error
    submitBtn.disabled = false;
    if (spinner) spinner.style.display = 'none';
    submitBtn.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
        node.nodeValue = originalText;
      }
    });
    showToast('⚠️ Network error. Please check your connection and try again.');
  });
}

function validateForm(form) {
  const errors = [];
  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const messageInput = form.querySelector('[name="message"]');

  if (nameInput && !nameInput.value.trim()) {
    errors.push({ input: nameInput, message: 'Full name is required.' });
  }

  if (emailInput) {
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      errors.push({ input: emailInput, message: 'Email address is required.' });
    } else if (!validateEmail(emailVal)) {
      errors.push({ input: emailInput, message: 'Please enter a valid email address.' });
    }
  }

  if (phoneInput) {
    const phoneVal = phoneInput.value.replace(/\s/g, ''); // Strip formatting spaces
    if (!phoneVal) {
      errors.push({ input: phoneInput, message: 'Phone number is required.' });
    } else if (phoneVal.length < 10) {
      errors.push({ input: phoneInput, message: 'Please enter a valid 10-digit mobile number.' });
    }
  }

  if (messageInput && !messageInput.value.trim()) {
    errors.push({ input: messageInput, message: 'Please enter details of your enquiry.' });
  }

  return errors;
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

function showError(input, message) {
  input.classList.add('is-invalid');
  input.style.borderColor = '#dc2626';

  const errEl = document.createElement('span');
  errEl.className = 'validation-error';
  errEl.setAttribute('role', 'alert');
  errEl.innerHTML = `⚠️ ${message}`;
  
  // Insert error after input element
  input.parentNode.appendChild(errEl);
}

function clearErrors(form) {
  if (!form) return;
  const invalidInputs = form.querySelectorAll('.is-invalid');
  invalidInputs.forEach(input => {
    input.classList.remove('is-invalid');
    input.style.borderColor = '';
  });

  const errElements = form.querySelectorAll('.validation-error');
  errElements.forEach(el => el.remove());
}

/* ==========================================================================
   Toast Notifications
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('#toast-notification');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `<span>✓</span> ${message}`;
  toast.style.display = 'flex';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

/* ==========================================================================
   Dynamic Product Details Loader (product-detail.html)
   ========================================================================== */
const productsDb = {
"college-bag-skybags": {
    "name": "Sky College Bag",
    "price": "₹200",
    "moq": "100 Pieces",
    "material": "Polyester / Nylon",
    "color": "Multiple Colors Available",
    "usage": "College / Casual",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Plain Polyester college bag, perfect for daily use. Durable zippers, padded shoulder straps, multiple compartments.",
    "imgSrc": "images/college-bags/scbf.webp",
    "images": [
        "images/college-bags/scbf.webp",
        "images/college-bags/scbr.webp",
        "images/college-bags/scbb.webp",
        "images/college-bags/sbcall.webp"
    ]
},
  "college-bag-dot": {
    "name": "College Bag",
    "price": "₹180",
    "moq": "100 Pieces",
    "material": "Polyester / Nylon",
    "color": "Multiple Colors Available",
    "usage": "College / Casual",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Polyester college bag with modern design. Spacious main compartment, front pocket, side mesh pockets for bottles.",
    // "imgSrc": "images/college-bags/college-bag-dot-front.png",
     "images": [
         "images/college-bags/college-bag-dot-front.png",
        "images/college-bags/college-bag-dot-side.png",
        "images/college-bags/college-bag-dot-back.png",
        "images/college-bags/college-bag-dot-group.png"
    ]
  },
  "adidas-college-bag": {
    "name": "Adidas College Bag",
    "price": "₹250",
    "moq": "100 Pieces",
    "material": "Polyester / Nylon",
    "color": "Multiple Colors Available",
    "usage": "College / Casual",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Premium Adidas-style college bag. Lightweight, ergonomic design with padded back panel and adjustable straps.",
    // "imgSrc": "https://5.imimg.com/data5/SELLER/Default/2024/5/419595892/OU/UB/TZ/104789349/5-250x250.jpg"
     "images": [
         "images/college-bags/adias-clg-bag-front.png",
        "images/college-bags/adidas-clg-bag-side.png",
        "images/college-bags/adidas-clg-bag-back.png",
        "images/college-bags/adiads-college-bag-group.png"
    ]
  },
  "sky-college-bag": {
    "name": "Sky College Bag",
    "price": "₹220",
    "moq": "100 Pieces",
    "material": "Polyester / Nylon",
    "color": "Multiple Colors Available",
    "usage": "College / Casual",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Polyester college bag with vibrant sky design. Water-resistant material, durable construction, multiple pockets.",
    // "imgSrc": "https://5.imimg.com/data5/SELLER/Default/2024/5/419596228/LB/LK/SE/104789349/13-250x250.jpg"
     "images": [
         "images/college-bags/sky-bag-f.png",
        "images/college-bags/sky-bag-s.png",
        "images/college-bags/sky-bag-b.png",
        "images/college-bags/sky-bag-g.png"
    ]
  },
  "skybag-college-bag": {
    "name": "Skybag College Bag",
    "price": "₹230",
    "moq": "100 Pieces",
    "material": "Polyester / Nylon",
    "color": "Multiple Colors Available",
    "usage": "College / Casual",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Stylish Skybag college bag with trendy prints. Comfortable padded straps, laptop compartment, organizer pocket.",
    // "imgSrc": "https://5.imimg.com/data5/SELLER/Default/2024/5/419597211/MN/GX/OU/104789349/40-250x250.jpg"
     "images": [
         "images/college-bags/skb-f.png",
        "images/college-bags/skb-g.png",
        "images/college-bags/skb-g2.png",
       
    ]
  },
  "girls-college-bag": {
    "name": "Girls College Bag",
    "price": "₹210",
    "moq": "100 Pieces",
    "material": "Polyester / Nylon",
    "color": "Multiple Colors Available",
    "usage": "College / Casual",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Specially designed for girls with elegant patterns. Lightweight, spacious interior, secure zip closures.",
    // "imgSrc": "https://5.imimg.com/data5/SELLER/Default/2024/5/419596595/AL/IR/GM/104789349/21-250x250.jpg"
    "images": [
        "images/college-bags/gcb-f.png",
        "images/college-bags/gcb-s.png",
         "images/college-bags/gcb-b.png",
        "images/college-bags/gcb-g.png",
        
    ]
  },
  "ladies-college-bag": {
    "name": "Ladies College Bag",
    "price": "₹240",
    "moq": "100 Pieces",
    "material": "Polyester / Nylon",
    "color": "Multiple Colors Available",
    "usage": "College / Casual",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Elegant ladies college bag with fashionable design. Padded laptop sleeve, multiple compartments, comfortable carry.",
    // "imgSrc": "https://5.imimg.com/data5/SELLER/Default/2024/5/419596990/QH/KP/OL/104789349/34-250x250.jpg"
    "images": [
        "images/college-bags/lcb-g.png",
        "images/college-bags/lcb-g2.png",
    ]
  },
  "college-bag-for-girls": {
    "name": "College Bag For Girls",
    "price": "₹200",
    "moq": "100 Pieces",
    "material": "Polyester / Nylon",
    "color": "Multiple Colors Available",
    "usage": "College / Casual",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Trendy college bag designed for girls. Attractive colors, durable material, spacious and well-organized interior.",
    // "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/5/419963239/UU/UM/HW/104789349/product-jpeg-250x250.png"
    "images": [
        "images/college-bags/cg-f.png",
        "images/college-bags/cg-s.png",
        "images/college-bags/cg-b.png"
    ]
  },
  "school-bags-college-bags": {
    "name": "School Bags College Bags",
    "price": "₹190",
    "moq": "100 Pieces",
    "material": "Polyester / Nylon",
    "color": "Multiple Colors Available",
    "usage": "College / Casual",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Versatile dual-purpose bag for school and college. Heavy-duty construction, ergonomic padding, multiple pockets.",
    // "imgSrc": "https://5.imimg.com/data5/IOS/Default/2025/5/510628584/VM/YK/GK/104789349/product-jpeg-250x250.png"
    "images": [
      "images/college-bags/sbc-f.png",
      "images/college-bags/sbc-f2.png",
      "images/college-bags/sbc-f3.png"
    ]
  },
  "stylish-college-bag": {
    "name": "Stylish College Bag",
    "price": "₹220",
    "moq": "100 Pieces",
    "material": "Polyester / Nylon",
    "color": "Multiple Colors Available",
    "usage": "College / Casual",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Fashionable college bag with modern aesthetics. Durable polyester, smooth zippers, padded straps for comfort.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2025/5/510628757/RS/ZW/WA/104789349/product-jpeg-250x250.png"
  },
  "fancy-college-bags": {
    "name": "Fancy College Bags",
    "price": "₹210",
    "moq": "100 Pieces",
    "material": "Polyester / Nylon",
    "color": "Multiple Colors Available",
    "usage": "College / Casual",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Fancy design college bags with premium finish. Eye-catching prints, sturdy build, ideal for college students.",
    // "imgSrc": "https://5.imimg.com/data5/IOS/Default/2025/5/510627452/OV/RW/ET/104789349/product-jpeg-250x250.png"
    "images": [
      "images/college-bags/fastion.png",
      "images/college-bags/fastion2.png",
      "images/college-bags/fastion3.png"
    ]
  },
  "saz-school-college-bagpack": {
    "name": "Saz School And College Bagpack",
    "price": "₹200",
    "moq": "100 Pieces",
    "material": "Polyester / Nylon",
    "color": "Multiple Colors Available",
    "usage": "College / Casual",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "SAZ's own brand school & college backpack. High-quality polyester, water-resistant, reinforced stitching.",
    // "imgSrc": "https://5.imimg.com/data5/IOS/Default/2025/4/504567525/WA/MB/HB/104789349/product-jpeg-250x250.png"
    "images": [
        "images/college-bags/saz-snc-f.png",
        "images/college-bags/saz-snc-g.png"
        
    ]
  },
  "skybags-school-backpacks": {
    "name": "Skybags School Backpacks",
    "price": "₹180",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "Printed Polyester school backpacks. Durable construction, padded shoulder straps, multiple compartments for books and supplies.",
    // "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/12/474299572/UY/RG/LT/104789349/product-jpeg-250x250.png"
    "images": [
        "images/school-bags/sky=sb-f.png",
        "images/school-bags/sky-sb-f2.png",
        "images/school-bags/sky-sb-b.png"

        
    ]
  },
  "diesel-school-college": {
    "name": "Diesel School And College Bags",
    "price": "₹220",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "Diesel-style school and college bags. Rugged design, heavy-duty zippers, padded back for comfort during long hours.",
    // "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/12/474297330/NL/EA/DL/104789349/product-jpeg-250x250.png"
    "images": [
        "images/school-bags/diseal-f.png",
        "images/school-bags/diseal-b.png"   
    ]
  },
  "school-bags-dot": {
    "name": "School Bags",
    "price": "₹170",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "Standard polyester school bags. Waterproof material, reflective strips for safety, ergonomic design for growing kids.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/12/474284637/PB/JR/MR/104789349/product-jpeg-250x250.png"
  },
  "safari-school-bag": {
    "name": "Safari School Bag",
    "price": "₹200",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "Safari brand school bag with adventure-themed design. Strong stitching, ample storage, comfortable padded straps.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/12/474299382/TV/UO/CX/104789349/product-jpeg-250x250.png"
  },
  "wildcraft-school-bags": {
    "name": "Wildcraft School Bags",
    "price": "₹250",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "Wildcraft brand school bags. Tough polyester fabric, rain cover included, ergonomic back support system.",
    "imgSrc": "https://5.imimg.com/data5/SELLER/Default/2024/4/413588260/AI/ZD/DK/104789349/wildcraft-school-bags-250x250.jpg"
  },
  "american-tourister-school": {
    "name": "American Tourister School Bags",
    "price": "₹280",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "American Tourister branded school bags. Premium quality, scratch-resistant coating, multiple organized compartments.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/3/397722793/UE/UH/GS/104789349/product-jpeg-250x250.png"
  },
  "polyester-school-bag": {
    "name": "Polyester School Bag",
    "price": "₹160",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "Durable polyester school bag. Lightweight and waterproof, ideal for daily school use with multiple pockets.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2025/5/510628129/HP/FL/TL/104789349/product-jpeg-250x250.png"
  },
  "sky-bag-school-bags": {
    "name": "Sky Bag School Bags",
    "price": "₹190",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "Sky Bag branded school bags with attractive colors. Reinforced bottom, breathable mesh back, sturdy handles.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/12/474295958/FJ/XT/ZJ/104789349/product-jpeg-250x250.png"
  },
  "fancy-school-bag": {
    "name": "Fancy School Bag",
    "price": "₹180",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "Fancy patterned school bag with vibrant designs. Smooth zippers, padded straps, ideal for primary and secondary students.",
    "imgSrc": "https://5.imimg.com/data5/SELLER/Default/2024/5/419597080/LG/PL/AT/104789349/35-250x250.jpg"
  },
  "american-tourister-backpack": {
    "name": "American Tourister Backpack",
    "price": "₹270",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "American Tourister backpack for school. Premium fabric, padded laptop compartment, water-resistant coating.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/12/474295440/PW/ZX/WD/104789349/product-jpeg-250x250.png"
  },
  "wildcraft-school-backpack-bag": {
    "name": "Wildcraft School Backpack Bag",
    "price": "₹260",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "Wildcraft school backpack bag with rugged design. Weather-proof material, chest strap, heavy-load capacity.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/12/474294911/AY/ZS/RQ/104789349/product-jpeg-250x250.png"
  },
  "school-bag-printed-blue": {
    "name": "Printed Blue School Bag",
    "price": "₹175",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "Printed blue school bag. Attractive design, durable nylon, padded shoulder straps, front organizer pocket.",
    "imgSrc": "placeholder:Printed Blue School Bag"
  },
  "school-bag-casual": {
    "name": "Casual School Bag",
    "price": "₹165",
    "moq": "150 Pieces",
    "material": "Polyester / Waterproof Oxford",
    "color": "Multiple Colors Available",
    "usage": "Primary / High School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "25 Litres",
    "origin": "India",
    "desc": "Casual school bag with relaxed design. Lightweight, breathable back panel, side mesh pockets, easy-grab handle.",
    "imgSrc": "placeholder:Casual School Bag"
  },
  "wildcraft-school-college-premium": {
    "name": "Wildcraft School College Premium Backpack",
    "price": "₹300",
    "moq": "150 Pieces",
    "material": "Nylon / Ripstop",
    "color": "Multiple Colors Available",
    "usage": "School / Extra-curricular",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "28 Litres",
    "origin": "India",
    "desc": "Premium Wildcraft backpack for school & college. Ergonomic design, padded laptop sleeve, rain cover included.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/3/397720855/AN/DB/UE/104789349/product-jpeg-250x250.png"
  },
  "skybags-school-college-backpacks": {
    "name": "Skybags School/College Backpacks",
    "price": "₹220",
    "moq": "150 Pieces",
    "material": "Nylon / Ripstop",
    "color": "Multiple Colors Available",
    "usage": "School / Extra-curricular",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "28 Litres",
    "origin": "India",
    "desc": "Skybags branded school/college backpacks. Multi-pocket design, durable zippers, comfortable padded straps.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/3/397553305/SG/DD/TC/104789349/product-jpeg-125x125.png"
  },
  "unisex-wildcraft-premium": {
    "name": "Unisex Wildcraft Premium Backpack",
    "price": "₹310",
    "moq": "150 Pieces",
    "material": "Nylon / Ripstop",
    "color": "Multiple Colors Available",
    "usage": "School / Extra-curricular",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "28 Litres",
    "origin": "India",
    "desc": "Unisex Wildcraft premium backpack. High-capacity, weather-resistant, breathable mesh padding, chest strap support.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/3/397723806/RQ/LD/MG/104789349/product-jpeg-250x250.png"
  },
  "skybags-premium-backpacks": {
    "name": "Skybags Premium Backpacks",
    "price": "₹280",
    "moq": "150 Pieces",
    "material": "Nylon / Ripstop",
    "color": "Multiple Colors Available",
    "usage": "School / Extra-curricular",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "28 Litres",
    "origin": "India",
    "desc": "Skybags premium school/college backpacks. Top-grade polyester, reinforced base, organized interior compartments.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/3/397720161/GM/IR/ZT/104789349/product-jpeg-250x250.png"
  },
  "skybags-backpacks-gen": {
    "name": "Skybags Backpacks",
    "price": "₹200",
    "moq": "150 Pieces",
    "material": "Nylon / Ripstop",
    "color": "Multiple Colors Available",
    "usage": "School / Extra-curricular",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "28 Litres",
    "origin": "India",
    "desc": "General-purpose Skybags backpacks. Versatile design, suitable for school, college, and casual outings.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/5/419964416/PD/RZ/VV/104789349/product-jpeg-250x250.png"
  },
  "school-backpack-ergonomic": {
    "name": "Ergonomic School Backpack",
    "price": "₹350",
    "moq": "150 Pieces",
    "material": "Nylon / Ripstop",
    "color": "Multiple Colors Available",
    "usage": "School / Extra-curricular",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "28 Litres",
    "origin": "India",
    "desc": "Orthopedic back support panel, breathable mesh, quick-release chest straps, even weight distribution design.",
    "imgSrc": "placeholder:Ergonomic School Backpack"
  },
  "school-backpack-waterproof": {
    "name": "Waterproof School Backpack",
    "price": "₹240",
    "moq": "150 Pieces",
    "material": "Nylon / Ripstop",
    "color": "Multiple Colors Available",
    "usage": "School / Extra-curricular",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "28 Litres",
    "origin": "India",
    "desc": "Fully waterproof school backpack with sealed seams. Perfect for monsoon season, easy-clean surface, padded interior.",
    "imgSrc": "placeholder:Waterproof School Backpack"
  },
  "school-backpack-multicolor": {
    "name": "Multicolor School Backpack",
    "price": "₹195",
    "moq": "150 Pieces",
    "material": "Nylon / Ripstop",
    "color": "Multiple Colors Available",
    "usage": "School / Extra-curricular",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "28 Litres",
    "origin": "India",
    "desc": "Vibrant multicolor school backpack. Trendy design, durable polyester, ergonomic straps, multiple zip pockets.",
    "imgSrc": "placeholder:Multicolor School Backpack"
  },
  "school-backpack-lightweight": {
    "name": "Lightweight School Backpack",
    "price": "₹170",
    "moq": "150 Pieces",
    "material": "Nylon / Ripstop",
    "color": "Multiple Colors Available",
    "usage": "School / Extra-curricular",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "28 Litres",
    "origin": "India",
    "desc": "Ultra-lightweight school backpack for younger kids. Soft padded straps, fun prints, easy-pull zippers, safe materials.",
    "imgSrc": "placeholder:Lightweight School Backpack"
  },
  "hp-premium-laptop-backpacks": {
    "name": "HP Premium Laptop Backpacks",
    "price": "₹350",
    "moq": "50 Pieces",
    "material": "1680D Polyester / PU Leather",
    "color": "Multiple Colors Available",
    "usage": "Office / Business Travel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "35 Litres",
    "origin": "India",
    "desc": "HP branded premium laptop backpacks. Padded laptop compartment fits up to 15.6\", anti-theft pocket, USB charging port.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/3/397720618/UH/KR/DU/104789349/product-jpeg-250x250.png"
  },
  "american-tourister-laptop": {
    "name": "American Tourister Laptop Backpack",
    "price": "₹380",
    "moq": "50 Pieces",
    "material": "1680D Polyester / PU Leather",
    "color": "Multiple Colors Available",
    "usage": "Office / Business Travel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "35 Litres",
    "origin": "India",
    "desc": "American Tourister premium laptop backpack. Ergonomic design, shock-absorbing laptop pocket, organizer panel.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/3/397724329/GQ/AB/YA/104789349/product-jpeg-250x250.png"
  },
  "executive-laptop-backpack": {
    "name": "Executive Laptop Backpack",
    "price": "₹450",
    "moq": "50 Pieces",
    "material": "1680D Polyester / PU Leather",
    "color": "Multiple Colors Available",
    "usage": "Office / Business Travel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "35 Litres",
    "origin": "India",
    "desc": "Premium 1680D polyester executive backpack. Fits 17\" laptops, structured organization, luggage strap, water-resistant.",
    "imgSrc": "placeholder:Executive Laptop Backpack"
  },
  "slim-laptop-backpack": {
    "name": "Slim Professional Laptop Backpack",
    "price": "₹400",
    "moq": "50 Pieces",
    "material": "1680D Polyester / PU Leather",
    "color": "Multiple Colors Available",
    "usage": "Office / Business Travel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "35 Litres",
    "origin": "India",
    "desc": "Sleek slim-profile laptop backpack for professionals. Business-ready design, quick-access pockets, TSA-friendly.",
    "imgSrc": "placeholder:Slim Professional Laptop Backpack"
  },
  "anti-theft-laptop-backpack": {
    "name": "Anti-Theft Laptop Backpack",
    "price": "₹420",
    "moq": "50 Pieces",
    "material": "1680D Polyester / PU Leather",
    "color": "Multiple Colors Available",
    "usage": "Office / Business Travel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "35 Litres",
    "origin": "India",
    "desc": "Anti-theft design with hidden zippers, RFID-blocking pocket, reflective strips, and a built-in combination lock.",
    "imgSrc": "placeholder:Anti-Theft Laptop Backpack"
  },
  "travel-laptop-backpack": {
    "name": "Travel Laptop Backpack",
    "price": "₹480",
    "moq": "50 Pieces",
    "material": "1680D Polyester / PU Leather",
    "color": "Multiple Colors Available",
    "usage": "Office / Business Travel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "35 Litres",
    "origin": "India",
    "desc": "Expandable travel laptop backpack. 40L capacity, flight-approved carry-on size, separate shoe compartment.",
    "imgSrc": "placeholder:Travel Laptop Backpack"
  },
  "premium-college-backpack": {
    "name": "Premium College Backpack",
    "price": "₹320",
    "moq": "100 Pieces",
    "material": "600D Polyester",
    "color": "Multiple Colors Available",
    "usage": "College / University",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "600D waterproof polyester. Dual main divisions, tablet sleeve, heavy-duty zipper sliders, internal organizers.",
    "imgSrc": "placeholder:Premium College Backpack"
  },
  "standard-college-backpack": {
    "name": "Standard College Backpack",
    "price": "₹290",
    "moq": "100 Pieces",
    "material": "600D Polyester",
    "color": "Multiple Colors Available",
    "usage": "College / University",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Affordable standard college backpack. Durable polyester, spacious main compartment, front organizer, side pockets.",
    "imgSrc": "placeholder:Standard College Backpack"
  },
  "dual-strap-college-backpack": {
    "name": "Dual-Strap College Backpack",
    "price": "₹270",
    "moq": "100 Pieces",
    "material": "600D Polyester",
    "color": "Multiple Colors Available",
    "usage": "College / University",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Dual-strap design for better weight distribution. Reinforced base, laptop sleeve, breathable back padding.",
    "imgSrc": "placeholder:Dual-Strap College Backpack"
  },
  "sporty-college-backpack": {
    "name": "Sporty College Backpack",
    "price": "₹260",
    "moq": "100 Pieces",
    "material": "600D Polyester",
    "color": "Multiple Colors Available",
    "usage": "College / University",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Sporty design college backpack. Dynamic color patterns, reflective accents, side water bottle holders.",
    "imgSrc": "placeholder:Sporty College Backpack"
  },
  "trendy-college-backpack": {
    "name": "Trendy College Backpack",
    "price": "₹280",
    "moq": "100 Pieces",
    "material": "600D Polyester",
    "color": "Multiple Colors Available",
    "usage": "College / University",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Fashion-forward trendy college backpack. Unique prints, premium zippers, padded straps, anti-scratch surface.",
    "imgSrc": "placeholder:Trendy College Backpack"
  },
  "compact-college-backpack": {
    "name": "Compact College Backpack",
    "price": "₹250",
    "moq": "100 Pieces",
    "material": "600D Polyester",
    "color": "Multiple Colors Available",
    "usage": "College / University",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "30 Litres",
    "origin": "India",
    "desc": "Compact 25L college backpack. Minimalist design, lightweight, well-organized pockets, soft-grip handle.",
    "imgSrc": "placeholder:Compact College Backpack"
  },
  "ultra-slim-laptop-briefcase": {
    "name": "Ultra-Slim Laptop Briefcase",
    "price": "₹390",
    "moq": "50 Pieces",
    "material": "Water-resistant Canvas / PU",
    "color": "Multiple Colors Available",
    "usage": "Corporate Meetings",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "20 Litres",
    "origin": "India",
    "desc": "Canvas/PU leather laptop briefcase. Fits 15.6\" laptops, velvet lining, detachable shoulder strap, front pocket.",
    "imgSrc": "placeholder:Ultra-Slim Laptop Briefcase"
  },
  "messenger-laptop-bag": {
    "name": "Messenger Laptop Bag",
    "price": "₹350",
    "moq": "50 Pieces",
    "material": "Water-resistant Canvas / PU",
    "color": "Multiple Colors Available",
    "usage": "Corporate Meetings",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "20 Litres",
    "origin": "India",
    "desc": "Cross-body messenger laptop bag. Padded interior, adjustable strap, quick-access front pocket, document holder.",
    "imgSrc": "placeholder:Messenger Laptop Bag"
  },
  "padded-laptop-sleeve": {
    "name": "Padded Laptop Sleeve Bag",
    "price": "₹280",
    "moq": "50 Pieces",
    "material": "Water-resistant Canvas / PU",
    "color": "Multiple Colors Available",
    "usage": "Corporate Meetings",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "20 Litres",
    "origin": "India",
    "desc": "Foam-padded laptop sleeve with carry handles. Water-resistant exterior, soft fleece interior, fits 14\" laptops.",
    "imgSrc": "placeholder:Padded Laptop Sleeve Bag"
  },
  "professional-laptop-bag": {
    "name": "Professional Laptop Bag",
    "price": "₹420",
    "moq": "50 Pieces",
    "material": "Water-resistant Canvas / PU",
    "color": "Multiple Colors Available",
    "usage": "Corporate Meetings",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "20 Litres",
    "origin": "India",
    "desc": "Business-grade professional laptop bag. Leather-look finish, trolley sleeve, card holder pocket, secure locks.",
    "imgSrc": "placeholder:Professional Laptop Bag"
  },
  "convertible-laptop-bag": {
    "name": "Convertible Laptop Bag",
    "price": "₹440",
    "moq": "50 Pieces",
    "material": "Water-resistant Canvas / PU",
    "color": "Multiple Colors Available",
    "usage": "Corporate Meetings",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "20 Litres",
    "origin": "India",
    "desc": "3-in-1 convertible laptop bag: briefcase, backpack, or messenger. Versatile design for any professional setting.",
    "imgSrc": "placeholder:Convertible Laptop Bag"
  },
  "unisex-gym-duffle": {
    "name": "Unisex Gym/Duffle Bags",
    "price": "₹350",
    "moq": "50 Pieces",
    "material": "Reinforced Ripstop Nylon",
    "color": "Multiple Colors Available",
    "usage": "Travel / Weekend Duffel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "45 Litres",
    "origin": "India",
    "desc": "Spacious gym/duffle bag for travel. Water-resistant fabric, shoe compartment, adjustable shoulder strap, inner pockets.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/3/397721638/ZS/FC/XY/104789349/product-jpeg-250x250.png"
  },
  "unisex-premium-gym-duffle": {
    "name": "Unisex Premium Gym/Duffle Bags",
    "price": "₹400",
    "moq": "50 Pieces",
    "material": "Reinforced Ripstop Nylon",
    "color": "Multiple Colors Available",
    "usage": "Travel / Weekend Duffel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "45 Litres",
    "origin": "India",
    "desc": "Premium gym/duffle bag with reinforced handles. Large 50L capacity, wet-dry separator, padded shoulder strap.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/3/397721480/VR/ON/LZ/104789349/product-jpeg-250x250.png"
  },
  "unisex-duffel-gym-bags": {
    "name": "Unisex Duffel Gym Bags",
    "price": "₹320",
    "moq": "50 Pieces",
    "material": "Reinforced Ripstop Nylon",
    "color": "Multiple Colors Available",
    "usage": "Travel / Weekend Duffel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "45 Litres",
    "origin": "India",
    "desc": "Duffel gym bag with shoe pocket. Durable nylon, zip closure, adjustable and detachable shoulder strap.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/5/422004858/ZF/RL/WU/104789349/product-jpeg-250x250.png"
  },
  "unisex-gym-duffle-bags-2": {
    "name": "Unisex Gym Duffle Bags",
    "price": "₹300",
    "moq": "50 Pieces",
    "material": "Reinforced Ripstop Nylon",
    "color": "Multiple Colors Available",
    "usage": "Travel / Weekend Duffel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "45 Litres",
    "origin": "India",
    "desc": "Compact gym duffle bag. Lightweight, multiple pockets, reinforced stitching, water-resistant bottom panel.",
    "imgSrc": "https://5.imimg.com/data5/SELLER/Default/2024/4/413852755/RW/XA/SS/104789349/unisex-gym-duffle-bags-250x250.jpg"
  },
  "travel-bag-manufacturers": {
    "name": "Travel Bag Manufacturers In Mumbai",
    "price": "₹550",
    "moq": "50 Pieces",
    "material": "Reinforced Ripstop Nylon",
    "color": "Multiple Colors Available",
    "usage": "Travel / Weekend Duffel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "45 Litres",
    "origin": "India",
    "desc": "Large capacity travel bag. Heavy-duty nylon, multiple compartments, trolley-compatible, reinforced handles.",
    "imgSrc": "https://5.imimg.com/data5/IOS/Default/2024/12/474290476/RP/NJ/PX/104789349/product-jpeg-250x250.png"
  },
  "pink-polyester-kids": {
    "name": "Pink Polyester Kids School Bag",
    "price": "₹150",
    "moq": "200 Pieces",
    "material": "Soft Oxford Cloth / Velvet",
    "color": "Multiple Colors Available",
    "usage": "Nursery / Primary School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "15 Litres",
    "origin": "India",
    "desc": "Cute pink kids school bag. Soft polyester, cartoon prints, lightweight for little ones, easy-pull zippers.",
    "imgSrc": "https://5.imimg.com/data5/SELLER/Default/2024/5/418566958/LS/QC/XF/104789349/pink-polyester-kids-school-bag-250x250.jpg"
  },
  "cartoon-printed-kids": {
    "name": "Cartoon Printed Kid School Bags",
    "price": "₹140",
    "moq": "200 Pieces",
    "material": "Soft Oxford Cloth / Velvet",
    "color": "Multiple Colors Available",
    "usage": "Nursery / Primary School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "15 Litres",
    "origin": "India",
    "desc": "Fun cartoon printed school bags for kids. Safe BPA-free materials, ultra-soft wide straps, whimsical designs.",
    "imgSrc": "https://5.imimg.com/data5/SELLER/Default/2024/4/413852663/XQ/NU/MR/104789349/kids-cartoon-print-school-bag-250x250.jpg"
  },
  "cute-kids-printed-bag": {
    "name": "Cute Kids Printed Bag",
    "price": "₹180",
    "moq": "200 Pieces",
    "material": "Soft Oxford Cloth / Velvet",
    "color": "Multiple Colors Available",
    "usage": "Nursery / Primary School",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "15 Litres",
    "origin": "India",
    "desc": "Lightweight, water-resistant backpack with playful animal patterns. Ultra-soft wide straps, side net pockets.",
    "imgSrc": "placeholder:Cute Kids Printed Bag"
  },
  "cotton-tote-bag": {
    "name": "Cotton Tote Bag",
    "price": "₹80",
    "moq": "500 Pieces",
    "material": "Eco-friendly Cotton Canvas",
    "color": "Multiple Colors Available",
    "usage": "Promotional / Shopping",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "12 Litres",
    "origin": "India",
    "desc": "Eco-friendly cotton tote bag. Reusable, washable, custom print ready, ideal for retail and promotional use.",
    "imgSrc": "placeholder:Cotton Tote Bag"
  },
  "cotton-drawstring-bag": {
    "name": "Cotton Drawstring Bag",
    "price": "₹60",
    "moq": "500 Pieces",
    "material": "Eco-friendly Cotton Canvas",
    "color": "Multiple Colors Available",
    "usage": "Promotional / Shopping",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "12 Litres",
    "origin": "India",
    "desc": "Cotton drawstring pouch bag. Natural fabric, lightweight, perfect for gym, shopping, or gifting purposes.",
    "imgSrc": "placeholder:Cotton Drawstring Bag"
  },
  "cotton-canvas-bag": {
    "name": "Cotton Canvas Shopping Bag",
    "price": "₹100",
    "moq": "500 Pieces",
    "material": "Eco-friendly Cotton Canvas",
    "color": "Multiple Colors Available",
    "usage": "Promotional / Shopping",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "12 Litres",
    "origin": "India",
    "desc": "Heavy-duty cotton canvas shopping bag. Reinforced handles, large capacity, eco-friendly, customizable printing.",
    "imgSrc": "placeholder:Cotton Canvas Shopping Bag"
  },
  "casual-shoulder-bag": {
    "name": "Casual Shoulder Bag",
    "price": "₹250",
    "moq": "200 Pieces",
    "material": "Polyester / PU",
    "color": "Multiple Colors Available",
    "usage": "Casual / Shopping",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "18 Litres",
    "origin": "India",
    "desc": "Unisex casual shoulder bag. Crossbody design, adjustable strap, multiple compartments, water-resistant nylon.",
    "imgSrc": "placeholder:Casual Shoulder Bag"
  },
  "beauty-vanity-bag": {
    "name": "Beauty Vanity Bag",
    "price": "₹180",
    "moq": "300 Pieces",
    "material": "Water-resistant PVC / Nylon",
    "color": "Multiple Colors Available",
    "usage": "Cosmetics / Travel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "8 Litres",
    "origin": "India",
    "desc": "Compact beauty vanity bag. Waterproof lining, multiple organizer slots for cosmetics, mirror pocket, zip closure.",
    "imgSrc": "placeholder:Beauty Vanity Bag"
  },
  "crossbody-sling-bag": {
    "name": "Crossbody Sling Bag",
    "price": "₹200",
    "moq": "300 Pieces",
    "material": "Nylon / Canvas",
    "color": "Multiple Colors Available",
    "usage": "Casual / Daily Travel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "10 Litres",
    "origin": "India",
    "desc": "Compact crossbody sling bag. Adjustable strap, lightweight, ideal for daily essentials, secure magnetic closure.",
    "imgSrc": "placeholder:Crossbody Sling Bag"
  },
  "casual-duffle-bag": {
    "name": "Casual Duffle Bag",
    "price": "₹280",
    "moq": "50 Pieces",
    "material": "Reinforced Ripstop Nylon",
    "color": "Multiple Colors Available",
    "usage": "Travel / Weekend Duffel",
    "pattern": "Solid / Printed / Custom",
    "gender": "Unisex",
    "capacity": "45 Litres",
    "origin": "India",
    "desc": "Casual duffle bag for short trips. Spacious interior, sturdy handles, adjustable shoulder strap, side pockets.",
    "imgSrc": "https://5.imimg.com/data5/SELLER/Default/2024/4/413592689/MT/MS/VI/104789349/duffle-bags-250x250.jpg"
  }
};

function initProductDetail() {
  const detailContainer = document.querySelector('.product-detail-layout');
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = productsDb[productId];

  const errorContainer = document.getElementById('product-error-container');
  const detailLayout = document.querySelector('.product-detail-layout');

  if (!product) {
    // Hide details and show error fallback
    if (detailLayout) detailLayout.style.display = 'none';
    if (errorContainer) errorContainer.style.display = 'block';
    
    // Update breadcrumbs and document title
    const breadcrumbName = document.querySelector('.breadcrumb-product-name');
    if (breadcrumbName) breadcrumbName.textContent = 'Product Not Found';
    document.title = 'Product Not Found | SAZ Enterprises';
    return;
  }

  // Ensure details layout is shown and error container is hidden
  if (detailLayout) detailLayout.style.display = 'grid';
  if (errorContainer) errorContainer.style.display = 'none';

  // Update breadcrumb and document title
  const breadcrumbName = document.querySelector('.breadcrumb-product-name');
  if (breadcrumbName) breadcrumbName.textContent = product.name;
  document.title = `${product.name} | B2B Bag Catalog | SAZ Enterprises`;

  // Update main text
  const titleEl = document.querySelector('.product-title');
  if (titleEl) titleEl.textContent = product.name;

  const descEl = document.querySelector('.product-desc');
  if (descEl) descEl.textContent = product.desc;

  // Update price and MOQ
  const priceValEl = document.querySelector('.price-val');
  if (priceValEl) priceValEl.textContent = `${product.price}`;
  
  const moqValEl = document.querySelector('.moq-val');
  if (moqValEl) moqValEl.textContent = product.moq;

  // Update Specs Table
  const setSpec = (specName, value) => {
    const el = document.querySelector(`[data-spec="${specName}"]`);
    if (el) el.textContent = value;
  };

  setSpec('material', product.material);
  setSpec('color', product.color);
  setSpec('usage', product.usage);
  setSpec('pattern', product.pattern);
  setSpec('gender', product.gender);
  setSpec('capacity', product.capacity);
  setSpec('origin', product.origin);

  // Update Form and Button presets
  const enquiryBtn = document.querySelector('.btn-enquiry');
  if (enquiryBtn) {
    enquiryBtn.setAttribute('data-product-name', product.name);
  }
  
  const quoteLnk = document.querySelector('.quote-link');
  if (quoteLnk) {
    quoteLnk.setAttribute('data-product-name', product.name);
  }

  // Dynamic gallery setup for real images vs. placeholders
  const mainContainer = document.getElementById('gallery-main-container');
  const thumbsContainer = document.getElementById('gallery-thumbs-container');

  if (mainContainer && thumbsContainer) {
    // Define the 4 standard gallery views mapping to the images array indexes
    const views = [
      { type: 'front', label: `${product.name} - Front View`, icon: '🎒', isReal: true, index: 0 },
      { type: 'angle', label: `${product.name} - Angle View`, icon: '🎒', index: 1 },
      { type: 'interior', label: `${product.name} - Internal Compartment View`, icon: '💼', index: 2 },
      { type: 'strap', label: `${product.name} - Strap & Back Padding View`, icon: '🪡', index: 3 }
    ];

    // Helper to render main view
    const updateMainView = (view) => {
      const viewImgSrc = (product.images && product.images[view.index]) || null;
      if (viewImgSrc && !viewImgSrc.startsWith('placeholder:')) {
        mainContainer.innerHTML = `<img src="${viewImgSrc}" alt="${view.label}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 12px;" />`;
      } else if (view.isReal && product.imgSrc && !product.imgSrc.startsWith('placeholder:')) {
        mainContainer.innerHTML = `<img src="${product.imgSrc}" alt="${view.label}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 12px;" />`;
      } else {
        mainContainer.innerHTML = `
          <div class="img-placeholder" style="border-radius: 12px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <span class="placeholder-icon" aria-hidden="true" style="font-size: 48px; color: var(--primary-accent); margin-bottom: 8px;">${view.icon}</span>
            <p class="placeholder-text" style="font-weight: 600; font-size: 16px; color: var(--text-dark);">${view.label}</p>
          </div>
        `;
      }
    };

    // Set initial main view
    updateMainView(views[0]);

    // Populate thumbnails
    thumbsContainer.innerHTML = '';
    views.forEach((view, idx) => {
      const btn = document.createElement('button');
      btn.className = `gallery-thumb-btn ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      btn.setAttribute('aria-label', `View ${view.label}`);

      const viewImgSrc = (product.images && product.images[view.index]) || null;
      let thumbContent = '';
      if (viewImgSrc && !viewImgSrc.startsWith('placeholder:')) {
        thumbContent = `<img src="${viewImgSrc}" alt="${view.label}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;" />`;
      } else if (view.isReal && product.imgSrc && !product.imgSrc.startsWith('placeholder:')) {
        thumbContent = `<img src="${product.imgSrc}" alt="${view.label}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;" />`;
      } else {
        thumbContent = `
          <div class="img-placeholder" style="border-radius: 4px; border: none; padding: 0; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
            <span class="placeholder-icon" aria-hidden="true" style="font-size: 16px; margin-bottom: 2px;">${view.icon}</span>
            <span class="placeholder-text" style="font-size: 9px; line-height: 1;">${idx === 0 ? 'Front' : idx === 1 ? 'Angle' : idx === 2 ? 'Interior' : 'Strap'}</span>
          </div>
        `;
      }

      btn.innerHTML = thumbContent;

      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        thumbsContainer.querySelectorAll('.gallery-thumb-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        // Set active on clicked button
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        // Update main view
        updateMainView(view);
      });

      thumbsContainer.appendChild(btn);
    });
  }
}
