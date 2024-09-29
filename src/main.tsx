import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'


import * as antd from 'antd'

const { createRoot } = ReactDOM;

const {  Layout } = antd
const { Content } = Layout;


// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent'
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById('app')!
).render(
  <Layout>
  <Content
    style={{
      padding: '0 0px',
    }}
  >
    <div
      style={{
        //background: colorBgContainer,
        minHeight: 280,
        padding: 24,
        //borderRadius: borderRadiusLG,
      }}
    >
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </React.StrictMode>
    </div>
  </Content>
</Layout>
)



// const rootElement = document.getElementById('app')!

// if (!rootElement.innerHTML) {
//   const root = ReactDOM.createRoot(rootElement)
//   root.render(<RouterProvider router={router} />)
// }
