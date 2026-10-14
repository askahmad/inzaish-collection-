/**
 * INZAISH COLLECTION — Reusable Collection / Category Listing View
 * Multi-faceted filtering (subcategories, fabric types, price tiers) and sort controls.
 */

export function renderCollectionView(containerElem, config) {
  if (!containerElem) return;

  const {
    title = 'Collection Archive',
    eyebrow = 'Heirloom Craft & Modern Restraint',
    description = 'Curated Pakistani luxury garments woven on master looms with uncompromised textile integrity.',
    breadcrumbs = ['Home', 'Collections'],
    subcategories = [],
    activeSubcategory = 'all',
    activeFabric = 'all',
    activePriceTier = 'all',
    activeSort = 'featured',
    allCategoryProducts = [],
    products = [],
    wishlist = [],
    onSubcategoryChange = () => {},
    onFabricChange = () => {},
    onPriceTierChange = () => {},
    onSortChange = () => {},
    onClearFilters = () => {},
    onProductClick = () => {},
    onWishlistToggle = () => {}
  } = config;

  // Breadcrumbs generator
  const breadcrumbsHTML = breadcrumbs.map((crumb, idx) => {
    const isLast = idx === breadcrumbs.length - 1;
    if (isLast) {
      return `<span class="breadcrumb-item active">${crumb}</span>`;
    }
    const route = crumb.toLowerCase() === 'home' ? '#/' : `#/${crumb.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    return `<a href="${route}" class="breadcrumb-item">${crumb}</a><span class="breadcrumb-sep">/</span>`;
  }).join('');

  // Subcategory Pills
  const subcategoriesHTML = subcategories.length > 0 ? `
    <div class="collection-pills-bar">
      ${subcategories.map(sub => `
        <button class="filter-pill ${activeSubcategory === sub.id ? 'active' : ''}" data-subcategory="${sub.id}">
          ${sub.name} <span class="pill-badge">${sub.count !== undefined ? `(${sub.count})` : ''}</span>
        </button>
      `).join('')}
    </div>
  ` : '';

  // Faceted Filter Controls (Fabric Weaves & Price Tiers)
  const fabricOptions = [
    { id: 'all', label: 'All Weaves' },
    { id: 'raw-silk', label: 'Pure Raw Silk' },
    { id: 'lawn', label: 'Fine Lawn & Chikan' },
    { id: 'cotton', label: 'Egyptian Cotton' },
    { id: 'organza', label: 'Silk Organza' },
    { id: 'velvet', label: 'Velvet & Karandi' }
  ];

  const priceOptions = [
    { id: 'all', label: 'All Price Tiers' },
    { id: 'under-10k', label: 'Under PKR 10,000' },
    { id: '10k-18k', label: 'PKR 10,000 – PKR 18,000' },
    { id: 'above-18k', label: 'Above PKR 18,000' }
  ];

  // Active filters chips indicator
  const hasActiveFilters = activeFabric !== 'all' || activePriceTier !== 'all' || activeSubcategory !== 'all';
  let activeChipsHTML = '';
  if (hasActiveFilters) {
    activeChipsHTML = `
      <div class="active-filters-chips-bar">
        <span class="active-filter-label">Active Filters:</span>
        ${activeSubcategory !== 'all' ? `
          <button class="filter-chip" data-reset-subcat="true">
            Category: ${subcategories.find(s => s.id === activeSubcategory)?.name || activeSubcategory} ✕
          </button>
        ` : ''}
        ${activeFabric !== 'all' ? `
          <button class="filter-chip" data-reset-fabric="true">
            Fabric: ${fabricOptions.find(f => f.id === activeFabric)?.label || activeFabric} ✕
          </button>
        ` : ''}
        ${activePriceTier !== 'all' ? `
          <button class="filter-chip" data-reset-price="true">
            Price: ${priceOptions.find(p => p.id === activePriceTier)?.label || activePriceTier} ✕
          </button>
        ` : ''}
        <button class="filter-chip filter-clear-all-btn" id="collectionClearFiltersBtn">
          Clear All Filters ↺
        </button>
      </div>
    `;
  }

  // Main Product Grid Cards
  const productsHTML = products.length === 0 ? `
    <div class="collection-empty-box">
      <span class="empty-icon">❖</span>
      <h3 class="empty-title">No Garments Match Selected Filters</h3>
      <p class="empty-desc">Try resetting your fabric weave or price criteria to view all available archive pieces.</p>
      <button class="btn-primary" id="collectionEmptyResetBtn" style="margin-top: 1rem; width: auto; padding: 0.85rem 1.75rem;">
        Reset All Filters
      </button>
    </div>
  ` : products.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    return `
      <article class="product-card" data-product-id="${product.id}" onclick="window.openPDP('${product.id}')" style="cursor: pointer;">
        <div class="product-media">
          <span class="product-tag">${product.tag}</span>
          <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                  data-wishlist-id="${product.id}"
                  aria-label="Save ${product.title} to Wishlist">
            ${isWishlisted ? '♥' : '♡'}
          </button>
          <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy" />
          <div class="quick-add-overlay">
            <span class="quick-view-btn">Inspect Garment Details</span>
          </div>
        </div>
        <div class="product-info">
          <span class="product-collection">${product.collection} • ${product.pieceCount || 'Standard'}</span>
          <h3 class="product-title">${product.title}</h3>
          <p class="product-specs">${product.fabric}</p>
          <div class="product-footer">
            <span class="product-price">${product.priceFormatted}</span>
            <span class="product-stock">${product.stock > 0 ? 'Batch Available' : 'Sold Out'}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  containerElem.innerHTML = `
    <div class="collection-page-wrapper">
      <!-- Breadcrumb Bar -->
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        ${breadcrumbsHTML}
      </nav>

      <!-- Editorial Header Banner -->
      <header class="collection-header-banner">
        <div class="collection-header-meta">
          <span class="collection-eyebrow">
            <span class="dot"></span>
            ${eyebrow}
          </span>
          <h1 class="collection-title">${title}</h1>
          <p class="collection-description">${description}</p>
        </div>
        <div class="collection-count-badge">
          <span>${products.length} of ${allCategoryProducts.length || products.length} Works</span>
        </div>
      </header>

      <!-- Subcategory Tabs Bar -->
      ${subcategoriesHTML}

      <!-- Multi-Faceted Filter & Sort Toolbar -->
      <div class="collection-faceted-toolbar">
        <div class="faceted-filter-controls">
          <!-- Fabric Weave Selector -->
          <div class="facet-dropdown-item">
            <label for="collectionFabricSelect" class="facet-label">Fabric / Weave:</label>
            <select id="collectionFabricSelect" class="facet-select">
              ${fabricOptions.map(f => `
                <option value="${f.id}" ${activeFabric === f.id ? 'selected' : ''}>${f.label}</option>
              `).join('')}
            </select>
          </div>

          <!-- Price Range Selector -->
          <div class="facet-dropdown-item">
            <label for="collectionPriceSelect" class="facet-label">Price Range:</label>
            <select id="collectionPriceSelect" class="facet-select">
              ${priceOptions.map(p => `
                <option value="${p.id}" ${activePriceTier === p.id ? 'selected' : ''}>${p.label}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Sorting Selector -->
        <div class="catalog-sort">
          <label for="collectionSortSelect" class="facet-label">Sort By:</label>
          <select id="collectionSortSelect" class="facet-select">
            <option value="featured" ${activeSort === 'featured' ? 'selected' : ''}>Featured Curations</option>
            <option value="price-low" ${activeSort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
            <option value="price-high" ${activeSort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
            <option value="newest" ${activeSort === 'newest' ? 'selected' : ''}>Newest Releases</option>
          </select>
        </div>
      </div>

      <!-- Active Filter Chips -->
      ${activeChipsHTML}

      <!-- Main Product Grid -->
      <div class="drops-grid collection-products-grid">
        ${productsHTML}
      </div>

      <!-- Artisanal Tailoring & Fabric Advisory Banner -->
      <section class="collection-advisory-strip">
        <div class="advisory-card">
          <span class="advisory-icon">✂</span>
          <div>
            <h4 class="advisory-heading">Bespoke Stitching Concierge</h4>
            <p class="advisory-body">Ordering unstitched fabrics? Share your exact shoulder and chest measurements via WhatsApp for master tailoring.</p>
          </div>
          <a href="https://wa.me/923001234567" target="_blank" rel="noopener" class="advisory-link">Connect with Tailor <span>→</span></a>
        </div>

        <div class="advisory-card">
          <span class="advisory-icon">❖</span>
          <div>
            <h4 class="advisory-heading">Purity Guaranteed</h4>
            <p class="advisory-body">100% natural long-staple Egyptian cotton, hand-dyed 80g raw silk, and combed lawn woven in Lahore.</p>
          </div>
          <a href="#/shipping-policy" class="advisory-link">View Guarantees <span>→</span></a>
        </div>
      </section>
    </div>
  `;

  // Attach event handlers
  containerElem.querySelectorAll('.filter-pill[data-subcategory]').forEach(pill => {
    pill.addEventListener('click', () => {
      onSubcategoryChange(pill.dataset.subcategory);
    });
  });

  const fabricElem = containerElem.querySelector('#collectionFabricSelect');
  if (fabricElem) {
    fabricElem.addEventListener('change', (e) => {
      onFabricChange(e.target.value);
    });
  }

  const priceElem = containerElem.querySelector('#collectionPriceSelect');
  if (priceElem) {
    priceElem.addEventListener('change', (e) => {
      onPriceTierChange(e.target.value);
    });
  }

  const sortElem = containerElem.querySelector('#collectionSortSelect');
  if (sortElem) {
    sortElem.addEventListener('change', (e) => {
      onSortChange(e.target.value);
    });
  }

  const clearBtn = containerElem.querySelector('#collectionClearFiltersBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      onClearFilters();
    });
  }

  const emptyResetBtn = containerElem.querySelector('#collectionEmptyResetBtn');
  if (emptyResetBtn) {
    emptyResetBtn.addEventListener('click', () => {
      onClearFilters();
    });
  }

  const resetSubcatChip = containerElem.querySelector('[data-reset-subcat]');
  if (resetSubcatChip) {
    resetSubcatChip.addEventListener('click', () => {
      onSubcategoryChange('all');
    });
  }

  const resetFabricChip = containerElem.querySelector('[data-reset-fabric]');
  if (resetFabricChip) {
    resetFabricChip.addEventListener('click', () => {
      onFabricChange('all');
    });
  }

  const resetPriceChip = containerElem.querySelector('[data-reset-price]');
  if (resetPriceChip) {
    resetPriceChip.addEventListener('click', () => {
      onPriceTierChange('all');
    });
  }

  containerElem.querySelectorAll('.product-wishlist-btn[data-wishlist-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      onWishlistToggle(btn.dataset.wishlistId);
    });
  });
}
