<!-- <!-- <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Exclusive Bags</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; color: #1a1a1a; background: #fff; }

    /* TOP BAR */
    .topbar {
      background: #1a1a1a;
      color: #ccc;
      font-size: 13px;
      padding: 8px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .topbar a { color: #ccc; text-decoration: none; }
    .topbar a:hover { color: #fff; }

    /* NAVBAR */
    nav {
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo img { height: 52px; padding: 8px 0; }
    .logo-text { font-size: 22px; font-weight: 700; color: #1a1a1a; letter-spacing: -0.5px; }
    .nav-links { display: flex; gap: 28px; list-style: none; }
    .nav-links a { text-decoration: none; font-size: 14px; color: #444; font-weight: 500; transition: color 0.2s; }
    .nav-links a:hover { color: #000; }
    .nav-cta {
      background: #1a1a1a;
      color: #fff;
      border: none;
      padding: 9px 20px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 0.02em;
    }
    .nav-cta:hover { background: #333; }

    /* HERO */
    .hero {
      background: linear-gradient(135deg, #f8f6f0 0%, #ede9e0 100%);
      padding: 80px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
      min-height: 480px;
    }
    .hero-content { max-width: 520px; }
    .hero-badge {
      display: inline-block;
      background: #1a1a1a;
      color: #fff;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 99px;
      margin-bottom: 20px;
    }
    .hero h1 {
      font-size: 46px;
      font-weight: 700;
      line-height: 1.15;
      color: #111;
      margin-bottom: 12px;
      letter-spacing: -1px;
    }
    .hero h1 span { color: #c17f3a; }
    .hero p {
      font-size: 17px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 28px;
    }
    .hero-btns { display: flex; gap: 12px; align-items: center; }
    .btn-dark {
      background: #1a1a1a;
      color: #fff;
      padding: 13px 28px;
      border-radius: 7px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s;
    }
    .btn-dark:hover { background: #333; }
    .btn-outline {
      color: #1a1a1a;
      padding: 13px 24px;
      border-radius: 7px;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      border: 1.5px solid #1a1a1a;
      transition: all 0.2s;
    }
    .btn-outline:hover { background: #1a1a1a; color: #fff; }
    .hero-image {
      flex-shrink: 0;
      width: 420px;
      height: 320px;
      background: #ddd;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 14px;
    }
    .hero-image img { width: 100%; height: 100%; object-fit: cover; }

    /* USP STRIP */
    .usp-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }
    .usp-item {
      padding: 28px 32px;
      border-right: 1px solid #e5e5e5;
    }
    .usp-item:last-child { border-right: none; }
    .usp-icon { font-size: 28px; margin-bottom: 10px; }
    .usp-item h3 { font-size: 15px; font-weight: 600; margin-bottom: 6px; }
    .usp-item p { font-size: 13px; color: #777; line-height: 1.5; }

    /* SECTION COMMON */
    section { padding: 80px 40px; }
    .section-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #c17f3a;
      margin-bottom: 10px;
    }
    .section-title {
      font-size: 36px;
      font-weight: 700;
      color: #111;
      letter-spacing: -0.5px;
      margin-bottom: 16px;
      line-height: 1.2;
    }
    .section-desc { font-size: 16px; color: #666; line-height: 1.65; max-width: 600px; }

    /* ABOUT */
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      margin-top: 48px;
    }
    .about-img {
      width: 100%;
      height: 380px;
      background: #e9e5df;
      border-radius: 14px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #aaa;
    }
    .about-img img { width: 100%; height: 100%; object-fit: cover; }
    .about-text .section-desc { max-width: 100%; }
    .about-text .btn-dark { display: inline-block; margin-top: 24px; }

    /* FACTORY */
    .factory { background: #f8f6f0; }
    .factory-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-top: 40px;
    }
    .factory-img {
      height: 220px;
      background: #e0dbd2;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #aaa;
      font-size: 13px;
    }
    .factory-img img { width: 100%; height: 100%; object-fit: cover; }

    /* PROCESS */
    .process-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
      margin-top: 48px;
    }
    .process-card {
      padding: 28px;
      border: 1px solid #e8e5df;
      border-radius: 12px;
      background: #fff;
      transition: box-shadow 0.2s;
    }
    .process-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .process-num {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #c17f3a;
      margin-bottom: 10px;
    }
    .process-icon { font-size: 26px; margin-bottom: 12px; }
    .process-card h3 { font-size: 15px; font-weight: 600; color: #111; margin-bottom: 8px; }
    .process-card p { font-size: 13px; color: #777; line-height: 1.55; }

    /* PRODUCTS */
    .products { background: #f8f6f0; }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-top: 48px;
    }
    .product-card {
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e8e5df;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .product-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.1); transform: translateY(-3px); }
    .product-thumb {
      width: 100%;
      height: 180px;
      background: #e9e5df;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #aaa;
      font-size: 13px;
    }
    .product-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .product-info { padding: 16px; }
    .product-info h3 { font-size: 14px; font-weight: 600; color: #111; margin-bottom: 4px; }
    .product-info p { font-size: 12px; color: #888; line-height: 1.5; }
    .view-all-btn {
      display: inline-block;
      margin-top: 36px;
      background: #1a1a1a;
      color: #fff;
      padding: 12px 28px;
      border-radius: 7px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
    }
    .view-all-btn:hover { background: #333; }

    /* CONTACT */
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 60px;
      align-items: start;
      margin-top: 48px;
    }
    .contact-info p { font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 24px; }
    .contact-detail { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; font-size: 14px; color: #444; }
    .contact-detail .icon { font-size: 20px; }
    .contact-form { background: #f8f6f0; padding: 36px; border-radius: 14px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
    .form-group label { font-size: 12px; font-weight: 600; color: #444; text-transform: uppercase; letter-spacing: 0.05em; }
    .form-group input,
    .form-group textarea {
      padding: 11px 14px;
      border: 1.5px solid #e0dbd2;
      border-radius: 7px;
      font-size: 14px;
      font-family: 'Inter', sans-serif;
      color: #111;
      background: #fff;
      transition: border-color 0.2s;
      outline: none;
    }
    .form-group input:focus,
    .form-group textarea:focus { border-color: #c17f3a; }
    .form-group textarea { resize: vertical; min-height: 110px; }
    .form-submit {
      width: 100%;
      background: #1a1a1a;
      color: #fff;
      border: none;
      padding: 14px;
      border-radius: 7px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .form-submit:hover { background: #333; }

    /* FOOTER */
    footer {
      background: #111;
      color: #aaa;
      padding: 56px 40px 28px;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.2fr;
      gap: 40px;
      margin-bottom: 40px;
    }
    .footer-brand .logo-text { color: #fff; font-size: 20px; }
    .footer-brand p { font-size: 13px; line-height: 1.65; margin: 14px 0; color: #888; }
    .footer-brand .contact-small { font-size: 13px; color: #888; margin-bottom: 4px; }
    .footer-col h4 { color: #fff; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 16px; }
    .footer-col a { display: block; color: #888; text-decoration: none; font-size: 13px; margin-bottom: 10px; transition: color 0.2s; }
    .footer-col a:hover { color: #fff; }
    .footer-bottom {
      border-top: 1px solid #2a2a2a;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #666;
    }

    /* RESPONSIVE */
    @media (max-width: 900px) {
      nav, .topbar, section, .hero { padding-left: 20px; padding-right: 20px; }
      .hero { flex-direction: column; padding: 48px 20px; text-align: center; }
      .hero h1 { font-size: 32px; }
      .hero-image { width: 100%; }
      .hero-btns { justify-content: center; }
      .usp-strip { grid-template-columns: 1fr; }
      .usp-item { border-right: none; border-bottom: 1px solid #e5e5e5; }
      .about-grid, .contact-grid { grid-template-columns: 1fr; }
      .factory-grid, .products-grid { grid-template-columns: repeat(2, 1fr); }
      .process-grid { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>

  TOP BAR -->
  <div class="topbar">
    <span>✉ nenseytaha@gmail.com</span>
    <span><a href="tel:9819271778">📞 Call: 9819271778</a></span>
  </div>

  <!-- NAVBAR -->
  <nav>
    <div class="logo">
      <!-- Replace with: <img src="your-logo.png" alt="Exclusive Bags"> -->
      <span class="logo-text">Exclusive Bags</span>
    </div>
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About Us</a></li>
      <li><a href="#process">Processes</a></li>
      <li><a href="#products">Products</a></li>
      <li><a href="#contact">Contact Us</a></li>
    </ul>
    <button class="nav-cta">Download Brochure</button>
  </nav>

  <!-- HERO -->
  <section id="home" class="hero">
    <div class="hero-content">
      <div class="hero-badge">B2B Bag Manufacturer</div>
      <h1>Welcome to <span>Exclusive Bags,</span><br>Where Style Meets Functionality</h1>
      <p>Experience the Epitome of Fashion and Convenience. Premium bags crafted for businesses, travelers, and professionals.</p>
      <div class="hero-btns">
        <a href="#products" class="btn-dark">Explore Products →</a>
        <a href="#about" class="btn-outline">Learn More</a>
      </div>
    </div>
    <div class="hero-image">
      <!-- Replace with: <img src="hero-bag.jpg" alt="Exclusive Bags Collection"> -->
      Hero Image (Replace with your photo)
    </div>
  </section>

  <!-- USP STRIP -->
  <div class="usp-strip">
    <div class="usp-item">
      <div class="usp-icon">🏅</div>
      <h3>Superior Quality</h3>
      <p>We make high-quality bags that last long and surpass expectations using premium materials and skilled craftsmanship.</p>
    </div>
    <div class="usp-item">
      <div class="usp-icon">✨</div>
      <h3>Fashion-forward Designs</h3>
      <p>Get fashion-forward bags perfect for both business and travel, with a blend of style and functionality.</p>
    </div>
    <div class="usp-item">
      <div class="usp-icon">🤝</div>
      <h3>Efficient B2B Partnership</h3>
      <p>Reliable B2B partner fostering efficient partnerships and ensuring timely delivery through strong supply chain management.</p>
    </div>
  </div>

  <!-- ABOUT -->
  <section id="about">
    <div class="section-label">Who We Are</div>
    <h2 class="section-title">About Us</h2>
    <p class="section-desc">At Exclusive Bags, we are a renowned bag manufacturer specializing in the production of Trolley Bags and Luggage Bags.</p>
    <div class="about-grid">
      <div class="about-img">
        <!-- Replace with: <img src="about-img.jpg" alt="About Exclusive Bags"> -->
        About Image (Replace with your photo)
      </div>
      <div class="about-text">
        <div class="section-label">Our Story</div>
        <h2 class="section-title" style="font-size:28px;">Crafting Bags with Passion Since Day One</h2>
        <p class="section-desc">We cater to diverse domestic and business requirements. With a keen eye on fashion trends, we adopt a professional approach in designing, producing, and supplying bags in exclusive designs and styles.<br><br>We prioritize customer satisfaction by operating in a modern factory with skilled staff who adhere to fashion standards and quality norms. Our competitive prices and timely delivery have gained customer trust.</p>
        <a href="#contact" class="btn-dark">Get In Touch →</a>
      </div>
    </div>
  </section>

  <!-- FACTORY -->
  <section id="factory" class="factory">
    <div class="section-label">Behind the Scenes</div>
    <h2 class="section-title">Our Factory</h2>
    <p class="section-desc">Exclusive Bags ensures high-quality bags through a meticulous process from material sourcing to delivery.</p>
    <div class="factory-grid">
      <div class="factory-img">
        <!-- <img src="factory1.jpg" alt="Factory"> -->
        Factory Photo 1
      </div>
      <div class="factory-img">
        <!-- <img src="factory2.jpg" alt="Factory"> -->
        Factory Photo 2
      </div>
      <div class="factory-img">
        <!-- <img src="factory3.jpg" alt="Factory"> -->
        Factory Photo 3
      </div>
      <div class="factory-img">
        <!-- <img src="factory4.jpg" alt="Factory"> -->
        Factory Photo 4
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section id="process">
    <div class="section-label">How We Work</div>
    <h2 class="section-title">Our Process</h2>
    <p class="section-desc">Exclusive Bags ensures high-quality bags through a meticulous process from material sourcing to delivery.</p>
    <div class="process-grid">
      <div class="process-card">
        <div class="process-num">STEP 01</div>
        <div class="process-icon">🧵</div>
        <h3>Material Sourcing</h3>
        <p>We source quality materials from reliable vendors to meet our high standards.</p>
      </div>
      <div class="process-card">
        <div class="process-num">STEP 02</div>
        <div class="process-icon">✂️</div>
        <h3>Design & Cutting</h3>
        <p>Our designers create stylish bag designs and our factory accurately cuts materials to match.</p>
      </div>
      <div class="process-card">
        <div class="process-num">STEP 03</div>
        <div class="process-icon">🪡</div>
        <h3>Stitching & Assembly</h3>
        <p>Experienced craftsmen stitch and assemble cut materials with attention to detail ensuring durable seams.</p>
      </div>
      <div class="process-card">
        <div class="process-num">STEP 04</div>
        <div class="process-icon">🖨️</div>
        <h3>Printing & Embellishment</h3>
        <p>We offer screen printing, heat transfer, and embroidery based on design and customer preference.</p>
      </div>
      <div class="process-card">
        <div class="process-num">STEP 05</div>
        <div class="process-icon">✅</div>
        <h3>Quality Control</h3>
        <p>Strict quality control — each bag is inspected for flaws, dimensions, stitching against our high standards.</p>
      </div>
      <div class="process-card">
        <div class="process-num">STEP 06</div>
        <div class="process-icon">🚚</div>
        <h3>Packaging & Delivery</h3>
        <p>Bags are packaged to protect during travel. We prioritize on-time delivery for efficient order fulfillment.</p>
      </div>
    </div>
  </section>

  <!-- PRODUCTS -->
  <section id="products" class="products">
    <div class="section-label">What We Make</div>
    <h2 class="section-title">Our Products</h2>
    <p class="section-desc">Elevate your style and travel with our durable and functional bags.</p>
    <div class="products-grid">
      <div class="product-card">
        <div class="product-thumb">
          <!-- <img src="haversack.jpg" alt="Haversacks"> -->
          Haversacks Photo
        </div>
        <div class="product-info">
          <h3>Haversacks</h3>
          <p>Ergonomic design and sturdy straps perfect for professionals and travelers.</p>
        </div>
      </div>
      <div class="product-card">
        <div class="product-thumb">
          <!-- <img src="hard-trolley.jpg" alt="Hard Trolley Bags"> -->
          Hard Trolley Photo
        </div>
        <div class="product-info">
          <h3>Hard Trolley Bags</h3>
          <p>Durable and stylish, giving you strength and sophistication on the go.</p>
        </div>
      </div>
      <div class="product-card">
        <div class="product-thumb">
          <!-- <img src="soft-trolley.jpg" alt="Soft Trolley Bags"> -->
          Soft Trolley Photo
        </div>
        <div class="product-info">
          <h3>Soft Trolley Bags</h3>
          <p>Stylish and functional, ideal for globetrotters seeking luxury and ease.</p>
        </div>
      </div>
      <div class="product-card">
        <div class="product-thumb">
          <!-- <img src="pilot-trolley.jpg" alt="Pilot Trolley Bags"> -->
          Pilot Trolley Photo
        </div>
        <div class="product-info">
          <h3>Pilot Trolley Bags</h3>
          <p>Smart features and dedicated compartments for seamless business travel.</p>
        </div>
      </div>
    </div>
    <a href="#contact" class="view-all-btn">Enquire Now →</a>
  </section>

  <!-- CONTACT -->
  <section id="contact">
    <div class="section-label">Reach Out</div>
    <h2 class="section-title">Contact Us</h2>
    <p class="section-desc">Reach out for bulk orders, B2B partnerships, or product queries. We'd love to hear from you.</p>
    <div class="contact-grid">
      <div class="contact-info">
        <p>We are a trusted B2B partner delivering quality bags on time. Contact us to discuss your requirements or request a catalogue.</p>
        <div class="contact-detail"><span class="icon">📞</span><span><strong>Call:</strong> 9819271778</span></div>
        <div class="contact-detail"><span class="icon">✉️</span><span><strong>Email:</strong> nenseytaha@gmail.com</span></div>
        <div class="contact-detail"><span class="icon">📍</span><span><strong>Location:</strong> India</span></div>
      </div>
      <div class="contact-form">
        <div class="form-row">
          <div class="form-group">
            <label>Your Name</label>
            <input type="text" placeholder="John Doe" />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="+91 98765 43210" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@company.com" />
          </div>
          <div class="form-group">
            <label>Company Name</label>
            <input type="text" placeholder="Your Company" />
          </div>
        </div>
        <div class="form-group">
          <label>Message / Enquiry</label>
          <textarea placeholder="Tell us about your requirements..."></textarea>
        </div>
        <button class="form-submit">Send Message →</button>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="logo-text">Exclusive Bags</span>
        <p>Renowned bag manufacturer specializing in Trolley Bags and Luggage Bags for domestic and business needs. Fashion-forward. Quality-driven.</p>
        <div class="contact-small">📞 9819271778</div>
        <div class="contact-small">✉ nenseytaha@gmail.com</div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#process">Our Process</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact Us</a>
      </div>
      <div class="footer-col">
        <h4>Products</h4>
        <a href="#products">Haversacks</a>
        <a href="#products">Hard Trolley Bags</a>
        <a href="#products">Soft Trolley Bags</a>
        <a href="#products">Pilot Trolley Bags</a>
      </div>
      <div class="footer-col">
        <h4>Get in Touch</h4>
        <a href="tel:9819271778">Call Us</a>
        <a href="mailto:nenseytaha@gmail.com">Email Us</a>
        <a href="#contact">Send Enquiry</a>
        <a href="#">Download Brochure</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2024 Exclusive Bags. All rights reserved.</span>
      <span>Privacy Policy · Terms of Use</span>
    </div>
  </footer>

</body>
</html> -->
<!--  -->