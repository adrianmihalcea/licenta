import { React, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import { Route, Routes } from "react-router-dom";

import Select from './components/Select';
import View from './components/View';
import Upload from './components/Upload';
import ViewDocument from './components/ViewDocument';
import Save from './components/Save';

export default class App extends Component {
  render() {
    return (
      <>
        <Navigation />
        <Routes>
          <Route path='/select' element={<Select />} />
          <Route path='/view' element={<View />} />
          <Route path='/view/:id' element={<ViewDocument />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/save/:ipfsHash/' element={<Save />} />
          <Route exact path='/' element={<Home />} />
        </Routes>
      </>
    );
  }
};
