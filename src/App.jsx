import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useFilterStore } from './context/FilterStore'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import OverviewDashboard from './pages/OverviewDashboard'
import MacroGoalDetail from './pages/MacroGoalDetail'
import NewLayout from './pages/NewLayout'
import FruitYieldDashboard from './pages/FruitYieldDashboard'

function AppContent() {
  const location = useLocation()
  const isGoalPage = location.pathname.includes('/goal/') || location.pathname.includes('/v2/goal/') || location.pathname === '/fruit-yield'

  return (
    <div className="min-h-screen flex flex-col bg-surface-0">
      <Header />

      {/* Main Content Area */}
      <main className={`flex-1 w-full ${location.pathname !== '/fruit-yield' ? 'max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8' : ''} ${isGoalPage ? 'py-2' : 'py-6'}`}>
        <Routes>
          <Route path="/" element={<OverviewDashboard />} />
          <Route path="/fruit-yield" element={<FruitYieldDashboard />} />
          <Route path="/goal/:mgCode" element={<MacroGoalDetail />} />
          <Route path="/v2/goal/:mgCode" element={<NewLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer only on overview page */}
      {!isGoalPage && <Footer />}
    </div>
  )
}

function App() {
  const { initData, loading, error } = useFilterStore()

  useEffect(() => {
    initData()
  }, [initData])

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-0 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4 max-w-sm text-center">
          {/* Pulsing GRIT Loader */}
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full border border-surface-border bg-surface-1 shadow-xs">
            <img src="/vikistrajyalogo.png" alt="Logo" className="h-14" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy-800 tracking-tight">
              VIKSIT Rajya @ 2047
            </h2>
            <p className="text-s text-ink-muted mt-1 animate-pulse">
              Transforming State • Initializing Dashboard Data...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-0 flex flex-col items-center justify-center p-6">
        <div className="bg-surface-1 border border-status-critical rounded-xl p-6 max-w-md shadow-xs text-center">
          <div className="w-12 h-12 bg-status-critical-soft text-status-critical rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="font-display text-lg font-bold text-navy-800 mb-2">
            Failed to Load Dashboard Data
          </h2>
          <p className="text-sm text-ink-muted mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-navy-800 text-white rounded-lg text-xs font-semibold shadow-xs hover:bg-navy-700 transition"
          >
            Retry Loading
          </button>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
