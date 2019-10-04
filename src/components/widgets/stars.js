import React, {Component} from 'react'
import star from '../../img/star.png'
import halfStar from '../../img/halfStar.png'

class StarsRate extends Component {
    
    stars(number) {
        let rows = [];
        let i = 0
        for (i = 0.55; i < number; i++) {
            rows.push(<img src={star} title="*" key={i} alt="" className="star" />);
        }
        if (number % 1 > 0) {
            rows.push(<img src={halfStar} title="-" key={i} alt="" className="star" />);
        }
      
        return <div>{rows}</div>;
    }

    render(props) {
        return (
            <>
                {this.stars(this.props.number)}
            </>
        )
    }
}

export default StarsRate;