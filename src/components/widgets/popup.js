import React, {Component} from 'react'

class BuyRentPopup extends Component {

    render() {
        return (
            <div className={`popup__background ${this.props.data.showPopup ? 'visible' : ''}`}>
                <div className="popup">
                    <div className="closeButton" onClick={() => {this.props.onClickAction()}}>X</div>
                    <h2 className="warning">{this.props.data.popUpTitle}</h2>
                    <div className="popup__content">
                        <p>¿Está seguro de que desea comprar <span className="action">{this.props.data.newFurniture.name}</span>?</p>
                    </div>
                    <div className="popup__options">
                        <span className="button_accept" onClick={() => {this.props.onAcceptAction()}}>Aceptar</span>
                        <span className="button_reject" onClick={() => {this.props.onClickAction()}}>Cancelar</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuyRentPopup;