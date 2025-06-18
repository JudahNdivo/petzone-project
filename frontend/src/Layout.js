import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This renders the nested route's page (e.g., LandingPage, Login, etc.) */}
      </main>
      <Footer />
    </>
  )
}

export default Layout
