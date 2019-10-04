import React from 'react'
import StarsRate from '../../components/widgets/stars'
import { Link } from 'react-router-dom'

const visibleCard = (cardVisible) => {
    return cardVisible ? 'visible' : ''
}

const managementCard = (props) => (
    <div className={`fichaTecnica ${visibleCard(props.data.cardVisible)}`}>
        <div className="closeButton" onClick={() => props.onClickAction()}>X</div>
        <h2>{props.data.name}</h2>
        <div className="fichaTecnica__data">
            <div><StarsRate number={props.data.importance} /></div>
            <p>Alquiler: {props.data.rentPrice} € / Mes</p>
            <p>Venta: {props.data.sellPrice} €</p>
            <p>{props.data.size} m2</p>
            <p>Número de empleados: {props.data.employees.length}</p>
            <p>Valor del interior: {props.data.internalValue} €</p>
        </div>
        <Link to="/officestats" className="fichaTecnica__link--manage">
            <p>Gestionar</p>
        </Link>
        <Link to={`/officedetails?id=${props.data.id}`} className="fichaTecnica__link--details">
            <p>Detalles</p>
        </Link>
    </div>
);

export default managementCard;