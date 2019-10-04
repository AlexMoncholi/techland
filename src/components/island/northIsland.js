import React from 'react'
import { Link } from 'react-router-dom'
import city from '../../img/city.png'

const northIsland = () => {
    return (
        <div>
            <Link to='/city'>
                <div className="northIsland__land">
                    <h1>ISLA DEL NORTE</h1>
                    <img src={city} title="" alt="" />
                </div>
            </Link>
        </div>
    )
}

export default northIsland;