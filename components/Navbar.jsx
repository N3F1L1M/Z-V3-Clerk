"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Acerca" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <nav className="top-0 left-0 z-50 w-full bg-gray-900 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y título */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <h1 className="text-lg sm:text-xl font-bold">
                Zcatalogo <span className="hidden sm:inline">Administradores</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium transition-colors hover:text-gray-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User info and button */}
            <div className="flex items-center gap-3 border-l border-gray-700 pl-6">
              {isLoaded && isSignedIn && user && <span className="text-sm text-gray-300">Hola, {user.firstName}</span>}
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            {isLoaded && isSignedIn && <UserButton afterSignOutUrl="/" />}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú principal"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="border-t border-gray-800 px-4 pb-3 pt-2">
          {isLoaded && isSignedIn && user && (
            <div className="mb-3 border-b border-gray-800 pb-3">
              <p className="text-sm text-gray-300">
                Hola, <span className="font-semibold text-white">{user.firstName}</span>
              </p>
            </div>
          )}
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-800 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
