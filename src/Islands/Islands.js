import React, {Component} from 'react'
import NorthIsland from '../components/island/northIsland';
import SouthIsland from '../components/island/southIsland';
import MainMenu from '../components/mainMenu/mainMenu';

class Islands extends Component {
    render() {
        return (
            <div className="deepBlueSea">
                <MainMenu />
                <NorthIsland />
                <SouthIsland />
            </div>
        )
    }
}

export default Islands;