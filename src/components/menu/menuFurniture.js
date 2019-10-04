import React, {Component} from 'react'

class MenuFurniture extends Component {
    render() {
        return (
            <div className="furnitureOptions">
                <div className={`workplace__menu ${!!this.props.show ? 'visible' : ''}`}>
                    <ul className="workplace__menu--options">
                        <li onClick={() => this.props.removeEmployee(this.props.data.employee)}>Quitar empleado de puesto</li>
                        { this.props.employee.project === null
                            ? <li onClick={() => this.props.toogleWorksList()}>Asignar trabajo</li>
                            : <li>Quitar del trabajo</li>
                        }
                        <li>Ver ficha de empleado</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default MenuFurniture;