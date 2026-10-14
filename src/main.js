import './style.css';
import './enhancements.css';
import { PRODUCTS } from './products.js';
import { initTextileCanvas } from './textileCanvas.js';
import { initMaterialViewer } from './materialViewer.js';
import { Router } from './router.js';
import { renderCollectionView } from './views/collectionView.js';
import { renderProductDetailPage } from './views/pdpView.js';
import { renderWishlistPage } from './views/wishlistView.js';
import { renderCheckoutPage, renderOrderSuccessPage } from './views/checkoutView.js';
import { renderAccountPage } from './views/accountView.js';
import { renderInfoPage } from './views/infoPagesView.js';

// ============================================================================
// COMMERCE STATE MANAGEMENT
// ============================================================================
const state = {
  cart: [],
  wishlist: [],
  orders: [],
  appliedCoupon: null,
  lastOrder: null,
  activeCategory: 'all',
  activeSort: 'featured',
  selectedProduct: null,
  selectedSize: null,
  freeShippingThreshold: 7500,
  mobileActiveGender: 'women'
};

// Persistence from LocalStorage with Inzaish Collection keys
try {
  const savedCart = localStorage.getItem('inzaish_cart') || localStorage.getItem('aurel_cart');
  if (savedCart) state.cart = JSON.parse(savedCart);
  const savedWishlist = localStorage.getItem('inzaish_wishlist') || localStorage.getItem('aurel_wishlist');
  if (savedWishlist) state.wishlist = JSON.parse(savedWishlist);
  const savedOrders = localStorage.getItem('inzaish_orders');
  if (savedOrders) state.orders = JSON.parse(savedOrders);
} catch (e) {
  state.cart = [];
  state.wishlist = [];
  state.orders = [];
}

function saveCart() {
  try { localStorage.setItem('inzaish_cart', JSON.stringify(state.cart)); } catch (e) {}
}

function saveWishlist() {
  try { localStorage.setItem('inzaish_wishlist', JSON.stringify(state.wishlist)); } catch (e) {}
}

function saveOrders() {
  try { localStorage.setItem('inzaish_orders', JSON.stringify(state.orders)); } catch (e) {}
}

// ============================================================================
// DOM RENDERING ENGINE
// ============================================================================
const app = document.getElementById('app');

