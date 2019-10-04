import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Islands from './Islands/Islands'
import City from './City/City'
import Stats from './Management/Stats'
import OfficeDetails from './Management/OfficeDetails'
import Mail from './Mail/MailManager'

class App extends Component {
  render () {
    return (
      <>
        <Route path="/" exact component={Islands} />
        <Route path="/city" exact component={City} />
        <Route path="/officestats" exact component={Stats} />
        <Route path="/officedetails" exact component={OfficeDetails} />
        <Route path="/mail" exact component={Mail} />
      </>
    )
  }
}

export default App;
