// import React from 'react'
// import ReactDOM from 'react-dom'
// import './index.css'
// import AppComponent from './Components/AppComponent'

// const mountNode = document.getElementById('root')

// ReactDOM.render(
//   <React.StrictMode>
//     <AppComponent />
//   </React.StrictMode>,
//   mountNode
// )

// Game
import './index.css'
import App from './SlotsGame/App'
const mountNode = document.getElementById('root')
if (mountNode) {
  new App(mountNode)
}