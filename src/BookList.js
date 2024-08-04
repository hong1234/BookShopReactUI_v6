import React from 'react';
import axios from 'axios';

const bookUrl = 'http://localhost:8000/api/books/';

const BookList = ({state, dispatch}) => {

    const handleShowDetail = (current, event) => {
        event.preventDefault();
        axios.get(`${bookUrl}${current}`)
        .then(res => {
            // console.log(res.data.data)
            const dataset = {
                book: res.data.data,
                showDetail: true,
                showReviewForm: false
            }
            dispatch({type: 'showBook', payload: dataset})
        })
        .catch(error => {
            throw(error);
        });
        
    }

    return (
        <div>
            <div className="d-block p-2 bg-secondary text-white"><h5>Books</h5></div>
            <div className="list-group">
                {/* { state.data.map((item, i) => <button key = {i} id={item.id} type="button" onClick={event => handleShowDetail(item.id, event)} className="list-group-item list-group-item-action">{item.title}</button>) } */}
                {state.data.map((item) => <button key={item.id} type="button" onClick={event => handleShowDetail(item.id, event)} className="list-group-item list-group-item-action">{item.title}</button>)}
            </div>
        </div>
    );
};

export default BookList;