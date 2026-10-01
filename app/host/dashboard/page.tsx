import { readFileSync } from 'node:fs';
import path from 'node:path';

function getHostStudioDocument() {
  const root = process.cwd();
  const html = readFileSync(path.join(root, 'host-dashboard.html'), 'utf8');
  const css = readFileSync(path.join(root, 'host-dashboard.css'), 'utf8');
  const script = readFileSync(path.join(root, 'host-dashboard.js'), 'utf8');

  return html
    .replace('<link rel="stylesheet" href="host-dashboard.css">', `<style>${css}</style>`)
    .replace('<script src="host-dashboard.js" defer></script>', `<script>${script}</script>`)
    .replaceAll('href="home.html"', 'href="/"')
    .replaceAll("window.location.href = 'index.html'", "window.location.href = '/login'");
}

const hostStudioDocument = getHostStudioDocument();

export default function HostDashboardPage() {
  return (
    <main style={{ width: '100%', height: '100dvh', background: '#f4f7f4' }}>
      <iframe
        title="StayNest Host Studio dashboard"
        srcDoc={hostStudioDocument}
        style={{ display: 'block', width: '100%', height: '100%', border: 0 }}
      />
    </main>
  );
}
