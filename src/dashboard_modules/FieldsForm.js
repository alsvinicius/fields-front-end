import React from 'react'
import { DOMAIN } from './ApiSettings'

export default class FieldsForm extends React.Component {    
    constructor() {
        super();
        this.state = {
            name: null,
            length: null,
            maskRegex: null,
            placeholder: null,
            position: null
        };
    }

    create = (e) => {        
        e.preventDefault();
        var self = this;
        fetch(DOMAIN + "/api/management/client/field", {
            method: "POST",
            body: JSON.stringify(self.state),
            headers: new Headers(
                {
                    'content-type': 'application/json'
                }
            )
        })
        .then(response => {
            return response.json()
          })
          .then(data => {
                console.log(data);
                self.setState({ fields: data });      
        });
    }

    handleChange = (e) =>{ 
      console.log(e);
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        return <div>
            <form onSubmit={this.create}>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter the field name" value={this.state.name} onChange={this.handleChange} />
                    <div>{this.state.name}</div>
                </div>
                <div class="form-group">
                    <label for="length">Length</label>
                    <input type="number" class="form-control" id="length" placeholder="Enter the field length" value={this.state.length} onChange={this.handleChange} />
                    <div>{this.state.length}</div>
                </div>
                <div class="form-group">
                    <label for="name">Mask Regex</label>
                    <input type="text" class="form-control" id="maskRegex" placeholder="Enter the field mask regex" value={this.state.maskRegex} onChange={this.handleChange} />
                    <div>{this.state.maskRegex}</div>
                </div>
                <div class="form-group">
                    <label for="name">Placeholder</label>
                    <input type="text" class="form-control" id="placeholder" placeholder="Enter the field placeholder" value={this.state.placeholder} onChange={this.handleChange} />
                    <div>{this.state.placeholder}</div>
                </div>
                <div class="form-group">
                    <label for="name">Position</label>
                    <input type="number" class="form-control" id="position" placeholder="Enter the field position" value={this.state.position} onChange={this.handleChange} />
                    <div>{this.state.position}</div>
                </div>
                <button type="submit" class="btn btn-primary" onClick={this.create}>Submit</button>
            </form>
        </div>
    }
}