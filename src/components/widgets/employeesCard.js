import React, {Component} from 'react'
import StarsRate from '../../components/widgets/stars'

class EmployeesCard extends Component {
    
    render() {
        return (
            <div className="employees__card">
                <div className="employees__card--image"><img src={this.props.data.image} alt="" /></div>
                <div className="employees__card--name">{this.props.data.name}</div>
                <div className="employees__card--stars">Nivel: <StarsRate number={this.props.data.experience} /></div>
                <div className="employees__card--age">Edad: {this.props.data.age}</div>
                <div className="employees__card--salary">Salario: {this.props.data.salary > 0 ? `${this.props.data.salary} €` : '' }</div>
                <div className="employees__card--workplace">Puesto: {this.props.data.workplace}</div>
                <div className="employees__card--happyness">{this.props.data.happyness}</div>
                <div>Despedir</div>
            </div>
        )
    }
}

export default EmployeesCard;