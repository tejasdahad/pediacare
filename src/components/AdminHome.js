import { useState, useEffect } from 'react'
import  Navigation  from './navigation'
import { Header } from './header'
import JsonData from '../data/data.json'
import SmoothScroll from 'smooth-scroll'
import AdminAppointments from './AdminAppointments'

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
})

const AdminHome = () => {
    const [landingPageData, setLandingPageData] = useState({})
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.AdminHeader} />
      <AdminAppointments />
    </div>
  )
}

export default AdminHome;