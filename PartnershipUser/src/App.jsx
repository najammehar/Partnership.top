import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Hero, Navbar, DomainList } from "./components"
import DomainDetailPage from './components/DomainDetailModel'
import InvestmentForm from './components/InvestmentForm'
import HowItWorks from './components/HowItWorks'
import TermsAndConditions from './components/TermAndConditions'
import AboutUs from './components/AboutUs'
import ContactPage from './components/ContactPage'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className="fixed inset-0 bg-black z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent" />
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-indigo-500/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-indigo-600/10 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2" />
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <DomainList />
          </>
        } />
        <Route path="/domain/:domainId" element={<DomainDetailPage />} />
        <Route path="/invest/:domainId" element={<InvestmentForm />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      </>
  )
}

export default App