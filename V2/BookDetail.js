import React from 'react';

const BookDetail = ({book, showReviewForm, dispatch}) => {
    // console.log('book rendering')
    return (
        <div>
            <div className="card text-white bg-success mb-3">
                <div className="card-header">Detail</div>
                <div className="card-body">
                    <h5 className="card-title">Title: {book.title}</h5>
                    <p className="card-text">Content: {book.content}</p>
                    <button type="button" onClick={() => dispatch({type: 'showReviewForm', payload: !showReviewForm})} className="btn btn-secondary">Add Review</button>
                    <br/><br/>
                    <h5 className="card-text">Reviews:</h5>
                    {book.reviews.map((review) =><p key={review.id} className="">{review.email} - {review.content}</p>)}
                </div>
            </div>
        </div>
    );
};

export default BookDetail;