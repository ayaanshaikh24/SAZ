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
  "executive-laptop-backpack": {
    name: "Executive Laptop Backpack",
    price: "₹450",
    moq: "50 Pieces",
    material: "Premium 1680D Polyester",
    color: "Carbon Black",
    usage: "Office / Business Travel",
    pattern: "Solid / Textured",
    gender: "Unisex",
    capacity: "35 Litres",
    origin: "India",
    desc: "The Executive Laptop Backpack is designed for the modern professional. Built with durable, water-resistant 1680D polyester fabric, it features a padded laptop pocket fitting up to 17-inch devices, structured organization slots for accessories, ergonomic padded shoulder straps, and a luggage strap for seamless business transit."
  },
  "classic-high-school-bag": {
    name: "Classic High School Bag",
    price: "₹280",
    moq: "150 Pieces",
    material: "Heavy-Duty Nylon",
    color: "Royal Blue / Navy",
    usage: "High School / Secondary School",
    pattern: "Dual-Tone Solid",
    gender: "Unisex",
    capacity: "25 Litres",
    origin: "India",
    desc: "Designed to support heavy textbook loads, the Classic High School Bag is built with high-density nylon to resist tears. Features three spacious zipper compartments, padded shoulder pads, load-distribution straps, and dual side mesh water bottle holders."
  },
  "premium-college-backpack": {
    name: "Premium College Backpack",
    price: "₹320",
    moq: "100 Pieces",
    material: "600D Waterproof Polyester",
    color: "Navy Blue / Grey Accent",
    usage: "College / University Students",
    pattern: "Modern Block Pattern",
    gender: "Unisex",
    capacity: "30 Litres",
    origin: "India",
    desc: "Perfect blend of fashion and functionality. The Premium College Backpack comes with dual main divisions, a dedicated tablet sleeve, front accessories pocket, heavy-duty zipper sliders, and customized internal organizers."
  },
  "ergonomic-school-backpack": {
    name: "Ergonomic School Backpack",
    price: "₹350",
    moq: "150 Pieces",
    material: "High-Tensile Ripstop Polyester",
    color: "Red / Dark Black",
    usage: "Middle School / High School",
    pattern: "Dynamic Graphics / Solid",
    gender: "Unisex",
    capacity: "28 Litres",
    origin: "India",
    desc: "Focusing on spinal health, this backpack has an orthopedically curved back support panel with breathable mesh channels. It includes quick-release chest straps and padded shoulders to distribute weight evenly."
  },
  "heavy-duty-travel-duffle": {
    name: "Heavy-Duty Travel Duffle Bag",
    price: "₹550",
    moq: "50 Pieces",
    material: "Reinforced Ripstop Nylon",
    color: "Olive Green / Dark Black",
    usage: "Short Travel / Weekend Duffel",
    pattern: "Rugged Utility Solid",
    gender: "Unisex",
    capacity: "45 Litres",
    origin: "India",
    desc: "A spacious travel duffel with reinforced base plating, high-tensile load strap anchors, dynamic side compartments for shoes/soiled laundry, and multiple exterior zipper pockets for rapid document accessibility."
  },
  "cute-kids-printed-bag": {
    name: "Cute Kids Printed Bag",
    price: "₹180",
    moq: "200 Pieces",
    material: "Lightweight Oxford Cloth",
    color: "Sky Blue / Yellow Accent",
    usage: "Nursery / Primary School Kids",
    pattern: "Whimsical Animal Print",
    gender: "Unisex",
    capacity: "15 Litres",
    origin: "India",
    desc: "A lightweight, water-resistant backpack featuring playful animal patterns. Designed with ultra-soft, wide shoulder straps for safety and convenience, side net pockets, and easy-to-pull zipper tags for child comfort."
  },
  "ultra-slim-laptop-briefcase": {
    name: "Ultra-Slim Laptop Briefcase",
    price: "₹390",
    moq: "50 Pieces",
    material: "Water Resistant Canvas / PU leather",
    color: "Charcoal Grey",
    usage: "Corporate / Business Meetings",
    pattern: "Sleek Professional Solid",
    gender: "Unisex",
    capacity: "18 Litres",
    origin: "India",
    desc: "Designed for minimalist professionals, this briefcase accommodates up to 15.6-inch thin laptops. Features soft velvet protective lining, hide-away top handles, a detachable padded shoulder strap, and front zipped quick-access pocket."
  }
};

function initProductDetail() {
  const detailContainer = document.querySelector('.product-detail-layout');
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'executive-laptop-backpack';
  const product = productsDb[productId];

  if (product) {
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

    // Dynamic label update for placeholders
    const galleryMainPlaceholder = document.querySelector('.gallery-main .placeholder-text');
    if (galleryMainPlaceholder) {
      galleryMainPlaceholder.textContent = `${product.name} - Front View`;
    }

    const thumbs = document.querySelectorAll('.gallery-thumb-btn');
    if (thumbs.length >= 4) {
      thumbs[0].setAttribute('data-label', `${product.name} - Front View`);
      thumbs[1].setAttribute('data-label', `${product.name} - Angle View`);
      thumbs[2].setAttribute('data-label', `${product.name} - Internal Pocket View`);
      thumbs[3].setAttribute('data-label', `${product.name} - Strap & Back Padding`);
      
      const thumbLabels = [
        'Front',
        'Angle',
        'Interior',
        'Strap'
      ];
      
      thumbs.forEach((thumb, idx) => {
        const text = thumb.querySelector('.placeholder-text');
        if (text) text.textContent = `${product.name} (${thumbLabels[idx]})`;
      });
    }
  }
}
