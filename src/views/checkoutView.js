/**
 * INZAISH COLLECTION — Dedicated Multi-Step Express Checkout & Order Confirmation View
 * Tailored for Pakistani luxury fashion with Cash on Delivery (COD), Trax/TCS courier integration, and WhatsApp receipt confirmation.
 */

function formatPKR(num) {
  return 'PKR ' + Number(num).toLocaleString('en-PK');
}

export function renderCheckoutPage(containerElem, cart, options = {}) {
  if (!containerElem) return;

  const {
    appliedCoupon = null,
    formData = {},
    onApplyCoupon = () => {},
    onPlaceOrder = () => {},
    onNavigateHome = () => {}
  } = options;

  const valName = formData.name !== undefined ? formData.name : 'Ahmad Khan';
  const valPhone = formData.phone !== undefined ? formData.phone : '0300 1234567';
  const valEmail = formData.email !== undefined ? formData.email : 'ahmad@example.com';
  const valAddress = formData.address !== undefined ? formData.address : 'House 42, Street 8, Phase 5, DHA';
  const valCity = formData.city !== undefined ? formData.city : 'Lahore';
  const valLandmark = formData.landmark !== undefined ? formData.landmark : 'Near Jalal Sons';
  const valNotes = formData.notes !== undefined ? formData.notes : '';
  const valPayment = formData.paymentMethod || 'cod';

  if (!cart || cart.length === 0) {
    containerElem.innerHTML = `
      <div class="checkout-page-wrapper">
        <nav class="breadcrumb-container" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-item">Home</a>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-item active">Shopping Bag</span>
        </nav>

        <div class="checkout-empty-container">
          <span class="checkout-empty-icon">❖</span>
          <h1 class="checkout-empty-title">Your Shopping Bag is Empty</h1>
          <p class="checkout-empty-desc">
            You currently have no pieces in your consignment. Explore our latest seasonal releases, unstitched Chikankari edits, or bespoke men's kurtas to curate your wardrobe.
          </p>
          <div class="checkout-empty-actions">
            <a href="#/women" class="btn-primary" style="width: auto; padding: 0.9rem 1.75rem;">
              Explore Women's Edits →
            </a>
            <a href="#/unstitched" class="btn-secondary" style="width: auto; padding: 0.9rem 1.75rem;">
              Discover Unstitched Fabrics
            </a>
            <a href="#/men" class="btn-secondary" style="width: auto; padding: 0.9rem 1.75rem;">
              Discover Men's Eastern
            </a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Calculate pricing breakdown
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const freeShippingThreshold = 7500;
  const deliveryFee = subtotal >= freeShippingThreshold ? 0 : 150;
  
  let discount = 0;
  if (appliedCoupon === 'INZAISH10') {
    discount = Math.round(subtotal * 0.10);
  } else if (appliedCoupon === 'FREESHIP') {
    discount = deliveryFee;
  }
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  // WhatsApp instant concierge pre-filled message
  const itemsSummary = cart.map(i => `${i.qty}x ${i.title} (${i.size})`).join(', ');
  const waOrderText = encodeURIComponent(
    `Hello Inzaish Collection, I would like to place an Express Order for: ${itemsSummary}. Total: ${formatPKR(grandTotal)}. Please take my delivery details.`
  );
  const waCheckoutUrl = `https://wa.me/923001234567?text=${waOrderText}`;

  containerElem.innerHTML = `
    <div class="checkout-page-wrapper">
      <!-- Breadcrumb Bar -->
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <a href="#/" class="breadcrumb-item">Home</a>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-item active">Express Checkout</span>
      </nav>

      <!-- Main Dual-Column Checkout Grid -->
      <div class="checkout-grid-layout">
        <!-- Left: Multi-Step Delivery & Payment Form -->
        <div class="checkout-form-column">
          <header class="checkout-header-block">
            <span class="checkout-eyebrow">
              <span class="dot"></span>
              Secure Pakistani Luxury Checkout
            </span>
            <h1 class="checkout-main-title">Finalize Your Consignment</h1>
            <p class="checkout-lead">
              Nationwide express delivery to 150+ Pakistani cities with Cash on Delivery (COD) and 3-day doorstep exchanges.
            </p>
          </header>

          <form id="expressCheckoutForm" class="checkout-form-inner">
            <!-- STEP 1: CONTACT VERIFICATION -->
            <div class="checkout-section-box">
              <div class="checkout-section-header">
                <span class="section-step-num">01</span>
                <div>
                  <h3 class="checkout-section-title">Client Contact Details</h3>
                  <p class="checkout-section-subtitle">We will send automated SMS tracking and dispatch alerts.</p>
                </div>
              </div>

              <div class="checkout-input-grid-2">
                <div class="checkout-field-group">
                  <label for="checkoutName" class="checkout-field-label">Full Name *</label>
                  <input type="text" id="checkoutName" class="checkout-input" required placeholder="Ahmad Khan" value="${valName}" />
                </div>

                <div class="checkout-field-group">
                  <label for="checkoutPhone" class="checkout-field-label">Phone (SMS &amp; WhatsApp) *</label>
                  <input type="tel" id="checkoutPhone" class="checkout-input" required placeholder="0300 1234567" value="${valPhone}" />
                  <span class="field-help">Pakistani courier will call this number before arrival.</span>
                </div>
              </div>

              <div class="checkout-field-group" style="margin-top: 1rem;">
                <label for="checkoutEmail" class="checkout-field-label">Email Address (Optional)</label>
                <input type="email" id="checkoutEmail" class="checkout-input" placeholder="ahmad@example.com" value="${valEmail}" />
              </div>
            </div>

            <!-- STEP 2: SHIPPING DESTINATION -->
            <div class="checkout-section-box">
              <div class="checkout-section-header">
                <span class="section-step-num">02</span>
                <div>
                  <h3 class="checkout-section-title">Shipping &amp; Delivery Destination</h3>
                  <p class="checkout-section-subtitle">Direct courier delivery via Trax Logistics &amp; TCS Express.</p>
                </div>
              </div>

              <div class="checkout-field-group">
                <label for="checkoutAddress" class="checkout-field-label">Complete Street Address *</label>
                <input type="text" id="checkoutAddress" class="checkout-input" required placeholder="House / Apartment #, Street #, Sector / Phase / Block" value="${valAddress}" />
              </div>

              <div class="checkout-input-grid-2" style="margin-top: 1rem;">
                <div class="checkout-field-group">
                  <label for="checkoutCity" class="checkout-field-label">City *</label>
                  <select id="checkoutCity" class="checkout-select" required>
                    <option value="Lahore" ${valCity === 'Lahore' ? 'selected' : ''}>Lahore (1-2 Days)</option>
                    <option value="Karachi" ${valCity === 'Karachi' ? 'selected' : ''}>Karachi (2-3 Days)</option>
                    <option value="Islamabad" ${valCity === 'Islamabad' ? 'selected' : ''}>Islamabad (2-3 Days)</option>
                    <option value="Rawalpindi" ${valCity === 'Rawalpindi' ? 'selected' : ''}>Rawalpindi (2-3 Days)</option>
                    <option value="Faisalabad" ${valCity === 'Faisalabad' ? 'selected' : ''}>Faisalabad (2-3 Days)</option>
                    <option value="Multan" ${valCity === 'Multan' ? 'selected' : ''}>Multan (2-3 Days)</option>
                    <option value="Peshawar" ${valCity === 'Peshawar' ? 'selected' : ''}>Peshawar (2-4 Days)</option>
                    <option value="Quetta" ${valCity === 'Quetta' ? 'selected' : ''}>Quetta (3-4 Days)</option>
                    <option value="Sialkot" ${valCity === 'Sialkot' ? 'selected' : ''}>Sialkot (2-3 Days)</option>
                    <option value="Gujranwala" ${valCity === 'Gujranwala' ? 'selected' : ''}>Gujranwala (2-3 Days)</option>
                    <option value="Hyderabad" ${valCity === 'Hyderabad' ? 'selected' : ''}>Hyderabad (2-3 Days)</option>
                    <option value="Abbottabad" ${valCity === 'Abbottabad' ? 'selected' : ''}>Abbottabad (2-4 Days)</option>
                    <option value="Bahawalpur" ${valCity === 'Bahawalpur' ? 'selected' : ''}>Bahawalpur (2-4 Days)</option>
                    <option value="Sargodha" ${valCity === 'Sargodha' ? 'selected' : ''}>Sargodha (2-3 Days)</option>
                    <option value="Sukkur" ${valCity === 'Sukkur' ? 'selected' : ''}>Sukkur (3-4 Days)</option>
                    <option value="Other" ${valCity === 'Other' ? 'selected' : ''}>Other Pakistani City</option>
                  </select>
                </div>

                <div class="checkout-field-group">
                  <label for="checkoutLandmark" class="checkout-field-label">Nearest Landmark (Recommended)</label>
                  <input type="text" id="checkoutLandmark" class="checkout-input" placeholder="e.g. Near Packages Mall / Commercial Broadway" value="${valLandmark}" />
                </div>
              </div>

              <div class="checkout-field-group" style="margin-top: 1rem;">
                <label for="checkoutNotes" class="checkout-field-label">Atelier Tailoring / Delivery Notes</label>
                <textarea id="checkoutNotes" class="checkout-textarea" rows="2" placeholder="e.g. Custom length notes, unstitched fabric cutting instructions, or preferred delivery timing.">${valNotes}</textarea>
              </div>
            </div>

            <!-- STEP 3: PAYMENT METHOD -->
            <div class="checkout-section-box">
              <div class="checkout-section-header">
                <span class="section-step-num">03</span>
                <div>
                  <h3 class="checkout-section-title">Select Payment Mode</h3>
                  <p class="checkout-section-subtitle">Pay securely at your doorstep or via bank-grade digital gateways.</p>
                </div>
              </div>

              <div class="payment-methods-grid">
                <!-- COD Option -->
                <label class="payment-method-card ${valPayment === 'cod' ? 'active' : ''}" id="payCardCOD">
                  <input type="radio" name="paymentMethod" value="cod" ${valPayment === 'cod' ? 'checked' : ''} class="payment-radio" />
                  <div class="payment-card-body">
                    <div class="payment-card-top">
                      <span class="payment-icon">❖</span>
                      <strong class="payment-title">Cash on Delivery (COD)</strong>
                      <span class="payment-badge">Most Popular</span>
                    </div>
                    <p class="payment-desc">
                      Pay cash to Trax or TCS courier at your doorstep upon inspecting the parcel. Valid nationwide up to PKR 50,000.
                    </p>
                  </div>
                </label>

                <!-- PayFast Card Option -->
                <label class="payment-method-card ${valPayment === 'payfast' ? 'active' : ''}" id="payCardPayFast">
                  <input type="radio" name="paymentMethod" value="payfast" ${valPayment === 'payfast' ? 'checked' : ''} class="payment-radio" />
                  <div class="payment-card-body">
                    <div class="payment-card-top">
                      <span class="payment-icon">💳</span>
                      <strong class="payment-title">Debit / Credit Card (PayFast)</strong>
                    </div>
                    <p class="payment-desc">
                      Visa, Mastercard, PayPak. Secured by 256-bit SSL encryption certified by State Bank of Pakistan.
                    </p>
                  </div>
                </label>

                <!-- Direct Bank Transfer Option -->
                <label class="payment-method-card ${valPayment === 'bank' ? 'active' : ''}" id="payCardBank">
                  <input type="radio" name="paymentMethod" value="bank" ${valPayment === 'bank' ? 'checked' : ''} class="payment-radio" />
                  <div class="payment-card-body">
                    <div class="payment-card-top">
                      <span class="payment-icon">🏛</span>
                      <strong class="payment-title">Direct Bank Transfer (Raast / 1Link)</strong>
                    </div>
                    <p class="payment-desc">
                      Meezan Bank &amp; HBL. Transfer directly to our company account with instant Raast confirmation.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <!-- STEP 4: VOUCHER / COUPON -->
            <div class="checkout-section-box">
              <div class="checkout-voucher-row">
                <input type="text" id="checkoutCouponInput" class="checkout-input" placeholder="Atelier Code (Try 'INZAISH10')" value="${appliedCoupon || ''}" />
                <button type="button" class="btn-secondary" id="checkoutApplyCouponBtn" style="padding: 0.85rem 1.5rem; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;">
                  ${appliedCoupon ? 'Applied ✓' : 'Apply'}
                </button>
              </div>
              ${appliedCoupon ? `
                <div class="coupon-success-tag">
                  <span>✓ Voucher "${appliedCoupon}" applied successfully (${appliedCoupon === 'INZAISH10' ? '10% Atelier Discount' : 'Free Nationwide Delivery'})</span>
                </div>
              ` : ''}
            </div>

            <!-- SUBMIT & WHATSAPP ACTIONS -->
            <div class="checkout-submit-group">
              <button type="submit" class="btn-primary checkout-place-order-btn" id="placeOrderSubmitBtn">
                <span>Confirm &amp; Place Consignment</span>
                <span>•</span>
                <span>${formatPKR(grandTotal)}</span>
              </button>

              <a href="${waCheckoutUrl}" target="_blank" rel="noopener" class="checkout-whatsapp-btn" id="checkoutWhatsAppLink">
                <span>💬 Order Directly via WhatsApp Concierge</span>
                <small style="opacity: 0.8; font-size: 0.65rem;">+92 300 1234567 • Immediate Human Stylist Assistance</small>
              </a>
            </div>
          </form>
        </div>

        <!-- Right: Sticky Order Summary & Trust Strip -->
        <aside class="checkout-summary-column">
          <div class="checkout-summary-card">
            <h3 class="summary-card-title">Consignment Summary (${cart.reduce((s, i) => s + i.qty, 0)} Items)</h3>

            <!-- Free Shipping Progress Tracker -->
            <div class="checkout-shipping-progress-box">
              ${subtotal >= freeShippingThreshold ? `
                <div class="free-shipping-unlocked">
                  <span class="check-icon">✓</span>
                  <span>Qualified for Free Nationwide Delivery!</span>
                </div>
              ` : `
                <div class="free-shipping-pending">
                  Add <strong>${formatPKR(freeShippingThreshold - subtotal)}</strong> more for Free Delivery
                </div>
              `}
              <div class="shipping-bar-progress" style="margin-top: 0.5rem;">
                <div class="shipping-bar-fill" style="width: ${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%;"></div>
              </div>
            </div>

            <!-- Items List -->
            <div class="checkout-items-list">
              ${cart.map(item => `
                <div class="checkout-item-row">
                  <div class="checkout-item-media">
                    <img src="${item.image}" alt="${item.title}" class="checkout-item-img" />
                    <span class="checkout-item-qty">${item.qty}</span>
                  </div>
                  <div class="checkout-item-details">
                    <h4 class="checkout-item-title">${item.title}</h4>
                    <span class="checkout-item-meta">Size: ${item.size} • ${item.fabric}</span>
                    <span class="checkout-item-price">${formatPKR(item.price * item.qty)}</span>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Financial Totals -->
            <div class="checkout-totals-block">
              <div class="totals-row">
                <span class="totals-label">Garment Subtotal:</span>
                <span class="totals-val">${formatPKR(subtotal)}</span>
              </div>

              <div class="totals-row">
                <span class="totals-label">Nationwide Courier (Trax / TCS):</span>
                <span class="totals-val ${deliveryFee === 0 ? 'text-free' : ''}">
                  ${deliveryFee === 0 ? 'FREE' : formatPKR(deliveryFee)}
                </span>
              </div>

              ${discount > 0 ? `
                <div class="totals-row text-discount">
                  <span class="totals-label">Atelier Privilege Discount:</span>
                  <span class="totals-val">-${formatPKR(discount)}</span>
                </div>
              ` : ''}

              <div class="totals-row totals-grand">
                <span class="totals-label">Total Payable:</span>
                <span class="totals-val">${formatPKR(grandTotal)}</span>
              </div>
            </div>

            <!-- Pakistani Luxury Guarantees -->
            <div class="checkout-trust-guarantees">
              <div class="trust-mini-item">
                <span class="trust-mini-icon">❖</span>
                <div>
                  <strong>Trax / TCS Express Courier</strong>
                  <p>SMS &amp; WhatsApp consignment tracking sent upon dispatch from Lahore.</p>
                </div>
              </div>

              <div class="trust-mini-item">
                <span class="trust-mini-icon">✦</span>
                <div>
                  <strong>3-Day Doorstep Reverse Exchanges</strong>
                  <p>Hassle-free size or fabric exchanges with reverse courier doorstep pickup.</p>
                </div>
              </div>

              <div class="trust-mini-item">
                <span class="trust-mini-icon">⚲</span>
                <div>
                  <strong>100% Heirloom Textile Guarantee</strong>
                  <p>Pure unadulterated Egyptian cotton, combed lawn, and raw silks.</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;

  // Attach interactive handlers
  const form = containerElem.querySelector('#expressCheckoutForm');
  const paymentCards = containerElem.querySelectorAll('.payment-method-card');

  paymentCards.forEach(card => {
    card.addEventListener('click', () => {
      paymentCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  const couponBtn = containerElem.querySelector('#checkoutApplyCouponBtn');
  const couponInput = containerElem.querySelector('#checkoutCouponInput');
  if (couponBtn && couponInput) {
    couponBtn.addEventListener('click', () => {
      const val = couponInput.value.trim().toUpperCase();
      const currentValues = {
        name: containerElem.querySelector('#checkoutName')?.value || '',
        phone: containerElem.querySelector('#checkoutPhone')?.value || '',
        email: containerElem.querySelector('#checkoutEmail')?.value || '',
        address: containerElem.querySelector('#checkoutAddress')?.value || '',
        city: containerElem.querySelector('#checkoutCity')?.value || 'Lahore',
        landmark: containerElem.querySelector('#checkoutLandmark')?.value || '',
        notes: containerElem.querySelector('#checkoutNotes')?.value || '',
        paymentMethod: containerElem.querySelector('input[name="paymentMethod"]:checked')?.value || 'cod'
      };
      onApplyCoupon(val, currentValues);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = containerElem.querySelector('#checkoutName').value.trim();
      const phone = containerElem.querySelector('#checkoutPhone').value.trim();
      const email = containerElem.querySelector('#checkoutEmail').value.trim();
      const address = containerElem.querySelector('#checkoutAddress').value.trim();
      const city = containerElem.querySelector('#checkoutCity').value;
      const landmark = containerElem.querySelector('#checkoutLandmark').value.trim();
      const notes = containerElem.querySelector('#checkoutNotes').value.trim();
      const selectedPayment = containerElem.querySelector('input[name="paymentMethod"]:checked')?.value || 'cod';

      const orderData = {
        orderId: 'IC-2026-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }),
        customerName: name,
        phone: phone,
        email: email,
        address: address,
        city: city,
        landmark: landmark,
        notes: notes,
        paymentMethod: selectedPayment,
        paymentMethodTitle: selectedPayment === 'cod' ? 'Cash on Delivery (COD)' :
                            selectedPayment === 'payfast' ? 'Debit / Credit Card (PayFast)' : 'Direct Bank Transfer (Raast)',
        items: [...cart],
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        discount: discount,
        total: grandTotal
      };

      onPlaceOrder(orderData);
    });
  }
}

export function renderOrderSuccessPage(containerElem, orderData, options = {}) {
  if (!containerElem || !orderData) return;

  const { onContinueShopping = () => {}, onTrackOrder = () => {} } = options;

  const itemsListMsg = orderData.items.map(i => `${i.qty}x ${i.title} (${i.size})`).join(', ');
  const waReceiptText = encodeURIComponent(
    `Hello Inzaish Collection, I have confirmed order #${orderData.orderId} for PKR ${Number(orderData.total).toLocaleString('en-PK')} (${orderData.customerName}, ${orderData.city}). Please provide dispatch timeline.`
  );
  const waConfirmUrl = `https://wa.me/923001234567?text=${waReceiptText}`;

  containerElem.innerHTML = `
    <div class="order-success-page-wrapper">
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <a href="#/" class="breadcrumb-item">Home</a>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-item active">Order #${orderData.orderId}</span>
      </nav>

      <div class="order-success-card">
        <div class="success-icon-badge">✓</div>
        <span class="success-eyebrow">Consignment Confirmed • Atelier Dispatch Pending</span>
        <h1 class="success-title">Shukriya, ${orderData.customerName}</h1>
        <p class="success-subtitle">
          Your order has been registered in the Inzaish Collection atelier archive under reference 
          <strong class="highlight-order-id">#${orderData.orderId}</strong>.
        </p>

        <!-- Consignment Summary Details Box -->
        <div class="order-receipt-box">
          <div class="receipt-header-row">
            <div>
              <span class="receipt-label">Order Reference:</span>
              <strong class="receipt-val">#${orderData.orderId}</strong>
            </div>
            <div>
              <span class="receipt-label">Placed On:</span>
              <strong class="receipt-val">${orderData.date}</strong>
            </div>
            <div>
              <span class="receipt-label">Payment Mode:</span>
              <strong class="receipt-val">${orderData.paymentMethodTitle}</strong>
            </div>
            <div>
              <span class="receipt-label">Fulfillment Status:</span>
              <strong class="receipt-val" style="color: var(--state-success);">● Processing in Lahore</strong>
            </div>
          </div>

          <div class="receipt-destination-row">
            <div>
              <span class="receipt-label">Delivery Consignment Address:</span>
              <p class="receipt-address-text">
                ${orderData.address}, ${orderData.city} ${orderData.landmark ? `(Landmark: ${orderData.landmark})` : ''}
              </p>
            </div>
            <div>
              <span class="receipt-label">Client Phone (SMS Tracking):</span>
              <strong class="receipt-val">${orderData.phone}</strong>
            </div>
          </div>

          <!-- Items Ordered Mini Grid -->
          <div class="receipt-items-strip">
            ${orderData.items.map(item => `
              <div class="receipt-item-pill">
                <img src="${item.image}" alt="${item.title}" class="receipt-item-thumb" />
                <div class="receipt-item-info">
                  <strong>${item.title}</strong>
                  <span>Size: ${item.size} • Qty: ${item.qty} • ${formatPKR(item.price * item.qty)}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="receipt-total-footer">
            <span>Total Payable Amount (Nationwide Delivery Included):</span>
            <strong class="receipt-grand-total">${formatPKR(orderData.total)}</strong>
          </div>
        </div>

        <!-- WhatsApp Confirmation & Tracking Actions -->
        <div class="order-success-actions">
          <a href="${waConfirmUrl}" target="_blank" rel="noopener" class="btn-primary success-wa-btn">
            <span>💬 Confirm Order with WhatsApp Concierge</span>
            <small style="display: block; font-size: 0.68rem; opacity: 0.85;">Receive Instant Real-Time Tracking Link</small>
          </a>

          <button class="btn-secondary" id="successTrackConsignmentBtn" style="padding: 1rem 1.75rem;">
            Track Consignment Status →
          </button>

          <button class="action-btn" id="successContinueShoppingBtn" style="padding: 1rem 1.75rem; border: 1px solid var(--border-subtle);">
            Continue Browsing Collections
          </button>
        </div>

        <!-- Client Advisory Notice -->
        <div class="success-client-advisory">
          <p>
            An automated SMS containing your Trax/TCS tracking number will be dispatched once our master tailors package your garments in unbleached archival boxes. For immediate inquiries, connect with our concierge team at <strong>+92 300 1234567</strong>.
          </p>
        </div>
      </div>
    </div>
  `;

  const trackBtn = containerElem.querySelector('#successTrackConsignmentBtn');
  if (trackBtn) {
    trackBtn.addEventListener('click', () => {
      onTrackOrder(orderData.orderId);
    });
  }

  const continueBtn = containerElem.querySelector('#successContinueShoppingBtn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      onNavigateHome();
    });
  }
}
