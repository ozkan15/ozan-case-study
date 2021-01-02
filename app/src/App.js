import './App.css';

import React from 'react';

import Form from './components/form/form';
import List from './components/list/list';
import Edit from './components/edit/edit';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateList = this.updateList.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.hideEdit = this.hideEdit.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.editJob = this.editJob.bind(this);

    this.state = {
      jobs: [],
      jobTypes: [],
      showEditView: false,
      currentEditableJobId: ''
    }
  }

  async componentDidMount() {
    var response = await fetch('http://localhost:8081');
    var data = await response.json();
    this.setState({ jobTypes: data });
  }

  updateList(newJob) {
    var newJobList = [...this.state.jobs, newJob];

    this.setState({
      jobs: newJobList
    });
  }

  showEdit(id) {
    this.setState({ showEditView: true, currentEditableJobId: id });
  }

  hideEdit() {
    this.setState({ showEditView: false });
  }

  deleteJob(id) {
    var updatedJobList = this.state.jobs.filter(j => j.id != id);
    this.setState({
      jobs: updatedJobList
    });
  }

  editJob(newJobType) {
    this.jobToEdit = this.state.jobs.find(j => j.id == this.state.currentEditableJobId);
    this.jobToEdit.type = newJobType;
    this.setState({
      showEditView: false,
      jobs: this.state.jobs
    });
  }

  render() {
    return (<div className="App">
      <Form updateList={this.updateList} jobTypes={this.state.jobTypes} />
      <List jobs={this.state.jobs} deleteJob={this.deleteJob} showEdit={this.showEdit} />
      {this.state.showEditView && <Edit current hideEdit={this.hideEdit} editJob={this.editJob} jobTypes={this.state.jobTypes} job={this.state.jobs.find(j => j.id == this.state.currentEditableJobId)} />}
    </div>);
  }
}

export default App;
