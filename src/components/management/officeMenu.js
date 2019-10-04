import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class OfficeMenu extends Component {

    state = {
        selectedMenu: -1,
        categories: [
            {
                id: 1,
                name: 'Comida',
                elements: [
                    {
                        id: 1,
                        name: 'Cafetera',
                        price: 100,
                        image: "table_coffee.png",
                        image_back: "table_coffee.png",
                        css_char: "furniture_",
                        needs_employee: false
                    },
                    {
                        id: 2,
                        name: 'Maquina de café para oficina',
                        price: 500,
                        image: "coffee_machine.png",
                        image_back: "coffee_machine_back.png",
                        css_char: "food_",
                        needs_employee: false
                    },
                    {
                        id: 3,
                        name: 'Máquina de vending',
                        price: 1200,
                        image: "food_machine.png",
                        image_back: "food_machine_back.png",
                        css_char: "food_",
                        needs_employee: false
                    }
                ]
            },
            {
                id: 2,
                name: 'Oficina',
                elements: [
                    {
                        id: 4,
                        name: 'Escritorio simple',
                        price: 1000,
                        image: "table_3.png",
                        css_char: "furniture_",
                        needs_employee: true
                    },
                    {
                        id: 5,
                        name: 'Escritorio con ordenador',
                        price: 2400,
                        image: "table_computer.png",
                        css_char: "furniture_",
                        needs_employee: true
                    },
                    {
                        id: 6,
                        name: 'Armario de suministros',
                        price: 800,
                        image: "office_supplies_cabinet.png",
                        image_back: "office_supplies_cabinet_back.png",
                        css_char: "food_",
                        needs_employee: false
                    },
                    {
                        id: 7,
                        name: 'Impresora',
                        price: 200,
                        image: "table_computer.png",
                        css_char: "furniture_",
                        needs_employee: true
                    }
                ]
            },
            {
                id: 3,
                name: 'Decoración',
                elements: [
                    {
                        id: 8,
                        name: 'Planta',
                        price: 20,
                        image: "table_computer.png",
                        css_char: "furniture_",
                        needs_employee: false
                    },
                    {
                        id: 9,
                        name: 'Cuadro',
                        price: 30,
                        image: "table_computer.png",
                        css_char: "furniture_",
                        needs_employee: false
                    }
                ]
            }
        ]
    }

    showCategory = (idSelected) => {
        this.setState({
            selectedMenu: idSelected === this.state.selectedMenu ? -1 : idSelected
        });
    }


    render() {
        return (
            <ul className="mainMenu">
                <li><Link to="/city">Volver</Link></li>
                {(this.state.categories).map((category, i) => (
                    <li className={this.state.selectedMenu === category.id ? 'selected' : '' } key={i}><a onClick={() => this.showCategory(category.id)} className="option">{category.name}</a>
                        <div className="mainMenu__office--submenu">
                            <ul>
                                { (category.elements).map((elem, index) => (
                                    <li key={index} onClick={() => {this.props.onClickAction(elem)}}>
                                        <span className="mainMenu__office--name">{elem.name}</span>
                                        <span className="mainMenu__office--price">{elem.price} €</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
                <li className={`menuSell ${!!this.props.sellMode ? 'active' : ''}`} onClick={() => {this.props.toggleSellFurniture()}}><FontAwesomeIcon icon={faTrashAlt} /></li>

            </ul>
        )
    }
}

export default OfficeMenu;