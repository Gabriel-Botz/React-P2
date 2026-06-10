import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ProgressBar from './components/ProgressBar/ProgressBar'
import { InvestigationProvider } from './context/InvestigationContext'
import './App.css'

function App() {
  return (
    <>
      <InvestigationProvider>
        <Header />
        <ProgressBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </InvestigationProvider>
    </>
  )
}

export default App
