
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedTemplates = async () => {
  try {
    console.log('🌱 Seeding templates...');

    // Cosmetics Template
    await prisma.template.upsert({
      where: { id: 'cosmetics-template-1' },
      update: {},
      create: {
        id: 'cosmetics-template-1',
        name: 'Beauty Elegance',
        industry: 'cosmetics',
        description: 'A stunning template perfect for beauty salons, cosmetic brands, and skincare businesses.',
        preview_image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
        html_content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{BUSINESS_NAME}} - Premium Beauty & Cosmetics</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="logo">
                <img src="{{LOGO_URL}}" alt="{{BUSINESS_NAME}}" class="logo-img">
                <span class="logo-text">{{BUSINESS_NAME}}</span>
            </div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <section id="home" class="hero">
        <div class="hero-bg">
            <img src="{{HERO_IMAGE_URL}}" alt="Beauty" class="hero-image">
        </div>
        <div class="hero-content">
            <h1 class="hero-title">{{BUSINESS_NAME}}</h1>
            <p class="hero-tagline">{{TAGLINE}}</p>
            <p class="hero-description">{{DESCRIPTION}}</p>
            <button class="cta-button">Discover Beauty</button>
        </div>
    </section>

    <section id="products" class="products">
        <div class="container">
            <h2 class="section-title">Our Products</h2>
            <div class="products-grid">
                {{PRODUCTS}}
            </div>
        </div>
    </section>

    <section id="services" class="services">
        <div class="container">
            <h2 class="section-title">Our Services</h2>
            <div class="services-grid">
                {{SERVICES}}
            </div>
        </div>
    </section>

    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Get In Touch</h2>
            <div class="contact-info">
                <p><strong>Phone:</strong> {{PHONE}}</p>
                <p><strong>Email:</strong> {{EMAIL}}</p>
                <p><strong>Address:</strong> {{ADDRESS}}</p>
            </div>
            <div class="social-links">
                <a href="{{FACEBOOK_URL}}" class="social-link">Facebook</a>
                <a href="{{INSTAGRAM_URL}}" class="social-link">Instagram</a>
                <a href="{{TWITTER_URL}}" class="social-link">Twitter</a>
            </div>
        </div>
    </section>

    <footer class="footer">
        <p>&copy; 2024 {{BUSINESS_NAME}}. All rights reserved.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>`,
        css_content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.logo-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: {{PRIMARY_COLOR}};
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: {{PRIMARY_COLOR}};
}

.hero {
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
}

.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
}

.hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));
    z-index: -1;
}

.hero-content {
    max-width: 600px;
    padding: 0 20px;
}

.hero-title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.hero-tagline {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: {{PRIMARY_COLOR}};
}

.hero-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.cta-button {
    background: linear-gradient(45deg, {{PRIMARY_COLOR}}, {{SECONDARY_COLOR}});
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: {{PRIMARY_COLOR}};
}

.products, .services {
    padding: 100px 0;
}

.products {
    background: #f8f9fa;
}

.products-grid, .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.product-item, .service-item {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.3s;
}

.product-item:hover, .service-item:hover {
    transform: translateY(-5px);
}

.product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1rem;
}

.product-name, .service-name {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: {{PRIMARY_COLOR}};
}

.product-description, .service-description {
    margin-bottom: 1rem;
    color: #666;
}

.product-price {
    font-size: 1.2rem;
    font-weight: bold;
    color: {{PRIMARY_COLOR}};
}

.contact {
    padding: 100px 0;
    background: linear-gradient(135deg, {{PRIMARY_COLOR}}, {{SECONDARY_COLOR}});
    color: white;
    text-align: center;
}

.contact .section-title {
    color: white;
}

.contact-info {
    margin-bottom: 2rem;
}

.contact-info p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
}

.social-link {
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    border: 2px solid white;
    border-radius: 25px;
    transition: all 0.3s;
}

.social-link:hover {
    background: white;
    color: {{PRIMARY_COLOR}};
}

.footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem 0;
}

@media (max-width: 768px) {
    .nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-menu {
        flex-direction: column;
        gap: 1rem;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .products-grid, .services-grid {
        grid-template-columns: 1fr;
    }
}`,
        js_content: `// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});`,
        fields: {
          businessName: { type: 'text', label: 'Business Name', required: true },
          tagline: { type: 'text', label: 'Tagline', required: false },
          description: { type: 'textarea', label: 'Business Description', required: true },
          logo: { type: 'image', label: 'Logo', required: false },
          heroImage: { type: 'image', label: 'Hero Background Image', required: false },
          primaryColor: { type: 'color', label: 'Primary Color', default: '#e91e63' },
          secondaryColor: { type: 'color', label: 'Secondary Color', default: '#ff4081' },
          phone: { type: 'text', label: 'Phone Number', required: false },
          email: { type: 'email', label: 'Email Address', required: false },
          address: { type: 'text', label: 'Address', required: false },
          products: { type: 'array', label: 'Products', fields: { name: 'text', description: 'textarea', price: 'text', image: 'image' } },
          services: { type: 'array', label: 'Services', fields: { name: 'text', description: 'textarea' } },
          socialMedia: { type: 'object', label: 'Social Media', fields: { facebook: 'url', instagram: 'url', twitter: 'url' } }
        }
      }
    });

    // Pharmacy Template
    await prisma.template.upsert({
      where: { id: 'pharmacy-template-1' },
      update: {},
      create: {
        id: 'pharmacy-template-1',
        name: 'MediCare Pro',
        industry: 'pharmacy',
        description: 'Professional template designed for pharmacies, clinics, and healthcare providers.',
        preview_image: 'https://images.unsplash.com/photo-1576671191785-8e4d6dc46bb1?w=800&h=600&fit=crop',
        html_content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{BUSINESS_NAME}} - Trusted Healthcare</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="logo">
                <img src="{{LOGO_URL}}" alt="{{BUSINESS_NAME}}" class="logo-img">
                <span class="logo-text">{{BUSINESS_NAME}}</span>
            </div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <section id="home" class="hero">
        <div class="hero-content">
            <h1 class="hero-title">{{BUSINESS_NAME}}</h1>
            <p class="hero-tagline">{{TAGLINE}}</p>
            <p class="hero-description">{{DESCRIPTION}}</p>
            <button class="cta-button">Learn More</button>
        </div>
        <div class="hero-image">
            <img src="{{HERO_IMAGE_URL}}" alt="Healthcare" class="hero-img">
        </div>
    </section>

    <section id="services" class="services">
        <div class="container">
            <h2 class="section-title">Our Services</h2>
            <div class="services-grid">
                {{SERVICES}}
            </div>
        </div>
    </section>

    <section id="products" class="products">
        <div class="container">
            <h2 class="section-title">Healthcare Products</h2>
            <div class="products-grid">
                {{PRODUCTS}}
            </div>
        </div>
    </section>

    <section class="features">
        <div class="container">
            <h2 class="section-title">Why Choose Us</h2>
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">🏥</div>
                    <h3>Professional Care</h3>
                    <p>Licensed pharmacists and healthcare professionals</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">⏰</div>
                    <h3>24/7 Service</h3>
                    <p>Round-the-clock healthcare support and emergency services</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">💊</div>
                    <h3>Quality Products</h3>
                    <p>Genuine medications and healthcare products</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🚚</div>
                    <h3>Home Delivery</h3>
                    <p>Fast and secure delivery to your doorstep</p>
                </div>
            </div>
        </div>
    </section>

    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Contact Us</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <h3>Get In Touch</h3>
                    <p><strong>Phone:</strong> {{PHONE}}</p>
                    <p><strong>Email:</strong> {{EMAIL}}</p>
                    <p><strong>Address:</strong> {{ADDRESS}}</p>
                    <div class="emergency-info">
                        <h4>Emergency Contact</h4>
                        <p>For medical emergencies, call 911</p>
                        <p>For pharmacy emergencies: {{PHONE}}</p>
                    </div>
                </div>
                <div class="hours-info">
                    <h3>Operating Hours</h3>
                    <ul>
                        <li>Monday - Friday: 8:00 AM - 9:00 PM</li>
                        <li>Saturday: 9:00 AM - 8:00 PM</li>
                        <li>Sunday: 10:00 AM - 6:00 PM</li>
                        <li>Emergency: 24/7</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 {{BUSINESS_NAME}}. All rights reserved. | Licensed Healthcare Provider</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`,
        css_content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.header {
    background: white;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo-img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
}

.logo-text {
    font-size: 1.8rem;
    font-weight: bold;
    color: {{PRIMARY_COLOR}};
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: {{PRIMARY_COLOR}};
}

.hero {
    display: flex;
    align-items: center;
    min-height: 100vh;
    padding: 120px 2rem 2rem;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.hero-content {
    flex: 1;
    max-width: 600px;
    padding-right: 2rem;
}

.hero-title {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: {{PRIMARY_COLOR}};
}

.hero-tagline {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: {{SECONDARY_COLOR}};
    font-weight: 500;
}

.hero-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: #666;
}

.cta-button {
    background: {{PRIMARY_COLOR}};
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s;
}

.cta-button:hover {
    background: {{SECONDARY_COLOR}};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.hero-image {
    flex: 1;
    text-align: center;
}

.hero-img {
    max-width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: {{PRIMARY_COLOR}};
}

.services, .products, .features {
    padding: 80px 0;
}

.services {
    background: white;
}

.products {
    background: #f8f9fa;
}

.features {
    background: white;
}

.services-grid, .products-grid, .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.service-item, .product-item {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
    border-left: 4px solid {{PRIMARY_COLOR}};
}

.service-item:hover, .product-item:hover {
    transform: translateY(-5px);
}

.product-item {
    text-align: center;
}

.product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.service-name, .product-name {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: {{PRIMARY_COLOR}};
}

.service-description, .product-description {
    color: #666;
    margin-bottom: 1rem;
}

.product-price {
    font-size: 1.2rem;
    font-weight: bold;
    color: {{PRIMARY_COLOR}};
}

.feature-item {
    text-align: center;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 10px;
    transition: transform 0.3s;
}

.feature-item:hover {
    transform: translateY(-5px);
    background: white;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feature-item h3 {
    color: {{PRIMARY_COLOR}};
    margin-bottom: 1rem;
}

.contact {
    padding: 80px 0;
    background: {{PRIMARY_COLOR}};
    color: white;
}

.contact .section-title {
    color: white;
}

.contact-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
}

.contact-info h3, .hours-info h3 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
}

.contact-info p, .hours-info li {
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
}

.emergency-info {
    margin-top: 2rem;
    padding: 1.5rem;
    background: rgba(255,255,255,0.1);
    border-radius: 8px;
}

.emergency-info h4 {
    color: #fff;
    margin-bottom: 1rem;
}

.hours-info ul {
    list-style: none;
}

.hours-info li {
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

.footer {
    background: #2c3e50;
    color: white;
    text-align: center;
    padding: 2rem 0;
}

@media (max-width: 768px) {
    .hero {
        flex-direction: column;
        text-align: center;
    }
    
    .hero-content {
        padding-right: 0;
        margin-bottom: 2rem;
    }
    
    .hero-title {
        font-size: 2.2rem;
    }
    
    .nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-menu {
        flex-direction: column;
        gap: 1rem;
    }
}`,
        js_content: `// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Emergency contact highlight
function highlightEmergency() {
    const emergencyInfo = document.querySelector('.emergency-info');
    if (emergencyInfo) {
        emergencyInfo.style.animation = 'pulse 2s infinite';
    }
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = \`
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}
\`;
document.head.appendChild(style);`,
        fields: {
          businessName: { type: 'text', label: 'Pharmacy/Clinic Name', required: true },
          tagline: { type: 'text', label: 'Professional Tagline', required: false },
          description: { type: 'textarea', label: 'About Your Healthcare Service', required: true },
          logo: { type: 'image', label: 'Logo', required: false },
          heroImage: { type: 'image', label: 'Hero Image', required: false },
          primaryColor: { type: 'color', label: 'Primary Color', default: '#2c5aa0' },
          secondaryColor: { type: 'color', label: 'Secondary Color', default: '#5dade2' },
          phone: { type: 'text', label: 'Phone Number', required: true },
          email: { type: 'email', label: 'Email Address', required: false },
          address: { type: 'text', label: 'Address', required: true },
          products: { type: 'array', label: 'Healthcare Products', fields: { name: 'text', description: 'textarea', price: 'text', image: 'image' } },
          services: { type: 'array', label: 'Medical Services', fields: { name: 'text', description: 'textarea' } }
        }
      }
    });

    // Education Template
    await prisma.template.upsert({
      where: { id: 'education-template-1' },
      update: {},
      create: {
        id: 'education-template-1',
        name: 'EduTech Modern',
        industry: 'education',
        description: 'Modern template perfect for schools, universities, and online learning platforms.',
        preview_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
        html_content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{BUSINESS_NAME}} - Excellence in Education</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="logo">
                <img src="{{LOGO_URL}}" alt="{{BUSINESS_NAME}}" class="logo-img">
                <span class="logo-text">{{BUSINESS_NAME}}</span>
            </div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#courses">Courses</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <section id="home" class="hero">
        <div class="hero-bg">
            <img src="{{HERO_IMAGE_URL}}" alt="Education" class="hero-image">
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1 class="hero-title">{{BUSINESS_NAME}}</h1>
            <p class="hero-tagline">{{TAGLINE}}</p>
            <p class="hero-description">{{DESCRIPTION}}</p>
            <div class="hero-buttons">
                <button class="cta-button primary">Enroll Now</button>
                <button class="cta-button secondary">Learn More</button>
            </div>
        </div>
    </section>

    <section id="about" class="about">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2 class="section-title">About Our Institution</h2>
                    <p>{{DESCRIPTION}}</p>
                    <div class="stats">
                        <div class="stat-item">
                            <span class="stat-number">1000+</span>
                            <span class="stat-label">Students</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">50+</span>
                            <span class="stat-label">Expert Faculty</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">95%</span>
                            <span class="stat-label">Success Rate</span>
                        </div>
                    </div>
                </div>
                <div class="about-image">
                    <img src="{{HERO_IMAGE_URL}}" alt="About Us" class="about-img">
                </div>
            </div>
        </div>
    </section>

    <section id="courses" class="courses">
        <div class="container">
            <h2 class="section-title">Our Courses</h2>
            <div class="courses-grid">
                {{PRODUCTS}}
            </div>
        </div>
    </section>

    <section id="services" class="services">
        <div class="container">
            <h2 class="section-title">Our Services</h2>
            <div class="services-grid">
                {{SERVICES}}
            </div>
        </div>
    </section>

    <section class="features">
        <div class="container">
            <h2 class="section-title">Why Choose Us</h2>
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">📚</div>
                    <h3>Quality Education</h3>
                    <p>Comprehensive curriculum designed by industry experts</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">👨‍🏫</div>
                    <h3>Expert Faculty</h3>
                    <p>Learn from experienced professionals and industry leaders</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🎓</div>
                    <h3>Recognized Certification</h3>
                    <p>Earn certificates recognized by leading institutions</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">💻</div>
                    <h3>Online Learning</h3>
                    <p>Flexible online classes with interactive learning tools</p>
                </div>
            </div>
        </div>
    </section>

    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Get In Touch</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <h3>Contact Information</h3>
                    <p><strong>Phone:</strong> {{PHONE}}</p>
                    <p><strong>Email:</strong> {{EMAIL}}</p>
                    <p><strong>Address:</strong> {{ADDRESS}}</p>
                    <div class="social-links">
                        <a href="{{FACEBOOK_URL}}" class="social-link">Facebook</a>
                        <a href="{{INSTAGRAM_URL}}" class="social-link">Instagram</a>
                        <a href="{{TWITTER_URL}}" class="social-link">Twitter</a>
                    </div>
                </div>
                <div class="contact-form">
                    <h3>Send us a Message</h3>
                    <form class="form">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                        <button type="submit" class="form-submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 {{BUSINESS_NAME}}. All rights reserved. | Empowering Future Leaders</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`,
        css_content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-img {
    width: 45px;
    height: 45px;
    border-radius: 8px;
}

.logo-text {
    font-size: 1.6rem;
    font-weight: bold;
    color: {{PRIMARY_COLOR}};
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s;
    position: relative;
}

.nav-menu a:hover {
    color: {{PRIMARY_COLOR}};
}

.nav-menu a:hover::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: {{PRIMARY_COLOR}};
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from { width: 0; }
    to { width: 100%; }
}

.hero {
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    overflow: hidden;
}

.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
}

.hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4));
    z-index: -1;
}

.hero-content {
    max-width: 700px;
    padding: 0 20px;
    animation: fadeInUp 1s ease;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-title {
    font-size: 3.8rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.hero-tagline {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: {{SECONDARY_COLOR}};
    font-weight: 300;
}

.hero-description {
    font-size: 1.2rem;
    margin-bottom: 2.5rem;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.cta-button {
    padding: 15px 35px;
    border: none;
    border-radius: 30px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.cta-button.primary {
    background: linear-gradient(45deg, {{PRIMARY_COLOR}}, {{SECONDARY_COLOR}});
    color: white;
}

.cta-button.secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.section-title {
    text-align: center;
    font-size: 2.8rem;
    margin-bottom: 3rem;
    color: {{PRIMARY_COLOR}};
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: {{SECONDARY_COLOR}};
}

.about {
    padding: 100px 0;
    background: #f8f9fa;
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.about-text {
    padding-right: 2rem;
}

.about-text p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: #666;
    line-height: 1.8;
}

.stats {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
}

.stat-item {
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: bold;
    color: {{PRIMARY_COLOR}};
}

.stat-label {
    color: #666;
    font-weight: 500;
}

.about-img {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

.courses, .services {
    padding: 100px 0;
}

.courses {
    background: white;
}

.services {
    background: #f8f9fa;
}

.courses-grid, .services-grid, .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
}

.product-item, .service-item {
    background: white;
    padding: 2.5rem 2rem;
    border-radius: 15px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    text-align: center;
    transition: all 0.3s;
    border-top: 4px solid {{PRIMARY_COLOR}};
}

.product-item:hover, .service-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1.5rem;
}

.product-name, .service-name {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: {{PRIMARY_COLOR}};
    font-weight: 600;
}

.product-description, .service-description {
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.product-price {
    font-size: 1.3rem;
    font-weight: bold;
    color: {{SECONDARY_COLOR}};
}

.features {
    padding: 100px 0;
    background: linear-gradient(135deg, {{PRIMARY_COLOR}}, {{SECONDARY_COLOR}});
    color: white;
}

.features .section-title {
    color: white;
}

.features .section-title::after {
    background: white;
}

.feature-item {
    text-align: center;
    padding: 2.5rem 2rem;
    background: rgba(255,255,255,0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    transition: transform 0.3s;
}

.feature-item:hover {
    transform: translateY(-5px);
    background: rgba(255,255,255,0.15);
}

.feature-icon {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
}

.feature-item h3 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
}

.contact {
    padding: 100px 0;
    background: white;
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
}

.contact-info h3, .contact-form h3 {
    margin-bottom: 2rem;
    color: {{PRIMARY_COLOR}};
    font-size: 1.5rem;
}

.contact-info p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.social-links {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.social-link {
    color: {{PRIMARY_COLOR}};
    text-decoration: none;
    padding: 8px 16px;
    border: 2px solid {{PRIMARY_COLOR}};
    border-radius: 20px;
    transition: all 0.3s;
}

.social-link:hover {
    background: {{PRIMARY_COLOR}};
    color: white;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form input, .form textarea {
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

.form input:focus, .form textarea:focus {
    outline: none;
    border-color: {{PRIMARY_COLOR}};
}

.form-submit {
    background: {{PRIMARY_COLOR}};
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.3s;
}

.form-submit:hover {
    background: {{SECONDARY_COLOR}};
}

.footer {
    background: #2c3e50;
    color: white;
    text-align: center;
    padding: 2rem 0;
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .about-text {
        padding-right: 0;
    }
    
    .stats {
        justify-content: center;
    }
    
    .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-menu {
        flex-direction: column;
        gap: 1rem;
    }
}`,
        js_content: `// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
    }
});

// Animate stats on scroll
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = parseInt(stat.textContent);
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        stat.textContent = finalValue + (stat.textContent.includes('%') ? '%' : '+');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('%') ? '%' : '+');
                    }
                }, 40);
                
                observer.unobserve(stat);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
};

