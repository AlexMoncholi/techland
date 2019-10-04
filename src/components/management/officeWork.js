import React, {Component} from 'react'
import StarsRate from '../widgets/stars'
import ResourceCard from './resourceCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';

import * as axios from 'axios';
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions';

class Work extends Component {
    
    componentDidMount() {
        if (this.props.resources !== null) {
            axios.get(`http://localhost:4000/furniture`)
            .then(response => {
                this.props.loadResources(response.data)
            })
        }
    }

    render() {
        return (
            <li onClick={() => { console.log(this.props) }} className="officeDetails__list--card">
                <div className="officeDetails__list--company">{this.props.data.companyName}</div>
                <div className="officeDetails__list--title">{this.props.data.title}</div>
                <div className="officeDetails__list--end"><span>Dead line:</span> {this.props.data.endDate}</div>
                <div className="officeDetails__list--end"><span>Requerimientos:</span></div>
                <div>
                    <ul className="officeDetails__list--container">
                        <li className="officeDetails__list--requirement">
                            <FontAwesomeIcon icon={faUser} /><span className="rounded">{ this.props.data.resourcesNeeded[0].numberEmployees }</span>
                        </li>
                        {(this.props.data.resourcesNeeded[0].resources).map((element, index) => (
                            <ResourceCard data={element} key={index} resources={this.props.resources} />
                        ))}
                    </ul>
                </div>
                <div className="officeDetails__list--importantInfo">
                    <div className="officeDetails__list--stars"><StarsRate number={this.props.data.dificulty} /></div>
                    <div className="officeDetails__list--money">1500 €</div>
                </div>
            </li>
        )
    }
}

const mapStateToProps = state => {
    return {
        resources: state.game.resources
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadResources: (resources) => dispatch({type: actionTypes.LOAD_GENERAL_OFFICE_RESOURCES, resources: resources})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work);