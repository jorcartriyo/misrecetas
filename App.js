import React, { Component } from 'react';
import CreateAppContainer from './Componentes/CreateAppContainer';
console.disableYellowBox = true;
import Firebase from './lib/firebase'
export default class App extends Component {
  constructor(props) {
    super(props);
    Firebase.init()
  }
  render() {
 
    return <CreateAppContainer />;
  }
}
