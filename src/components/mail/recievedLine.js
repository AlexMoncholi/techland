import React, {Component} from 'react'

class RecievedLine extends Component {
    render() {
    return (
            <div className={`mailManager__recievedLine ${this.props.data.readed ? '' : 'notReaded'} ${this.props.idSelected === this.props.index ? 'selected' : ''}`} 
                onClick={() => {this.props.selectMail(this.props.index)}}>
                <p className="mailManager__recievedLine--title">{this.props.data.title}</p>
                <p className="mailManager__recievedLine--mailFrom">{this.props.data.mailFrom}</p>
            </div>
        )
    }
}

export default RecievedLine;