import * as React from 'react'
import { Link, Outlet, createRootRoute, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  
  const headerNavigate = useNavigate({from: '/'})

  

const items = [
  {key: 'employees', label: 'Employees', onClick: () => {headerNavigate({to:'/employees/$cafeId', params:{cafeId: 'null'}})}},
  {key: 'cafes', label: 'Cafes',  onClick: () => {headerNavigate({to:'/cafes/$location', params:{location: 'null'}})}},
]


  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
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
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools />
    </>
  )
}
