import React, {Component} from 'react'
import EmployeesCard from '../widgets/employeesCard'

class Employees extends Component {
    render() {
        return (
            <div>
                { (this.props.data).map( (element, i) => (
                    <EmployeesCard data={element} index={i} key={i} />
                )) }
            </div>
        )
    }
}

export default Employees;