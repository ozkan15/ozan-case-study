import './edit.scss';
import React from 'react';

export default class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: this.props.job.type
        };

        this.changeType = this.changeType.bind(this);
    }

    changeType(event) {
        this.setState({ type: event.target.value });
    }

    render() {
        return (
            <div id="edit-form-container">
                <form id="edit-form">
                    <span className="exit-icon" onClick={this.props.hideEdit}>✖</span>
                    <div className="form-group">
                        <label>Job</label>
                        <input disabled value={this.props.job.name}></input>
                    </div>
                    <div className="form-group">
                        <label>Priority</label>
                        <select onChange={this.changeType} defaultValue={this.props.job.type}>
                            {this.props.jobTypes.map(i => <option value={i}>{i}</option>)}
                        </select>
                    </div>

                    <button onClick={() => this.props.editJob(this.state.type)}>Update</button>
                </form>
            </div>
        );
    }
}