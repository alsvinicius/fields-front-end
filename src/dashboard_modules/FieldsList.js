import React from 'react'
import { DOMAIN } from './ApiSettings'

export default class FieldsList extends React.Component {

    constructor() {
        super();
        this.state = {
            title: "Client Fields",
            fields: new Array()
        };
    }

    delete = (e) => {    
        var self = this;    
        e.preventDefault();
        fetch(DOMAIN + "/api/management/client/field/" + e.target.id, {
            method: "delete",
            credentials: 'include',
            headers: {'Content-Type': 'application/json', },
        })
        .then(response => {
            return response.json()
          });
    }

    componentDidMount() {
        var self = this;
        fetch(DOMAIN + "/api/management/client/field")
            .then(response => {
            return response.json()
          })
          .then(data => {
                console.log(data);
                self.setState({ fields: data });      
        });
    }

    render() {
      var self = this;
      return <div id="fields-list">
          <h2>{this.state.title}</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Position</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Required</th>
                        <th scope="col">Length</th>
                        <th scope="col">Regex</th>
                        <th scope="col">Placeholder</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.fields.map(function(key) {
                        console.log(key);
                        return  <tr>
                            <th scope="row">{key.position}</th>
                                <td>{key.idField}</td>
                                <td>{key.name}</td>
                                <td>{key.required}</td>
                                <td>{key.length}</td>
                                <td>{key.maskRegex}</td>
                                <td>{key.placeholder}</td>
                                <td>
                                    <button type="submit" class="btn btn-primary" id={key.idField} onClick={self.delete}>Delete</button>
                                </td>
                            </tr>;
                    })}
                </tbody>
            </table>
      </div>;
    }
  }