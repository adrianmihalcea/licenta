import { React, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import { Route, Routes } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <Navigation />
        <Routes>
          {/* <Route path='/ShowAll' component={ShowAll} /> */}
          {/* <Route path='/login' component={() => <Login history={this.props.history} func={this.callbackFunction} />} /> */}
          {/* <Route path='/signup' component={Signup} /> */}
          {/* <Route path='/details' component={() => <Details mockJSON={mockJSON} bond="Airbus 3.15% USD" />} /> */}
          <Route exact path='/' element={<Home />} />
        </Routes>
      </>
    );
  }
};
