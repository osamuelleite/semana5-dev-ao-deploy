/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bind mounts no Docker Desktop (Windows/Mac) nao propagam eventos de
  // filesystem de forma confiavel; polling e o fallback oficial para
  // manter o hot reload funcionando dentro do container.
  ...(process.env.WATCHPACK_POLLING === 'true' && {
    watchOptions: { pollIntervalMs: 1000 },
  }),
};

export default nextConfig;
