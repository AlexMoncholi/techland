import React, {Component} from 'react'

class ListData extends Component {
    
    render() {
        return (
            <div className={this.props.nameOfClass}>
                <div className="management__topic">{this.props.data.name}</div>
                <div className="management__value">{this.props.data.value > 0 ? `${this.props.data.value} €` : '' }</div>
                {
                    this.props.data.details.length > 0 ? 
                        (this.props.data.details).map((element, i) => (
                            <ListData data={element} index={i} key={i} nameOfClass="management__subData" />
                        ))
                        : ''
                }
            </div>
        )
    }
}

export default ListData;