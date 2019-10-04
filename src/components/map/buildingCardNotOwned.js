import React, {Component} from 'react'

const visibleCard = (cardVisible) => {
    return cardVisible ? 'visible' : ''
}

class ManagementCardNotOwned extends Component {
    render() {
        return (
            <div className={`fichaTecnica ${visibleCard(this.props.data.cardVisible)}`}>
                <div className="closeButton" onClick={() => this.props.onClickAction()}>X</div>
                <h2 className="fichaTecnica__notOwned">¡Oficina disponible!</h2>
                <div className="fichaTecnica__data">
                    <p>Alquiler: {this.props.data.rentPrice} € / Mes</p>
                    <p>Venta: {this.props.data.sellPrice} €</p>
                    <p>{this.props.data.size} m2</p>
                </div>
                <span className="fichaTecnica__link--manage" onClick={() => this.props.togglePopup(1)}>
                    <p>Comprar</p>
                </span>
                <span className="fichaTecnica__link--details" onClick={() => this.props.togglePopup(2)}>
                    <p>Alquilar</p>
                </span>
            </div>
        )
    }
};

export default ManagementCardNotOwned;