import React from 'react'
// import Sidebar from '../components/Sidebar'
import Products from '../components/Products'
import Exclusive from './Exclusive'
import NewArrival from './NewArrival'
import LastestCollection from '../components/LastestCollection'
import OurPolicy from '../components/OurPolicy'
import RecentlyViewed from './RecentlyViewed'

function Home() {
  return (
    <div >
        {/* <Sidebar /> */}
        <Exclusive />
        <Products />
        <RecentlyViewed />
        <NewArrival />
        <LastestCollection />
        <OurPolicy />
    </div>
  )
}

export default Home