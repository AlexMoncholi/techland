import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class MainMenu extends Component {

    render() {
        return (
            <ul className="mainMenu">
                <li><Link to="/">Mapa</Link></li>
                <li><Link to="/mail">Mail</Link></li>
            </ul>
        )
    }
}

export default MainMenu;