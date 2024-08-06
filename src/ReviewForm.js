import React, { useState } from 'react';
import axios from 'axios';

const reviewUrl = 'http://localhost:8000/api/reviews/';

const ReviewForm = ({book, showReviewForm, dispatch}) => {

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [contentInput, setContentInput] = useState(''); 

  const handleSubmit = async event => {
    event.preventDefault();

    if(nameInput.trim() !== '' && emailInput.trim() !== '' && contentInput.trim() !== ''){
	      const review = {
      	  name: nameInput,
          email: emailInput,
          content: contentInput
    	  };

	      const options = {
          headers: { 'Content-Type': 'application/json' }
    	  };

        await axios.post(`${reviewUrl}${book.id}`, review, options)
        .then(res => {
        	// console.log(res.data.data);
          book.reviews.push(res.data.data); // push review returned from server
          dispatch({type: 'addReview', payload: !showReviewForm})
      	})
      	.catch(error => {
          throw(error);
        });
    } 
    else {
    }
     
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label>Your Name:</label>
              <input type="text" className="form-control" name="name" onChange={event => setNameInput(event.target.value)} />
          </div>
          <div className="form-group">
              <label>Your Email:</label>
              <input type="text" className="form-control" name="email" onChange={event => setEmailInput(event.target.value)} />
          </div>
          <div className="form-group">
              <label>Your Review:</label>
              <input type="text" className="form-control" name="content" onChange={event => setContentInput(event.target.value)} />
          </div>
          <button  type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  )
  
};

export default ReviewForm;
