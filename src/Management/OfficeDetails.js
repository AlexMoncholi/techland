import React, {Component} from 'react'
import OfficeMenu from '../components/management/officeMenu'
import Popup from '../components/widgets/popup'
import ImageEmployee from '../components/widgets/imageEmployee'
import ImageFurniture from '../components/widgets/imageFurniture'
import OfficeDraw from '../components/map/officeDraw'
import EmployeesFolder from '../components/management/employeesFolder';
import WorkList from '../components/management/officeWorkList'

import * as axios from 'axios';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

class Stats extends Component {

    constructor(props){
        super(props)
        this.menuElement = React.createRef()
        this.state = {
            showPopup: false,
            word: '',
            popUpTitle: '¡Acción de compra!',
            showTableGrid: false,
            sellMode: false,
            newFurniture: {},
            officeId: 0,
            position: 0,
            workplaceOpened: -1,
            showEmployeeList: false,
            showWorksList: false,
            employees: [],
            works: []
        }
    }

    componentDidMount() {
        const officeId = (this.props.location.search).split('?id=')
        this.setState({
            ...this.state,
            officeId: parseInt(officeId[1])
        })
        if (typeof(this.props.offices[officeId[1]]) === "undefined") {
            axios.get(`http://localhost:4000/office/${this.props.location.search}`)
            .then(response => {
                this.props.loadOfficeResources(response.data[0])
            })
        }
        if (this.props.employees.length === 0) {
            axios.get(`http://localhost:4000/employee`)
            .then(response => {
                this.props.loadEmployeesResources(response.data)
                this.setState({
                    ...this.state,
                    employees: response.data
                })
            })
        }
        if (this.props.works.length === 0) {
            axios.get(`http://localhost:4000/works`)
            .then(response => {
                this.props.loadOfficeWorks(response.data)
                this.setState({
                    ...this.state,
                    works: response.data
                })
            })
        }
    }

    addNewFurnitureToUserResources = (position) => {
        const newFurniture = {
            id: null,
            fk_resource: this.state.newFurniture.id,
            name: this.state.newFurniture.name,
            employee: null,
            position: position,
            image: this.state.newFurniture.image,
            image_back: this.state.newFurniture.image_back,
            css_char: this.state.newFurniture.css_char,
            needs_employee: this.state.newFurniture.needs_employee
        }
        let newResourcesList = this.props.offices.slice(0)
        newResourcesList.map((office, index) => {
            if (office.id === this.state.officeId) {
                newFurniture.id = Math.floor(Math.random() * 1000) + 1;
                newResourcesList[index].resources = newResourcesList[index].resources.concat(newFurniture)
                axios.put(`http://localhost:4000/office/${this.state.officeId}`, newResourcesList[index])
                    .then(response => {
                        this.props.addOfficeResources(newResourcesList)
                        this.setState({
                            ...this.state,
                            showTableGrid: !this.state.showTableGrid
                        })
                    });
            }
        })
    }

    assignNewEmployeeToFurniture = (employee) => {
        let employeeToUpdate = (this.props.employees).slice(0);
        (this.props.employees).map((employeeMap, index) => {
            if (employeeMap.id === employee.id) {
                /* UPDATE EMPLOYEE */
                employeeToUpdate[index].workplace = this.state.workplaceOpened
                employeeToUpdate[index].office = this.state.officeId
                axios.put(`http://localhost:4000/employee/${employee.id}`, employeeToUpdate[index])
                .then(response => {
                    this.props.loadEmployeesResources(employeeToUpdate)
                });
                /* UPDATE FURNITURE */
                let furnitureToUpdate = (this.props.offices).slice(0);
                (this.props.offices[this.state.officeId].resources).map((furnitureMap, indexFurni) => {
                    if(furnitureMap.position === this.state.workplaceOpened){
                        furnitureToUpdate[this.state.officeId].resources[indexFurni].employee = employee.id
                        axios.put(`http://localhost:4000/office/${this.state.officeId}`, furnitureToUpdate[this.state.officeId])
                        .then(response => {
                            this.props.loadOfficeResources(furnitureToUpdate)
                            this.createFurniture()
                            this.toogleEmployeeList()
                        });
                    }
                })
            }
        });
    }

    togglePopup = (furnitureData = {}) => {
        this.setState({
            ...this.state,
            showPopup: !this.state.showPopup,
            newFurniture: furnitureData
        })
    }

    toggleTableGrid = () => {
        this.setState({
            ...this.state,
            showPopup: !this.state.showPopup,
            showTableGrid: !this.state.showTableGrid,
            workplaceOpened: -1
        })
        this.menuElement.current.showCategory()
    }

