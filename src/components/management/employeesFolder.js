import React, {Component} from 'react'
import StarsRate from '../widgets/stars'

class EmployeesFolder extends Component {

    constructor(props){
        super(props);
        this.state = {
            freeEmployees: [],
            busyEmployees: []
        }
    }

    componentWillReceiveProps(next_props){
        let freeEmployees = [];
        let busyEmployees = [];
        (next_props.employees).map((elem) => {
            if (elem.workplace !== "") {
                busyEmployees = busyEmployees.concat(elem)
            } else {
                freeEmployees = freeEmployees.concat(elem)
            }
        })
        this.setState({
            ...this.state,
            freeEmployees: freeEmployees,
            busyEmployees: busyEmployees
        })
    }

    render() {
        return (
            <>
                <div className={`officeDetails__background ${this.props.parentState.showEmployeeList ? 'visible' : ''}`} onClick={() => { this.props.toogleEmployeeList() }}></div>
                    <div className={`officeDetails__paper ${this.props.parentState.showEmployeeList ? 'visible' : ''}`}>
                        <div className="closeButton" onClick={() => { this.props.toogleEmployeeList() }}>X</div>
                        <h1>Empleados disponibles</h1>
                        <ul className="officeDetails__list">
                            {   this.state.freeEmployees.length === 0 ?
                                <li>No hay empleados disponibles</li>
                                :
                                (this.state.freeEmployees).map((elem, index) => (
                                    <li key={`freeStars_${index}`} className="freeEmployees" onClick={() => this.props.actionOnFreeEmployee(elem)}>
                                        <p className="officeDetails__list--image"><img src={elem.image} alt=""/></p>
                                        <div className="officeDetails__list--stars"><StarsRate number={elem.experience} /></div>
                                        <p className="officeDetails__list--name">{elem.name}</p>
                                        <p className="officeDetails__list--salary">{elem.salary} €/mes</p>
                                    </li>
                            )) }
                        </ul>
                        <h1>Empleados ocupados</h1>
                        <ul className="officeDetails__list busy">
                            { (this.state.busyEmployees).map((elem, index) => (
                                <li key={`busyStars_${index}`}  onClick={() => this.props.actionOnBusyEmployee(elem)}>
                                    <p className="officeDetails__list--image"><img src={elem.image} alt="" className=""/></p>
                                    <div className="officeDetails__list--stars"><StarsRate number={elem.experience}/></div>
                                    <p className="officeDetails__list--name">{elem.name}</p>
                                    <p className="officeDetails__list--salary">{elem.salary} €/mes</p>
                                </li>
                            )) }
                        </ul>
                    </div>
            </>
        )
    }
}

export default EmployeesFolder;