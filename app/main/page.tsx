import React from 'react'
import FarmChain from '../components/farm_chain/farmchain'
import RequireAuth from '../components/RequireAuth'

const Mainpage = () => {
  return (
    <div>
        <RequireAuth>

        <FarmChain />
        
        </RequireAuth>
      
    </div>
  )
}

export default Mainpage
