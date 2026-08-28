import { defineConfig } from 'vite';

const routeRewrite = (route, file) => ({
  name: `${route}-route`,
  configureServer(server) {
    return () => {
      server.middlewares.use((request, response, next) => {
        const match = request.url.match(new RegExp(`^/${route}/([^/?]+)`));
        if (!match) return next();
        request.url = `/${file}?id=${encodeURIComponent(match[1])}`;
        next();
      });
    };
  }
});

export default defineConfig({
  plugins: [
    routeRewrite('properties', 'property.html'),
    routeRewrite('booking', 'booking.html'),
    routeRewrite('booking-confirmation', 'confirmation.html')
  ]
});
