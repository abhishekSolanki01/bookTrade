import React from "react";
import FlipMove from 'react-flip-move';

import {BooksInfo} from "../api/booksInfo"

import { Tracker } from 'meteor/tracker';
import { Meteor } from "meteor/meteor"


export default class BooksList extends React.Component{
  constructor(props){
      super(props);
      this.state={
        BooksInfoInState : BooksInfo.find().fetch()
      }
      this.renderBooks = this.renderBooks.bind(this)
      this.showCrossButton = this.showCrossButton.bind(this)
      this.removeBook = this.removeBook.bind(this)
  }

  componentDidMount(){
    this.tracker = Tracker.autorun(() => {
      Meteor.subscribe('ziglerNata')
      console.log("BooksInfo.find().fetch()",BooksInfo.find().fetch());
      this.setState({
        BooksInfoInState: BooksInfo.find().fetch()
      })
      console.log("this.state.BooksInfoInState",this.state.BooksInfoInState)
      this.renderBooks();
    })  
  }
  componentWillUnmount(){
    this.tracker.stop();
  }
  removeBook(bookId){
    Meteor.call('booksInfo.remove', bookId);
  }

  showCrossButton(bookId){
    if(Meteor.userId()){   //will change the condition once learn about subscriptions
      return (
        <div key={bookId} className="book-info-content-cross">
          <button className="button" onClick={() => this.removeBook(bookId)}>X</button>
        </div>
        
      )
    }
    return null;
  }

  renderBooks(){
    return (this.state.BooksInfoInState.map(book => {
          return (
            <div key={book._id} className="book-info">
                <div  className="book-info-content">
                <div className="book-info-content-t-a">
                  <h3>{book.title} </h3> 
                  <h5>{book.author}</h5>
                </div>            
                { book.userId === Meteor.userId() && this.showCrossButton(book._id)}
              </div>
            </div>
            
          )
      }))
  }

  render(){
      return (
        <div>
          <div className="info-abt-page">
            {/* { this.state.BooksInfoInState || <h1>Books Available for Trade</h1>}
            { !this.state.BooksInfoInState || <h1>No Books Available for Trade</h1>} */}
            <h1>Books Available for Trade</h1>
          </div>
          <FlipMove maintainContainerHeight={true}>
          {this.renderBooks()}  
          </FlipMove>
                          
        </div>
      );
  }
}




// used tracker's function in above then it all starts to render all books 
// export default class BooksList extends React.Component{
//     constructor(props){
//         super(props);
//     }


//     render(){
//         const renderBooks = BooksInfo.find().fetch().map(book => {
//             return (
//               <div key={book._id} className="item">
//                 {book.title} || {book.author}
//               </div>
//             )
//         })
//         return (
//           <div>
//             {renderBooks}            
//           </div>
//         );
//     }
// }