    toogleWorkplaceMenu = (position) => {
        const positionForOpeningMenu = this.state.workplaceOpened === position ? -1 : position
        this.setState({
            ...this.state,
            workplaceOpened: positionForOpeningMenu
        })
    }

    toogleEmployeeList = (pos) => {
        let newPosition = !!pos ? pos : null
        this.setState({
            ...this.state,
            position: newPosition,
            showEmployeeList: !this.state.showEmployeeList
        })
    }

    toogleWorksList = (pos) => {
        let newPosition = !!pos ? pos : null
        this.setState({
            ...this.state,
            workplaceOpened: -1,
            position: newPosition,
            showWorksList: !this.state.showWorksList
        })
    }

    toggleSellFurniture = (furniture) => {
        this.setState({
            ...this.state,
            workplaceOpened: -1,
            showWorksList: false,
            showEmployeeList: false,
            sellMode: !this.state.sellMode
        })
    }

    createFurniture = () => {
        let table = []
        const arrayFurniture = (typeof(this.props.offices[this.state.officeId]) !== "undefined") 
            ? (this.props.offices[this.state.officeId]).resources.slice(0)
            : []
        arrayFurniture.map((elem, index) =>
            table.push (
                <div className={`furniture ${elem.css_char}${elem.position}`} key={elem.position}>
                    <ImageFurniture data={elem} key={`Furniture_${index}`} />
                    <ImageEmployee data={elem}
                        openMenuId={this.state.workplaceOpened}
                        key={index}
                        officeId={this.state.officeId}
                        sellMode={this.state.sellMode}
                        hasEmployee={!!elem.employee ? true : false}
                        toggleSellFurniture={this.toggleSellFurniture}
                        toogleWorkplaceMenu={this.toogleWorkplaceMenu}
                        toogleWorksList={this.toogleWorksList}
                        toogleEmployeeList={this.toogleEmployeeList}
                    />
                </div>
            )
        )

        return table
    }

    createGrid() {
        const that = this
        let grid = []
        let existFurnitureInSquare = false
        const arrayFurniture = (typeof(this.props.offices[this.state.officeId]) !== "undefined") 
        ? ( this.props.offices[this.state.officeId].resources).slice(0)
        : []
        for(let i=0; i<3; i++) {
            for(let j=0; j<2; j++) {
                arrayFurniture.map((elem, index) => {
                    if (`${i}${j}` === elem.position) {
                        existFurnitureInSquare = true
                    }
                })
                if (!existFurnitureInSquare) {
                    grid.push(
                        <div className={`marker posicion_${i}${j}`} onClick={() => {this.addNewFurnitureToUserResources(`${i}${j}`)}} key={`${i}${j}`}></div>
                    )
                }
                existFurnitureInSquare = false
            }
        }
        return grid
    }

    render() {
        return (
            <div className="officeDetails">
                <div className="officeStatsDetails">
                    <h1>Detalles de la oficina</h1>
                </div>
                <div className="moneyMarker"><span>€</span><p>135,548</p></div>
                <div className="officeContainer">
                    <div className="officeFloor">
                        <div className={`officeTablesGrid ${this.state.showTableGrid ? 'visible' : ''}`}>
                            {this.createGrid()}
                        </div>
                    </div>
                    <OfficeDraw />
                    { this.createFurniture() }
                </div>
                <EmployeesFolder
                    parentState={this.state}
                    employees={this.props.employees}
                    toogleEmployeeList={this.toogleEmployeeList}
                    actionOnFreeEmployee={this.assignNewEmployeeToFurniture}
                />
                <WorkList
                    parentState={this.state}
                    data={this.props.works}
                    toogleWorksList={this.toogleWorksList}
                />
                <OfficeMenu 
                    onClickAction={this.togglePopup} 
                    data={this.state} 
                    resetMenu={this.resetMenu}
                    ref={this.menuElement}
                    toggleSellFurniture={this.toggleSellFurniture}
                    sellMode={this.state.sellMode}
                />
                <Popup onClickAction={this.togglePopup} onAcceptAction={this.toggleTableGrid} data={this.state} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        offices: state.stats.offices,
        employees: state.stats.employees,
        works: state.stats.works
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addOfficeResources: (officeResources) => dispatch({type: actionTypes.ADD_OFFICE_RESOURCES, offices: officeResources}),
        loadOfficeResources: (officeResources) => dispatch({type: actionTypes.LOAD_OFFICE_RESOURCES, offices: officeResources}),
        loadOfficeWorks: (works) => dispatch({type: actionTypes.LOAD_OFFICE_WORKS, works: works}),
        loadEmployeesResources: (employees) => dispatch({type: actionTypes.LOAD_EMPLOYEES_RESOURCES, employees: employees})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);