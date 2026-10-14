/**
 * INZAISH COLLECTION — Client-Side Hash Router
 * Lightweight zero-dependency router supporting all 28 blueprint routes.
 */

export class Router {
  constructor(routes = {}) {
    this.routes = routes;
    this.currentRoute = null;
    this.currentParams = {};

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('DOMContentLoaded', () => this.handleRoute());
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path) {
    window.location.hash = path;
  }

  getHashPath() {
    const hash = window.location.hash.slice(1);
    return hash.startsWith('/') ? hash : '/' + hash;
  }

  handleRoute() {
    let path = this.getHashPath();
    if (!path || path === '/') {
      path = '/';
    }

    // Match exact or parameterized routes
    let matchedHandler = this.routes[path];
    let params = {};

    if (!matchedHandler) {
      for (const routePattern in this.routes) {
        if (routePattern.includes(':')) {
          const patternParts = routePattern.split('/');
          const pathParts = path.split('/');

          if (patternParts.length === pathParts.length) {
            let match = true;
            const extractedParams = {};

            for (let i = 0; i < patternParts.length; i++) {
              if (patternParts[i].startsWith(':')) {
                const paramName = patternParts[i].slice(1);
                extractedParams[paramName] = decodeURIComponent(pathParts[i]);
              } else if (patternParts[i] !== pathParts[i]) {
                match = false;
                break;
              }
            }

            if (match) {
              matchedHandler = this.routes[routePattern];
              params = extractedParams;
              break;
            }
          }
        }
      }
    }

    // Fallback to 404 handler if present, else root
    if (!matchedHandler) {
      matchedHandler = this.routes['/404'] || this.routes['/'];
    }

    this.currentRoute = path;
    this.currentParams = params;

    // Update active state across top navigation links
    document.querySelectorAll('.main-nav .nav-link, .mobile-sub-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === `#${path}` || (path === '/' && href === '#/'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Unfocus active nav elements to dismiss mega-menus upon route transition
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }

    if (typeof matchedHandler === 'function') {
      matchedHandler(params, path);
    }

    // Scroll to top on page transition unless an anchor ID is targeted
    if (!window.location.hash.includes('#catalog') && !window.location.hash.includes('#textureLab')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
