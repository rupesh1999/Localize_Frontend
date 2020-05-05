import React from 'react'
import Navigation from '../../Components/Layout/Navigation'

const Home = (props)=>{
    return(
        <div>
            <Navigation {...props} />
            <h4>
             This is Home Page
             </h4>
        </div>
    )
}
export default Home