import React, {Component} from 'react'
import Building from '../components/map/building'
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions';
import MainMenu from '../components/mainMenu/mainMenu';
import BuyRentPopup from '../components/widgets/buyRentPopup'

class Islands extends Component {

    state = {
        showPopup: false,
        word: ''
    }

    componentDidMount() {
        if (this.props.cityData.length === 0) {
            const cityConfig = [
                {
                    id: 1,
                    cardVisible: false,
                    type: 1,
                    owned: true,
                    name: 'Oficina 1',
                    rentPrice: 1000,
                    sellPrice: 300000,
                    size: 200,
                    internalValue: 8000,
                    importance: 3.5,
                    employees: [
                        {
                            name: 'Alejandro Moncholí García',
                            age: 36,
                            experience: 4
                        },
                        {
                            name: 'Rocío Lillo',
                            age: 32,
                            experience: 1
                        },
                    ]
                },
                {
                    id: 2,
                    cardVisible: false,
                    type: 2,
                    owned: false,
                    rentPrice: 1000,
                    sellPrice: 300000,
                    size: 200,
                    internalValue: 8000,
                    importance: 0,
                    employees: []
                },
                {
                    id: 3,
                    cardVisible: false,
                    type: 1,
                    owned: false,
                    rentPrice: 1000,
                    sellPrice: 300000,
                    size: 200,
                    internalValue: 0,
                    importance: 0,
                    employees: []
                },
                {
                    id: 3,
                    cardVisible: false,
                    type: 1,
                    owned: false,
                    rentPrice: 1000,
                    sellPrice: 300000,
                    size: 200,
                    internalValue: 0,
                    importance: 0,
                    employees: []
                },
                {
                    id: 4,
                    cardVisible: false,
                    type: 1,
                    owned: true,
                    name: 'Oficina 2',
                    rentPrice: 1000,
                    sellPrice: 300000,
                    size: 200,
                    internalValue: 8000,
                    importance: 1.5,
                    employees: [
                        {
                            name: 'Alejandro Moncholí García',
                            age: 36,
                            experience: 4
                        },
                        {
                            name: 'Rocío Lillo',
                            age: 32,
                            experience: 1
                        },
                    ]
                }
            ]
            this.props.onCitySelected(cityConfig)
        }
    }

    togglePopup = (actionNumber) => {
        let finalWord = ''
        switch (actionNumber) {
            case 1:
                finalWord = 'COMPRAR';
                break;
            case 2:
                finalWord = 'ALQUILAR';
                break;
        }
        this.setState({
            ...this.state,
            showPopup: !this.state.showPopup,
            word: finalWord
        })
    }


    render() {
        return (
            <div className={`island__field ${this.state.showPopup ? 'blur' : null}`}>
                <MainMenu />
                <BuyRentPopup onClickAction={() => {this.togglePopup()}} data={this.state} />
                { (this.props.cityData).map( (building, i) => (
                    <Building building={building} index={i} key={i}
                        togglePopup={this.togglePopup}
                    />
                )) }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cityData: state.cityMap
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCitySelected: (cityConfig) => dispatch({type: actionTypes.SELECT_CITY, cityData: cityConfig})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Islands);