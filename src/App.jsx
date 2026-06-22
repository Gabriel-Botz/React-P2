import { Navigate, Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ProgressBar from './components/ProgressBar/ProgressBar'
import { InvestigationProvider } from './context/InvestigationContext'
import './App.css'
import { ToastContainer } from "react-toastify";

function App() {
  const isAuth = localStorage.getItem("isInvestigatorLogged") === "true";

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <InvestigationProvider>
        <Header />
        <ProgressBar />
        <main>
          <Outlet />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="dark"
          />
        </main>
        <Footer />
      </InvestigationProvider>
    </>
  )
}

export default App;