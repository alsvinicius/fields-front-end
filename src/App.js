import React from 'react';
import logo from './logo.svg';
import './App.css';
import FieldsList from './dashboard_modules/FieldsList'

function App() {
  return (
    <div class="container">
      <div class="row">
        <div class="col-12">
          <FieldsList />
        </div>
      </div>
    </div>
  );
}

export default App;
