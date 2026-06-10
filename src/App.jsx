import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ProgressBar from './components/ProgressBar/ProgressBar'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <ProgressBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
