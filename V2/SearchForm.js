import React, { useState } from 'react';
import axios from 'axios';

const searchUrl = 'http://localhost:8000/api/books/search?title='; 

const SearchForm = ({dispatch}) => {

  const [filterText, setFilterText] = useState('');

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const res =  await axios.get(`${searchUrl}${filterText}`)
      // console.log(res.data.data)
      const dataset = {
        data: res.data.data,
        isSubmited: true,
        showDetail: false,
        showReviewForm: false
      }
      dispatch({type: 'filter', payload: dataset});
      setFilterText('');

    } catch (error) {
      throw(error);
    }

  }

  return (
    <form onSubmit={submitHandle} className="form-inline">
      <div className="form-group">
        <input
          type="text"
          value={filterText}
          onChange={event => setFilterText(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">Search</button>
      </div>
    </form>
  )

};

export default SearchForm;