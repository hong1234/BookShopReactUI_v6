import React from 'react';
import axios from 'axios';

const bookUrl = 'http://localhost:8000/api/books/';

const BookList = ({state, dispatch}) => {

    const handleShowDetail = async (bookId) => {
        await axios.get(`${bookUrl}${bookId}`)
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
                {state.data.map((book) => <button key={book.id} type="button" onClick={() => handleShowDetail(book.id)} className="list-group-item list-group-item-action">{book.title}</button>)}
            </div>
        </div>
    );
};

export default BookList;