import { React, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import { Route, Routes } from "react-router-dom";

import Select from './components/Select';
import View from './components/View';
import Upload from './components/Upload';
import ViewDocument from './components/ViewDocument.jsx';

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
          <Route exact path='/' element={<Home />} />
        </Routes>
      </>
    );
  }
};
