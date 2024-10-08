import React, { useReducer } from 'react';
import ReviewForm from './ReviewForm';
import SearchForm from './SearchForm';
import BookList from './BookList';
import BookDetail from './BookDetail';

const shopInitialState = {
    data: [],
    book: {}, 
    isSubmited: false,
    showDetail: false,  
    showReviewForm: false
};
  
  function shopReducer(state, action) { 
    switch(action.type){
      case 'filter':
      case 'showBook':
        return {...state, ...action.payload}
      case 'addReview':
      case 'showReviewForm':
        return {...state, showReviewForm: action.payload}
      default:
        return shopInitialState
    }
  }

function Shop() {
    const [state, dispatch] = useReducer(shopReducer, shopInitialState)

    let search_result = <div></div>;
    let item_detail = <div></div>;
    let review_form = <div></div>;

    if (state.isSubmited) {
        search_result = <BookList books={state.data} dispatch={dispatch} />;
    }
    if (state.showDetail) {
        item_detail = <BookDetail book={state.book} showReviewForm={state.showReviewForm} dispatch={dispatch} /> ;
    }
    if (state.showReviewForm) {
        review_form = <ReviewForm book={state.book} showReviewForm={state.showReviewForm} dispatch={dispatch}/> ;
    }

    // console.log('shop rendering')

    return (
        <div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12">
                    <h2 className="d-block p-3 bg-secondary text-white">Book Store</h2>
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
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4">
                    { review_form }
                    { item_detail }
                </div>
            </div>
        </div>
    );
    
}

export default Shop;
