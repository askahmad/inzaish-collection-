/**
 * INZAISH COLLECTION — Dedicated Full-Page Product Detail View (PDP)
 * Luxury dual-column showcase with specifications, size selectors, fabric care, and paired curations.
 */

import { PRODUCTS } from '../products.js';

export function renderProductDetailPage(containerElem, product, options = {}) {
  if (!containerElem || !product) return;

  const {
    selectedSize = product.sizes && product.sizes[0] ? product.sizes[0].name : 'Standard',
    selectedQty = 1,
    isWishlisted = false,
    onAddToCart = () => {},
    onToggleWishlist = () => {},
    onSizeChange = () => {},
    onQtyChange = () => {},
    onOpenSizeGuide = () => {},
    onOpen3DLab = () => {}
  } = options;

  // Determine category breadcrumbs
  const categoryLabel = product.categoryName || 'Ready-to-Wear';
  const categoryRoute = product.category.includes('men') ? '#/men' :
                        product.category === 'women-unstitched' ? '#/unstitched' :
                        product.category === 'festive' ? '#/festive' : '#/pret';

  // Pairings / Related Products (up to 4 other garments)
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  // WhatsApp order URL with pre-filled message
  const waMsg = encodeURIComponent(
    `Hello Inzaish Collection, I would like to place an order for "${product.title}" (${product.priceFormatted}, Size: ${selectedSize}). Please assist me with delivery details.`
  );
  const waUrl = `https://wa.me/923001234567?text=${waMsg}`;

  containerElem.innerHTML = `
    <div class="pdp-page-wrapper">
      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <a href="#/" class="breadcrumb-item">Home</a>
        <span class="breadcrumb-sep">/</span>
        <a href="${categoryRoute}" class="breadcrumb-item">${categoryLabel}</a>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-item active">${product.title}</span>
      </nav>

      <!-- Main Dual Column Showcase -->
      <div class="pdp-showcase-grid">
        <!-- Left: Editorial Gallery -->
        <div class="pdp-gallery-column">
          <div class="pdp-main-media-frame">
            <span class="product-tag pdp-tag">${product.tag}</span>
            <button class="pdp-wishlist-toggle ${isWishlisted ? 'active' : ''}" id="pdpWishlistBtn" aria-label="Save to Wishlist">
              ${isWishlisted ? '♥ Saved to Wishlist' : '♡ Save to Wishlist'}
            </button>
            <img src="${product.image}" alt="${product.title}" class="pdp-primary-img" id="pdpActiveImage" />
          </div>

          <!-- Lookbook Multi-Angle Thumbnails -->
          <div class="pdp-thumbnails-strip">
            <button class="pdp-thumb-btn active" data-img="${product.image}" aria-label="Front Editorial View">
              <img src="${product.image}" alt="${product.title} Front Angle" />
              <span>Front Profile</span>
            </button>
            <button class="pdp-thumb-btn" data-img="${product.image}" aria-label="Drape Detail View">
              <img src="${product.image}" alt="${product.title} Silhouette" />
              <span>Drape Texture</span>
            </button>
            <button class="pdp-thumb-btn" data-img="${product.image}" aria-label="Needlework Close-Up">
              <img src="${product.image}" alt="${product.title} Craftsmanship" />
              <span>Needlework</span>
            </button>
          </div>

          <!-- 3D Swatch Callout inside Gallery -->
          <div class="pdp-3d-lab-trigger-card" id="pdp3DLabCard">
            <div class="lab-card-icon">🔬</div>
            <div>
              <span class="lab-card-eyebrow">Tactile Material Lab</span>
              <h5 class="lab-card-title">Test Optical Light &amp; Drape in 3D</h5>
              <p class="lab-card-desc">Inspect real-time PBR shaders for ${product.fabric} under calibrated studio lighting.</p>
            </div>
            <button class="action-btn lab-card-btn" id="pdpJump3DLabBtn">
              Launch 3D Swatch →
            </button>
          </div>
        </div>

        <!-- Right: Commerce & Specifications Column -->
        <div class="pdp-commerce-column">
          <div class="pdp-header-block">
            <span class="pdp-collection-tag">${product.collection} • ${product.pieceCount}</span>
            <h1 class="pdp-title">${product.title}</h1>
            <div class="pdp-price-row">
              <span class="pdp-price-amount">${product.priceFormatted}</span>
              <span class="pdp-cod-badge">❖ Cash on Delivery Available</span>
            </div>
            <p class="pdp-description-lead">${product.description}</p>
          </div>

          <!-- Imperial Yardage & Inclusions Technical Box -->
          <div class="pdp-technical-card">
            <div class="pdp-tech-header">
              <span class="pdp-tech-title">Garment Yardage &amp; Composition</span>
              <span class="pdp-tech-badge">Verified Purity</span>
            </div>
            <div class="pdp-tech-rows">
              <div class="pdp-tech-row">
                <span class="tech-label">Primary Substrate:</span>
                <span class="tech-val">${product.fabric}</span>
              </div>
              <div class="pdp-tech-row">
                <span class="tech-label">Shirt Specifications:</span>
                <span class="tech-val">${product.specs.shirt || 'Hand-Tailored'}</span>
              </div>
              ${product.specs.dupatta ? `
                <div class="pdp-tech-row">
                  <span class="tech-label">Dupatta Yardage:</span>
                  <span class="tech-val">${product.specs.dupatta}</span>
                </div>
              ` : ''}
              <div class="pdp-tech-row">
                <span class="tech-label">Trouser Yardage:</span>
                <span class="tech-val">${product.specs.trouser || 'Standard Included'}</span>
              </div>
              <div class="pdp-tech-row">
                <span class="tech-label">Atelier Inclusions:</span>
                <span class="tech-val">${product.specs.inclusions || 'Tone-on-tone finished'}</span>
              </div>
            </div>
          </div>

          <!-- Size Selector & Guide -->
          <div class="pdp-variants-section">
            <div class="pdp-size-header-row">
              <span class="pdp-size-title">Select Sizing (Imperial Inches):</span>
              <button class="pdp-size-guide-link" id="pdpOpenSizeGuideBtn">
                📏 Imperial Size Chart (Inches)
              </button>
            </div>

            <div class="pdp-size-pills-group" id="pdpSizeGroup">
              ${product.sizes.map(s => `
                <button class="pdp-size-pill ${selectedSize === s.name ? 'active' : ''}" data-size-name="${s.name}">
                  <span class="size-name">${s.name}</span>
                  ${s.chest ? `<span class="size-chest">Chest ${s.chest}</span>` : ''}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Quantity Stepper & Add to Bag -->
          <div class="pdp-purchase-actions">
            <div class="pdp-qty-stepper">
              <button class="pdp-qty-btn" id="pdpQtyMinus" aria-label="Decrease quantity">−</button>
              <span class="pdp-qty-display" id="pdpQtyDisplay">${selectedQty}</span>
              <button class="pdp-qty-btn" id="pdpQtyPlus" aria-label="Increase quantity">+</button>
            </div>

            <button class="pdp-add-to-bag-btn" id="pdpAddToBagBtn">
              <span>Add to Shopping Bag</span>
              <span>•</span>
              <span>${product.priceFormatted}</span>
            </button>
          </div>

          <!-- WhatsApp Instant Ordering -->
          <a href="${waUrl}" target="_blank" rel="noopener" class="pdp-whatsapp-btn" id="pdpWhatsAppBtn">
            <span>💬 Instant Ordering via WhatsApp Concierge</span>
            <small style="opacity: 0.8; font-size: 0.65rem;">+92 300 1234567 • Direct Stylist Assistance</small>
          </a>

          <!-- Pakistani Commerce Trust Guarantees -->
          <div class="pdp-guarantee-grid">
            <div class="pdp-guarantee-item">
              <span class="guarantee-icon">❖</span>
              <div>
                <strong>Nationwide Express Courier</strong>
                <p>Dispatched in 24h via Trax/TCS. Free shipping on orders over PKR 7,500.</p>
              </div>
            </div>
            <div class="pdp-guarantee-item">
              <span class="guarantee-icon">✦</span>
              <div>
                <strong>3-Day Doorstep Exchanges</strong>
                <p>Hassle-free size or fabric exchanges with reverse courier doorstep pickup.</p>
              </div>
            </div>
            <div class="pdp-guarantee-item">
              <span class="guarantee-icon">⚲</span>
              <div>
                <strong>Accurate Yardage &amp; Sizing</strong>
                <p>Pre-shrunk unstitched yardage and inch-perfect pret measurements guaranteed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expandable Detailed Specifications & Care Accordions -->
      <section class="pdp-accordions-section">
        <div class="pdp-accordion-item open">
          <button class="pdp-accordion-toggle" onclick="this.parentElement.classList.toggle('open')">
            <span>Heirloom Textile Care &amp; Preservation</span>
            <span class="arrow">▾</span>
          </button>
          <div class="pdp-accordion-content">
            <p>Natural luxury fibers require delicate handling to maintain their texture, hand-feel, and luster over generations:</p>
            <ul>
              <li><strong>Care Advice:</strong> ${product.specs.care || 'Dry clean recommended.'}</li>
              <li><strong>Storage:</strong> Always store pure raw silks and karandi in unbleached pure muslin cloth bags away from direct sunlight.</li>
              <li><strong>Ironing:</strong> Steam iron on the reverse side using silk or fine cotton temperature settings. Never iron directly over metallic tilla or zari embroidery.</li>
            </ul>
          </div>
        </div>

        <div class="pdp-accordion-item">
          <button class="pdp-accordion-toggle" onclick="this.parentElement.classList.toggle('open')">
            <span>Shipping, COD &amp; Doorstep Exchange Policies</span>
            <span class="arrow">▾</span>
          </button>
          <div class="pdp-accordion-content">
            <p>Inzaish Collection delivers to 150+ Pakistani metropolitan centers with full Cash on Delivery support:</p>
            <ul>
              <li><strong>Lahore, Karachi, Islamabad/Rawalpindi:</strong> 2 to 3 business days express delivery.</li>
              <li><strong>Regional Hubs:</strong> 3 to 5 business days via Trax Express and TCS.</li>
              <li><strong>Exchange Policy:</strong> Unworn garments with intact tags can be exchanged within 3 days. Connect with our concierge via WhatsApp to schedule a courier pickup.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Complete The Look / Related Garments -->
      <section class="section pdp-related-section">
        <div class="section-header">
          <div>
            <span class="section-eyebrow">Curated Complements</span>
            <h2 class="section-title">Complete The Silhouette</h2>
          </div>
          <a href="${categoryRoute}" class="section-link">Explore More in ${categoryLabel} <span>→</span></a>
        </div>

        <div class="drops-grid pdp-related-grid">
          ${relatedProducts.map(rel => `
            <article class="product-card" onclick="window.location.hash='#/product/${rel.slug}'" style="cursor: pointer;">
              <div class="product-media">
                <span class="product-tag">${rel.tag}</span>
                <img src="${rel.image}" alt="${rel.title}" class="product-img" loading="lazy" />
                <div class="quick-add-overlay">
                  <span class="quick-view-btn">Inspect Piece</span>
                </div>
              </div>
              <div class="product-info">
                <span class="product-collection">${rel.collection}</span>
                <h3 class="product-title">${rel.title}</h3>
                <p class="product-specs">${rel.fabric}</p>
                <div class="product-footer">
                  <span class="product-price">${rel.priceFormatted}</span>
                  <span class="product-stock">Available</span>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    </div>
  `;

  // Internal state tracking
  let currentSize = selectedSize;
  let currentQty = selectedQty;

  // Multi-angle thumbnail click switcher
  const activeImg = containerElem.querySelector('#pdpActiveImage');
  containerElem.querySelectorAll('.pdp-thumb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      containerElem.querySelectorAll('.pdp-thumb-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (activeImg && btn.dataset.img) {
        activeImg.src = btn.dataset.img;
      }
    });
  });

  // Size pill handlers
  containerElem.querySelectorAll('.pdp-size-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      containerElem.querySelectorAll('.pdp-size-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentSize = pill.dataset.sizeName;
      onSizeChange(currentSize);

      // Update WhatsApp URL with new size
      const newMsg = encodeURIComponent(
        `Hello Inzaish Collection, I would like to order "${product.title}" (${product.priceFormatted}, Size: ${currentSize}). Please assist me with delivery.`
      );
      const waBtn = containerElem.querySelector('#pdpWhatsAppBtn');
      if (waBtn) waBtn.href = `https://wa.me/923001234567?text=${newMsg}`;
    });
  });

  // Quantity stepper handlers
  const qtyDisplay = containerElem.querySelector('#pdpQtyDisplay');
  const minusBtn = containerElem.querySelector('#pdpQtyMinus');
  const plusBtn = containerElem.querySelector('#pdpQtyPlus');

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty -= 1;
        if (qtyDisplay) qtyDisplay.textContent = currentQty;
        onQtyChange(currentQty);
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      currentQty += 1;
      if (qtyDisplay) qtyDisplay.textContent = currentQty;
      onQtyChange(currentQty);
    });
  }

  // Add to Bag action
  const addBagBtn = containerElem.querySelector('#pdpAddToBagBtn');
  if (addBagBtn) {
    addBagBtn.addEventListener('click', () => {
      onAddToCart(product, currentSize, currentQty);
    });
  }

  // Wishlist toggle action
  const wishBtn = containerElem.querySelector('#pdpWishlistBtn');
  if (wishBtn) {
    wishBtn.addEventListener('click', () => {
      onToggleWishlist(product.id);
    });
  }

  // Size guide link action
  const sizeGuideLink = containerElem.querySelector('#pdpOpenSizeGuideBtn');
  if (sizeGuideLink) {
    sizeGuideLink.addEventListener('click', (e) => {
      e.preventDefault();
      onOpenSizeGuide(product);
    });
  }

  // Jump to 3D Swatch Lab
  const jumpLabBtn = containerElem.querySelector('#pdpJump3DLabBtn');
  if (jumpLabBtn) {
    jumpLabBtn.addEventListener('click', () => {
      const fabricKey = product.fabric.toLowerCase().includes('raw silk') ? 'raw-silk' :
                        product.fabric.toLowerCase().includes('organza') ? 'organza' :
                        product.fabric.toLowerCase().includes('lawn') ? 'fine-lawn' : 'karandi';
      onOpen3DLab(fabricKey);
    });
  }
}
