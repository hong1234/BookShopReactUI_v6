import React from 'react';

const BookDetail = ({state, dispatch}) => {
    const showReviewForm = (event) => {
        event.preventDefault();
        dispatch({type: 'showReviewForm', payload: !state.showReviewForm})
    }
    return (
        <div>
            <div className="card text-white bg-success mb-3">
                <div className="card-header">Detail</div>
                <div className="card-body">
                    <h5 className="card-title">Title : {state.book.title}</h5>
                    <p className="card-text">Content : {state.book.content}</p>
                    <button type="button" onClick={showReviewForm} className="btn btn-secondary">Add Review</button>
                    <h5 className="card-text">Reviews :</h5>
                    {/* {state.book.reviews.map((item, i) =><p key = {i} id={item.id} className="">{item.email} - {item.content}</p>)} */}
                    {state.book.reviews.map((item) =><p key={item.id} className="">{item.email} - {item.content}</p>)}
                </div>
            </div>
        </div>
    );
};

export default BookDetail;