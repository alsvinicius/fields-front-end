import React from 'react'
import { DOMAIN } from './ApiSettings'

export default class FieldsNotifications extends React.Component {

    constructor() {
        super();
        this.state = {
            notifications: new Array()
        };
    }

    get = () => {
        var self = this;
        fetch(DOMAIN + "/api/notification/client/field")
            .then(response => {
                return response.json()
            })
            .then(data => {
                self.setState({ notifications: data });      
            }
        );
    }

    componentDidMount() {
        this.get();
    }

    render() {
        return <div id="fields-notifications">
            <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Field</th>
                            <th scope="col">Operation</th>
                            <th scope="col">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.notifications.map(function(key) {
                            let message = "Field named " + key.fieldName + " was " + key.operation;
                            return  <tr>
                                    <td>{key.fieldName}</td>
                                    <td>{key.operation}</td>
                                    <td>{message}</td>
                                </tr>;
                        })}
                    </tbody>
                </table>
        </div>
    }

}