import React, {Component} from 'react'
import axios from 'axios'
import OfficeStatistics from '../components/management/officeStatistics'
import OfficeEmployees from '../components/management/officeEmployees'
import Menu from '../components/management/menu'
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux'

class Stats extends Component {

    state = {
        showStats: true,
        showEmployees: false
    }

    componentDidMount() {
        const officeStats = {
            id: 1,
            incomes: [
                {
                    name: 'Proyecto de Schore Inc.',
                    value: 120400,
                    details: []
                },
                {
                    name: 'Mantenimiento de Jandemor.',
                    value: 1200,
                    details: []
                }
            ],
            outcomes: [
                {
                    name: 'Nóminas de los empleados',
                    value: 84230,
                    details: []
                },
                {
                    name: 'Recursos básicos',
                    value: 1390,
                    details: []
                },
                {
                    name: 'Incentivos',
                    value: 0,
                    details: [
                        {
                            name: 'Frutas y bebidas',
                            value: 1000,
                            details: []
                        },
                        {
                            name: 'Pluses por productividad',
                            value: 1000,
                            details: []
                        }
                    ]
                },
            ],
        }
        this.props.loadOfficeStats(officeStats)
    }

    showStats = () => {
        this.setState({
            showStats: true,
            showEmployees: false
        })
    }

    showEmployees = () => {
        this.setState({
            showStats: false,
            showEmployees: true
        });
    }

    render() {
        return (
            <div className="management">
                <Menu showStats={this.showStats} showEmployees={this.showEmployees} />
                <div className={`officeStats ${this.state.showStats ? 'visible' : ''}`}>
                    <div className="management_card">
                        <h1>Ingresos</h1>
                        <OfficeStatistics data={this.props.officeData.incomes} />
                    </div>
                    <div className="management_card">
                        <h1>Gastos</h1>
                        <OfficeStatistics data={this.props.officeData.outcomes} />
                    </div>
                </div>
                <div className={`officeEmployees ${this.state.showEmployees ? 'visible' : ''}`}>
                    <div className="management_card">
                        <h1>Empleados</h1>
                        <OfficeEmployees data={this.props.officeData.employees} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        officeData: state.stats,
        employees: state.employees
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadOfficeStats: (officeStats) => dispatch({type: actionTypes.LOAD_STATS, officeData: officeStats})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);