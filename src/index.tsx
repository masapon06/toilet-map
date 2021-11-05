import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createHashHistory } from 'history'

import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import axios, { AxiosInstance } from 'axios'
import { Provider } from 'react-redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { routerMiddleware } from 'connected-react-router'
import reducer from './modules/reducer'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

type ApiClientType = AxiosInstance | null
const ApiClientContext = React.createContext<ApiClientType>(null)
const ApiClientProvider = ApiClientContext.Provider

const client: AxiosInstance = axios.create()
const thunkWithClient = thunk.withExtraArgument(client)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createHashHistory()
export const store = createStore(
  reducer(history),
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunkWithClient))
)

ReactDOM.render(
  <React.StrictMode>
    <ApiClientProvider value={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApiClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