// Contact form handling
document.querySelector('.form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would typically send the data to a server
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Initialize animations when page loads
window.addEventListener('load', () => {
    animateStats();
});`,
        fields: {
          businessName: { type: 'text', label: 'Institution Name', required: true },
          tagline: { type: 'text', label: 'Educational Mission', required: false },
          description: { type: 'textarea', label: 'About Your Institution', required: true },
          logo: { type: 'image', label: 'Logo', required: false },
          heroImage: { type: 'image', label: 'Hero Background Image', required: false },
          primaryColor: { type: 'color', label: 'Primary Color', default: '#3498db' },
          secondaryColor: { type: 'color', label: 'Secondary Color', default: '#2ecc71' },
          phone: { type: 'text', label: 'Phone Number', required: false },
          email: { type: 'email', label: 'Email Address', required: false },
          address: { type: 'text', label: 'Address', required: false },
          products: { type: 'array', label: 'Courses/Programs', fields: { name: 'text', description: 'textarea', price: 'text', image: 'image' } },
          services: { type: 'array', label: 'Educational Services', fields: { name: 'text', description: 'textarea' } },
          socialMedia: { type: 'object', label: 'Social Media', fields: { facebook: 'url', instagram: 'url', twitter: 'url' } }
        }
      }
    });

    console.log('✅ Templates seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding templates:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedTemplates();
