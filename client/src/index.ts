import './index.css'
import App from './App'

const mountNode = document.getElementById('root')
if (mountNode) {
  new App(mountNode)
}
