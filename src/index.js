import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/home/home"
import Profile from "./pages/profile/profile"
import {compose, createStore, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import {rootReduser} from "./redux/rootReduser"
import thunk from "redux-thunk"
import {createBrowserHistory} from "history"

export let customHistory = createBrowserHistory()
const store = createStore(rootReduser, compose(
    applyMiddleware(
        thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
  <BrowserRouter history={customHistory}>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}>
              <Route path=":user" element={<Profile/>}/>
          </Route>
      </Routes>
  </BrowserRouter>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

