import React, {Component} from 'react'

class MenuFurnitureNoEmployee extends Component {
    render() {
        return (
            <div className="furnitureOptions">
                <div className={`workplace__menu ${!!this.props.show ? 'visible' : ''}`}>
                    <ul className="workplace__menu--options">
                        <li onClick={() => this.props.toogleEmployeeList(this.props.data.position)}>Asignar un empleado a éste puesto</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default MenuFurnitureNoEmployee;