app.innerHTML = `
  <!-- HAUTE COUTURE EDITORIAL ANNOUNCEMENT TICKER -->
  <aside class="top-bar-couture" id="announcementBar">
    <div class="top-bar-couture-content">
      <span class="couture-tag">ATELIER NOTICE</span>
      <span class="couture-ticker-text">Complimentary Nationwide Express Delivery Above PKR 7,500 &bull; Cash on Delivery Available Across 150+ Pakistani Cities</span>
      <a href="https://wa.me/923001234567" target="_blank" rel="noopener" class="couture-concierge-pill">
        <span>Concierge +92 300 1234567</span>
      </a>
    </div>
  </aside>

  <!-- LUXURY EDITORIAL HEADER (3-ZONE HAUTE COUTURE SYMMETRY) -->
  <header class="site-header-couture" id="siteHeader">
    <div class="header-couture-inner">
      <!-- Zone 1: Left Navigation & Drawer Trigger -->
      <div class="header-zone-left">
        <button class="menu-toggle-couture" id="mobileMenuToggle" aria-label="Open Navigation Menu" aria-expanded="false" aria-controls="mobileNavDrawer">
          <span class="toggle-bar"></span>
          <span class="toggle-bar"></span>
          <span class="toggle-label">MENU</span>
        </button>

        <nav class="desktop-nav-couture" id="mainNav" aria-label="Main Navigation">
          <!-- WOMEN WITH MEGA-MENU -->
          <div class="nav-item-has-mega">
            <a href="#/women" class="couture-nav-link" id="womenNavTrigger" aria-expanded="false" aria-controls="womenMegaMenu">
              Women ▾
            </a>
            <div class="mega-menu-wrapper" id="womenMegaMenu" role="region" aria-label="Women's Collection Menu">
              <div class="mega-menu-inner">
                <div>
                  <h4 class="mega-col-heading">Unstitched Fabrics <span>Heirloom</span></h4>
                  <ul class="mega-links-list">
                    <li><a href="#/unstitched" class="mega-link">1-Piece Shirt Lengths <span class="count">24</span></a></li>
                    <li><a href="#/unstitched" class="mega-link">2-Piece Shirt &amp; Dupatta <span class="count">38</span></a></li>
                    <li><a href="#/unstitched" class="mega-link">3-Piece Luxury Lawn <span class="count">42</span></a></li>
                    <li><a href="#/unstitched" class="mega-link">Chikankari &amp; Schifli Editions <span class="count">18</span></a></li>
                    <li><a href="#/unstitched" class="mega-link">Pure Handwoven Organza Dupattas <span class="count">14</span></a></li>
                  </ul>
                </div>

                <div>
                  <h4 class="mega-col-heading">Ready-to-Wear (Pret) <span>Contemporary</span></h4>
                  <ul class="mega-links-list">
                    <li><a href="#/pret" class="mega-link">Everyday Minimalist Kurtas <span class="count">32</span></a></li>
                    <li><a href="#/pret" class="mega-link">Architectural Silk Co-Ords <span class="count">16</span></a></li>
                    <li><a href="#/pret" class="mega-link">Tailored Raw Silk Tunics <span class="count">21</span></a></li>
                    <li><a href="#/pret" class="mega-link">Pleated Palazzo Pants &amp; Trousers <span class="count">19</span></a></li>
                    <li><a href="#/festive" class="mega-link">Luxury Pret &amp; Evening Wear <span class="count">15</span></a></li>
                  </ul>
                </div>

                <div>
                  <h4 class="mega-col-heading">Festive &amp; Formal <span>Artisanal</span></h4>
                  <ul class="mega-links-list">
                    <li><a href="#/festive" class="mega-link">Bridal &amp; Formal Peshwas <span class="count">08</span></a></li>
                    <li><a href="#/festive" class="mega-link">Marori &amp; Zardozi Threadwork <span class="count">12</span></a></li>
                    <li><a href="#/pret" class="mega-link">Tailored Architectural Abayas <span class="count">10</span></a></li>
                    <li><a href="#/unstitched" class="mega-link">Pure Velvet &amp; Silk Shawls <span class="count">06</span></a></li>
                    <li><a href="#textureLab" class="mega-link">Fabric Swatch Analysis (3D) <span class="count">LAB</span></a></li>
                  </ul>
                </div>

                <div>
                  <a href="#/product/nur-chikankari-3pc-luxury" class="mega-campaign-card">
                    <img src="/assets/women_unstitched_luxe.jpg" alt="Nur Chikankari Collection" class="mega-campaign-img" />
                    <div class="mega-campaign-overlay"></div>
                    <div class="mega-campaign-content">
                      <span class="mega-campaign-tag">Campaign Spotlight</span>
                      <h5 class="mega-campaign-title">The "Nur" 3-Piece Chikankari Edit</h5>
                      <p style="font-size: 0.76rem; color: #CCC; margin-bottom: 0.25rem;">Pistachio lawn with handwoven organza.</p>
                      <span class="mega-campaign-cta">Explore Look <span>→</span></span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- MEN WITH MEGA-MENU -->
          <div class="nav-item-has-mega">
            <a href="#/men" class="couture-nav-link" id="menNavTrigger" aria-expanded="false" aria-controls="menMegaMenu">
              Men ▾
            </a>
            <div class="mega-menu-wrapper" id="menMegaMenu" role="region" aria-label="Men's Collection Menu">
              <div class="mega-menu-inner">
                <div>
                  <h4 class="mega-col-heading">Eastern Traditional <span>Bespoke</span></h4>
                  <ul class="mega-links-list">
                    <li><a href="#/men" class="mega-link">Complete Shalwar Kameez Sets <span class="count">28</span></a></li>
                    <li><a href="#/men" class="mega-link">Mandarin Bandhgala Kurtas <span class="count">34</span></a></li>
                    <li><a href="#/men" class="mega-link">Egyptian Giza Liquid Cotton <span class="count">16</span></a></li>
                    <li><a href="#/men" class="mega-link">Unstitched 4.5m Latha &amp; Karandi <span class="count">22</span></a></li>
                  </ul>
                </div>

                <div>
                  <h4 class="mega-col-heading">Formal Layering <span>Structure</span></h4>
                  <ul class="mega-links-list">
                    <li><a href="#/men" class="mega-link">Tailored Raw Silk Waistcoats <span class="count">18</span></a></li>
                    <li><a href="#/men" class="mega-link">Prince Coats &amp; Bandhgalas <span class="count">07</span></a></li>
                    <li><a href="#/men" class="mega-link">Textured Jamawar Linings <span class="count">09</span></a></li>
                    <li><a href="#/accessories" class="mega-link">Horn &amp; Antiqued Brass Buttons <span class="count">12</span></a></li>
                  </ul>
                </div>

                <div>
                  <h4 class="mega-col-heading">Contemporary &amp; Objects <span>Lifestyle</span></h4>
                  <ul class="mega-links-list">
                    <li><a href="#/men" class="mega-link">Pure Linen Relaxed Shirts <span class="count">14</span></a></li>
                    <li><a href="#/men" class="mega-link">Supima Cotton T-Shirts <span class="count">11</span></a></li>
                    <li><a href="#/accessories" class="mega-link">Extrait de Parfum (Oud &amp; Amber) <span class="count">04</span></a></li>
                    <li><a href="#/accessories" class="mega-link">Handmade Leather Peshawari Chappals <span class="count">08</span></a></li>
                  </ul>
                </div>

                <div>
                  <a href="#/product/onyx-bandhgala-kurta-set" class="mega-campaign-card">
                    <img src="/assets/men_eastern_onyx.jpg" alt="The Onyx Kurta Series" class="mega-campaign-img" />
                    <div class="mega-campaign-overlay"></div>
                    <div class="mega-campaign-content">
                      <span class="mega-campaign-tag">Bespoke Feature</span>
                      <h5 class="mega-campaign-title">The Onyx Bandhgala Kurta</h5>
                      <p style="font-size: 0.76rem; color: #CCC; margin-bottom: 0.25rem;">Super-fine Giza Egyptian liquid cotton.</p>
                      <span class="mega-campaign-cta">View Silhouette <span>→</span></span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a href="#/unstitched" class="couture-nav-link" data-filter="women-unstitched">Unstitched</a>
          <a href="#/pret" class="couture-nav-link" data-filter="women-pret">Ready-to-Wear</a>
          <a href="#/festive" class="couture-nav-link" data-filter="festive">Festive / Formal</a>
        </nav>
      </div>

      <!-- Zone 2: Center Majestic Wordmark -->
      <div class="header-zone-center">
        <a href="#/" class="brand-wordmark" aria-label="Inzaish Collection Homepage">
          <span class="brand-name-serif">INZAISH</span>
          <span class="brand-sub-serif">COLLECTION &bull; LAHORE</span>
        </a>
      </div>

      <!-- Zone 3: Right Clean Minimalist Action Cluster -->
      <div class="header-zone-right">
        <button class="couture-icon-btn" id="searchTriggerBtn" aria-label="Open Instant Search" title="Search Collection (/)">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span class="icon-label-desktop">Search</span>
        </button>

        <a href="#/account" class="couture-icon-btn" id="accountNavBtn" aria-label="Client Atelier & Account" title="Client Atelier">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span class="icon-label-desktop">Atelier</span>
        </a>

        <button class="couture-icon-btn" id="wishlistTriggerBtn" aria-label="Open Curated Wishlist" title="Saved Silhouettes">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span class="couture-badge" id="wishlistBadge">0</span>
        </button>

        <button class="couture-bag-btn" id="cartToggleBtn" aria-label="Open Shopping Bag">
          <span class="bag-label">BAG</span>
          <span class="bag-count-pill" id="bagBadge">0</span>
        </button>
      </div>
    </div>
  </header>

  <main id="mainPageContent">
    <div id="homepageView">
      <!-- CINEMATIC HAUTE COUTURE HERO SECTION -->
      <section class="hero-couture" id="heroSection">
        <!-- Interactive 3D Textile Wave Canvas -->
        <div class="hero-couture-canvas" id="textileCanvas"></div>
        
        <!-- Atmospheric High-Fashion Background Visual -->
        <div class="hero-couture-backdrop">
          <img src="/assets/hero_editorial.jpg" alt="Inzaish Collection Campaign" class="hero-couture-bg-img" />
          <div class="hero-couture-scrim"></div>
        </div>

        <!-- Editorial Story & High-Fashion Content -->
        <div class="hero-couture-content">
          <div class="hero-couture-eyebrow">
            <span class="eyebrow-accent-line"></span>
            <span>AUTUMN / WINTER 25-26 &bull; THE ARCHIVE</span>
            <span class="eyebrow-accent-line"></span>
          </div>

          <h1 class="hero-couture-headline">
            The Sovereign <span class="headline-italic">Weave</span>
          </h1>

          <p class="hero-couture-manifesto">
            Unadulterated fiber purity, Old Lahore chikankari looms, and architectural drape. 
            Designed with quiet subcontinental restraint for the discerning connoisseur.
          </p>

          <div class="hero-couture-actions">
            <a href="#/women" class="btn-couture-primary">
              <span>EXPLORE WOMEN'S COLLECTION</span>
              <span class="btn-arrow">&rarr;</span>
            </a>
            <a href="#/men" class="btn-couture-secondary">
              <span>BESPOKE MEN'S ATELIER</span>
              <span class="btn-arrow">&rarr;</span>
            </a>
          </div>

          <!-- Quick Editorial Lookbook Bar -->
          <div class="hero-couture-footer-bar">
            <div class="couture-curation-strip">
              <a href="#/unstitched" class="curation-pill">
                <span class="pill-dot"></span>
                <span>Unstitched 3-Piece</span>
              </a>
              <a href="#/pret" class="curation-pill">
                <span class="pill-dot"></span>
                <span>Ready-to-Wear (Pret)</span>
              </a>
              <a href="#/festive" class="curation-pill">
                <span class="pill-dot"></span>
                <span>Formal &amp; Festive Peshwas</span>
              </a>
              <a href="#textureLab" class="curation-pill highlight">
                <span class="pill-dot"></span>
                <span>Interactive 3D Fabric Lab</span>
              </a>
            </div>

            <div class="hero-scroll-cue">
              <span>SCROLL TO EXPLORE</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
            </div>
          </div>
        </div>
      </section>

  <!-- MARQUEE STATEMENT STRIP -->
  <div class="statement-strip" aria-label="Brand Provenance Guarantees">
    <div class="statement-track">
      <span class="statement-item">100% Egyptian Giza Cotton</span>
      <span class="statement-item" style="color: var(--accent-brass); opacity: 0.6;">◆</span>
      <span class="statement-item">Pure Hand-Dyed 80g Raw Silk</span>
      <span class="statement-item" style="color: var(--accent-brass); opacity: 0.6;">◆</span>
      <span class="statement-item">Artisanal Lahore Embroidery Ateliers</span>
      <span class="statement-item" style="color: var(--accent-brass); opacity: 0.6;">◆</span>
      <span class="statement-item">Sheer Handwoven Organza Dupattas</span>
      <span class="statement-item" style="color: var(--accent-brass); opacity: 0.6;">◆</span>
      <span class="statement-item">Cash On Delivery Nationwide Across 150+ Cities</span>
      <span class="statement-item" style="color: var(--accent-brass); opacity: 0.6;">◆</span>
      <span class="statement-item">Accurate Imperial Sizing &amp; Yardage</span>
      <span class="statement-item" style="color: var(--accent-brass); opacity: 0.6;">◆</span>
      <span class="statement-item">100% Egyptian Giza Cotton</span>
      <span class="statement-item" style="color: var(--accent-brass); opacity: 0.6;">◆</span>
      <span class="statement-item">Pure Hand-Dyed 80g Raw Silk</span>
      <span class="statement-item" style="color: var(--accent-brass); opacity: 0.6;">◆</span>
      <span class="statement-item">Artisanal Lahore Embroidery Ateliers</span>
      <span class="statement-item" style="color: var(--accent-brass); opacity: 0.6;">◆</span>
      <span class="statement-item">Sheer Handwoven Organza Dupattas</span>
    </div>
  </div>

  <!-- CURATED DROPS / SEASONAL EDIT -->
  <section class="section" id="curatedDrops">
    <div class="section-header">
      <div>
        <span class="section-eyebrow">Limited Batch Creations • Lahore &amp; Sindh Looms</span>
        <h2 class="section-title">The Seasonal Edit</h2>
      </div>
      <a href="#/new-arrivals" class="section-link">View Full Archive <span>→</span></a>
    </div>

    <div class="drops-grid" id="curatedGrid">
      <!-- Injected by JS -->
    </div>
  </section>

  <!-- SPLIT CATEGORY PORTAL ("A Study in Contrast") -->
  <section class="split-portal">
    <div class="portal-card" onclick="window.location.hash='#/women'" style="cursor: pointer;" role="link" aria-label="Explore Women's Collections">
      <img src="/assets/women_pret_ivory.jpg" alt="Women's Inzaish Pret" class="portal-bg-img" />
      <div class="portal-overlay"></div>
      <div class="portal-content">
        <span class="portal-eyebrow">Contemporary Womenswear</span>
        <h3 class="portal-title">Women's Pret &amp; Unstitched</h3>
        <p class="portal-desc">Fluid organza dupattas, pure lawn threadwork, and minimalist silk co-ords engineered for modern ease.</p>
        <span class="portal-cta">Discover Women's Edit <span>→</span></span>
      </div>
    </div>

    <div class="portal-card" onclick="window.location.hash='#/men'" style="cursor: pointer;" role="link" aria-label="Explore Men's Collections">
      <img src="/assets/men_eastern_onyx.jpg" alt="Men's Bespoke Eastern" class="portal-bg-img" />
      <div class="portal-overlay"></div>
      <div class="portal-content">
        <span class="portal-eyebrow">Bespoke Tailoring</span>
        <h3 class="portal-title">Men's Eastern Suiting</h3>
        <p class="portal-desc">Band collar kurta sets, tailored textured waistcoats, and liquid-finished Egyptian cotton suiting.</p>
        <span class="portal-cta">Explore Menswear <span>→</span></span>
      </div>
    </div>
  </section>

  <!-- FULL CATALOGUE WITH FACETED FILTERS -->
  <section class="section" id="catalog">
    <div class="section-header">
      <div>
        <span class="section-eyebrow">Catalogue Archive</span>
        <h2 class="section-title">All Inzaish Garments</h2>
      </div>
    </div>

    <div class="catalog-nav">
      <div class="filter-pills" id="filterPills">
        <button class="filter-pill active" data-cat="all">All Works (10)</button>
        <button class="filter-pill" data-cat="women-pret">Women's Pret (2)</button>
        <button class="filter-pill" data-cat="women-unstitched">Unstitched 3-Pc (2)</button>
        <button class="filter-pill" data-cat="men-eastern">Men's Eastern (4)</button>
        <button class="filter-pill" data-cat="festive">Festive Formal (2)</button>
      </div>

      <div class="catalog-sort">
        <label for="sortSelect">Sort By:</label>
        <select id="sortSelect">
          <option value="featured">Featured Curations</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>

    <div class="drops-grid" id="mainCatalogueGrid">
      <!-- Injected by JS -->
    </div>
  </section>

  <!-- 3D MATERIAL / TEXTILE LAB -->
  <section class="section" id="textureLab">
    <div class="section-header">
      <div>
        <span class="section-eyebrow">Tactile Materiality</span>
        <h2 class="section-title">The Textile Laboratory (3D)</h2>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; align-items: center; background: var(--bg-surface); padding: 3rem; border: 1px solid var(--border-subtle); border-radius: 2px;">
      <div style="position: relative; height: 420px; display: flex; align-items: center; justify-content: center; background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 2px;" id="materialCanvasContainer">
        <!-- 3D Material Canvas Injected Here -->
        <span style="position: absolute; bottom: 1rem; left: 1rem; font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted);">
          Drag to Rotate Swatch • Real-Time Specular Lighting
        </span>
      </div>

      <div>
        <span style="font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent-brass); font-weight: 600; display: block; margin-bottom: 0.5rem;">Interactive Swatch Analysis</span>
        <h3 style="font-family: var(--font-serif); font-size: 2rem; font-weight: 400; margin-bottom: 1rem;">Experience the Drape Before Stitching</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.75rem;">
          Pakistani heirloom fashion is defined by the weight, sheen, and hand-feel of its weaves. Select a substrate to inspect its optical reflections under ambient studio lighting:
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.5rem;" id="fabricButtons">
          <button class="filter-pill active" data-fabric="raw-silk" style="text-align: left; padding: 0.85rem 1rem;">
            <strong>Pure Raw Silk</strong><br><small style="color: var(--text-muted);">80g Slub Weave</small>
          </button>
          <button class="filter-pill" data-fabric="organza" style="text-align: left; padding: 0.85rem 1rem;">
            <strong>Silk Organza</strong><br><small style="color: var(--text-muted);">Translucent Sheer</small>
          </button>
          <button class="filter-pill" data-fabric="fine-lawn" style="text-align: left; padding: 0.85rem 1rem;">
            <strong>Fine Combed Lawn</strong><br><small style="color: var(--text-muted);">Ultra-Lightweight</small>
          </button>
          <button class="filter-pill" data-fabric="karandi" style="text-align: left; padding: 0.85rem 1rem;">
            <strong>Woven Karandi</strong><br><small style="color: var(--text-muted);">Structured Texture</small>
          </button>
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted); border-left: 2px solid var(--accent-brass); padding-left: 1rem; margin-bottom: 1.5rem;">
          Guaranteed unadulterated natural fibers sourced from master looms across Sindh and Punjab.
        </div>

        <button class="btn-primary" id="exploreActiveFabricBtn" style="width: auto; padding: 0.85rem 1.6rem; font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase;">
          Explore Garments in This Fabric →
        </button>
      </div>
    </div>
  </section>

  <!-- PAKISTANI COMMERCE TRUST STRIP -->
  <section class="trust-strip">
    <div class="trust-container">
      <div class="trust-item">
        <span class="trust-icon">❖</span>
        <h4 class="trust-title">Cash on Delivery (COD)</h4>
        <p class="trust-desc">Pay seamlessly at your doorstep across 150+ Pakistani cities with instant SMS tracking.</p>
      </div>

      <div class="trust-item">
        <span class="trust-icon">✦</span>
        <h4 class="trust-title">3-Day Express Exchanges</h4>
        <p class="trust-desc">Hassle-free size and fabric exchanges with doorstep reverse courier pickups.</p>
      </div>

      <div class="trust-item">
        <span class="trust-icon">⚲</span>
        <h4 class="trust-title">Accurate Yardage &amp; Sizing</h4>
        <p class="trust-desc">Pre-shrunk unstitched yardage and inch-perfect pret measurements verified before dispatch.</p>
      </div>

      <div class="trust-item">
        <span class="trust-icon">💬</span>
        <h4 class="trust-title">WhatsApp Concierge</h4>
        <p class="trust-desc">Direct styling assistance, custom stitching advice, and real-time order support.</p>
      </div>
    </div>
  </section>
    </div>

    <!-- REUSABLE COLLECTION / CATEGORY VIEW CONTAINER -->
    <div id="collectionPageView" style="display: none;"></div>

    <!-- PRODUCT DETAIL PAGE VIEW CONTAINER -->
    <div id="pdpPageView" style="display: none;"></div>

    <!-- CURATED WISHLIST VIEW CONTAINER -->
    <div id="wishlistPageView" style="display: none;"></div>

    <!-- DEDICATED CHECKOUT / CART VIEW CONTAINER -->
    <div id="checkoutPageView" style="display: none;"></div>

    <!-- ORDER SUCCESS CONFIRMATION CONTAINER -->
    <div id="orderSuccessPageView" style="display: none;"></div>

    <!-- CLIENT ATELIER / ACCOUNT & ORDER HISTORY CONTAINER -->
    <div id="accountPageView" style="display: none;"></div>

    <!-- EDITORIAL INFORMATION & ATELIER POLICIES CONTAINER -->
    <div id="infoPageView" style="display: none;"></div>
  </main>

  <!-- HAUTE COUTURE ATELIER FOOTER -->
  <footer class="site-footer-couture">
    <!-- Top Monogram & Flagship Header -->
    <div class="footer-couture-heraldry">
      <div class="footer-heraldry-brand">INZAISH COLLECTION</div>
      <div class="footer-heraldry-cities">
        <span>LAHORE &bull; GULBERG II</span>
        <span class="city-dot">&bull;</span>
        <span>KARACHI &bull; CLIFTON</span>
        <span class="city-dot">&bull;</span>
        <span>ISLAMABAD &bull; BEVERLY CENTRE</span>
      </div>
    </div>

    <!-- 4 Curated Editorial Columns -->
    <div class="footer-couture-grid">
      <!-- Col 1 -->
      <div class="footer-couture-col">
        <h5 class="footer-couture-heading">The Collections</h5>
        <ul class="footer-couture-links">
          <li><a href="#/unstitched">Unstitched 3-Piece Silk &amp; Lawn</a></li>
          <li><a href="#/pret">Architectural Ready-to-Wear (Pret)</a></li>
          <li><a href="#/men">Men's Mandarin Bandhgala Sets</a></li>
          <li><a href="#/men">Hand-Spun Raw Silk Waistcoats</a></li>
          <li><a href="#/festive">Couture Bridal &amp; Formal Peshwas</a></li>
        </ul>
      </div>

      <!-- Col 2 -->
      <div class="footer-couture-col">
        <h5 class="footer-couture-heading">Client Concierge</h5>
        <ul class="footer-couture-links">
          <li><a href="#/track-order" id="footerTrackLink">Live Trax / TCS Consignment Telemetry</a></li>
          <li><a href="#/size-guide" id="footerSizeLink">Imperial Tailoring Specifications</a></li>
          <li><a href="#/shipping-policy">Nationwide Shipping &amp; COD Policies</a></li>
          <li><a href="#/returns-policy">3-Day Doorstep Reverse Exchanges</a></li>
          <li><a href="#/contact">Book a Flagship Boutique Appointment</a></li>
          <li><a href="https://wa.me/923001234567" target="_blank" rel="noopener" class="footer-wa-highlight">WhatsApp Concierge (+92 300 1234567)</a></li>
        </ul>
      </div>

      <!-- Col 3 -->
      <div class="footer-couture-col">
        <h5 class="footer-couture-heading">House &amp; Provenance</h5>
        <ul class="footer-couture-links">
          <li><a href="#/about">The Sovereign Weave Heritage</a></li>
          <li><a href="#/about">Artisan Guilds of Old Lahore</a></li>
          <li><a href="#/about">Natural Fiber Purity Ethos</a></li>
          <li><a href="#/about">Zero-Deadstock &amp; Limited Yardage</a></li>
          <li><a href="#textureLab">Atelier 3D Material Science Lab</a></li>
        </ul>
      </div>

      <!-- Col 4 -->
      <div class="footer-couture-col">
        <h5 class="footer-couture-heading">The Inzaish Gazette</h5>
        <p class="footer-gazette-desc">
          Subscribe to receive private invitations to limited seasonal drops, unstitched previews, and private styling sessions.
        </p>
        <form class="footer-gazette-form" onsubmit="event.preventDefault(); window.showToast('Privilege registered. Welcome to the Inzaish Gazette.'); this.reset();">
          <input type="email" class="footer-gazette-input" placeholder="Your email address" required aria-label="Email address" />
          <button type="submit" class="footer-gazette-btn">JOIN</button>
        </form>
        <div class="footer-gazette-assurance">
          <span>&bull; Handcrafted in Pakistan</span>
          <span>&bull; No spam. Only private releases.</span>
        </div>
      </div>
    </div>

    <!-- Bottom Trust & Symmetrical Bar -->
    <div class="footer-couture-bottom">
      <div class="bottom-trust-strip">
        <span>Payments: Cash on Delivery (COD) Nationwide &bull; PayFast &bull; Safepay &bull; Visa / Mastercard</span>
      </div>
      <div class="bottom-rights-strip">
        <span>&copy; 2026 INZAISH COLLECTION. ALL RIGHTS RESERVED. ARCHITECTURAL LUXURY FOR THE PAKISTANI CONNOISSEUR.</span>
      </div>
    </div>
  </footer>

  <!-- FLOATING ATELIER SCROLL TO TOP -->
  <button class="atelier-scroll-top-btn" id="atelierScrollTopBtn" aria-label="Scroll back to top">
    <svg viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"></path></svg>
  </button>

  <!-- ========================================================================
       MODALS, DRAWERS & OVERLAYS
       ======================================================================== -->

  <!-- PREDICTIVE SEARCH OVERLAY -->
  <div class="search-overlay-backdrop" id="searchOverlayBackdrop">
    <div class="search-container">
      <div class="search-header-row" style="position: relative;">
        <input type="text" class="search-input-box" id="searchInput" placeholder="Search unstitched, pret, silk, waistcoats..." autofocus />
        <button class="search-clear-query-btn" id="searchClearBtn" aria-label="Clear search input" style="display: none;">✕</button>
        <button class="search-close-btn" id="searchCloseBtn" aria-label="Close search">✕</button>
      </div>

      <div class="search-quick-tags">
        <span class="search-tag-label">Popular Curations:</span>
        <button class="search-tag-pill" onclick="window.setSearchQuery('Chikankari')">Chikankari</button>
        <button class="search-tag-pill" onclick="window.setSearchQuery('Raw Silk')">Raw Silk Co-Ord</button>
        <button class="search-tag-pill" onclick="window.setSearchQuery('Bandhgala')">Bandhgala Kurta</button>
        <button class="search-tag-pill" onclick="window.setSearchQuery('Waistcoat')">Tailored Waistcoat</button>
        <button class="search-tag-pill" onclick="window.setSearchQuery('Emerald')">Emerald Peshwas</button>
      </div>

      <div class="search-live-results" id="searchResultsGrid">
        <!-- Live search matches injected here -->
      </div>
    </div>
  </div>

  <!-- WISHLIST DRAWER -->
  <div class="cart-drawer-backdrop" id="wishlistBackdrop"></div>
  <div class="wishlist-drawer" id="wishlistDrawer">
    <div class="cart-header">
      <span class="cart-title">Your Curated Wishlist (<span id="wishlistCountHeader">0</span>)</span>
      <button class="cart-close-btn" id="wishlistCloseBtn" aria-label="Close Wishlist">✕</button>
    </div>
    <div class="cart-items" id="wishlistItemsList">
      <!-- Items dynamically populated -->
    </div>
    <div style="padding: 1.25rem; border-top: 1px solid var(--border-subtle); background: var(--bg-surface);">
      <a href="#/wishlist" id="viewFullWishlistBtn" class="btn-secondary" style="display: block; text-align: center; padding: 0.75rem; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;">
        View Full Curated Archive Page →
      </a>
    </div>
  </div>

  <!-- REFINED RESPONSIVE MOBILE NAVIGATION DRAWER -->
  <div class="mobile-nav-backdrop" id="mobileNavBackdrop"></div>
  <div class="mobile-nav-drawer" id="mobileNavDrawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
    <div class="mobile-nav-header">
      <span class="brand-logo-text" style="font-size: 1.25rem;">INZAISH COLLECTION</span>
      <button class="cart-close-btn" id="mobileNavCloseBtn" aria-label="Close Menu">✕</button>
    </div>

    <!-- Mobile Gender Switcher Tabs -->
    <div class="mobile-tab-bar">
      <button class="mobile-tab-btn active" id="mobTabWomen" onclick="window.switchMobileGender('women')">Women</button>
      <button class="mobile-tab-btn" id="mobTabMen" onclick="window.switchMobileGender('men')">Men</button>
    </div>

    <!-- Women's Accordion Panel -->
    <div id="mobPanelWomen" class="mobile-accordion-group">
      <div class="mobile-accordion-item open">
        <button class="mobile-accordion-toggle" onclick="window.toggleMobAccordion(this)">
          <span>Unstitched Fabrics</span>
          <span class="arrow">▾</span>
        </button>
        <div class="mobile-sub-links">
          <a href="#/unstitched" class="mobile-sub-link" onclick="window.closeMobileNav();">1-Piece Shirt Lengths <span class="count">24</span></a>
          <a href="#/unstitched" class="mobile-sub-link" onclick="window.closeMobileNav();">2-Piece Shirt &amp; Dupatta <span class="count">38</span></a>
          <a href="#/unstitched" class="mobile-sub-link" onclick="window.closeMobileNav();">3-Piece Luxury Lawn <span class="count">42</span></a>
          <a href="#/unstitched" class="mobile-sub-link" onclick="window.closeMobileNav();">Chikankari Editions <span class="count">18</span></a>
        </div>
      </div>

      <div class="mobile-accordion-item">
        <button class="mobile-accordion-toggle" onclick="window.toggleMobAccordion(this)">
          <span>Ready-to-Wear (Pret)</span>
          <span class="arrow">▾</span>
        </button>
        <div class="mobile-sub-links">
          <a href="#/pret" class="mobile-sub-link" onclick="window.closeMobileNav();">Everyday Minimalist Kurtas <span class="count">32</span></a>
          <a href="#/pret" class="mobile-sub-link" onclick="window.closeMobileNav();">Architectural Silk Co-Ords <span class="count">16</span></a>
          <a href="#/pret" class="mobile-sub-link" onclick="window.closeMobileNav();">Tailored Tunics &amp; Palazzos <span class="count">21</span></a>
        </div>
      </div>

      <div class="mobile-accordion-item">
        <button class="mobile-accordion-toggle" onclick="window.toggleMobAccordion(this)">
          <span>Festive &amp; Formal</span>
          <span class="arrow">▾</span>
        </button>
        <div class="mobile-sub-links">
          <a href="#/festive" class="mobile-sub-link" onclick="window.closeMobileNav();">Bridal &amp; Formal Peshwas <span class="count">08</span></a>
          <a href="#/festive" class="mobile-sub-link" onclick="window.closeMobileNav();">Pure Zardozi Net Dupattas <span class="count">12</span></a>
        </div>
      </div>
    </div>

    <!-- Men's Accordion Panel -->
    <div id="mobPanelMen" class="mobile-accordion-group" style="display: none;">
      <div class="mobile-accordion-item open">
        <button class="mobile-accordion-toggle" onclick="window.toggleMobAccordion(this)">
          <span>Eastern Traditional</span>
          <span class="arrow">▾</span>
        </button>
        <div class="mobile-sub-links">
          <a href="#/men" class="mobile-sub-link" onclick="window.closeMobileNav();">Complete Shalwar Kameez Sets <span class="count">28</span></a>
          <a href="#/men" class="mobile-sub-link" onclick="window.closeMobileNav();">Mandarin Bandhgala Kurtas <span class="count">34</span></a>
          <a href="#/men" class="mobile-sub-link" onclick="window.closeMobileNav();">Egyptian Giza Liquid Cotton <span class="count">16</span></a>
        </div>
      </div>

      <div class="mobile-accordion-item">
        <button class="mobile-accordion-toggle" onclick="window.toggleMobAccordion(this)">
          <span>Formal Layering</span>
          <span class="arrow">▾</span>
        </button>
        <div class="mobile-sub-links">
          <a href="#/men" class="mobile-sub-link" onclick="window.closeMobileNav();">Raw Silk Tailored Waistcoats <span class="count">18</span></a>
          <a href="#/men" class="mobile-sub-link" onclick="window.closeMobileNav();">Prince Coats &amp; Suiting <span class="count">07</span></a>
        </div>
      </div>
    </div>

    <div class="mobile-nav-footer">
      <button class="action-btn" onclick="window.openTrackModal(); window.closeMobileNav();" style="font-size: 0.85rem;">
        <span>Track Consignment</span>
      </button>
      <a class="modal-whatsapp-btn" href="https://wa.me/923001234567" target="_blank" rel="noopener">
        <span>💬 WhatsApp Concierge</span>
      </a>
    </div>
  </div>

  <!-- CLIENT CARE & POLICY MODAL -->
  <div class="modal-backdrop" id="policyBackdrop">
    <div class="policy-modal-card">
      <button class="modal-close-btn" id="policyCloseBtn" aria-label="Close policies">✕</button>
      <span style="font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent-brass); font-weight: 600; display: block; margin-bottom: 0.5rem;">Inzaish Collection Policies &amp; Services</span>
      <h3 style="font-family: var(--font-serif); font-size: 2.1rem; font-weight: 400; margin-bottom: 1.5rem;" id="policyModalTitle">Client Services</h3>

      <div class="policy-nav-tabs">
        <button class="policy-tab-btn active" data-tab="shipping">Shipping &amp; COD</button>
        <button class="policy-tab-btn" data-tab="returns">Exchanges &amp; Returns</button>
        <button class="policy-tab-btn" data-tab="care">Textile Care</button>
        <button class="policy-tab-btn" data-tab="heritage">Brand Provenance</button>
      </div>

      <div class="policy-content-pane active" id="pane-shipping">
        <h4>Nationwide Delivery &amp; Cash on Delivery (COD)</h4>
        <p>Inzaish Collection delivers across 150+ Pakistani metropolitan centers and towns via Trax, CallCourier, and TCS Express.</p>
        <ul>
          <li><strong>Delivery Timelines:</strong> 2 to 3 business days for Lahore, Karachi, and Islamabad/Rawalpindi. 3 to 5 business days for other regional hubs.</li>
          <li><strong>Shipping Charges:</strong> Flat PKR 150 nationwide. Free Express Delivery on orders exceeding PKR 7,500.</li>
          <li><strong>Cash on Delivery (COD):</strong> Maximum COD order value is PKR 50,000. Orders above this threshold require partial advance verification.</li>
          <li><strong>Consignment Verification:</strong> Customers receive an automated WhatsApp &amp; SMS tracking link upon dispatch.</li>
        </ul>
      </div>

      <div class="policy-content-pane" id="pane-returns">
        <h4>3-Day Doorstep Exchange Policy</h4>
        <p>We strive for complete satisfaction with every crafted garment.</p>
        <ul>
          <li><strong>Eligibility:</strong> Exchanges are valid within 3 days of delivery. Garments must be unworn, unwashed, with security tags attached.</li>
          <li><strong>Unstitched Fabric:</strong> Must remain uncut and unaltered with complete fabric yardage and included lace motifs.</li>
          <li><strong>Reverse Courier Pickup:</strong> Our logistics partner will pick up the exchange package directly from your address.</li>
        </ul>
      </div>

      <div class="policy-content-pane" id="pane-care">
        <h4>Heirloom Fabric Preservation</h4>
        <p>Natural luxury fibers require delicate handling to maintain their texture and luster.</p>
        <ul>
          <li><strong>Raw Silk &amp; Karandi:</strong> Professional dry clean strictly advised. Avoid spraying perfume directly onto metallic zari or embroidery.</li>
          <li><strong>Fine Combed Lawn:</strong> Gentle hand-wash in cold water with mild liquid detergent. Dry in indirect shade to preserve color brilliance.</li>
          <li><strong>Ironing:</strong> Steam iron on reverse side using silk/cotton temperature settings.</li>
        </ul>
      </div>

      <div class="policy-content-pane" id="pane-heritage">
        <h4>About Inzaish Collection</h4>
        <p>Founded in 2026, Inzaish Collection is a premier Pakistani fashion house operating at the intersection of classical subcontinental textile heritage and contemporary luxury minimalism.</p>
        <p>Every piece is crafted in limited batch runs using unadulterated natural fibers woven on heritage master looms in Punjab and Sindh.</p>
      </div>
    </div>
  </div>

  <!-- SHOPPING BAG / CART DRAWER -->
  <div class="cart-drawer-backdrop" id="cartBackdrop"></div>
  <div class="cart-drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-label="Shopping Bag">
    <div class="cart-header">
      <span class="cart-title">Your Shopping Bag (<span id="cartCountHeader">0</span>)</span>
      <button class="cart-close-btn" id="cartCloseBtn" aria-label="Close Bag">✕</button>
    </div>

    <div class="shipping-bar-container">
      <div class="shipping-bar-text" id="shippingBarText">
        Add PKR 7,500 more for Free Nationwide Delivery!
      </div>
      <div class="shipping-bar-progress">
        <div class="shipping-bar-fill" id="shippingBarFill" style="width: 0%;"></div>
      </div>
    </div>

    <div class="cart-items" id="cartItemsList">
      <!-- Items dynamically populated -->
    </div>

    <div class="cart-footer">
      <div class="cart-subtotal-row">
        <span class="cart-subtotal-label">Subtotal (PKR):</span>
        <span class="cart-subtotal-val" id="cartSubtotalVal">PKR 0</span>
      </div>
      <p class="cart-tax-note">Shipping calculated at checkout. Cash on Delivery available.</p>
      <button class="checkout-btn" id="proceedCheckoutBtn">
        <span>Proceed to Checkout</span>
        <span>→</span>
      </button>
    </div>
  </div>

  <!-- PRODUCT DETAIL OVERLAY MODAL (PDP) -->
  <div class="modal-backdrop" id="pdpBackdrop">
    <div class="modal-card" id="pdpCard" role="dialog" aria-modal="true" aria-label="Product Details">
      <!-- Populated dynamically -->
    </div>
  </div>

  <!-- ORDER TRACKING LOOKUP MODAL -->
  <div class="modal-backdrop" id="trackBackdrop">
    <div class="modal-card" style="grid-template-columns: 1fr; max-width: 540px; padding: 2.5rem;">
      <button class="modal-close-btn" id="trackCloseBtn" aria-label="Close tracking">✕</button>
      <span style="font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent-brass); font-weight: 600; display: block; margin-bottom: 0.5rem;">Consignment Tracking</span>
      <h3 style="font-family: var(--font-serif); font-size: 2rem; font-weight: 400; margin-bottom: 1rem;">Track Your Order</h3>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem;">Enter your Order ID (e.g. IC-2026-891) or your registered Pakistani phone number.</p>

      <form id="trackForm" style="display: flex; flex-direction: column; gap: 1rem;">
        <input type="text" id="trackInput" placeholder="Order ID or 03XX XXXXXXX" required style="padding: 0.95rem; border: 1px solid var(--border-subtle); border-radius: 2px; font-family: inherit; font-size: 0.9rem;" value="IC-2026-891" />
        <button type="submit" class="btn-primary" style="width: 100%;">Locate Consignment</button>
      </form>

      <div id="trackResult" style="margin-top: 1.5rem; display: none; background: var(--bg-surface); padding: 1.25rem; border: 1px solid var(--border-subtle); border-radius: 2px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.5rem;">
          <span>Order #IC-2026-891</span>
          <span style="color: var(--state-success);">● Dispatched</span>
        </div>
        <p style="font-size: 0.76rem; color: var(--text-secondary); margin-bottom: 0.75rem;">Courier: Trax Logistics (Tracking: 78941209PK)</p>
        <div style="font-size: 0.74rem; color: var(--text-muted); line-height: 1.5;">
          • Package sorted at Lahore Central Fulfillment Hub<br>
          • Out for delivery to destination city<br>
          • Expected delivery: Tomorrow by 4:00 PM (Cash on Delivery: PKR 8,950)
        </div>
      </div>
    </div>
  </div>

  <!-- CHECKOUT MODAL -->
  <div class="modal-backdrop" id="checkoutBackdrop">
    <div class="modal-card" style="grid-template-columns: 1fr; max-width: 620px; padding: 2.5rem;">
      <button class="modal-close-btn" id="checkoutCloseBtn" aria-label="Close checkout">✕</button>
      <span style="font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent-brass); font-weight: 600; display: block; margin-bottom: 0.5rem;">Express Checkout</span>
      <h3 style="font-family: var(--font-serif); font-size: 2.1rem; font-weight: 400; margin-bottom: 1.5rem;">Finalize Your Order</h3>

      <form id="checkoutForm" style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div>
            <label style="font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 0.35rem;">Full Name *</label>
            <input type="text" required placeholder="Ahmad Khan" style="width: 100%; padding: 0.85rem; border: 1px solid var(--border-subtle); border-radius: 2px;" />
          </div>
          <div>
            <label style="font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 0.35rem;">Phone (SMS/WhatsApp) *</label>
            <input type="tel" required placeholder="0300 1234567" style="width: 100%; padding: 0.85rem; border: 1px solid var(--border-subtle); border-radius: 2px;" />
          </div>
        </div>

        <div>
          <label style="font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 0.35rem;">Complete Shipping Address *</label>
          <input type="text" required placeholder="House / Apartment #, Street, Block / Phase" style="width: 100%; padding: 0.85rem; border: 1px solid var(--border-subtle); border-radius: 2px;" />
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div>
            <label style="font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 0.35rem;">City *</label>
            <select required style="width: 100%; padding: 0.85rem; border: 1px solid var(--border-subtle); border-radius: 2px; background: white;">
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Multan">Multan</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Quetta">Quetta</option>
              <option value="Other">Other Pakistani City</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 0.35rem;">Payment Method *</label>
            <select id="paymentMethodSelect" style="width: 100%; padding: 0.85rem; border: 1px solid var(--border-subtle); border-radius: 2px; background: white;">
              <option value="cod">Cash on Delivery (COD)</option>
              <option value="payfast">PayFast / Safepay (Debit / Credit Card)</option>
              <option value="bank">Direct Online Bank Transfer</option>
            </select>
          </div>
        </div>

        <div style="background: var(--bg-surface); padding: 1rem; border: 1px solid var(--border-subtle); border-radius: 2px; margin-top: 0.5rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.35rem;">
            <span>Order Total:</span>
            <strong id="checkoutTotalText">PKR 0</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
            <span>Shipping:</span>
            <span id="checkoutShippingText">FREE</span>
          </div>
        </div>

        <button type="submit" class="btn-primary" style="width: 100%; margin-top: 0.5rem;">Confirm &amp; Place Order</button>
      </form>
    </div>
  </div>

  <!-- ORDER SUCCESS CONFIRMATION MODAL -->
  <div class="modal-backdrop" id="successBackdrop">
    <div class="modal-card" style="grid-template-columns: 1fr; max-width: 500px; padding: 3rem 2rem; text-align: center;">
      <div style="font-size: 3rem; color: var(--state-success); margin-bottom: 1rem;">✓</div>
      <span style="font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent-brass); font-weight: 600; display: block; margin-bottom: 0.5rem;">Order Successfully Placed</span>
      <h3 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 400; margin-bottom: 0.75rem;">Shukriya. Welcome to Inzaish Collection.</h3>
      <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
        Your order reference is <strong style="color: var(--text-primary);">#IC-2026-948</strong>. A confirmation SMS and WhatsApp dispatch message have been sent to your number.
      </p>
      <button class="btn-primary" id="successDoneBtn" style="width: 100%;">Continue Browsing</button>
    </div>
  </div>

  <!-- TOAST NOTIFICATION CONTAINER -->
  <div class="toast-msg" id="toastMsg" role="status" aria-live="polite">
    <span id="toastIcon">✦</span>
    <span id="toastContent">Garment added to your shopping bag.</span>
  </div>
`;

