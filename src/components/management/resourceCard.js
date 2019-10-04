import React, {Component} from 'react'
import * as axios from 'axios';

class ResourceCard extends Component {

    state = {
        resource: ''
    }

    componentWillReceiveProps(next_props){
        (next_props.resources).map((category, index) => {
            (category.elements).map((element, i) => {
                // console.log(element, this.props.data)
                if (element.id === this.props.data) {
                    this.setState({
                        resource: element.image
                    })
                }
            })
        })
    }

    render() {
        return (
            <li className="officeDetails__list--requirement">
                <div><img src={`/img/furniture/${this.state.resource}`} alt="" /></div>
            </li>
        )
    }
}

export default ResourceCard;