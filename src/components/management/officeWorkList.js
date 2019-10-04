import React, {Component} from 'react'
import Work from './officeWork'

class WorkList extends Component {
    render() {
        return (
            <>
                <div className={`officeDetails__background ${this.props.parentState.showWorksList ? 'visible' : ''}`} onClick={() => { this.props.toogleWorksList() }}></div>
                <div className={`officeDetails__paper ${this.props.parentState.showWorksList ? 'visible' : ''}`}>
                    <div className="closeButton" onClick={() => { this.props.toogleWorksList() }}>X</div>
                    <h1>TRABAJOS PENDIENTES</h1>
                        <ul className="officeDetails__list officeDetail__paper--continuous">
                            { (this.props.data).map( (work, index) => (
                                <Work data={work} key={index} />
                            )) }
                        </ul>
                </div>
            </>
        )
    }
}

export default WorkList;