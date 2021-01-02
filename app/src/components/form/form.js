import './form.scss';

import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: ''
        }
        this.createNewJob = this.createNewJob.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    createNewJob(event) {
        event.preventDefault();
        this.props.updateList({ id: uuidv4(), name: this.state.name, type: this.state.type || this.props.jobTypes[0] });
    }

    changeName(event) {
        var val = event.target.value;
        val = val.replace(/[^A-Za-z0-9 ]/ig, '')
        this.setState({ name: val });
    }

    changeType(event) {
        this.setState({ type: event.target.value });
    }

    render() {
        return <form id="job-form" onSubmit={this.createNewJob}>
            <div className="form-group">
                <label for="job">Job</label>
                <input id="job" type="text" maxLength="70" value={this.state.name} onChange={this.changeName} required></input>
            </div>
            <div className="form-group">
                <label for="priority">Priority</label>
                <select id="priority" onChange={this.changeType} required>
                    {this.props.jobTypes.map((i, index) => <option value={i}>{i}</option>)}
                </select>
            </div>

            <button type="submit">Create</button>
        </form>;
    }
}