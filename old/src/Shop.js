import React, { Component } from 'react';
import axios from 'axios';
import ReviewForm from './Review.js';

const apiUrl = 'http://localhost:8000/api/books/search?title=';
const apiUrl2 = 'http://localhost:8000/api/books/';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            data: [],
            book: {}, 
            isSubmited: false,
            showDetail: false,  
            showReviewForm: false
        }
    }

    handleChange = (event) => this.setState({
        filterText: event.target.value
    })

    handleSubmit = (event) => {
        const searchTerm = this.state.filterText;
        axios.get(`${apiUrl}${searchTerm}`)
             .then(response => {
                console.log(response.data.data)
                 this.setState({
                     data: response.data.data,
                     isSubmited: true,
                     showDetail: false,
                     showReviewForm: false
                 })
              })
             .catch(error => {
	            throw(error);
              });
        event.preventDefault();
    }

    showDetail = (current, event) => {
        event.preventDefault();
        axios.get(`${apiUrl2}${current}`)
            .then(response => {
                console.log(response.data.data)
                this.setState({
                    showDetail: true,
                    showReviewForm: false,
                    book: response.data.data
                })
            })
            .catch(error => {
                throw(error);
            });
        
    }

    showReviewForm = (event) => {
        this.setState({
            showReviewForm: !this.state.showReviewForm
        })
        event.preventDefault();
    }

    addReview = (review) => {
        this.state.book.reviews.push(review);
        this.setState({
            book: this.state.book
        })
    }

    hideReviewForm = () => {
        this.setState({
            showReviewForm: !this.state.showReviewForm
        })
    }


    render() {
        const {isSubmited, showDetail, showReviewForm, book} = this.state;

        let search_result = <div></div>;
        let item_detail = <div></div>;
        let review_form = <div></div>;

        if (isSubmited) {
            search_result = <List {...this.state} showDetail={this.showDetail} />;
        }

        if (showDetail) {
            item_detail = <Detail book={book} showReviewForm={this.showReviewForm} /> ;
        }

        if (showReviewForm) {
            review_form = <ReviewForm bookId={book.id} hideReviewForm={this.hideReviewForm} addReview={this.addReview}/> ;
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
                        <SearchBar filterText={this.state.filterText} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
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
    
}

const SearchBar =  ({
  filterText,
  onChange,
  onSubmit
}) => <form onSubmit={onSubmit} className="form-inline">
  <div className="form-group">
    <input
      type="text"
      value={filterText}
      onChange={onChange}
      className="form-control"
    />
  </div>
  <div className="form-group">
    <button type="submit" className="btn btn-success"><b>Search</b></button>
  </div>
</form>

const List = ({
  data, 
  showDetail
}) => <div>
  <div className="d-block p-2 bg-secondary text-white"><h5>Books</h5></div>
  <div className="list-group">
    { data.map((item, i) => <button key = {i} id={item.id} type="button" onClick={(event) => showDetail(item.id, event)} className="list-group-item list-group-item-action">{item.title}</button>) }
  </div>
</div>

const Detail = ({ 
  book,
  showReviewForm
  }) => <div>
  <div className="card text-white bg-success mb-3">
    <div className="card-header">Detail</div>
    <div className="card-body">
       <h5 className="card-title">Title : {book.title}</h5>
       <p className="card-text">Content : {book.content}</p>
       <button type="button" onClick={showReviewForm} className="btn btn-secondary">Add Review</button>
       <h5 className="card-text">Reviews :</h5>
       {book.reviews.map((item, i) =><p key = {i} id={item.id} className="">{item.email} - {item.content}</p>)}
    </div>
  </div>
</div>

export default Shop;
