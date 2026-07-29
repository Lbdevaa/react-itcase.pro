import {withProviders} from './providers'
import {AppRoutes} from './routes'

export default function App() {
  return withProviders(<AppRoutes />)
}
