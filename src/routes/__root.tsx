import * as React from 'react'
import { Link, Outlet, createRootRoute, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as antd from 'antd'

const {  Breadcrumb, Layout, Menu, theme  } = antd
const { Header, Content, Footer } = Layout;

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  
  const navigate = useNavigate({from: '/'})

  

const items = [
  {key: 'employees', label: 'Employees', onClick: () => {navigate({to:'/employees/$cafeId', params:{cafeId: 'null'}})}},
  {key: 'cafes', label: 'Cafes',  onClick: () => {navigate({to:'/cafes/$location', params:{location: 'null'}})}},
]


  return (
    <>
      {/* <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        <Link
          to="/cafes/$location"
          params={{location: 'null'}}
          activeProps={{
            className: 'font-bold',
          }}
        >
          Cafe
        </Link>
        <Link
          to="/employees/$cafeId"
          params={{cafeId: 'null'}}
          activeProps={{
            className: 'font-bold',
          }}
        >
          Employees
        </Link>
      </div>
      <hr /> */}
      <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      </Layout>
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools/>
    </>
  )
}
