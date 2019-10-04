import React, {Component} from 'react'
import ListData from '../widgets/listData'

class OfficeStatistics extends Component {

    render() {
        return (
            <div>
                { (this.props.data).map( (element, i) => (
                    <ListData data={element} index={i} key={i} nameOfClass="management__primeData"/>
                )) }
            </div>
        )
    }
}

export default OfficeStatistics;