import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Menu extends Component {

    render(data) {
        return (
            <ul className="mainMenu">
                <li><Link to="/city">Volver</Link></li>
                <li onClick={() => { this.props.showStats() }}>Estadisticas</li>
                <li onClick={() => { this.props.showEmployees() }}>Empleados</li>
            </ul>
        )
    }
}

export default Menu;