// ============================================================================
// HELPER UTILITIES
// ============================================================================
window.showToast = function(msg) {
  const toast = document.getElementById('toastMsg');
  const toastContent = document.getElementById('toastContent');
  if (!toast) return;
  toastContent.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
};

function formatPKR(num) {
  return 'PKR ' + num.toLocaleString('en-PK');
}

// ============================================================================
// PRODUCT CARD GENERATOR WITH WISHLIST & QUICK ACTIONS
// ============================================================================
function createProductCardHTML(product) {
  const isWishlisted = state.wishlist.includes(product.id);
  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-media">
        <span class="product-tag">${product.tag}</span>
        <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                onclick="window.toggleWishlist('${product.id}', event)" 
                aria-label="Save ${product.title} to Wishlist" title="Save to Wishlist">
          ${isWishlisted ? '♥' : '♡'}
        </button>
        <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy" />
        <div class="quick-add-overlay">
          <button class="quick-view-btn" onclick="window.openPDP('${product.id}')">View Garment Details</button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-collection">${product.collection}</span>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-specs">${product.fabric}</p>
        <div class="product-footer">
          <span class="product-price">${product.priceFormatted}</span>
          <span class="product-stock">${product.stock > 0 ? 'Batch Available' : 'Sold Out'}</span>
        </div>
      </div>
    </article>
  `;
}

function renderCatalog() {
  const curatedContainer = document.getElementById('curatedGrid');
  const mainContainer = document.getElementById('mainCatalogueGrid');

  if (curatedContainer) {
    curatedContainer.innerHTML = PRODUCTS.slice(0, 4).map(createProductCardHTML).join('');
  }

  let filtered = [...PRODUCTS];
  if (state.activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.activeCategory);
  }

  if (state.activeSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.activeSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (mainContainer) {
    mainContainer.innerHTML = filtered.map(createProductCardHTML).join('');
  }

  updateWishlistUI();
}

window.filterByHero = function(category) {
  state.activeCategory = category;
  document.querySelectorAll('.filter-pill[data-cat]').forEach(p => {
    p.classList.toggle('active', p.dataset.cat === category);
  });
  document.querySelectorAll('.nav-link[data-filter]').forEach(l => {
    l.classList.toggle('active', l.dataset.filter === category);
  });
  renderCatalog();
  const catalogElem = document.getElementById('catalog');
  if (catalogElem) catalogElem.scrollIntoView({ behavior: 'smooth' });
};

// ============================================================================
// WISHLIST LOGIC
// ============================================================================
window.toggleWishlist = function(productId, event) {
  if (event) event.stopPropagation();
  const idx = state.wishlist.indexOf(productId);
  const product = PRODUCTS.find(p => p.id === productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    window.showToast(`${product ? product.title : 'Item'} removed from wishlist.`);
  } else {
    state.wishlist.push(productId);
    window.showToast(`♥ ${product ? product.title : 'Item'} saved to your wishlist.`);
  }
  saveWishlist();
  renderCatalog();
  updateWishlistUI();
};

function updateWishlistUI() {
  const badge = document.getElementById('wishlistBadge');
  const countHeader = document.getElementById('wishlistCountHeader');
  if (badge) badge.textContent = state.wishlist.length;
  if (countHeader) countHeader.textContent = state.wishlist.length;

  const list = document.getElementById('wishlistItemsList');
  if (list) {
    if (state.wishlist.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">♡</span>
          <p style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin-bottom: 0.5rem;">No Saved Garments</p>
          <p style="font-size: 0.82rem;">Click the heart icon on any piece to curate your private collection.</p>
        </div>
      `;
    } else {
      const savedProducts = PRODUCTS.filter(p => state.wishlist.includes(p.id));
      list.innerHTML = savedProducts.map(p => `
        <div class="cart-item">
          <img src="${p.image}" alt="${p.title}" class="cart-item-img" />
          <div class="cart-item-info">
            <h4 class="cart-item-title">${p.title}</h4>
            <span class="cart-item-meta">${p.tag} • ${p.pieceCount}</span>
            <span class="cart-item-price">${p.priceFormatted}</span>
            <button class="btn-primary" style="padding: 0.45rem 0.85rem; font-size: 0.68rem; margin-top: 0.5rem; width: fit-content;" onclick="window.moveWishlistToCart('${p.id}')">
              Move to Bag
            </button>
          </div>
          <button style="color: var(--text-muted); font-size: 1.1rem; padding: 0.5rem;" onclick="window.toggleWishlist('${p.id}')">✕</button>
        </div>
      `).join('');
    }
  }

  // If full wishlist page is currently visible, refresh its view
  const wishlistPageView = document.getElementById('wishlistPageView');
  if (wishlistPageView && wishlistPageView.style.display === 'block' && window.refreshWishlistPage) {
    window.refreshWishlistPage();
  }
}

