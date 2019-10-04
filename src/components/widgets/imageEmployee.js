import React, {Component} from 'react'
import axios from 'axios'
import MenuFurniture from '../menu/menuFurniture'
import MenuFurnitureNoEmployee from '../menu/menuFurnitureNoEmployee'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faCog, faQuestionCircle, faComment, faMugHot } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions';

class ImageEmployee extends Component {
    
    state = {
        employeeImage: './img/avatars/image_null.png',
        employeeName: 'Not assigned',
        employee: {},
        showMenu: false
    }

    componentDidMount() {
        if (this.props.hasEmployee) {
            this.setEmployeeImages(this.props)
        }
    }

    componentWillReceiveProps(next_props){
        if (this.props.data.employee !== null) {
            this.setEmployeeImages(next_props)
        }
    }

    setEmployeeImages(scope) {
        (scope.employees).map((emplo, index) => {
            if (emplo.id === scope.data.employee) {
                this.setState({
                    ...this.state,
                    employeeImage: scope.employees[index].image,
                    employeeName: scope.employees[index].name,
                    employee: scope.employees[index]
                })
            }
        });
    }

    toggleMenu() {
        this.setState({
            ...this.state,
            showMenu: !this.state.showMenu
        })
    }

    resetEmployeeImage() {
        this.setState({
            ...this.state,
            employeeImage: './img/avatars/image_null.png',
            employeeName: 'Not assigned',
        })
    }

    removeEmployee = (employeeId) => {
        /* UPDATE OFFICE */
        const officeArray = this.props.offices[this.props.officeId].resources.slice(0);
        officeArray.map((elem, index) => {
            if (this.props.openMenuId === elem.position){
                elem.employee = null
            }
        })
        let newResourcesListWithoutEmployee = this.props.offices.slice(0)
        newResourcesListWithoutEmployee[this.props.officeId].resources = officeArray;
        axios.put(`http://localhost:4000/office/${this.props.officeId}`, newResourcesListWithoutEmployee[this.props.officeId])
            .then(response => {
                this.props.removeEmployeeFromWorkspace(newResourcesListWithoutEmployee)
                this.resetEmployeeImage()
            });
        
        /* UPDATE EMPLOYEES LIST */
        (this.props.employees).map((employee, index) => {
            if (employee.id === employeeId) {
                const newEmployeeData = employee;
                newEmployeeData.workplace = ''
                newEmployeeData.office = 0
                axios.put(`http://localhost:4000/employee/${employeeId}`, newEmployeeData)
                    .then(response => {
                        let newEmployeesList = this.props.employees.slice(0)
                        newEmployeesList[index] = newEmployeeData
                        this.props.loadEmployeesResources(newEmployeesList)
                    })
            }
        })
    }

    removeFurniture = () => {
        const idFurniture = this.props.data.id
        let newFurnitureList = this.props.offices.slice(0);
        newFurnitureList[this.props.officeId].resources = newFurnitureList[this.props.officeId].resources.filter(
            furniture => furniture.id !== idFurniture
        )
        axios.put(`http://localhost:4000/office/${this.props.officeId}`, newFurnitureList[this.props.officeId])
        .then(response => {
            this.props.loadOfficeResources(newFurnitureList)
            this.props.toggleSellFurniture()
        });
    }

    render() {
        return (
            <>
                { !!this.props.data.needs_employee && !this.props.sellMode?
                    <>
                        <img src={this.state.employeeImage}
                            alt={this.state.employeeName}
                            className={`furnitureWorker ${this.props.data.position === this.props.openMenuId ? 'growAnimation' : ''}`}
                            onClick={() => this.props.toogleWorkplaceMenu(this.props.data.position)}
                        />
                    </>    
                    : ''
                }
                
                { !!this.props.hasEmployee 
                    ? <MenuFurniture
                        show={this.props.data.position === this.props.openMenuId ? true : false}
                        data={this.props.data}
                        removeEmployee={this.removeEmployee}
                        toogleWorksList={this.props.toogleWorksList}
                        employee={this.state.employee}
                        /> 
                    : '' }
                { !this.props.hasEmployee && !!this.props.data.needs_employee
                    ? <MenuFurnitureNoEmployee
                        show={this.props.data.position === this.props.openMenuId ? true : false}
                        toogleEmployeeList={this.props.toogleEmployeeList}
                        data={this.props.data}
                        /> : ''}
                { !this.props.hasEmployee
                    ? <span className={`workplace__menu--sell ${!!this.props.sellMode ? 'active' : ''}`}
                        onClick={() => this.removeFurniture()}
                        ><FontAwesomeIcon icon={faTrashAlt} /></span>
                    : ''
                }
                { this.state.employee.project !== null && this.props.hasEmployee
                    ? <span className={`workplace__menu--working ${!!this.props.sellMode ? 'hidden' : ''}`}
                        ><FontAwesomeIcon icon={faCog} spin /></span>
                    : ''
                }
                { this.state.employee.project === null && this.props.hasEmployee
                    ? <span className={`workplace__menu--waiting ${!!this.props.sellMode ? 'hidden' : ''}`}
                        ><FontAwesomeIcon icon={faQuestionCircle} /></span>
                    : ''
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        offices: state.stats.offices,
        employees: state.stats.employees
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeEmployeeFromWorkspace: (officesList) => dispatch({type: actionTypes.REMOVE_EMPLOYEE_FROM_WORKPLACE, officesList: officesList}),
        loadEmployeesResources: (employees) => dispatch({type: actionTypes.LOAD_EMPLOYEES_RESOURCES, employees: employees}),
        loadOfficeResources: (officeResources) => dispatch({type: actionTypes.LOAD_OFFICE_RESOURCES, offices: officeResources})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageEmployee);