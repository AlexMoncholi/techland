import React, {Component} from 'react'
import ManagementCard from './buildingCard'
import ManagementCardNotOwned from './buildingCardNotOwned'

import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions';

class Building extends Component {

    toggleCard = (cardIndex) => {
        const cardToToggle = cardIndex ? cardIndex : this.props.index
        let newCityMap = {...this.props.officeData}
        newCityMap[cardToToggle].cardVisible = !newCityMap[cardToToggle].cardVisible 
        this.props.onOfficeSelected(newCityMap, cardToToggle)
    }

    render() {
        const classOwned = this.props.building.owned ? 'owned' : 'not owned'

        return (
            <div className="buildingDescription">
                <h1 onClick={() => {this.toggleCard()}}>Edificio {this.props.index} {classOwned}</h1>
                <div className="building">
                    <div className="building__street"></div>
                    <div className="building__frontview"></div>
                    <div className="building__sideview"></div>
                    <div className="building__roof"></div>
                </div>
                { this.props.building.owned
                    ? <ManagementCard data={this.props.building} onClickAction={this.toggleCard} index={this.props.index}/>
                    : <ManagementCardNotOwned data={this.props.building}
                        onClickAction={this.toggleCard}
                        index={this.props.index}
                        togglePopup={this.props.togglePopup}
                        />
                    
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        officeData: state.cityMap
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOfficeSelected: (officeConfig, index) => dispatch({type: actionTypes.SELECT_OFFICE, officeData: officeConfig, index: index})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Building);