window.moveWishlistToCart = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  addToCart(product, product.sizes[0] ? product.sizes[0].name : 'Standard');
  window.toggleWishlist(productId);
  document.getElementById('wishlistDrawer')?.classList.remove('active');
  document.getElementById('wishlistBackdrop')?.classList.remove('active');
  openCart();
};

// ============================================================================
// PREDICTIVE SEARCH LOGIC WITH HOTKEYS & SUBSTRING HIGHLIGHTING
// ============================================================================
function initSearch() {
  const overlay = document.getElementById('searchOverlayBackdrop');
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  const resultsGrid = document.getElementById('searchResultsGrid');
  const trigger = document.getElementById('searchTriggerBtn');
  const closeBtn = document.getElementById('searchCloseBtn');

  const openSearch = () => {
    overlay.classList.add('active');
    setTimeout(() => input.focus(), 120);
  };
  const closeSearch = () => {
    overlay.classList.remove('active');
    input.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    resultsGrid.innerHTML = '';
  };

  trigger.onclick = openSearch;
  closeBtn.onclick = closeSearch;
  overlay.onclick = (e) => { if (e.target === overlay) closeSearch(); };

  // Keyboard shortcut '/' to trigger search
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openSearch();
    }
  });

  // Clear query button handler
  if (clearBtn) {
    clearBtn.onclick = () => {
      input.value = '';
      clearBtn.style.display = 'none';
      resultsGrid.innerHTML = '';
      input.focus();
    };
  }

  function highlightMatches(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  input.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

    if (!q) {
      resultsGrid.innerHTML = '';
      return;
    }

    const matches = PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      resultsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem 1rem; color: #BBB;">
          <span style="font-size: 1.8rem; display: block; margin-bottom: 0.5rem; color: var(--accent-brass);">❖</span>
          <p style="font-family: var(--font-serif); font-size: 1.3rem; color: #FFF; margin-bottom: 0.35rem;">
            No Silhouettes Matched "${e.target.value.trim()}"
          </p>
          <p style="font-size: 0.82rem; color: #888;">
            Try exploring popular curations: "Chikankari", "Raw Silk", "Bandhgala", "Lawn", or "Waistcoat".
          </p>
        </div>
      `;
    } else {
      resultsGrid.innerHTML = matches.map(p => `
        <article class="search-result-card" onclick="window.selectSearchResult('${p.id}')">
          <img src="${p.image}" alt="${p.title}" class="search-result-thumb" loading="lazy" />
          <span class="search-result-collection">${p.collection} • ${p.pieceCount}</span>
          <h4 class="search-result-title">${highlightMatches(p.title, q)}</h4>
          <p class="search-result-meta">${highlightMatches(p.fabric, q)}</p>
          <div class="search-result-footer">
            <span class="search-result-price">${p.priceFormatted}</span>
            <span class="search-result-cta">Inspect Piece →</span>
          </div>
        </article>
      `).join('');
    }
  });

  window.setSearchQuery = (query) => {
    input.value = query;
    input.dispatchEvent(new Event('input'));
  };

  window.selectSearchResult = (productId) => {
    closeSearch();
    window.openPDP(productId);
  };
}

// ============================================================================
// PDP ROUTING & QUICK MODAL
// ============================================================================
window.openPDP = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId || p.slug === productId);
  if (!product) return;
  window.location.hash = `#/product/${product.slug || product.id}`;
};

