import React, { useState } from 'react';
import axios from 'axios';

const addBookUrl = 'http://localhost:8000/api/books';

const BookForm = () => {

  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  const handleTitleChange = (e) => {
    setTitleInput(e.currentTarget.value)
  }

  const handleContentChange = (e) => {
    setContentInput(e.currentTarget.value)
  }

  const handleSubmit = event => {
    event.preventDefault();

    if(titleInput.trim() !== '' && contentInput.trim() !== ''){
      
	    const book = {
      	    title: titleInput,
      	    content: contentInput
    	};

    	const options = {
      	    headers: { 'Content-Type': 'application/json' }
    	};

    	axios.post(`${addBookUrl}`, book, options)
      	     .then(res => {
                // console.log(res.data);
                setTitleInput('');
                setContentInput('');
             })

    } else {
	
    }
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Book Title:</label>
            <input type="text" className="form-control" name="title" value={titleInput} onChange={handleTitleChange} />
          </div>
          <div className="form-group">
            <label>Book Intro:</label>
            <input type="text" className="form-control" name="content" value={contentInput} onChange={handleContentChange} />
          </div>
          <button  type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  )

};

export default BookForm;
