import React from 'react';
import './list.scss';

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        }

        this.search = this.search.bind(this);
    }

    assignColor(jobType) {
        switch (jobType) {
            case 'Urgent': return 'red-background';
            case 'Regular': return 'yellow-background';
            case 'Trivial': return 'blue-background';
        }
    }

    filter() {
        var regex = new RegExp(this.state.query, 'i');
        var filteredJobList = this.props.jobs.filter(j => j.name.match(regex));

        return filteredJobList;
    }

    order(jobType) {
        switch (jobType) {
            case 'Urgent': return 1;
            case 'Regular': return 2;
            case 'Trivial': return 3;
        }
    }

    search(query) {
        this.setState({ query: query });
    }

    render() {
        return (
            <div id="job-list">
                <div id="header">
                    <span>JOB LIST</span>
                    <input type="text" placeholder="Search Job" onChange={(e) => this.search(e.target.value)}></input>
                </div>

                <ul>
                    {this.filter(this.props.jobs).sort((a, b) => this.order(a.type) - this.order(b.type)).map(j =>
                        <li className={this.assignColor(j.type)} key={j.id}>
                            <span>{j.name}</span>
                            <span>{j.type}</span>
                            <div>
                                <button onClick={() => this.props.showEdit(j.id)}>Edit</button>
                                <button onClick={() => this.props.deleteJob(j.id)}>Delete</button>
                            </div>
                        </li>)}
                </ul>
            </div>
        );
    }
}