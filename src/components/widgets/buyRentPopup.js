import React, {Component} from 'react'

class BuyRentPopup extends Component {

    render(data) {
        return (
            <div className={`popup__background ${this.props.data.showPopup ? 'visible' : ''}`}>
                <div className="popup">
                    <div className="closeButton" onClick={() => {this.props.onClickAction()}}>X</div>
                    <h2 className="warning">¡Aviso!</h2>
                    <p>¿Está seguro de que desea <span className="action">{this.props.data.word}</span> ésta oficina?</p>
                    <div className="popup__options">
                        <span className="button_accept">Aceptar</span>
                        <span className="button_reject" onClick={() => {this.props.onClickAction()}}>Cancelar</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuyRentPopup;