import React, { useReducer } from 'react';

import BookSearch from './BookSearch';
import BookDetail from './BookDetail';

const shopInitialState = {
    book: {}, 
    showDetail: false
};
  
  function shopReducer(state, action) { 
    switch(action.type){
      
      case 'filter':
      case 'showBook':
        return {...state, ...action.payload}

      case 'addReview':
        state.book.reviews.push(action.payload);
        return state;
        
      default:
        return shopInitialState
    }
  }

function Shop() { 

    const [state, dispatch] = useReducer(shopReducer, shopInitialState)
    let book_detail = <div></div>;
    if (state.showDetail) {
        book_detail = <BookDetail book={state.book} dispatch={dispatch} /> ;
    }

    return (
        <div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12">
                    <h2 className="d-block p-3 bg-secondary text-white">Book Store</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-4">
                <BookSearch dispatch={dispatch}/>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4">
                    { book_detail }
                    <br/>
                </div>
            </div>
        </div>
    );
    
}

export default Shop;
