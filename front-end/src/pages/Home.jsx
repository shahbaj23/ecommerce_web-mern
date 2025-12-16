import React from 'react'
// import Sidebar from '../components/Sidebar'
import Products from '../components/Products'
import Exclusive from './Exclusive'
import NewArrival from './NewArrival'
import LastestCollection from '../components/LastestCollection'
import OurPolicy from '../components/OurPolicy'

function Home() {
  return (
    <div >
        {/* <Sidebar /> */}
        <Exclusive />
        <Products />
        <NewArrival />
        <LastestCollection />
        <OurPolicy />
    </div>
  )
}

export default Home