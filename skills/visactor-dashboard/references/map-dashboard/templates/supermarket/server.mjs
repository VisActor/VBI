import { fileURLToPath } from 'node:url'
import { startDashboard } from './server/server.mjs'

await startDashboard(fileURLToPath(new URL('./template-supermarket.html', import.meta.url)))
