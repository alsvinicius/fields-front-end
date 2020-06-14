import React from 'react'
import { DOMAIN } from './ApiSettings'

export default class FieldsForm extends React.Component {    
    constructor() {
        super();
        this.state = {
            id: null,
            name: null,
            length: null,
            maskRegex: null,
            placeholder: null,
            position: null
        };
    }

    build = () => {
        let field = this.props.fieldData;
        this.setState({
            id: field.idField,
            name: field.name,
            length: field.length,
            maskRegex: field.maskRegex,
            placeholder: field.placeholder,
            position: field.position
        });
    }

    save = (e) => {
        console.log(this.state)
        e.preventDefault();
        if(this.state.id == null) {
            this.create();
            return;
        }

        this.update();
    }

    create = () => {        
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
            this.props.returnHandler("ok");
            return response.json()
          })
          .then(data => {
                self.setState({ fields: data });      
        });
    }

    update = () => {        
        var self = this;
        fetch(DOMAIN + "/api/management/client/field/" + this.state.id, {
            method: "PATCH",
            body: JSON.stringify(self.state),
            headers: new Headers(
                {
                    'content-type': 'application/json'
                }
            )
        })
        .then(response => {
            this.props.returnHandler("ok");
            return response.json()
          })
          .then(data => {
                self.setState({ fields: data });      
        });
    }

    handleChange = (e) => { 
        this.setState({[e.target.id]: e.target.value});
    }

    close = (e) => {
        this.props.returnHandler("close");
    }

    render() {
        return <div className="float-left col-12">
            <form onSubmit={this.create}>
                <div className="form-group">
                    <label for="name">Position</label>
                    <input type="number" className="form-control" id="position" placeholder="Enter the field position" value={this.state.position} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter the field name" value={this.state.name} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label for="length">Length</label>
                    <input type="number" className="form-control" id="length" placeholder="Enter the field length" value={this.state.length} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label for="name">Mask Regex</label>
                    <input type="text" className="form-control" id="maskRegex" placeholder="Enter the field mask regex" value={this.state.maskRegex} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label for="name">Placeholder</label>
                    <input type="text" className="form-control" id="placeholder" placeholder="Enter the field placeholder" value={this.state.placeholder} onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-primary mt-3 mr-2" onClick={this.save}>Submit</button>
                <button type="button" className="btn btn-primary mt-3 ml-2" onClick={this.close}>Close</button>
            </form>
        </div>
    }
}