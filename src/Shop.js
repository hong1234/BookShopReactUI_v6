import React, { useReducer } from 'react';
import ReviewForm from './ReviewForm';
import SearchForm from './SearchForm';
import BookList from './BookList';
import BookDetail from './BookDetail';

const todosInitialState = {
    data: [],
    book: {}, 
    isSubmited: false,
    showDetail: false,  
    showReviewForm: false
};
  
  function shopReducer(state, action){ 
    switch(action.type){
      case 'filter':
        return {...state, ...action.payload}
      case 'showBook':
        return {...state, ...action.payload}
      case 'addReview':
        return {...state, book: action.payload}
      case 'showReviewForm':
        return {...state, showReviewForm: action.payload}
      case 'hideReviewForm':
        return {...state, showReviewForm: action.payload}
      default:
        return todosInitialState
    }

  }

function Shop() {

    const [state, dispatch] = useReducer(shopReducer, todosInitialState)

    let search_result = <div></div>;
    let item_detail = <div></div>;
    let review_form = <div></div>;

    if (state.isSubmited) {
        search_result = <BookList state={state} dispatch={dispatch} />;
    }

    if (state.showDetail) {
        item_detail = <BookDetail state={state} dispatch={dispatch} /> ;
    }

    if (state.showReviewForm) {
        review_form = <ReviewForm state={state} dispatch={dispatch}/> ;
    }

    return (
        <div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12">
                    <br/>
                    <h2 className="d-block p-3 bg-secondary text-white">Book Shop</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-8">
                    <SearchForm dispatch={dispatch}/>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-4">
                    { search_result }
                    <br/>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4">
                    { item_detail }
                    <br/>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4">
                    { review_form }
                    <br/>
                </div>
            </div>
        </div>
    );
    
}

export default Shop;
