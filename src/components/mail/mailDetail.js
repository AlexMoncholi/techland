import React, {Component} from 'react'
import StarsRate from '../widgets/stars'

class MainMenu extends Component {

    options() {
        switch(this.props.data.mailDetails.type){
            case 1:
                return (
                    <div className="mailActions">
                        <div className="contractDificulty">Dificultad: <span><StarsRate number={this.props.data.mailDetails.dificulty} /></span></div>
                        <p>presupuesto: 2000</p>
                        <div>
                            <span className="button_accept">Enviar</span><span className="button_reject">Cancelar</span>
                        </div>
                    </div>)
                break;
            case 2:
                return (<div className="mailActions"><span className="button_accept">Aceptar</span><span className="button_reject">Rechazar</span></div>)
                break;
            case 3:
                return (<div className="mailActions"><span className="button_accept">Guardar</span><span className="button_reject">Rechazar con un mensaje delicado por las molestias que se ha tomado en escribir</span></div>)
                break;
        }
    }

    render() {
        return (
            <>
                <h1>{this.props.data.mailDetails.title}</h1>
                <h2><span className="chip">{this.props.data.mailDetails.mailFrom}</span></h2>
                <div dangerouslySetInnerHTML={{__html: this.props.data.mailDetails.text}}></div>
                { 
                    this.options()
                 }
            </>
        )
    }
}

export default MainMenu;