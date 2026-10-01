import { defineConfig } from 'vite';

const routeRewrite = (route, file) => ({
  name: `${route}-route`,
  configureServer(server) {
    return () => {
      server.middlewares.use((request, response, next) => {
        const match = request.url.match(new RegExp(`^/${route}(?:/([^/?]+))?`));
        if (!match) return next();
        request.url = match[1] ? `/${file}?id=${encodeURIComponent(match[1])}` : `/${file}`;
        next();
      });
    };
  }
});

export default defineConfig({
  plugins: [
    routeRewrite('properties', 'property.html'),
    routeRewrite('booking', 'booking.html'),
    routeRewrite('payment', 'payment.html'),
    routeRewrite('host/dashboard', 'host-dashboard.html'),
    routeRewrite('booking-confirmation', 'confirmation.html')
  ]
});
