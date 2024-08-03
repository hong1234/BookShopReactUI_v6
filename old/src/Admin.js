import React, { Component } from 'react';
import axios from 'axios';

export default class Admin extends Component {

  state = { 
    title: '',
    content: ''
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {

    event.preventDefault();

    if(this.state.title.trim() !== '' && this.state.content.trim() !== ''){
	    const book = {
      	    title: this.state.title,
      	    content: this.state.content
    	};

    	const options = {
      	    headers: { 'Content-Type': 'application/json' }
    	};

    	axios.post(`http://localhost:8000/api/books`, book, options)
      	     .then(res => {
                console.log(res.data);
                this.setState({
                  title: '',
                  content: ''
                });
             })

    } else {
	
    }

    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Book Title:</label>
              <input type="text" className="form-control" name="title" value={ this.state.title } onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label>Book Intro:</label>
              <input type="text" className="form-control" name="content" value={ this.state.content } onChange={this.handleInputChange} />
            </div>
            <button  type="submit" className="btn btn-primary">Add Book</button>
        </form>
      </div>
    )
  }
}
