import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AppComponent from './components/AppComponent'

const mountNode = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>,
  mountNode
)
