/**
 * INZAISH COLLECTION — Dedicated Editorial Information & Policy Pages View
 * Comprehensive luxury editorial pages for:
 * - Brand Provenance & Atelier Heritage (#/about)
 * - Flagship Boutiques & Client Concierge (#/contact)
 * - Imperial Size Guide & Unstitched Yardage Verification (#/size-guide)
 * - Shipping, COD & Courier Policies (#/shipping-policy)
 * - 3-Day Doorstep Reverse Exchanges (#/returns-policy)
 */

export function renderInfoPage(containerElem, pageKey = 'about', options = {}) {
  if (!containerElem) return;

  const { onNavigate = () => {}, onContactSubmit = () => {} } = options;

  let pageContentHTML = '';

  if (pageKey === 'about') {
    pageContentHTML = `
      <div class="info-page-wrapper">
        <nav class="breadcrumb-container" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-item">Home</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-item active">About Inzaish Collection</span>
        </nav>

        <header class="info-header-banner">
          <span class="info-eyebrow">
            <span class="dot"></span>
            Brand Provenance &amp; Subcontinental Heritage
          </span>
          <h1 class="info-main-title">The Sovereign Weave</h1>
          <p class="info-lead">
            Inzaish Collection was founded in Lahore on a singular ethos: restoring architectural restraint, unadulterated fiber purity, and century-old subcontinental artisan craft to contemporary Pakistani fashion.
          </p>
        </header>

        <!-- Visual Hero Triplet -->
        <div class="about-visual-grid">
          <div class="about-img-card">
            <img src="/assets/women_unstitched_luxe.jpg" alt="Lahore Chikankari Loom" class="about-img" loading="lazy" />
            <span class="about-img-caption">01 • Hand-drawn Chikankari needlework on combed lawn</span>
          </div>
          <div class="about-img-card">
            <img src="/assets/women_pret_ivory.jpg" alt="Tailored Raw Silk Silhouette" class="about-img" loading="lazy" />
            <span class="about-img-caption">02 • Architectural raw silk tailoring &amp; structured tunics</span>
          </div>
          <div class="about-img-card">
            <img src="/assets/men_eastern_onyx.jpg" alt="Egyptian Giza Liquid Cotton" class="about-img" loading="lazy" />
            <span class="about-img-caption">03 • Egyptian Giza liquid cotton cut with bespoke discipline</span>
          </div>
        </div>

        <!-- Narrative Pillars -->
        <div class="about-narrative-sections">
          <article class="narrative-block">
            <span class="narrative-num">I.</span>
            <div class="narrative-body">
              <h3 class="narrative-title">Textile Integrity Without Compromise</h3>
              <p>
                In a fashion landscape inundated by synthetic blends and mass-manufactured fast fashion, Inzaish Collection remains staunchly purist. Every yard of our unstitched and pret collections begins with ethically sourced natural fibers: 100% long-staple combed cotton, hand-spun raw silk from artisan weavers, and sheer mulberry silk organza.
              </p>
              <p>
                Before a single needle enters the cloth, our fabrics undergo rigorous pre-shrinking and colorfast testing in Lahore, ensuring that garments maintain their precise silhouette and heirloom luster through generations of wear.
              </p>
            </div>
          </article>

          <article class="narrative-block">
            <span class="narrative-num">II.</span>
            <div class="narrative-body">
              <h3 class="narrative-title">Artisan Guilds of Old Lahore</h3>
              <p>
                Our master ateliers are situated within the historic craft enclaves of Lahore, partnering directly with master artisans whose families have practiced Marori, Zardozi, and Schifli embroidery for over a century. We champion fair living compensation, archival preservation, and ergonomic studio environments for all master tailors and needleworkers.
              </p>
              <p>
                By merging ancient subcontinental threadwork with minimalist, architectural drape, Inzaish pieces transcend transient seasonal trends, serving as timeless additions to the discerning client's private collection.
              </p>
            </div>
          </article>

          <article class="narrative-block">
            <span class="narrative-num">III.</span>
            <div class="narrative-body">
              <h3 class="narrative-title">Limited Archival Drops &amp; Zero Deadstock</h3>
              <p>
                We reject overproduction. Each Inzaish drop is released in numbered, limited batches. Our unstitched releases feature generous imperial allowances (3.25 meters per shirt piece), allowing master tailors across Pakistan and the international diaspora to customize hemlines, sleeves, and silhouettes without textile constraints.
              </p>
            </div>
          </article>
        </div>

        <!-- Flagship Boutiques Summary Strip -->
        <div class="about-flagships-strip">
          <div class="flagship-mini-item">
            <strong>Lahore Atelier &amp; Flagship</strong>
            <p>14-L, Mini Market, Gulberg II, Lahore</p>
          </div>
          <div class="flagship-mini-item">
            <strong>Karachi Flagship</strong>
            <p>Plot 8-C, 7th Commercial St, Clifton Block 4, Karachi</p>
          </div>
          <div class="flagship-mini-item">
            <strong>Islamabad Boutique</strong>
            <p>Beverly Centre, Jinnah Avenue, F-6/1, Islamabad</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 3.5rem;">
          <a href="#/unstitched" class="btn-primary" style="padding: 1.1rem 2.5rem;">
            Discover Current Curations →
          </a>
        </div>
      </div>
    `;
  } else if (pageKey === 'contact') {
    pageContentHTML = `
      <div class="info-page-wrapper">
        <nav class="breadcrumb-container" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-item">Home</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-item active">Client Concierge &amp; Flagships</span>
        </nav>

        <header class="info-header-banner">
          <span class="info-eyebrow">
            <span class="dot"></span>
            Private Concierge &amp; Flagship Boutiques
          </span>
          <h1 class="info-main-title">Connect with the Atelier</h1>
          <p class="info-lead">
            Whether inquiring about custom bridal tailoring, unstitched fabric yardage, or nationwide express dispatch, our dedicated client concierge is available daily.
          </p>
        </header>

        <!-- Direct Instant Channels -->
        <div class="contact-channels-grid">
          <a href="https://wa.me/923001234567" target="_blank" rel="noopener" class="contact-channel-card highlight-channel">
            <span class="channel-icon">💬</span>
            <div class="channel-info">
              <span class="channel-tag">Direct WhatsApp Concierge</span>
              <strong class="channel-main">+92 300 1234567</strong>
              <p class="channel-sub">Live personal styling, real-time photo swatches, and dispatch status (10:00 AM – 11:00 PM PKT).</p>
            </div>
            <span class="channel-arrow">→</span>
          </a>

          <a href="tel:+924235758891" class="contact-channel-card">
            <span class="channel-icon">📞</span>
            <div class="channel-info">
              <span class="channel-tag">Atelier Head Office (Lahore)</span>
              <strong class="channel-main">+92 (042) 3575 8891</strong>
              <p class="channel-sub">Direct boutique desk for order adjustments and bespoke bridal consultations.</p>
            </div>
            <span class="channel-arrow">→</span>
          </a>

          <a href="mailto:concierge@inzaish.com" class="contact-channel-card">
            <span class="channel-icon">✉</span>
            <div class="channel-info">
              <span class="channel-tag">Client Services Email</span>
              <strong class="channel-main">concierge@inzaish.com</strong>
              <p class="channel-sub">Formal corporate inquiries, international shipments, and press queries.</p>
            </div>
            <span class="channel-arrow">→</span>
          </a>
        </div>

        <!-- Flagship Boutiques & Message Form Grid -->
        <div class="contact-main-grid">
          <!-- Flagship Boutiques Column -->
          <div class="flagships-column">
            <h3 class="flagships-heading">Flagship Boutiques</h3>
            <p class="flagships-lead">Experience our unstitched textures and ready-to-wear silhouettes in person.</p>

            <div class="boutique-cards-list">
              <article class="boutique-card">
                <span class="boutique-city-badge">Lahore Flagship &amp; Atelier</span>
                <h4 class="boutique-name">Gulberg III Flagship</h4>
                <p class="boutique-addr">14-L, Mini Market / MM Alam Boulevard, Gulberg II, Lahore, Punjab</p>
                <div class="boutique-hours">
                  <span>Monday – Saturday: 11:00 AM – 10:00 PM</span>
                  <span>Sunday: 02:00 PM – 10:00 PM</span>
                </div>
                <div class="boutique-contact-links">
                  <span>Direct: <strong>+92 42 3575 8891</strong></span>
                  <a href="https://maps.google.com/?q=Gulberg+Lahore" target="_blank" rel="noopener" class="boutique-map-link">Google Maps Directions ↗</a>
                </div>
              </article>

              <article class="boutique-card">
                <span class="boutique-city-badge">Karachi Flagship</span>
                <h4 class="boutique-name">Clifton Galleria</h4>
                <p class="boutique-addr">Plot 8-C, 7th Commercial Street, Phase 5, Clifton Block 4, Karachi, Sindh</p>
                <div class="boutique-hours">
                  <span>Monday – Sunday: 11:30 AM – 11:00 PM</span>
                </div>
                <div class="boutique-contact-links">
                  <span>Direct: <strong>+92 21 3583 4421</strong></span>
                  <a href="https://maps.google.com/?q=Clifton+Karachi" target="_blank" rel="noopener" class="boutique-map-link">Google Maps Directions ↗</a>
                </div>
              </article>

              <article class="boutique-card">
                <span class="boutique-city-badge">Islamabad Flagship</span>
                <h4 class="boutique-name">Beverly Centre Galleria</h4>
                <p class="boutique-addr">Shop 12-B, Ground Floor, Beverly Centre, Jinnah Avenue, F-6/1, Islamabad</p>
                <div class="boutique-hours">
                  <span>Monday – Saturday: 11:00 AM – 10:00 PM</span>
                  <span>Sunday: 03:00 PM – 10:00 PM</span>
                </div>
                <div class="boutique-contact-links">
                  <span>Direct: <strong>+92 51 282 9901</strong></span>
                  <a href="https://maps.google.com/?q=Beverly+Centre+Islamabad" target="_blank" rel="noopener" class="boutique-map-link">Google Maps Directions ↗</a>
                </div>
              </article>
            </div>
          </div>

          <!-- Interactive Inquiry Form Column -->
          <div class="inquiry-form-card">
            <span class="tracker-eyebrow">Client Services Desk</span>
            <h3 class="tracker-title">Send a Written Inquiry</h3>
            <p class="tracker-subtitle">
              Our styling consultants in Lahore will review your inquiry and reply via WhatsApp or phone within 4 business hours.
            </p>

            <form id="contactInquiryForm" class="contact-form-inner">
              <div class="checkout-input-grid-2">
                <div class="checkout-field-group">
                  <label class="checkout-field-label">Full Name *</label>
                  <input type="text" id="contactName" class="checkout-input" required placeholder="Ahmad Khan" />
                </div>
                <div class="checkout-field-group">
                  <label class="checkout-field-label">Phone (WhatsApp) *</label>
                  <input type="tel" id="contactPhone" class="checkout-input" required placeholder="0300 1234567" />
                </div>
              </div>

              <div class="checkout-input-grid-2" style="margin-top: 1rem;">
                <div class="checkout-field-group">
                  <label class="checkout-field-label">Email Address</label>
                  <input type="email" id="contactEmail" class="checkout-input" placeholder="ahmad@example.com" />
                </div>
                <div class="checkout-field-group">
                  <label class="checkout-field-label">City *</label>
                  <select id="contactCity" class="checkout-select" required>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other">Other City / Overseas</option>
                  </select>
                </div>
              </div>

              <div class="checkout-field-group" style="margin-top: 1rem;">
                <label class="checkout-field-label">Inquiry Subject *</label>
                <select id="contactSubject" class="checkout-select" required>
                  <option value="order-status">Consignment &amp; Order Status</option>
                  <option value="unstitched-yardage">Unstitched Fabric Yardage &amp; Cutting</option>
                  <option value="pret-sizing">Ready-to-Wear Sizing &amp; Tailoring Advice</option>
                  <option value="custom-bridal">Custom Bridal &amp; Festive Couture Consultation</option>
                  <option value="exchange">3-Day Doorstep Reverse Exchange Request</option>
                  <option value="other">Other General Inquiry</option>
                </select>
              </div>

              <div class="checkout-field-group" style="margin-top: 1rem;">
                <label class="checkout-field-label">Your Message *</label>
                <textarea id="contactMessage" class="checkout-textarea" rows="4" required placeholder="Describe your inquiry or include specific garment names and references."></textarea>
              </div>

              <button type="submit" class="btn-primary" style="width: 100%; margin-top: 1.5rem; padding: 1.1rem;">
                Submit Inquiry to Atelier Concierge
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  } else if (pageKey === 'size-guide') {
    pageContentHTML = `
      <div class="info-page-wrapper">
        <nav class="breadcrumb-container" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-item">Home</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-item active">Imperial Size Guide &amp; Fabric Yardage</span>
        </nav>

        <header class="info-header-banner">
          <span class="info-eyebrow">
            <span class="dot"></span>
            Imperial Atelier Sizing &amp; Yardage Standards
          </span>
          <h1 class="info-main-title">Fit &amp; Proportion Standards</h1>
          <p class="info-lead">
            Every Inzaish Collection garment is measured in Imperial Inches. Our unstitched collections feature generous master-loom yardage, while our pret collections follow structured architectural tailoring.
          </p>
        </header>

        <!-- Sizing Nav Pills -->
        <div class="size-guide-tabs">
          <button class="size-tab-btn active" data-sizetab="women-pret">Women's Ready-to-Wear (Pret)</button>
          <button class="size-tab-btn" data-sizetab="unstitched">Unstitched Fabrics Breakdown</button>
          <button class="size-tab-btn" data-sizetab="men">Men's Eastern Collection</button>
        </div>

        <!-- SECTION 1: WOMEN'S PRET -->
        <div id="sizePaneWomenPret" class="size-pane active">
          <div class="table-responsive-box">
            <table class="luxury-size-table">
              <thead>
                <tr>
                  <th>Imperial Size</th>
                  <th>Chest / Bust</th>
                  <th>Waist</th>
                  <th>Hips</th>
                  <th>Kurta Length</th>
                  <th>Shoulder</th>
                  <th>Sleeve Length</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Extra Small (XS)</strong></td>
                  <td>34"</td>
                  <td>26"</td>
                  <td>36"</td>
                  <td>38"</td>
                  <td>13.5"</td>
                  <td>21.0"</td>
                </tr>
                <tr>
                  <td><strong>Small (S)</strong></td>
                  <td>36"</td>
                  <td>28"</td>
                  <td>38"</td>
                  <td>38"</td>
                  <td>14.0"</td>
                  <td>21.5"</td>
                </tr>
                <tr>
                  <td><strong>Medium (M)</strong></td>
                  <td>38"</td>
                  <td>30"</td>
                  <td>40"</td>
                  <td>39"</td>
                  <td>14.5"</td>
                  <td>21.5"</td>
                </tr>
                <tr>
                  <td><strong>Large (L)</strong></td>
                  <td>41"</td>
                  <td>33"</td>
                  <td>43"</td>
                  <td>40"</td>
                  <td>15.2"</td>
                  <td>22.0"</td>
                </tr>
                <tr>
                  <td><strong>Extra Large (XL)</strong></td>
                  <td>44"</td>
                  <td>36"</td>
                  <td>46"</td>
                  <td>40"</td>
                  <td>16.0"</td>
                  <td>22.5"</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="size-advisory-box">
            <span class="advisory-icon">✦</span>
            <div>
              <strong>Pret Silhouette Advisory:</strong>
              <p>Our raw silk co-ords and A-line minimalist kurtas feature a modern architectural drape with approximately 1.5" of ease over bust measurements for graceful subcontinental movement.</p>
            </div>
          </div>
        </div>

        <!-- SECTION 2: UNSTITCHED FABRIC YARDAGE -->
        <div id="sizePaneUnstitched" class="size-pane">
          <div class="table-responsive-box">
            <table class="luxury-size-table">
              <thead>
                <tr>
                  <th>Collection Type</th>
                  <th>Shirt Fabric</th>
                  <th>Dupatta Dimensions</th>
                  <th>Trouser Fabric</th>
                  <th>Included Embroidered Patches</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>3-Piece Luxury Lawn</strong></td>
                  <td>3.25m Fine Combed Lawn (56" Width)</td>
                  <td>2.5m Silk Organza / Chiffon</td>
                  <td>2.5m Dyed Cotton Cambric</td>
                  <td>Embroidered Neckline &amp; Daaman Borders (2.0m)</td>
                </tr>
                <tr>
                  <td><strong>2-Piece Luxury Lawn</strong></td>
                  <td>3.25m Fine Combed Lawn</td>
                  <td>2.5m Organza / Lawn Dupatta</td>
                  <td>—</td>
                  <td>Embroidered Sleeve &amp; Neckline Patches</td>
                </tr>
                <tr>
                  <td><strong>1-Piece Kurta Length</strong></td>
                  <td>3.25m Unstitched Lawn / Karandi</td>
                  <td>—</td>
                  <td>—</td>
                  <td>Embroidered Neckline Motif</td>
                </tr>
                <tr>
                  <td><strong>Festive Silk Formals</strong></td>
                  <td>3.5m Heavy Raw Silk (44" Width)</td>
                  <td>2.75m Zari Handwoven Organza</td>
                  <td>2.5m Pure Raw Silk</td>
                  <td>Complete Hand-worked Zardozi Panels</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="size-advisory-box">
            <span class="advisory-icon">⚲</span>
            <div>
              <strong>Unstitched Yardage Guarantee:</strong>
              <p>Every Inzaish Collection unstitched box provides full yardage verified by master tailors to accommodate Pakistani silhouettes up to 48" shirt lengths, bell sleeves, and flared palazzo trousers without patching.</p>
            </div>
          </div>
        </div>

        <!-- SECTION 3: MEN'S EASTERN COLLECTION -->
        <div id="sizePaneMen" class="size-pane">
          <div class="table-responsive-box">
            <table class="luxury-size-table">
              <thead>
                <tr>
                  <th>Men's Size</th>
                  <th>Chest</th>
                  <th>Collar / Bandhgala</th>
                  <th>Kurta Length</th>
                  <th>Sleeve Length</th>
                  <th>Shalwar Length</th>
                  <th>Waistcoat Chest</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Small (38)</strong></td>
                  <td>38"</td>
                  <td>15.0"</td>
                  <td>40"</td>
                  <td>24.0"</td>
                  <td>40"</td>
                  <td>39"</td>
                </tr>
                <tr>
                  <td><strong>Medium (40)</strong></td>
                  <td>40"</td>
                  <td>15.5"</td>
                  <td>41"</td>
                  <td>24.5"</td>
                  <td>41"</td>
                  <td>41"</td>
                </tr>
                <tr>
                  <td><strong>Large (42)</strong></td>
                  <td>42"</td>
                  <td>16.0"</td>
                  <td>42"</td>
                  <td>25.0"</td>
                  <td>42"</td>
                  <td>43"</td>
                </tr>
                <tr>
                  <td><strong>Extra Large (44)</strong></td>
                  <td>44"</td>
                  <td>16.5"</td>
                  <td>43"</td>
                  <td>25.5"</td>
                  <td>43"</td>
                  <td>45"</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="size-advisory-box">
            <span class="advisory-icon">❖</span>
            <div>
              <strong>Men's Tailoring Specifications:</strong>
              <p>Crafted from 100% Egyptian Giza liquid cotton. Features structured mandarin collars, French seams, and horn buttons. Shalwars are tailored with generous traditional pleated cuffs.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (pageKey === 'shipping-policy') {
    pageContentHTML = `
      <div class="info-page-wrapper">
        <nav class="breadcrumb-container" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-item">Home</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-item active">Nationwide Shipping &amp; Delivery Policies</span>
        </nav>

        <header class="info-header-banner">
          <span class="info-eyebrow">
            <span class="dot"></span>
            Delivery Integrity &amp; Cash on Delivery
          </span>
          <h1 class="info-main-title">Shipping &amp; Delivery Terms</h1>
          <p class="info-lead">
            Inzaish Collection operates direct courier agreements with Trax Logistics Express, TCS Express, and CallCourier, guaranteeing secure nationwide fulfillment across 150+ Pakistani cities.
          </p>
        </header>

        <div class="policy-sections-list">
          <article class="policy-detail-card">
            <h3 class="policy-card-title">1. Delivery Timelines Across Pakistan</h3>
            <div class="policy-card-content">
              <ul>
                <li><strong>Major Metropolitan Hubs (Lahore, Karachi, Islamabad, Rawalpindi):</strong> 1 to 2 business days following atelier dispatch.</li>
                <li><strong>Regional Cities (Faisalabad, Multan, Sialkot, Gujranwala, Peshawar, Quetta, Hyderabad):</strong> 2 to 3 business days.</li>
                <li><strong>Remote &amp; District Towns:</strong> 3 to 4 business days.</li>
              </ul>
              <p>All consignments are packed in tamper-evident unbleached archival garment boxes with signature Inzaish atelier seals.</p>
            </div>
          </article>

          <article class="policy-detail-card">
            <h3 class="policy-card-title">2. Nationwide Shipping Rates</h3>
            <div class="policy-card-content">
              <ul>
                <li><strong>Orders Over PKR 7,500:</strong> <strong style="color: var(--state-success);">FREE EXPRESS DELIVERY</strong> nationwide.</li>
                <li><strong>Orders Under PKR 7,500:</strong> Flat nominal fee of <strong>PKR 150</strong> per consignment regardless of weight.</li>
              </ul>
            </div>
          </article>

          <article class="policy-detail-card">
            <h3 class="policy-card-title">3. Cash on Delivery (COD) Rules</h3>
            <div class="policy-card-content">
              <p>Cash on Delivery is available across all 150+ covered cities up to a maximum parcel value of <strong>PKR 50,000</strong>.</p>
              <p>For orders exceeding PKR 50,000, our client concierge will contact you to arrange a 20% commitment advance via Raast / PayFast, with the remaining balance payable upon doorstep arrival.</p>
            </div>
          </article>

          <article class="policy-detail-card">
            <h3 class="policy-card-title">4. Consignment Telemetry &amp; Verification</h3>
            <div class="policy-card-content">
              <p>Upon handover to Trax or TCS in Lahore, clients receive an automated SMS and WhatsApp confirmation containing their direct courier Air Waybill (e.g. <code>TRX-9482104PK</code>). Real-time telemetry can also be inspected at any time via our <a href="#/track-order" style="color: var(--accent-brass); text-decoration: underline;">Client Atelier Tracker</a>.</p>
            </div>
          </article>
        </div>
      </div>
    `;
  } else if (pageKey === 'returns-policy') {
    pageContentHTML = `
      <div class="info-page-wrapper">
        <nav class="breadcrumb-container" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-item">Home</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-item active">3-Day Doorstep Reverse Exchanges</span>
        </nav>

        <header class="info-header-banner">
          <span class="info-eyebrow">
            <span class="dot"></span>
            Hassle-Free Doorstep Reverse Exchanges
          </span>
          <h1 class="info-main-title">Exchange &amp; Return Standards</h1>
          <p class="info-lead">
            We are committed to absolute satisfaction with every crafted silhouette. We provide a seamless 3-day reverse courier doorstep exchange service across Pakistan.
          </p>
        </header>

        <div class="policy-sections-list">
          <article class="policy-detail-card">
            <h3 class="policy-card-title">1. Three-Day Doorstep Reverse Courier Service</h3>
            <div class="policy-card-content">
              <p>If your Ready-to-Wear piece requires a different size, or if you prefer an alternative colorway or unstitched curation, notify our WhatsApp concierge (+92 300 1234567) within <strong>3 days of delivery</strong>.</p>
              <p>We will schedule our courier partner to collect the parcel directly from your home address in Lahore, Karachi, Islamabad, or any destination city. No postal queues or logistics hassles required.</p>
            </div>
          </article>

          <article class="policy-detail-card">
            <h3 class="policy-card-title">2. Garment Condition Standards</h3>
            <div class="policy-card-content">
              <ul>
                <li><strong>Ready-to-Wear (Pret):</strong> Must be unworn, unwashed, unaltered, and accompanied by the original atelier security ribbon and unbleached box.</li>
                <li><strong>Unstitched Fabrics:</strong> Fabric must remain strictly uncut and unaltered with complete fabric yardage and all included lace and embroidered patches intact.</li>
                <li><strong>Sale / Clearance Pieces:</strong> Eligible for size exchange or credit voucher only.</li>
              </ul>
            </div>
          </article>

          <article class="policy-detail-card">
            <h3 class="policy-card-title">3. Atelier Credit &amp; Replacements</h3>
            <div class="policy-card-content">
              <p>Upon receipt and quality inspection at our Lahore central fulfillment hub, your replacement piece will be dispatched immediately. If your desired size is out of batch availability, an Inzaish Store Credit Voucher valid for 12 months will be issued to your account.</p>
            </div>
          </article>
        </div>
      </div>
    `;
  }

  containerElem.innerHTML = pageContentHTML;

  // Bind Size Guide Tab switching if present
  const sizeTabs = containerElem.querySelectorAll('.size-tab-btn');
  sizeTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      containerElem.querySelectorAll('.size-pane').forEach(p => p.classList.remove('active'));

      const target = btn.dataset.sizetab;
      if (target === 'women-pret') containerElem.querySelector('#sizePaneWomenPret')?.classList.add('active');
      if (target === 'unstitched') containerElem.querySelector('#sizePaneUnstitched')?.classList.add('active');
      if (target === 'men') containerElem.querySelector('#sizePaneMen')?.classList.add('active');
    });
  });

  // Bind Inquiry Form submission
  const inquiryForm = containerElem.querySelector('#contactInquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = containerElem.querySelector('#contactName')?.value.trim();
      const phone = containerElem.querySelector('#contactPhone')?.value.trim();
      const subject = containerElem.querySelector('#contactSubject')?.value;
      const msg = containerElem.querySelector('#contactMessage')?.value.trim();

      onContactSubmit({ name, phone, subject, msg });
      inquiryForm.reset();
      window.showToast(`Shukriya, ${name}. Your inquiry has been sent to our atelier concierge.`);
    });
  }
}
