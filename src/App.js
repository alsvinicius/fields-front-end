import React from 'react';
import logo from './logo.svg';
import './App.css';
import FieldsList from './dashboard_modules/FieldsList'
import FieldsForm from './dashboard_modules/FieldsForm'

function App() {
  return (
    <div class="container">
    <div class="row">
      <div class="col-12">
        <FieldsForm />
      </div>
    </div>
      <div class="row">
        <div class="col-12">
          <FieldsList />
        </div>
      </div>
    </div>
  );
}

export default App;
