/**
 * INZAISH COLLECTION — Dedicated Curated Wishlist View
 * Luxury editorial presentation of saved archival pieces with one-click transfer to shopping bag.
 */

export function renderWishlistPage(containerElem, wishlistIds, allProducts, options = {}) {
  if (!containerElem) return;

  const {
    onMoveToCart = () => {},
    onRemoveFromWishlist = () => {},
    onMoveAllToCart = () => {},
    onProductClick = () => {}
  } = options;

  const savedProducts = allProducts.filter(p => wishlistIds.includes(p.id));
  const hasItems = savedProducts.length > 0;

  const cardsHTML = hasItems ? savedProducts.map(product => {
    return `
      <article class="product-card wishlist-product-card" data-product-id="${product.id}">
        <div class="product-media">
          <span class="product-tag">${product.tag}</span>
          <button class="wishlist-remove-btn" data-remove-id="${product.id}" aria-label="Remove ${product.title} from Wishlist">
            ✕
          </button>
          <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy" />
          <div class="quick-add-overlay">
            <button class="quick-view-btn" data-view-slug="${product.slug}">Inspect Silhouette</button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-collection">${product.collection} • ${product.pieceCount}</span>
          <h3 class="product-title" data-view-slug="${product.slug}" style="cursor: pointer;">${product.title}</h3>
          <p class="product-specs">${product.fabric}</p>
          <div class="product-footer">
            <span class="product-price">${product.priceFormatted}</span>
            <span class="product-stock">${product.stock > 0 ? 'Batch Available' : 'Sold Out'}</span>
          </div>
          <div class="wishlist-card-actions">
            <button class="btn-primary wishlist-move-btn" data-move-id="${product.id}">
              Move to Shopping Bag →
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('') : '';

  containerElem.innerHTML = `
    <div class="wishlist-page-wrapper">
      <!-- Breadcrumb Bar -->
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <a href="#/" class="breadcrumb-item">Home</a>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-item active">Curated Wishlist</span>
      </nav>

      <!-- Editorial Header Banner -->
      <header class="wishlist-header-banner">
        <div class="wishlist-header-meta">
          <span class="wishlist-eyebrow">
            <span class="dot"></span>
            Personal Archive &amp; Curation
          </span>
          <h1 class="wishlist-title">Your Saved Silhouettes</h1>
          <p class="wishlist-description">
            Private archive of selected weaves, unstitched yardages, and pret silhouettes reserved for future order placement.
          </p>
        </div>

        <div class="wishlist-header-actions">
          <div class="wishlist-count-badge">
            <span id="wishlistTotalCountText">${savedProducts.length} ${savedProducts.length === 1 ? 'Garment' : 'Garments'} Saved</span>
          </div>
          ${hasItems ? `
            <button class="btn-secondary wishlist-move-all-btn" id="moveAllWishlistBtn">
              Move All to Bag <span>→</span>
            </button>
          ` : ''}
        </div>
      </header>

      <!-- Wishlist Product Grid or Empty State -->
      ${hasItems ? `
        <div class="drops-grid wishlist-products-grid">
          ${cardsHTML}
        </div>
      ` : `
        <div class="wishlist-empty-container">
          <div class="wishlist-empty-icon">♡</div>
          <h2 class="wishlist-empty-title">Your Private Archive is Empty</h2>
          <p class="wishlist-empty-desc">
            You haven't added any pieces to your curated wishlist yet. Explore our latest seasonal releases, unstitched Chikankari edits, or bespoke men's kurtas to curate your wardrobe.
          </p>
          <div class="wishlist-empty-cta-group">
            <a href="#/women" class="btn-primary" style="width: auto; padding: 0.9rem 1.75rem;">
              Explore Women's Edits →
            </a>
            <a href="#/unstitched" class="btn-secondary" style="width: auto; padding: 0.9rem 1.75rem;">
              Discover Unstitched 3-Piece
            </a>
            <a href="#/men" class="btn-secondary" style="width: auto; padding: 0.9rem 1.75rem;">
              Men's Traditional Kurtas
            </a>
          </div>
        </div>
      `}

      <!-- Client Assistance Advisory Strip -->
      <section class="collection-advisory-strip" style="margin-top: 4rem;">
        <div class="advisory-card">
          <span class="advisory-icon">❖</span>
          <div>
            <h4 class="advisory-heading">Private Concierge Reservation</h4>
            <p class="advisory-body">Need an unstitched suit reserved or customized stitching arranged? Connect directly with our Lahore atelier stylists on WhatsApp.</p>
          </div>
          <a href="https://wa.me/923001234567" target="_blank" rel="noopener" class="advisory-link">WhatsApp Concierge <span>→</span></a>
        </div>

        <div class="advisory-card">
          <span class="advisory-icon">✦</span>
          <div>
            <h4 class="advisory-heading">Cash on Delivery Across Pakistan</h4>
            <p class="advisory-body">All saved items can be ordered with seamless COD payment at your doorstep across 150+ Pakistani cities.</p>
          </div>
          <a href="#/shipping-policy" class="advisory-link">Delivery Policies <span>→</span></a>
        </div>
      </section>
    </div>
  `;

  // Event handlers
  containerElem.querySelectorAll('.wishlist-move-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.moveId;
      onMoveToCart(id);
    });
  });

  containerElem.querySelectorAll('.wishlist-remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.removeId;
      onRemoveFromWishlist(id);
    });
  });

  containerElem.querySelectorAll('[data-view-slug]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      const slug = elem.dataset.viewSlug;
      onProductClick(slug);
    });
  });

  const moveAllBtn = containerElem.querySelector('#moveAllWishlistBtn');
  if (moveAllBtn) {
    moveAllBtn.addEventListener('click', () => {
      onMoveAllToCart(savedProducts);
    });
  }
}
