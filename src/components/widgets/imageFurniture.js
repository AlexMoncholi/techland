import React, {Component} from 'react'

class ImageFurniture extends Component {

    checkImageSide(elem) {
        let imageForGrid = ''
        if (elem.css_char === "food_" && elem.position[1] === '0') {
            imageForGrid = elem.image_back
        } else {
            imageForGrid = elem.image
        }

        return imageForGrid
    }

    render() {
        return (
            <>
                <img src={`./img/furniture/${this.checkImageSide(this.props.data)}`} alt={this.props.data.name} className="imgFurniture" />
            </>
        )
    }
}

export default ImageFurniture;