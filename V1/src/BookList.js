import React, { useState } from 'react';
import axios from 'axios';
import { sortBy } from 'lodash';

const bookUrl = 'http://localhost:8000/api/books/';

const SORTS = {
    NONE: list => list,
    ID: list => sortBy(list, ['id']),
    TITLE: list => sortBy(list, ['title']),
    // AUTHOR: list => sortBy(list, ['author']),
    // COMMENT: list => sortBy(list, ['num_comments']).reverse(),
    // POINT: list => sortBy(list, ['points']).reverse(),
};

const BookList = ({books, dispatch}) => {

    const [sort, setSort] = useState({
        sortKey: 'NONE',
        isReverse: false,
    });

    const handleSort = sortKey => {
        const isReverse = sort.sortKey === sortKey && !sort.isReverse;
        setSort({ sortKey, isReverse });
    };

    const sortFunction = SORTS[sort.sortKey];

    const sortedList = sort.isReverse
    ? sortFunction(books).reverse()
    : sortFunction(books);

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
            <div>
                <span><button type="button" onClick={() => handleSort('ID')}>sort by ID</button></span>
                <span><button type="button" onClick={() => handleSort('TITLE')}>sort by Title</button></span>
            </div>
            <div className="list-group">
                {sortedList.map((book) => <button key={book.id} type="button" onClick={() => handleShowDetail(book.id)} className="list-group-item list-group-item-action">{book.title}</button>)}
            </div>
        </div>
    );
};

export default BookList;