import React, { Component } from 'react';
import './App.css';

class Edit extends Component{
    constructor(props) {
		super(props);

		this.state = {
            task: this.props.taskToEdit.description,
            dueDate: this.props.taskToEdit.date,
        };
    
    this.handleTask = this.handleTask.bind(this);
    this.handleDueDate = this.handleDueDate.bind(this);
  }

    handleTask(e){
        this.setState({
        task: e.target.value
        }, () => {
        console.log(this.state.task)
        })
    }

    handleDueDate(e){
        this.setState({
        dueDate: e.target.value
        }, () => {
        console.log(this.state.dueDate)
        })
    }


    render(){
        return (
            <div className='popup'>  
                <div className='popupinner pl-4 pt-3'>
                    <button className="closepopup" onClick={() => this.props.closePopup()}>X</button>
                    <div className="mt-3">
                        <h2>Description</h2>
                        <textarea onChange={this.handleTask} defaultValue={this.props.taskToEdit.description}></textarea>
                        <h2>Due Date</h2>
                        <input type="date" defaultValue={this.props.taskToEdit.date} onChange={this.handleDueDate}/>
                        <button className="btn btn-success ml-3" onClick = {() => this.props.editTask(this.props.taskToEdit.ID, this.state.task, this.state.dueDate)}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;