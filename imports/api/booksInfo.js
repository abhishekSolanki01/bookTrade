import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
 
export const BooksInfo = new Mongo.Collection('booksInfo');

if(Meteor.isServer ){
    Meteor.publish('ziglerNata', () => {
        this.userId // ==> thats how  i call userId here as Meteor.userId id not working here
        //console.log("=>",BooksInfo.find().fetch());
        return BooksInfo.find()
    })

    // Meteor.publish('AllUsers', () => {
    //     console.log("allusers",Meteor.users.find({}, {fields:{emails:1}}));
    //     return Meteor.users.find({}, {fields:{emails:1}})
    // })
}

Meteor.methods({
    "booksInfo.insert" : function (title,author,discription,imageUrl) {
        if(!this.userId){
            throw new Meteor.Error('not-authorized', 'User is not authorized to insert books info')
        }
        BooksInfo.insert({
            userId : this.userId, 
            title , 
            author, 
            discription, 
            imageUrl
        })
    },

    "booksInfo.remove" (bookId) {
        if(!this.userId){
            throw new Meteor.Error('not-authorized', 'User is not authorized to insert books info')
        }
        console.log("Remove Sucececs,c");
        BooksInfo.remove(bookId);

    }

});

