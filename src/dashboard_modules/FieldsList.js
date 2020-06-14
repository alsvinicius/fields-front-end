import React from 'react'
import { DOMAIN } from './ApiSettings'
import FieldsForm from './FieldsForm'

export default class FieldsList extends React.Component {

    constructor() {
        super();
        this.state = {
            title: "Client Fields",
            fields: new Array(),
            showForm: false,
            editComponent: null,
            editForm: false,
            editData: {},
            showList: true
        };
    }

    add = () => {
        this.setState({showForm: true, editForm: false, showList: false});
    }

    addCallback = (op) => {
        this.close();
        this.get();
        if(op == "ok") {
            alert("Field successfully added!");
        }
    }

    edit = (e) => {
        this.getOne(e.target.id.replace("edit-", ""));
        this.setState({showForm: false, editForm: true, showList: false})
    }

    editCallback = (op) => {
        this.setState({editForm: false,editData: {}, showList: true});
        this.get();
        
        if(op == "ok") {
            alert("Field successfully updated!");
            return;
        }

        if(op == "close") {
            return;
        }

        alert("Error updating field!");
    }

    delete = (e) => {    
        var self = this;    
        e.preventDefault();
        fetch(DOMAIN + "/api/management/client/field/" + e.target.id.replace("delete-", ""), {
            method: "DELETE",
            headers: {'Content-Type': 'application/json', },
        })
        .then(response => {
            switch(response.status)
            {
                case 204:
                    alert("Field deleted!");
                    break;
                case 404:
                    alert("Field not found!");
                    break;
                default:
                    alert("Error deleting field!");
            }

            this.get(); 
          });
    }

    getOne = (id) => {
        var self = this;
        fetch(DOMAIN + "/api/management/client/field/" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                self.setState({ editData: data, editForm: true, showList: false }); 
                self.editComponent.build();     
            }
        );
    }

    get = () => {
        var self = this;
        fetch(DOMAIN + "/api/management/client/field")
            .then(response => {
                return response.json()
            })
            .then(data => {
                self.setState({ fields: data });      
            }
        );
    }

    close = () => {
        this.setState({showForm: false, showList: true});
    }

    componentDidMount() {
        this.get();
    }

    render() {
      var self = this;
      return <div id="fields-list">          
            <h2 className="pt-3 pb-3 float-left">{this.state.title}</h2>
            <button type="submit" className="btn btn-primary mt-3 mb-3 float-right" id="addField" onClick={self.add}>Add</button>

            {
                this.state.showForm ? <FieldsForm closeHandler = {this.close} returnHandler = {this.addCallback} /> : <div></div>
            }

            {
                this.state.editForm ? <FieldsForm ref = {(cd) => this.editComponent = cd} fieldData = {this.state.editData} returnHandler = {this.editCallback} /> : <div></div>
            }

            {
                
                this.state.showList ?
            
                <table className="table">
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
                            return  <tr>
                                <th scope="row">{key.position}</th>
                                    <td>{key.idField}</td>
                                    <td>{key.name}</td>
                                    <td>{key.required}</td>
                                    <td>{key.length}</td>
                                    <td>{key.maskRegex}</td>
                                    <td>{key.placeholder}</td>
                                    <td>
                                        <button type="submit" className="btn btn-primary" id={"delete-"+key.idField} onClick={self.delete}>Delete</button>
                                        <button type="submit" className="btn btn-primary" id={"edit-"+key.idField} onClick={self.edit}>Edit</button>
                                    </td>
                                </tr>;
                        })}
                    </tbody>
                </table>

                :

                <div></div>

            }
      </div>;
    }
  }