window.openQuickModal = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId || p.slug === productId);
  if (!product) return;

  state.selectedProduct = product;
  state.selectedSize = product.sizes[0] ? product.sizes[0].name : 'Standard';

  const pdpCard = document.getElementById('pdpCard');
  pdpCard.innerHTML = `
    <button class="modal-close-btn" id="pdpCloseBtn" aria-label="Close Product Details">✕</button>

    <div class="modal-gallery">
      <img src="${product.image}" alt="${product.title}" id="pdpMainImage" />
      <span class="product-tag" style="top: 1.5rem; left: 1.5rem;">${product.tag}</span>
    </div>

    <div class="modal-details">
      <span class="modal-collection">${product.collection} • ${product.pieceCount}</span>
      <h2 class="modal-title">${product.title}</h2>
      <div class="modal-price">${product.priceFormatted}</div>
      <p class="modal-desc">${product.description}</p>

      <div class="modal-specs-box">
        <div class="modal-spec-row">
          <span class="modal-spec-label">Substrate / Fabric:</span>
          <span class="modal-spec-val">${product.fabric}</span>
        </div>
        <div class="modal-spec-row">
          <span class="modal-spec-label">Shirt Fabric:</span>
          <span class="modal-spec-val">${product.specs.shirt}</span>
        </div>
        ${product.specs.dupatta ? `
          <div class="modal-spec-row">
            <span class="modal-spec-label">Dupatta Detail:</span>
            <span class="modal-spec-val">${product.specs.dupatta}</span>
          </div>
        ` : ''}
        <div class="modal-spec-row">
          <span class="modal-spec-label">Trouser:</span>
          <span class="modal-spec-val">${product.specs.trouser}</span>
        </div>
        <div class="modal-spec-row">
          <span class="modal-spec-label">Atelier Inclusions:</span>
          <span class="modal-spec-val">${product.specs.inclusions}</span>
        </div>
      </div>

      <div class="modal-variant-label">
        <span>Select Sizing:</span>
        <span style="color: var(--accent-brass); cursor: pointer;" id="pdpSizeGuideTrigger">📏 Size Chart (Inches)</span>
      </div>

      <div class="modal-size-pills">
        ${product.sizes.map((s, idx) => `
          <button class="modal-size-pill ${idx === 0 ? 'active' : ''}" onclick="window.selectSize('${s.name}', this)">
            ${s.name} ${s.chest ? `(${s.chest})` : ''}
          </button>
        `).join('')}
      </div>

      <div class="modal-actions">
        <button class="modal-add-btn" onclick="window.addToCartFromPDP()">
          Add to Shopping Bag • ${product.priceFormatted}
        </button>
        <a class="modal-whatsapp-btn" href="https://wa.me/923001234567?text=Hello%20Inzaish%20Collection,%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(product.title)}%20(${product.priceFormatted})" target="_blank" rel="noopener">
          <span>💬 Order Instantly via WhatsApp</span>
        </a>
      </div>
    </div>
  `;

  document.getElementById('pdpCloseBtn').onclick = () => {
    document.getElementById('pdpBackdrop').classList.remove('active');
  };

  document.getElementById('pdpBackdrop').onclick = (e) => {
    if (e.target === document.getElementById('pdpBackdrop')) {
      document.getElementById('pdpBackdrop').classList.remove('active');
    }
  };

  document.getElementById('pdpSizeGuideTrigger').onclick = () => {
    alert(`Size Specifications for ${product.title}:\n\n` + product.sizes.map(s => `${s.name}: Chest ${s.chest || 'N/A'}, Length ${s.length || 'N/A'}`).join('\n'));
  };

  document.getElementById('pdpBackdrop').classList.add('active');
};

window.selectSize = function(sizeName, btnElem) {
  state.selectedSize = sizeName;
  document.querySelectorAll('.modal-size-pill').forEach(b => b.classList.remove('active'));
  btnElem.classList.add('active');
};

window.addToCartFromPDP = function() {
  if (!state.selectedProduct) return;
  addToCart(state.selectedProduct, state.selectedSize);
  document.getElementById('pdpBackdrop').classList.remove('active');
  openCart();
  window.showToast(`${state.selectedProduct.title} (${state.selectedSize}) added to bag.`);
};

// ============================================================================
// CART / SHOPPING BAG LOGIC
// ============================================================================
function addToCart(product, size = 'Standard') {
  const existing = state.cart.find(item => item.id === product.id && item.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      fabric: product.fabric,
      size: size,
      qty: 1
    });
  }
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const bagBadge = document.getElementById('bagBadge');
  const cartCountHeader = document.getElementById('cartCountHeader');
  if (bagBadge) bagBadge.textContent = totalCount;
  if (cartCountHeader) cartCountHeader.textContent = totalCount;

  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalVal = document.getElementById('cartSubtotalVal');

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  if (cartSubtotalVal) cartSubtotalVal.textContent = formatPKR(subtotal);

  const fill = document.getElementById('shippingBarFill');
  const text = document.getElementById('shippingBarText');
  if (fill && text) {
    if (subtotal >= state.freeShippingThreshold) {
      fill.style.width = '100%';
      text.innerHTML = '<span style="color: var(--state-success); font-weight: 600;">✓ Qualified for Free Express Nationwide Delivery!</span>';
    } else {
      const remaining = state.freeShippingThreshold - subtotal;
      const pct = Math.min((subtotal / state.freeShippingThreshold) * 100, 100);
      fill.style.width = `${pct}%`;
      text.textContent = `Add ${formatPKR(remaining)} more for Free Nationwide Delivery!`;
    }
  }

  if (cartItemsList) {
    if (state.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">❖</span>
          <p style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin-bottom: 0.5rem;">Your Shopping Bag is Empty</p>
          <p style="font-size: 0.82rem;">Explore the Autumn/Winter archive to curate your wardrobe.</p>
        </div>
      `;
    } else {
      cartItemsList.innerHTML = state.cart.map((item, idx) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img" />
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.title}</h4>
            <span class="cart-item-meta">Size: ${item.size} • ${item.fabric}</span>
            <span class="cart-item-price">${formatPKR(item.price)}</span>
            <div class="cart-qty-ctrls">
              <button class="cart-qty-btn" onclick="window.changeCartQty(${idx}, -1)" aria-label="Decrease quantity">−</button>
              <span class="cart-qty-val">${item.qty}</span>
              <button class="cart-qty-btn" onclick="window.changeCartQty(${idx}, 1)" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button style="color: var(--text-muted); font-size: 1.1rem; padding: 0.5rem;" onclick="window.removeCartItem(${idx})" aria-label="Remove item">✕</button>
        </div>
      `).join('');
    }
  }
}

window.changeCartQty = function(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].qty += delta;
  if (state.cart[index].qty <= 0) {
    state.cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
};

window.removeCartItem = function(index) {
  state.cart.splice(index, 1);
  saveCart();
  updateCartUI();
};

