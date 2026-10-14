/**
 * INZAISH COLLECTION — Dedicated Client Atelier (Account & Order History View)
 * Luxury customer portal for reviewing orders, tracking Trax/TCS courier consignments,
 * managing imperial tailoring measurements, and accessing VIP patron privileges.
 */

function formatPKR(num) {
  return 'PKR ' + Number(num).toLocaleString('en-PK');
}

export function renderAccountPage(containerElem, state, options = {}) {
  if (!containerElem) return;

  const {
    activeTab = 'orders',
    onSelectTab = () => {},
    onTrackOrder = () => {},
    onReorderItems = () => {},
    onSaveMeasurements = () => {},
    onSaveAddress = () => {}
  } = options;

  const orders = state.orders || [];
  
  // Load saved measurement profile or sensible luxury defaults
  let measurements = {
    kurtaLength: '39"',
    chest: '38"',
    waist: '30"',
    hips: '40"',
    shoulder: '14.5"',
    sleeveLength: '21.5"',
    trouserLength: '38"',
    pantOpening: '7.5"'
  };
  try {
    const savedM = localStorage.getItem('inzaish_measurements');
    if (savedM) measurements = { ...measurements, ...JSON.parse(savedM) };
  } catch (e) {}

  // Load saved shipping profile or defaults
  let shippingProfile = {
    fullName: (orders[0] && orders[0].customerName) || 'Syeda Zainab',
    phone: (orders[0] && orders[0].phone) || '0321 5556789',
    email: (orders[0] && orders[0].email) || 'client@inzaish.com',
    address: (orders[0] && orders[0].address) || 'Apartment 4B, Signature Towers, Main Boulevard, Gulberg',
    city: (orders[0] && orders[0].city) || 'Lahore',
    landmark: (orders[0] && orders[0].landmark) || 'Near Jalal Sons'
  };
  try {
    const savedS = localStorage.getItem('inzaish_shipping_profile');
    if (savedS) shippingProfile = { ...shippingProfile, ...JSON.parse(savedS) };
  } catch (e) {}

  // Patron Tier Calculation
  const totalSpend = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const patronTier = totalSpend >= 50000 ? 'Gold Heirloom Patron' :
                     totalSpend >= 20000 ? 'Silver Atelier Patron' : 'Privilege Member';

  containerElem.innerHTML = `
    <div class="account-page-wrapper">
      <!-- Breadcrumb Bar -->
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <a href="#/" class="breadcrumb-item">Home</a>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-item active">Client Atelier</span>
      </nav>

      <!-- Editorial Header Banner -->
      <header class="account-header-banner">
        <div>
          <span class="account-eyebrow">
            <span class="dot"></span>
            Inzaish Privilege Portal • Patron Services
          </span>
          <h1 class="account-main-title">The Client Atelier</h1>
          <p class="account-lead">
            Manage your bespoke wardrobe consignments, inspect nationwide Trax &amp; TCS courier dispatch progress, and curate your imperial tailoring profile.
          </p>
        </div>

        <!-- VIP Patron Status Card -->
        <div class="patron-tier-card">
          <div class="patron-tier-badge">
            <span class="patron-star">❖</span>
            <span class="patron-tier-title">${patronTier}</span>
          </div>
          <p class="patron-tier-desc">
            ${totalSpend > 0 ? `Total Atelier Curations: <strong>${formatPKR(totalSpend)}</strong> across ${orders.length} consignment(s).` : 'Join our inner circle with your first luxury wardrobe order.'}
          </p>
          <div class="patron-perks-list">
            <span>✓ Complimentary 3-Day Reverse Exchanges</span>
            <span>✓ Priority Lahore Atelier Dispatch</span>
            <span>✓ Dedicated WhatsApp Personal Stylist</span>
          </div>
        </div>
      </header>

      <!-- Navigation Tabs -->
      <nav class="account-tabs-bar" role="tablist" aria-label="Account Tabs">
        <button class="account-tab-btn ${activeTab === 'orders' ? 'active' : ''}" data-tab="orders" role="tab" aria-selected="${activeTab === 'orders'}">
          Consignment History (${orders.length})
        </button>
        <button class="account-tab-btn ${activeTab === 'track' ? 'active' : ''}" data-tab="track" role="tab" aria-selected="${activeTab === 'track'}">
          Live Consignment Tracker
        </button>
        <button class="account-tab-btn ${activeTab === 'measurements' ? 'active' : ''}" data-tab="measurements" role="tab" aria-selected="${activeTab === 'measurements'}">
          Imperial Measurement Profile
        </button>
        <button class="account-tab-btn ${activeTab === 'address' ? 'active' : ''}" data-tab="address" role="tab" aria-selected="${activeTab === 'address'}">
          Saved Delivery Address
        </button>
      </nav>

      <!-- TAB PANELS -->
      <div class="account-tab-content">
        <!-- TAB 1: CONSIGNMENT HISTORY -->
        <section id="tabPanelOrders" class="account-panel ${activeTab === 'orders' ? 'active' : ''}">
          ${orders.length === 0 ? `
            <div class="account-empty-state">
              <span class="account-empty-icon">❖</span>
              <h3 class="account-empty-title">No Consignments in Your Archive</h3>
              <p class="account-empty-desc">
                When you finalize an order via Cash on Delivery (COD) or bank-grade digital gateways, your live tracking telemetry and archival garments will be curated here.
              </p>
              <div class="account-empty-actions">
                <a href="#/unstitched" class="btn-primary" style="padding: 0.9rem 1.75rem;">Explore Unstitched Edits →</a>
                <a href="#/pret" class="btn-secondary" style="padding: 0.9rem 1.75rem;">Discover Ready-to-Wear</a>
              </div>
            </div>
          ` : `
            <div class="order-history-list">
              ${orders.map((order, idx) => {
                const courierTrackingId = 'TRX-' + (7894000 + idx * 37 + Math.floor(Math.random() * 20));
                return `
                  <article class="order-history-card" data-order-id="${order.orderId}">
                    <!-- Card Top Meta Bar -->
                    <div class="order-card-meta-bar">
                      <div class="order-meta-col">
                        <span class="order-meta-label">Consignment Reference</span>
                        <strong class="order-meta-val order-ref-highlight">#${order.orderId}</strong>
                      </div>
                      <div class="order-meta-col">
                        <span class="order-meta-label">Placed On</span>
                        <span class="order-meta-val">${order.date}</span>
                      </div>
                      <div class="order-meta-col">
                        <span class="order-meta-label">Payment Mode</span>
                        <span class="order-meta-val">${order.paymentMethodTitle || 'Cash on Delivery (COD)'}</span>
                      </div>
                      <div class="order-meta-col">
                        <span class="order-meta-label">Consignment Value</span>
                        <strong class="order-meta-val order-price-highlight">${formatPKR(order.total)}</strong>
                      </div>
                      <div class="order-meta-status">
                        <span class="status-pill status-processing">
                          <span class="status-dot"></span>
                          Processing in Lahore
                        </span>
                      </div>
                    </div>

                    <!-- Visual Consignment Dispatch Stepper -->
                    <div class="order-dispatch-stepper">
                      <div class="step-item step-completed">
                        <div class="step-node">✓</div>
                        <span class="step-text">Consignment Confirmed</span>
                        <span class="step-sub">Lahore Central</span>
                      </div>
                      <div class="step-line step-line-active"></div>
                      <div class="step-item step-active">
                        <div class="step-node">2</div>
                        <span class="step-text">Atelier QA &amp; Packaging</span>
                        <span class="step-sub">Unbleached Archival Boxes</span>
                      </div>
                      <div class="step-line"></div>
                      <div class="step-item">
                        <div class="step-node">3</div>
                        <span class="step-text">Trax / TCS Courier Handover</span>
                        <span class="step-sub">Waybill: ${courierTrackingId}</span>
                      </div>
                      <div class="step-line"></div>
                      <div class="step-item">
                        <div class="step-node">4</div>
                        <span class="step-text">Doorstep Delivery</span>
                        <span class="step-sub">${order.city || 'Destination City'}</span>
                      </div>
                    </div>

                    <!-- Items In Order -->
                    <div class="order-card-items-section">
                      <h4 class="order-items-heading">Archival Garments (${order.items.length})</h4>
                      <div class="order-items-grid">
                        ${order.items.map(item => `
                          <div class="order-item-mini-card">
                            <img src="${item.image}" alt="${item.title}" class="order-item-mini-img" loading="lazy" />
                            <div class="order-item-mini-info">
                              <h5 class="order-item-mini-title">${item.title}</h5>
                              <p class="order-item-mini-specs">
                                Size: <strong>${item.size || 'Standard'}</strong> • Qty: <strong>${item.qty}</strong>
                              </p>
                              <span class="order-item-mini-price">${formatPKR(item.price * item.qty)}</span>
                            </div>
                          </div>
                        `).join('')}
                      </div>
                    </div>

                    <!-- Order Card Action Bar -->
                    <div class="order-card-actions-row">
                      <div class="order-delivery-destination-note">
                        <span>Courier Destination:</span>
                        <strong>${order.customerName} • ${order.address}, ${order.city} (Tel: ${order.phone})</strong>
                      </div>

                      <div class="order-action-buttons">
                        <button class="btn-secondary track-single-order-btn" data-order-ref="${order.orderId}">
                          Inspect Courier Telemetry <span>→</span>
                        </button>

                        <a href="https://wa.me/923001234567?text=${encodeURIComponent(`Hello Inzaish Concierge, I would like an update on my order #${order.orderId} for ${order.customerName} (${order.city}).`)}" 
                           target="_blank" rel="noopener" class="btn-secondary whatsapp-order-link">
                          <span>💬 WhatsApp Concierge</span>
                        </a>

                        <button class="btn-primary reorder-items-btn" data-order-idx="${idx}">
                          Reorder Consignment
                        </button>
                      </div>
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          `}
        </section>

        <!-- TAB 2: LIVE CONSIGNMENT TRACKER -->
        <section id="tabPanelTrack" class="account-panel ${activeTab === 'track' ? 'active' : ''}">
          <div class="tracker-dashboard-grid">
            <div class="tracker-form-card">
              <span class="tracker-eyebrow">Real-Time Courier Telemetry</span>
              <h3 class="tracker-title">Locate Your Consignment</h3>
              <p class="tracker-subtitle">
                Enter your Inzaish Order Reference (e.g. <code>#IC-2026-6228</code>) or registered 11-digit Pakistani phone number.
              </p>

              <form id="accountTrackForm" class="tracker-input-group">
                <input type="text" id="accountTrackInput" class="checkout-input" 
                       placeholder="Order Reference #IC-2026-XXXX or 03XX XXXXXXX" 
                       value="${orders[0] ? '#' + orders[0].orderId : '#IC-2026-6228'}" required />
                <button type="submit" class="btn-primary" style="padding: 0.95rem 1.75rem;">
                  Locate Consignment
                </button>
              </form>

              <div class="tracker-courier-badges">
                <span>Integrated Express Partners:</span>
                <span class="courier-badge">Trax Logistics</span>
                <span class="courier-badge">TCS Express</span>
                <span class="courier-badge">M&amp;P Courier</span>
                <span class="courier-badge">Call Courier</span>
              </div>
            </div>

            <!-- Live Telemetry Results Card -->
            <div class="tracker-result-card" id="accountTrackerResult">
              <div class="tracker-result-header">
                <div>
                  <span class="tracker-consignment-badge">Consignment In Flight</span>
                  <h4 class="tracker-order-id-display" id="dispOrderId">#${orders[0] ? orders[0].orderId : 'IC-2026-6228'}</h4>
                  <p class="tracker-courier-line">Partner: <strong>Trax Logistics Express</strong> • Air Waybill: <strong>TRX-9482104PK</strong></p>
                </div>
                <div class="tracker-eta-block">
                  <span class="eta-label">Estimated Delivery</span>
                  <strong class="eta-date">Tomorrow, 3:30 PM</strong>
                </div>
              </div>

              <!-- Journey Progress Bar -->
              <div class="journey-status-banner">
                <div class="journey-status-point">
                  <div class="status-indicator-circle active"></div>
                  <div class="journey-info">
                    <strong>Central Atelier Dispatch Hub</strong>
                    <span>Gulberg III, Lahore • 09:15 AM</span>
                  </div>
                </div>

                <div class="journey-status-point">
                  <div class="status-indicator-circle active"></div>
                  <div class="journey-info">
                    <strong>Trax Regional Sorting Facility</strong>
                    <span>Multan Road Cargo Terminal • 02:40 PM</span>
                  </div>
                </div>

                <div class="journey-status-point">
                  <div class="status-indicator-circle active pulsating"></div>
                  <div class="journey-info">
                    <strong>Transit to Destination Hub</strong>
                    <span>Linehaul En Route to Delivery City • 07:15 PM</span>
                  </div>
                </div>

                <div class="journey-status-point pending">
                  <div class="status-indicator-circle"></div>
                  <div class="journey-info">
                    <strong>Out for Doorstep Delivery</strong>
                    <span>Cash on Delivery Inspection Pending</span>
                  </div>
                </div>
              </div>

              <div class="journey-rider-advisory">
                <span class="rider-icon">📞</span>
                <div>
                  <strong>Courier Dispatch Advisory:</strong>
                  <p>Your delivery agent will place a verification call prior to visiting your address. Please ensure cash is available for Cash on Delivery consignments.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- TAB 3: IMPERIAL MEASUREMENT PROFILE -->
        <section id="tabPanelMeasurements" class="account-panel ${activeTab === 'measurements' ? 'active' : ''}">
          <div class="measurements-layout-grid">
            <div class="measurements-form-card">
              <span class="tracker-eyebrow">Bespoke Atelier Sizing</span>
              <h3 class="tracker-title">Imperial Garment Specifications</h3>
              <p class="tracker-subtitle">
                Store your exact body and kurta measurements in Imperial Inches. Our Lahore master tailors reference this profile when cutting custom pret tunics and festive silhouettes.
              </p>

              <form id="accountMeasurementsForm" class="measurements-form">
                <div class="measurements-grid-4">
                  <div class="checkout-field-group">
                    <label class="checkout-field-label">Kurta / Shirt Length *</label>
                    <input type="text" id="mKurtaLength" class="checkout-input" value="${measurements.kurtaLength}" placeholder="39 inches" required />
                  </div>
                  <div class="checkout-field-group">
                    <label class="checkout-field-label">Chest / Bust *</label>
                    <input type="text" id="mChest" class="checkout-input" value="${measurements.chest}" placeholder="38 inches" required />
                  </div>
                  <div class="checkout-field-group">
                    <label class="checkout-field-label">Waist *</label>
                    <input type="text" id="mWaist" class="checkout-input" value="${measurements.waist}" placeholder="30 inches" required />
                  </div>
                  <div class="checkout-field-group">
                    <label class="checkout-field-label">Hips *</label>
                    <input type="text" id="mHips" class="checkout-input" value="${measurements.hips}" placeholder="40 inches" required />
                  </div>
                  <div class="checkout-field-group">
                    <label class="checkout-field-label">Shoulder Width</label>
                    <input type="text" id="mShoulder" class="checkout-input" value="${measurements.shoulder}" placeholder="14.5 inches" />
                  </div>
                  <div class="checkout-field-group">
                    <label class="checkout-field-label">Sleeve Length</label>
                    <input type="text" id="mSleeveLength" class="checkout-input" value="${measurements.sleeveLength}" placeholder="21.5 inches" />
                  </div>
                  <div class="checkout-field-group">
                    <label class="checkout-field-label">Trouser / Shalwar Length</label>
                    <input type="text" id="mTrouserLength" class="checkout-input" value="${measurements.trouserLength}" placeholder="38 inches" />
                  </div>
                  <div class="checkout-field-group">
                    <label class="checkout-field-label">Pant Opening / Daaman</label>
                    <input type="text" id="mPantOpening" class="checkout-input" value="${measurements.pantOpening}" placeholder="7.5 inches" />
                  </div>
                </div>

                <div style="margin-top: 1.75rem; display: flex; gap: 1rem; align-items: center;">
                  <button type="submit" class="btn-primary" style="padding: 0.95rem 2rem;">
                    Save Atelier Measurement Profile
                  </button>
                  <span id="measurementSaveNotice" style="font-size: 0.76rem; color: var(--state-success); display: none;">
                    ✓ Measurements preserved for future bespoke orders.
                  </span>
                </div>
              </form>
            </div>

            <!-- Measurement Diagram & Guide -->
            <aside class="measurement-guide-aside">
              <h4 class="guide-title">Atelier Measurement Standards</h4>
              <p class="guide-lead">All Inzaish Collection garments follow verified Pakistani luxury tailoring standards.</p>

              <div class="guide-rule-item">
                <strong>Shirt Length:</strong> Measured from the highest shoulder point straight down over the apex to the desired hem.
              </div>
              <div class="guide-rule-item">
                <strong>Chest:</strong> Measured around the fullest part of the bust, keeping the measuring tape comfortably parallel to the ground.
              </div>
              <div class="guide-rule-item">
                <strong>Waist:</strong> Measured around the natural waistline, where the torso narrows.
              </div>
              <div class="guide-rule-item">
                <strong>Unstitched Fabrics:</strong> Pre-shrunk 3.25m Shirt, 2.5m Dupatta, and 2.5m Trousers provide generous allowance for all standard Pakistani sizes up to 2XL.
              </div>
            </aside>
          </div>
        </section>

        <!-- TAB 4: SAVED DELIVERY ADDRESS -->
        <section id="tabPanelAddress" class="account-panel ${activeTab === 'address' ? 'active' : ''}">
          <div class="address-layout-grid">
            <div class="address-form-card">
              <span class="tracker-eyebrow">Primary Consignment Address</span>
              <h3 class="tracker-title">Expedited Delivery Destination</h3>
              <p class="tracker-subtitle">
                Keep your Pakistani courier delivery details updated for one-click checkout and doorstep deliveries across 150+ cities.
              </p>

              <form id="accountAddressForm" class="address-form">
                <div class="checkout-input-grid-2">
                  <div class="checkout-field-group">
                    <label class="checkout-field-label">Client Full Name *</label>
                    <input type="text" id="addrName" class="checkout-input" value="${shippingProfile.fullName}" required />
                  </div>
                  <div class="checkout-field-group">
                    <label class="checkout-field-label">Phone (SMS &amp; WhatsApp Alerts) *</label>
                    <input type="tel" id="addrPhone" class="checkout-input" value="${shippingProfile.phone}" required />
                  </div>
                </div>

                <div class="checkout-field-group" style="margin-top: 1rem;">
                  <label class="checkout-field-label">Email Address</label>
                  <input type="email" id="addrEmail" class="checkout-input" value="${shippingProfile.email}" />
                </div>

                <div class="checkout-field-group" style="margin-top: 1rem;">
                  <label class="checkout-field-label">Street Address (House/Apartment #, Sector/Phase) *</label>
                  <input type="text" id="addrStreet" class="checkout-input" value="${shippingProfile.address}" required />
                </div>

                <div class="checkout-input-grid-2" style="margin-top: 1rem;">
                  <div class="checkout-field-group">
                    <label class="checkout-field-label">City *</label>
                    <select id="addrCity" class="checkout-select" required>
                      <option value="Lahore" ${shippingProfile.city === 'Lahore' ? 'selected' : ''}>Lahore (1-2 Days)</option>
                      <option value="Karachi" ${shippingProfile.city === 'Karachi' ? 'selected' : ''}>Karachi (2-3 Days)</option>
                      <option value="Islamabad" ${shippingProfile.city === 'Islamabad' ? 'selected' : ''}>Islamabad (2-3 Days)</option>
                      <option value="Rawalpindi" ${shippingProfile.city === 'Rawalpindi' ? 'selected' : ''}>Rawalpindi (2-3 Days)</option>
                      <option value="Faisalabad" ${shippingProfile.city === 'Faisalabad' ? 'selected' : ''}>Faisalabad (2-3 Days)</option>
                      <option value="Multan" ${shippingProfile.city === 'Multan' ? 'selected' : ''}>Multan (2-3 Days)</option>
                      <option value="Peshawar" ${shippingProfile.city === 'Peshawar' ? 'selected' : ''}>Peshawar (2-4 Days)</option>
                      <option value="Quetta" ${shippingProfile.city === 'Quetta' ? 'selected' : ''}>Quetta (3-4 Days)</option>
                      <option value="Sialkot" ${shippingProfile.city === 'Sialkot' ? 'selected' : ''}>Sialkot (2-3 Days)</option>
                      <option value="Gujranwala" ${shippingProfile.city === 'Gujranwala' ? 'selected' : ''}>Gujranwala (2-3 Days)</option>
                      <option value="Hyderabad" ${shippingProfile.city === 'Hyderabad' ? 'selected' : ''}>Hyderabad (2-3 Days)</option>
                      <option value="Other" ${shippingProfile.city === 'Other' ? 'selected' : ''}>Other Pakistani City</option>
                    </select>
                  </div>

                  <div class="checkout-field-group">
                    <label class="checkout-field-label">Nearest Landmark (Recommended)</label>
                    <input type="text" id="addrLandmark" class="checkout-input" value="${shippingProfile.landmark}" />
                  </div>
                </div>

                <div style="margin-top: 1.75rem; display: flex; gap: 1rem; align-items: center;">
                  <button type="submit" class="btn-primary" style="padding: 0.95rem 2rem;">
                    Update Delivery Destination
                  </button>
                  <span id="addressSaveNotice" style="font-size: 0.76rem; color: var(--state-success); display: none;">
                    ✓ Primary shipping address updated.
                  </span>
                </div>
              </form>
            </div>

            <!-- Saved Address Preview Card -->
            <aside class="saved-address-preview-card">
              <span class="preview-badge">Default Dispatch Address</span>
              <h4 class="preview-name">${shippingProfile.fullName}</h4>
              <p class="preview-line">${shippingProfile.address}</p>
              <p class="preview-line">${shippingProfile.city}, Pakistan</p>
              <p class="preview-line" style="color: var(--accent-brass); margin-top: 0.5rem;">Landmark: ${shippingProfile.landmark}</p>
              <p class="preview-line" style="margin-top: 0.5rem;">Phone: <strong>${shippingProfile.phone}</strong></p>
            </aside>
          </div>
        </section>
      </div>
    </div>
  `;

  // Attach interactive tab switching
  const tabBtns = containerElem.querySelectorAll('.account-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      containerElem.querySelectorAll('.account-panel').forEach(panel => {
        panel.classList.remove('active');
      });

      if (targetTab === 'orders') containerElem.querySelector('#tabPanelOrders')?.classList.add('active');
      if (targetTab === 'track') containerElem.querySelector('#tabPanelTrack')?.classList.add('active');
      if (targetTab === 'measurements') containerElem.querySelector('#tabPanelMeasurements')?.classList.add('active');
      if (targetTab === 'address') containerElem.querySelector('#tabPanelAddress')?.classList.add('active');

      onSelectTab(targetTab);
    });
  });

  // Track single order button handler
  containerElem.querySelectorAll('.track-single-order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const orderRef = btn.dataset.orderRef;
      const trackTabBtn = containerElem.querySelector('.account-tab-btn[data-tab="track"]');
      if (trackTabBtn) trackTabBtn.click();
      const input = containerElem.querySelector('#accountTrackInput');
      if (input) input.value = '#' + orderRef;
      const disp = containerElem.querySelector('#dispOrderId');
      if (disp) disp.textContent = '#' + orderRef;
    });
  });

  // Reorder consignment handler
  containerElem.querySelectorAll('.reorder-items-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.orderIdx, 10);
      const order = orders[idx];
      if (order && order.items) {
        onReorderItems(order.items);
      }
    });
  });

  // Track lookup form submission
  const trackForm = containerElem.querySelector('#accountTrackForm');
  if (trackForm) {
    trackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = containerElem.querySelector('#accountTrackInput')?.value.trim();
      const disp = containerElem.querySelector('#dispOrderId');
      if (disp) disp.textContent = query.startsWith('#') ? query : '#' + query;
      const resultBox = containerElem.querySelector('#accountTrackerResult');
      if (resultBox) {
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      onTrackOrder(query);
    });
  }

  // Save Measurements Profile
  const mForm = containerElem.querySelector('#accountMeasurementsForm');
  if (mForm) {
    mForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedM = {
        kurtaLength: containerElem.querySelector('#mKurtaLength')?.value.trim() || '39"',
        chest: containerElem.querySelector('#mChest')?.value.trim() || '38"',
        waist: containerElem.querySelector('#mWaist')?.value.trim() || '30"',
        hips: containerElem.querySelector('#mHips')?.value.trim() || '40"',
        shoulder: containerElem.querySelector('#mShoulder')?.value.trim() || '14.5"',
        sleeveLength: containerElem.querySelector('#mSleeveLength')?.value.trim() || '21.5"',
        trouserLength: containerElem.querySelector('#mTrouserLength')?.value.trim() || '38"',
        pantOpening: containerElem.querySelector('#mPantOpening')?.value.trim() || '7.5"'
      };
      try {
        localStorage.setItem('inzaish_measurements', JSON.stringify(updatedM));
      } catch (err) {}
      const notice = containerElem.querySelector('#measurementSaveNotice');
      if (notice) {
        notice.style.display = 'inline-block';
        setTimeout(() => { notice.style.display = 'none'; }, 3000);
      }
      onSaveMeasurements(updatedM);
    });
  }

  // Save Delivery Address Profile
  const aForm = containerElem.querySelector('#accountAddressForm');
  if (aForm) {
    aForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedS = {
        fullName: containerElem.querySelector('#addrName')?.value.trim() || '',
        phone: containerElem.querySelector('#addrPhone')?.value.trim() || '',
        email: containerElem.querySelector('#addrEmail')?.value.trim() || '',
        address: containerElem.querySelector('#addrStreet')?.value.trim() || '',
        city: containerElem.querySelector('#addrCity')?.value || 'Lahore',
        landmark: containerElem.querySelector('#addrLandmark')?.value.trim() || ''
      };
      try {
        localStorage.setItem('inzaish_shipping_profile', JSON.stringify(updatedS));
      } catch (err) {}
      const notice = containerElem.querySelector('#addressSaveNotice');
      if (notice) {
        notice.style.display = 'inline-block';
        setTimeout(() => { notice.style.display = 'none'; }, 3000);
      }
      onSaveAddress(updatedS);
    });
  }
}
