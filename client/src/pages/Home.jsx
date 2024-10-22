import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='mb-10'>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home