function openCart() {
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('cartBackdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('cartBackdrop').classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================================================
// MOBILE NAVIGATION CONTROLLER WITH ACCESSIBILITY & SCROLL LOCK
// ============================================================================
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const closeBtn = document.getElementById('mobileNavCloseBtn');

  const openNav = () => {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  window.closeMobileNav = () => {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (toggleBtn) toggleBtn.onclick = openNav;
  if (closeBtn) closeBtn.onclick = window.closeMobileNav;
  if (backdrop) backdrop.onclick = window.closeMobileNav;

  window.switchMobileGender = (gender) => {
    state.mobileActiveGender = gender;
    const tabWomen = document.getElementById('mobTabWomen');
    const tabMen = document.getElementById('mobTabMen');
    const panelWomen = document.getElementById('mobPanelWomen');
    const panelMen = document.getElementById('mobPanelMen');

    if (gender === 'women') {
      tabWomen.classList.add('active');
      tabMen.classList.remove('active');
      panelWomen.style.display = 'flex';
      panelMen.style.display = 'none';
    } else {
      tabMen.classList.add('active');
      tabWomen.classList.remove('active');
      panelMen.style.display = 'flex';
      panelWomen.style.display = 'none';
    }
  };

  window.toggleMobAccordion = (btn) => {
    const parent = btn.closest('.mobile-accordion-item');
    if (parent) {
      parent.classList.toggle('open');
    }
  };
}

// ============================================================================
// CLIENT CARE & POLICY MODAL CONTROLLER
// ============================================================================
window.openPolicyModal = function(tabName = 'shipping') {
  const backdrop = document.getElementById('policyBackdrop');
  const tabs = document.querySelectorAll('.policy-tab-btn');
  const panes = document.querySelectorAll('.policy-content-pane');

  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
  panes.forEach(p => p.classList.toggle('active', p.id === `pane-${tabName}`));

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function initPolicyTabs() {
  const backdrop = document.getElementById('policyBackdrop');
  const closeBtn = document.getElementById('policyCloseBtn');
  const tabs = document.querySelectorAll('.policy-tab-btn');
  const panes = document.querySelectorAll('.policy-content-pane');

  tabs.forEach(btn => {
    btn.onclick = () => {
      const target = btn.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      panes.forEach(p => p.classList.toggle('active', p.id === `pane-${target}`));
    };
  });

  const closePolicy = () => {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.onclick = closePolicy;
  if (backdrop) backdrop.onclick = (e) => { if (e.target === backdrop) closePolicy(); };
}

// ============================================================================
// APP INITIALIZATION & KEYBOARD ACCESSIBILITY
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTextileCanvas('textileCanvas');
  initMaterialViewer('materialCanvasContainer');
  initSearch();
  initMobileNav();
  initPolicyTabs();

  renderCatalog();
  updateCartUI();

  // Centralized Smooth Editorial View Switcher with Entrance Motion
  function switchActiveView(targetViewId) {
    const viewIds = [
      'homepageView',
      'collectionPageView',
      'pdpPageView',
      'wishlistPageView',
      'checkoutPageView',
      'orderSuccessPageView',
      'accountPageView',
      'infoPageView'
    ];

    viewIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (id === targetViewId) {
        el.style.display = 'block';
        el.classList.remove('editorial-view-enter');
        void el.offsetWidth;
        el.classList.add('editorial-view-enter');
      } else {
        el.style.display = 'none';
        el.classList.remove('editorial-view-enter');
      }
    });
  }

  // Client-Side Collection View Engine with Multi-Faceted Filtering
  function loadCollectionRoute(routeKey, subcategory = 'all', fabric = 'all', priceTier = 'all', sort = 'featured') {
    switchActiveView('collectionPageView');
    const collectionPageView = document.getElementById('collectionPageView');
    if (!collectionPageView) return;

    // 1. Determine base products & metadata for category
    let baseList = [];
    let meta = {
      title: "Collection Archive",
      eyebrow: "Heirloom Craft & Modern Restraint",
      description: "Curated Pakistani luxury garments woven on master looms with uncompromised textile integrity.",
      breadcrumbs: ['Home', 'Collections'],
      subcategories: [{ id: 'all', name: 'All Works' }]
    };

    if (routeKey === 'women') {
      baseList = PRODUCTS.filter(p => ['women-pret', 'women-unstitched', 'festive'].includes(p.category));
      meta = {
        title: "Women's Collection",
        eyebrow: "Heirloom Weaves & Contemporary Silhouettes",
        description: "Explore pure unstitched luxury lawn, tailored raw silk co-ords, and artisanal festive couture engineered for effortless elegance.",
        breadcrumbs: ['Home', 'Women'],
        subcategories: [
          { id: 'all', name: 'All Women', count: baseList.length },
          { id: 'women-unstitched', name: 'Unstitched 3-Pc', count: PRODUCTS.filter(p => p.category === 'women-unstitched').length },
          { id: 'women-pret', name: 'Ready-to-Wear (Pret)', count: PRODUCTS.filter(p => p.category === 'women-pret').length },
          { id: 'festive', name: 'Festive & Formal', count: PRODUCTS.filter(p => p.category === 'festive').length }
        ]
      };
    } else if (routeKey === 'men') {
      baseList = PRODUCTS.filter(p => p.category === 'men-eastern');
      meta = {
        title: "Bespoke Eastern Menswear",
        eyebrow: "100% Egyptian Giza Cotton & Structured Tailoring",
        description: "Mandarin bandhgala kurta sets, tailored textured raw silk waistcoats, and liquid-finished Egyptian cotton suiting cut with architectural precision.",
        breadcrumbs: ['Home', 'Men'],
        subcategories: [
          { id: 'all', name: 'All Menswear', count: baseList.length },
          { id: 'kurtas', name: 'Kurta & Shalwar Kameez', count: baseList.filter(p => p.pieceCount.includes('Set')).length },
          { id: 'waistcoats', name: 'Tailored Waistcoats', count: baseList.filter(p => p.tag.toLowerCase().includes('waistcoat')).length }
        ]
      };
    } else if (routeKey === 'unstitched') {
      baseList = PRODUCTS.filter(p => p.category === 'women-unstitched');
      meta = {
        title: "Heirloom Unstitched Fabrics",
        eyebrow: "Pure Combed Lawn & Handwoven Organza Dupattas",
        description: "Generous 3-piece yardage (3.25m Shirt, 2.5m Dupatta, 2.5m Trouser) enriched with intricate chikankari needlework, schifli borders, and zari accents.",
        breadcrumbs: ['Home', 'Women', 'Unstitched'],
        subcategories: [
          { id: 'all', name: 'All Unstitched', count: baseList.length }
        ]
      };
    } else if (routeKey === 'pret') {
      baseList = PRODUCTS.filter(p => p.category === 'women-pret');
      meta = {
        title: "Ready-to-Wear (Pret)",
        eyebrow: "Architectural South Asian Minimalism",
        description: "Impeccably finished raw silk tunics, dropped-shoulder boxy silhouettes, and cigarette trousers crafted for effortless quiet luxury.",
        breadcrumbs: ['Home', 'Women', 'Ready-to-Wear'],
        subcategories: [
          { id: 'all', name: 'All Pret', count: baseList.length }
        ]
      };
    } else if (routeKey === 'festive') {
      baseList = PRODUCTS.filter(p => p.category === 'festive');
      meta = {
        title: "Festive & Formal Couture",
        eyebrow: "Atelier Embroidery & Heirloom Silks",
        description: "Hand-embellished zardozi threadwork, 16-kali flared peshwas ensembles, micro pearls, and regal 9000 micro velvet shawls for weddings and festive celebrations.",
        breadcrumbs: ['Home', 'Collections', 'Festive'],
        subcategories: [
          { id: 'all', name: 'All Festive', count: baseList.length }
        ]
      };
    } else if (routeKey === 'new-arrivals') {
      baseList = [...PRODUCTS];
      meta = {
        title: "New Arrivals Archive",
        eyebrow: "Autumn/Winter 25/26 Releases",
        description: "The latest seasonal curations, limited batch releases, and newly finished master loom creations from our ateliers.",
        breadcrumbs: ['Home', 'New Arrivals'],
        subcategories: [
          { id: 'all', name: 'All Releases', count: baseList.length }
        ]
      };
    } else if (routeKey === 'accessories') {
      baseList = PRODUCTS.filter(p => p.tag.toLowerCase().includes('waistcoat') || p.tag.toLowerCase().includes('velvet'));
      meta = {
        title: "Objects & Layering",
        eyebrow: "Bespoke Waistcoats & Artisanal Shawls",
        description: "Textured jamawar waistcoats and micro velvet shawls engineered to layer over eastern ensembles.",
        breadcrumbs: ['Home', 'Accessories'],
        subcategories: [
          { id: 'all', name: 'All Objects', count: baseList.length }
        ]
      };
    } else if (routeKey === 'sale') {
      baseList = PRODUCTS.slice(0, 3);
      meta = {
        title: "Archive Clearances",
        eyebrow: "Limited Batch Final Pieces",
        description: "Selected archival garments from past edits with transparent discounted pricing and uncompromised craftsmanship.",
        breadcrumbs: ['Home', 'Archive Sale'],
        subcategories: [
          { id: 'all', name: 'Final Pieces', count: baseList.length }
        ]
      };
    }

    // 2. Apply Subcategory Filter
    let filtered = [...baseList];
    if (subcategory !== 'all') {
      if (routeKey === 'women') {
        filtered = filtered.filter(p => p.category === subcategory);
      } else if (routeKey === 'men') {
        if (subcategory === 'kurtas') filtered = filtered.filter(p => p.pieceCount.includes('Set'));
        else if (subcategory === 'waistcoats') filtered = filtered.filter(p => p.tag.toLowerCase().includes('waistcoat'));
      }
    }

    // 3. Apply Fabric Weave Filter
    if (fabric !== 'all') {
      if (fabric === 'raw-silk') filtered = filtered.filter(p => p.fabric.toLowerCase().includes('raw silk'));
      else if (fabric === 'lawn') filtered = filtered.filter(p => p.fabric.toLowerCase().includes('lawn') || p.fabric.toLowerCase().includes('chikan'));
      else if (fabric === 'cotton') filtered = filtered.filter(p => p.fabric.toLowerCase().includes('cotton') || p.fabric.toLowerCase().includes('giza'));
      else if (fabric === 'organza') filtered = filtered.filter(p => p.fabric.toLowerCase().includes('organza'));
      else if (fabric === 'velvet') filtered = filtered.filter(p => p.fabric.toLowerCase().includes('velvet') || p.fabric.toLowerCase().includes('karandi'));
    }

    // 4. Apply Price Tier Filter
    if (priceTier !== 'all') {
      if (priceTier === 'under-10k') filtered = filtered.filter(p => p.price < 10000);
      else if (priceTier === '10k-18k') filtered = filtered.filter(p => p.price >= 10000 && p.price <= 18000);
      else if (priceTier === 'above-18k') filtered = filtered.filter(p => p.price > 18000);
    }

    // 5. Apply Sorting
    if (sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      filtered.sort((a, b) => b.id.localeCompare(a.id));
    }

    const config = {
      ...meta,
      activeSubcategory: subcategory,
      activeFabric: fabric,
      activePriceTier: priceTier,
      activeSort: sort,
      allCategoryProducts: baseList,
      products: filtered,
      wishlist: state.wishlist,
      onSubcategoryChange: (subId) => loadCollectionRoute(routeKey, subId, fabric, priceTier, sort),
      onFabricChange: (newFabric) => loadCollectionRoute(routeKey, subcategory, newFabric, priceTier, sort),
      onPriceTierChange: (newPrice) => loadCollectionRoute(routeKey, subcategory, fabric, newPrice, sort),
      onSortChange: (newSort) => loadCollectionRoute(routeKey, subcategory, fabric, priceTier, newSort),
      onClearFilters: () => loadCollectionRoute(routeKey, 'all', 'all', 'all', 'featured'),
      onProductClick: (id) => window.openPDP(id),
      onWishlistToggle: (id) => window.toggleWishlist(id)
    };

    renderCollectionView(collectionPageView, config);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Dedicated Product Detail Page (PDP) View Engine
  function loadPDPRoute(slug) {
    const product = PRODUCTS.find(p => p.slug === slug || p.id === slug) || PRODUCTS[0];
    if (!product) return;

    switchActiveView('pdpPageView');
    const pdpPageView = document.getElementById('pdpPageView');
    if (!pdpPageView) return;

    const isWishlisted = state.wishlist.includes(product.id);

    renderProductDetailPage(pdpPageView, product, {
      selectedSize: product.sizes && product.sizes[0] ? product.sizes[0].name : 'Standard',
      selectedQty: 1,
      isWishlisted: isWishlisted,
      onAddToCart: (prod, size, qty) => {
        for (let i = 0; i < qty; i++) {
          addToCart(prod, size);
        }
        openCart();
        window.showToast(`${prod.title} (${size}) added to bag.`);
      },
      onToggleWishlist: (id) => {
        window.toggleWishlist(id);
        const btn = pdpPageView.querySelector('#pdpWishlistBtn');
        if (btn) {
          const nowWish = state.wishlist.includes(id);
          btn.classList.toggle('active', nowWish);
          btn.innerHTML = nowWish ? '♥ Saved to Wishlist' : '♡ Save to Wishlist';
        }
      },
      onOpenSizeGuide: (prod) => {
        alert(`Inzaish Collection Size Specifications for ${prod.title}:\n\n` +
          prod.sizes.map(s => `${s.name}: Chest ${s.chest || 'N/A'}, Length ${s.length || 'N/A'}`).join('\n') +
          '\n\nMeasurement Standard: Imperial Inches. Verified Pakistani luxury atelier sizing.');
      },
      onOpen3DLab: (fabricKey) => {
        window.location.hash = '#/';
        setTimeout(() => {
          const el = document.getElementById('textureLab');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          if (window.switchAtelierFabric && fabricKey) {
            window.switchAtelierFabric(fabricKey);
          }
        }, 150);
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Dedicated Editorial Wishlist View Engine
  function loadWishlistRoute() {
    switchActiveView('wishlistPageView');
    const wishlistPageView = document.getElementById('wishlistPageView');
    if (!wishlistPageView) return;

    renderWishlistPage(wishlistPageView, state.wishlist, PRODUCTS, {
      onMoveToCart: (id) => {
        window.moveWishlistToCart(id);
      },
      onRemoveFromWishlist: (id) => {
        window.toggleWishlist(id);
      },
      onMoveAllToCart: (productsList) => {
        productsList.forEach(p => {
          addToCart(p, p.sizes && p.sizes[0] ? p.sizes[0].name : 'Standard');
        });
        state.wishlist = [];
        saveWishlist();
        updateWishlistUI();
        openCart();
        window.showToast('All saved pieces moved to shopping bag.');
      },
      onProductClick: (slug) => {
        window.location.hash = `#/product/${slug}`;
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.refreshWishlistPage = loadWishlistRoute;

  // Dedicated Express Checkout View Engine
  function loadCheckoutRoute() {
    switchActiveView('checkoutPageView');
    const checkoutPageView = document.getElementById('checkoutPageView');
    if (!checkoutPageView) return;

    renderCheckoutPage(checkoutPageView, state.cart, {
      appliedCoupon: state.appliedCoupon,
      formData: state.checkoutFormData || {},
      onApplyCoupon: (code, currentValues) => {
        if (currentValues) state.checkoutFormData = currentValues;
        if (code === 'INZAISH10' || code === 'FREESHIP') {
          state.appliedCoupon = code;
          window.showToast(`Privilege code "${code}" applied.`);
          loadCheckoutRoute();
        } else {
          window.showToast('Invalid coupon code. Try "INZAISH10".');
        }
      },
      onPlaceOrder: (orderData) => {
        state.lastOrder = orderData;
        state.checkoutFormData = {};
        if (!state.orders) state.orders = [];
        state.orders.unshift(orderData);
        saveOrders();
        state.cart = [];
        state.appliedCoupon = null;
        saveCart();
        updateCartUI();
        window.location.hash = '#/order-success';
      },
      onNavigateHome: () => {
        window.location.hash = '#/';
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Dedicated Order Success View Engine
  function loadOrderSuccessRoute() {
    switchActiveView('orderSuccessPageView');
    const orderSuccessPageView = document.getElementById('orderSuccessPageView');
    if (!orderSuccessPageView) return;

    const orderData = state.lastOrder || (state.orders && state.orders[0]) || {
      orderId: 'IC-2026-891',
      date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }),
      customerName: 'Ahmad Khan',
      phone: '0300 1234567',
      address: 'House 42, Street 8, Phase 5, DHA',
      city: 'Lahore',
      paymentMethodTitle: 'Cash on Delivery (COD)',
      items: [PRODUCTS[0]],
      total: 14500
    };

    renderOrderSuccessPage(orderSuccessPageView, orderData, {
      onContinueShopping: () => {
        window.location.hash = '#/';
      },
      onTrackOrder: (orderId) => {
        window.location.hash = '#/track-order';
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Dedicated Client Atelier (Account, Orders & Consignment Tracking) View Engine
  function loadAccountRoute(tab = 'orders') {
    switchActiveView('accountPageView');
    const accountPageView = document.getElementById('accountPageView');
    if (!accountPageView) return;

    renderAccountPage(accountPageView, state, {
      activeTab: tab,
      onSelectTab: (t) => {},
      onTrackOrder: (query) => {
        window.showToast(`Consignment telemetry located for "${query}".`);
      },
      onReorderItems: (items) => {
        items.forEach(item => {
          addToCart(item, item.size || 'Standard');
        });
        openCart();
        window.showToast(`${items.length} archival piece(s) added back to your bag.`);
      },
      onSaveMeasurements: (m) => {
        window.showToast('Imperial tailoring measurements preserved.');
      },
      onSaveAddress: (addr) => {
        window.showToast('Primary Pakistani delivery address updated.');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Dedicated Editorial Information & Policy Pages View Engine
  function loadInfoRoute(pageKey = 'about') {
    switchActiveView('infoPageView');
    const infoPageView = document.getElementById('infoPageView');
    if (!infoPageView) return;

    renderInfoPage(infoPageView, pageKey, {
      onContactSubmit: (data) => {
        window.showToast(`Thank you, ${data.name}. Your atelier inquiry has been received.`);
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Client-Side Router for Inzaish Collection Blueprint
  window.appRouter = new Router({
    '/': () => {
      switchActiveView('homepageView');
      state.activeCategory = 'all';
      document.querySelectorAll('.filter-pill[data-cat]').forEach(p => p.classList.toggle('active', p.dataset.cat === 'all'));
      renderCatalog();
    },
    '/women': () => {
      loadCollectionRoute('women');
    },
    '/men': () => {
      loadCollectionRoute('men');
    },
    '/unstitched': () => {
      loadCollectionRoute('unstitched');
    },
    '/pret': () => {
      loadCollectionRoute('pret');
    },
    '/festive': () => {
      loadCollectionRoute('festive');
    },
    '/new-arrivals': () => {
      loadCollectionRoute('new-arrivals');
    },
    '/accessories': () => {
      loadCollectionRoute('accessories');
    },
    '/sale': () => {
      loadCollectionRoute('sale');
    },
    '/cart': () => {
      loadCheckoutRoute();
    },
    '/checkout': () => {
      loadCheckoutRoute();
    },
    '/order-success': () => {
      loadOrderSuccessRoute();
    },
    '/wishlist': () => {
      loadWishlistRoute();
    },
    '/account': () => {
      loadAccountRoute('orders');
    },
    '/orders': () => {
      loadAccountRoute('orders');
    },
    '/track-order': () => {
      loadAccountRoute('track');
    },
    '/measurements': () => {
      loadAccountRoute('measurements');
    },
    '/size-guide': () => {
      loadInfoRoute('size-guide');
    },
    '/shipping-policy': () => {
      loadInfoRoute('shipping-policy');
    },
    '/returns-policy': () => {
      loadInfoRoute('returns-policy');
    },
    '/about': () => {
      loadInfoRoute('about');
    },
    '/contact': () => {
      loadInfoRoute('contact');
    },
    '/faqs': () => {
      loadInfoRoute('shipping-policy');
    },
    '/privacy-policy': () => {
      loadInfoRoute('about');
    },
    '/terms-and-conditions': () => {
      loadInfoRoute('about');
    },
    '/product/:slug': (params) => {
      loadPDPRoute(params.slug);
    }
  });

  // Escape key closes any open modal, drawer, or search
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      window.closeMobileNav();
      document.getElementById('pdpBackdrop')?.classList.remove('active');
      document.getElementById('trackBackdrop')?.classList.remove('active');
      document.getElementById('checkoutBackdrop')?.classList.remove('active');
      document.getElementById('successBackdrop')?.classList.remove('active');
      document.getElementById('policyBackdrop')?.classList.remove('active');
      document.getElementById('searchOverlayBackdrop')?.classList.remove('active');
      document.getElementById('wishlistDrawer')?.classList.remove('active');
      document.getElementById('wishlistBackdrop')?.classList.remove('active');
      document.querySelectorAll('.mega-menu-wrapper').forEach(m => m.classList.remove('is-open'));
      document.body.style.overflow = '';
    }
  });

  // Cart Drawer triggers
  document.getElementById('cartToggleBtn').onclick = openCart;
  document.getElementById('cartCloseBtn').onclick = closeCart;
  document.getElementById('cartBackdrop').onclick = closeCart;

  // Wishlist Drawer triggers
  const wishlistBtn = document.getElementById('wishlistTriggerBtn');
  const wishlistDrawer = document.getElementById('wishlistDrawer');
  const wishlistBackdrop = document.getElementById('wishlistBackdrop');
  const wishlistCloseBtn = document.getElementById('wishlistCloseBtn');

  if (wishlistBtn) {
    wishlistBtn.onclick = () => {
      window.location.hash = '#/wishlist';
    };
  }
  const closeWishlist = () => {
    wishlistDrawer.classList.remove('active');
    wishlistBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };
  if (wishlistCloseBtn) wishlistCloseBtn.onclick = closeWishlist;
  if (wishlistBackdrop) wishlistBackdrop.onclick = closeWishlist;
  const viewFullWishlistBtn = document.getElementById('viewFullWishlistBtn');
  if (viewFullWishlistBtn) {
    viewFullWishlistBtn.onclick = () => {
      closeWishlist();
    };
  }

  // Filter Pills click handler
  const filterPills = document.querySelectorAll('.filter-pill[data-cat]');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeCategory = pill.dataset.cat;
      renderCatalog();
    });
  });

  // Top Nav Link filter handlers
  document.querySelectorAll('.nav-link[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.dataset.filter;
      state.activeCategory = cat;
      document.querySelectorAll('.filter-pill[data-cat]').forEach(p => {
        p.classList.toggle('active', p.dataset.cat === cat);
      });
      document.querySelectorAll('.nav-link[data-filter]').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      renderCatalog();
    });
  });

  // Sort selector
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.onchange = (e) => {
      state.activeSort = e.target.value;
      renderCatalog();
    };
  }

  // Fabric lab buttons
  const fabricButtons = document.querySelectorAll('#fabricButtons .filter-pill');
  fabricButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      fabricButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (window.switchAtelierFabric) {
        window.switchAtelierFabric(btn.dataset.fabric);
      }
    });
  });

  const exploreActiveFabricBtn = document.getElementById('exploreActiveFabricBtn');
  if (exploreActiveFabricBtn) {
    exploreActiveFabricBtn.onclick = () => {
      const activeBtn = document.querySelector('#fabricButtons .filter-pill.active');
      const fabricKey = activeBtn ? activeBtn.dataset.fabric : 'raw-silk';
      if (fabricKey === 'fine-lawn' || fabricKey === 'organza') {
        window.location.hash = '#/unstitched';
      } else {
        window.location.hash = '#/pret';
      }
    };
  }

  // Track Order Modal
  const trackBtn = document.getElementById('trackOrderBtn');
  const trackBackdrop = document.getElementById('trackBackdrop');
  const trackCloseBtn = document.getElementById('trackCloseBtn');
  const footerTrackLink = document.getElementById('footerTrackLink');

  window.openTrackModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    window.location.hash = '#/track-order';
  };
  const closeTrackModal = () => {
    if (trackBackdrop) trackBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };
  if (trackBtn) trackBtn.onclick = window.openTrackModal;
  if (footerTrackLink) footerTrackLink.onclick = window.openTrackModal;
  if (trackCloseBtn) trackCloseBtn.onclick = closeTrackModal;

  const trackForm = document.getElementById('trackForm');
  if (trackForm) {
    trackForm.onsubmit = (e) => {
      e.preventDefault();
      document.getElementById('trackResult').style.display = 'block';
    };
  }

  // Size Guide & Tracking Navigation from footer
  const footerSizeLink = document.getElementById('footerSizeLink');
  if (footerSizeLink) {
    footerSizeLink.onclick = (e) => {
      e.preventDefault();
      window.location.hash = '#/size-guide';
    };
  }

  // Floating Atelier Scroll-to-Top Controller
  const scrollTopBtn = document.getElementById('atelierScrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('is-visible');
      } else {
        scrollTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Checkout Modal
  const proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');
  const checkoutBackdrop = document.getElementById('checkoutBackdrop');
  const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const successBackdrop = document.getElementById('successBackdrop');
  const successDoneBtn = document.getElementById('successDoneBtn');

  if (proceedCheckoutBtn) {
    proceedCheckoutBtn.onclick = () => {
      if (state.cart.length === 0) {
        window.showToast('Your shopping bag is empty.');
        return;
      }
      closeCart();
      window.location.hash = '#/checkout';
    };
  }

  const closeCheckout = () => {
    checkoutBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };
  if (checkoutCloseBtn) checkoutCloseBtn.onclick = closeCheckout;

  if (checkoutForm) {
    checkoutForm.onsubmit = (e) => {
      e.preventDefault();
      closeCheckout();
      state.cart = [];
      saveCart();
      updateCartUI();
      successBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
  }

  if (successDoneBtn) {
    successDoneBtn.onclick = () => {
      successBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    };
  }
});
