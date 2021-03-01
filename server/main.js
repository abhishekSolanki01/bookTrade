import { Meteor } from 'meteor/meteor';
import { BooksInfo } from '../imports/api/booksInfo';
import '../imports/api/users'
import { Accounts} from "meteor/accounts-base";

Meteor.startup(() => {

    console.log(BooksInfo.find({}).fetch());
    console.log(Accounts.users.find({}).fetch());
});
