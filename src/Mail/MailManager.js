import React, {Component} from 'react'
import MainMenu from '../components/mainMenu/mainMenu';
import RecievedLine from '../components/mail/recievedLine';
import MailDetail from '../components/mail/mailDetail';
import WelcomeMessage from '../components/mail/welcomeMessage';

import axios from 'axios'
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions';

class MailManager extends Component {
    state = {
        idSelected: -1,
        mailDetails: {
            text: 'Cosa de bienvenida'
        }
    }

    componentDidMount() {
        if (this.props.mails.length === 0) {
            axios.get('http://localhost:4000/emails')
                .then(response => {
                    this.props.onMailManagerSelected(response.data)
                })
            const mailsList = [
                {
                    id: 1,
                    selected: false,
                    title: 'Presupuesto para App',
                    mailFrom: 'pollastredelmercat@fjafj.com',
                    text: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a porttitor massa. Aenean nisl ante, mattis vitae ipsum et, efficitur lacinia purus. Sed at orci ullamcorper diam pulvinar rutrum. Curabitur finibus libero ac iaculis gravida. Quisque quis risus sit amet est consectetur aliquet. Etiam tincidunt tellus in augue semper mollis. Morbi faucibus bibendum lacus, vel pretium odio cursus sed. Sed nibh tortor, condimentum nec ipsum vel, cursus gravida augue. Vivamus vel sagittis tortor. Nulla facilisi. Donec suscipit maximus ante, et interdum lorem congue vitae. Pellentesque ultrices ornare purus nec iaculis. Sed ac tortor elementum, vestibulum sem et, consectetur orci. Fusce elementum, libero ut tempor tincidunt, arcu augue consequat augue, a aliquet ante ex malesuada dui. Phasellus luctus molestie nulla nec pretium.</p>
                    <p>Nullam tincidunt finibus nisl at mattis. Nullam cursus blandit urna, id hendrerit orci gravida id. Donec posuere mauris lacus, vel tincidunt quam posuere non. Phasellus congue, ipsum in condimentum semper, ipsum arcu maximus lorem, id placerat metus libero sed lectus. Cras fringilla pharetra nunc, vel auctor lacus euismod et. Pellentesque hendrerit facilisis lacus at lacinia. Nam at purus non orci imperdiet dictum eget vitae enim. Etiam posuere lacus leo, in mollis odio aliquam ac. Donec tempus nisi quam, nec porta metus pharetra aliquam. Sed a posuere massa, quis dapibus leo. Phasellus est leo, placerat sed feugiat sit amet, dignissim quis nisi. Mauris tempus consectetur tellus quis convallis.</p>`,
                },
                {
                    id: 2,
                    selected: false,
                    title: 'Contrato de Web',
                    mailFrom: 'tridishijosdeputa@fjafj.com',
                    text: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate ex diam, et convallis augue gravida eleifend. Aliquam erat volutpat. Mauris gravida, neque nec hendrerit cursus, purus eros pulvinar nulla, vel malesuada est diam eget tellus. Cras ultricies ullamcorper ultricies. Praesent tristique felis pharetra, vehicula lacus eu, molestie orci. Vestibulum sollicitudin ligula nunc, eu maximus magna imperdiet et. Aliquam convallis vulputate aliquam.</p>
                    <p>Donec ut lacus in augue tempus feugiat quis vitae leo. Mauris vel pulvinar enim. Integer non viverra lectus. Curabitur posuere auctor aliquam. Quisque tempor dapibus convallis. Donec ornare metus risus, hendrerit mollis nunc dictum malesuada. In vulputate, eros nec vestibulum fringilla, mauris ipsum consectetur libero, vitae efficitur orci tellus id elit.</p>`
                },
                {
                    id: 3,
                    selected: false,
                    title: 'Currículum de Reinaldo de Francia',
                    mailFrom: 'reideFran@fjafj.com',
                    text: 'hasdjhsadkjashdkjhaskjdhaskjdh a skhas kjhdsakj haskj aksjd haksjdh kasjdhaksh daksd'
                },
            ]
            // this.props.onMailManagerSelected(mailsList)
        }
    }

    selectMail = (id) => {
        if (this.state.idSelected === id) {
            this.setState({
                idSelected: -1,
                mailDetails: {}
            })
        } else {
            this.props.mails[id].readed = true
            this.setState({
                idSelected: id,
                mailDetails: this.props.mails[id]
            })
        }
    }

    render() {
        return (
            <>
                <MainMenu />
                <div className="mailManager">
                    <div className="mailManager__options">
                        <ul>
                            <li>Bandeja de entrada</li>
                            <li>Bandeja de salida</li>
                            <li>Currículums</li>
                            <li>Spam</li>
                        </ul>
                    </div>
                    <div className="mailManager__mails customScroll">
                        {
                            (this.props.mails).map((mail, index) => (
                                <RecievedLine data={mail} key={index} index={index} selectMail={this.selectMail} idSelected={this.state.idSelected} />
                            ))
                        }
                    </div>
                    <div className="mailManager__container customScroll">
                        { (this.state.idSelected) >= 0 ? <MailDetail data={this.state} /> : <WelcomeMessage /> }
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        mails: state.mailsList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onMailManagerSelected: (mailsList) => dispatch({type: actionTypes.LOAD_MAILS, mails: mailsList})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailManager);