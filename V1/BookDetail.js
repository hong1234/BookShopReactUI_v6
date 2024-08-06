import React, { useState, useEffect } from 'react';
import axios from 'axios';

const reviewUrl = 'http://localhost:8000/api/reviews/';

const BookDetail = ({book, dispatch}) => {
  const [showReviewForm, setShowReviewForm] = useState(false); 

  useEffect(()=>{
    setShowReviewForm(false);
  }, [book])

  let review_form = <div></div>;

  if (showReviewForm) {
    review_form = <ReviewForm book={book} setShowReviewForm={setShowReviewForm} dispatch={dispatch}/>
  }

  console.log('book redering')
  return (
    <div>
      { review_form }

      <div className="card text-white bg-success mb-3">
        <div className="card-header">Detail</div>
        <div className="card-body">
          <h5 className="card-title">Title: {book.title}</h5>
          <p className="card-text">Content: {book.content}</p>
          <button type="button" onClick={() => setShowReviewForm(true)} className="btn btn-secondary">Add Review</button>
          <br/><br/>
          <h5 className="card-text">Reviews:</h5>
          {book.reviews.map((review) =><p key={review.id} className="">{review.email} - {review.content}</p>)}
        </div>
      </div> 
    </div>
  )
  
};

// const reviewUrl = 'http://localhost:8000/api/reviews/';

const ReviewForm = ({book, setShowReviewForm, dispatch}) => {

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [contentInput, setContentInput] = useState(''); 

  function clearForm(){
    setNameInput('');
    setEmailInput('');
    setContentInput('');
  }

  const submitReviewForm = async event => {
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
          clearForm();
          setShowReviewForm(false);
          dispatch({type: 'addReview', payload: res.data.data})
      	})
      	.catch(error => {
          throw(error);
        });
    } 
    else {
    }
     
  }

  console.log('review form redering')
  return (
    <div>
      <form onSubmit={submitReviewForm}>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" className="form-control" name="name" value={nameInput} onChange={event => setNameInput(event.target.value)}/>
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="text" className="form-control" name="email" value={emailInput} onChange={event => setEmailInput(event.target.value)}/>
      </div>
      <div className="form-group">
        <label>Your Review:</label>
        <input type="text" className="form-control" name="content" value={contentInput} onChange={event => setContentInput(event.target.value)}/>
      </div>
      <button  type="submit" className="btn btn-primary">Add Review</button>
    </form>
      <br/>
    </div>
  )
};

export default BookDetail;