import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';


//validate the user just before its created, 4 that i used
//a meteor hook(a method we can call) i give it a cllback
//and it automatically calls this callback every time new user is made
//available in Accounts...passing (user) as param
Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    try{
        new SimpleSchema({
            email : {
                type : String,
                regEx : SimpleSchema.RegEx.Email
            }
        }).validate({email})

    }catch(e){
        throw new Meteor.Error(400, e.message);
    }

    return true;
})

if(Meteor.isServer){
    Meteor.publish('AllUsers', () => {
        console.log("allusers",Meteor.users.find({}, {fields:{emails:1}}));
        return Meteor.users.find({}, {fields:{emails:1,profile:1}})
    })
}

Meteor.methods({
    "user.update" (name,state,city,address){
        if(!this.userId){
            throw new Meteor.Error('not-authorized')
        }
        // users.updateOne(
        //     { _id: this.userId },
        //     { $set: {
        //         "profile.state": state,
        //         "profile.city": city,
        //         "profile.address": address 
        //     } }
        // )

    





        const filter = { _id: this.userId };
        // update the value of the 'z' field to 42
        const options = {
            profile : {
                name,
                city,
                state,
                address,
            }
        }
        const updateDocument = {
            $set: {
                "profile.state": state,
                "profile.city": city,
                "profile.address":address
            }
        };
        const result = Meteor.users.update(this.userId, { $set : options });
        










    }
})

