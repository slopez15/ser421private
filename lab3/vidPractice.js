//show dbs
show dbs
//show current db
db
//use dbName
use dbName

/*
i think need 
flags and args 
before doing anything or not keep record in mongoDB.

*/


//commands ran in mongo.
db.createUser({
	user:'userNew',
	pwd: '123New', 
	roles: ['readWrite', 'dbAdmin']
});
//create collection
db.createCollection('customers');
db.customers.insert({
	firstName:"John", 
	lastName:"Doe"
});
db.customers.find();
/*
automatically made _id field (ObjectId field)
no need for use to do (like in relational)
	foreign keys,
	auto-increment,
	setting it, etc.
*/

//CREATE
db.customers.insert([{
	firstName:"Steven", 
	lastName:"Smith"
},{
	firstName:"Joan", 
	lastName:"Johnson",
	gender: "female"
}]);
db.customers.find();
db.customers.find().pretty();
/*In relational... would have to...
had to follow a format and not new fields on the fly.
*/

//UPDATE
db.customers.update({firstName: "John"}, {
	firstName:"John", 
	lastName:"Doe",
	gender: "male"
});
db.customers.find().pretty();
/*
if building in prod. dont want make firstName, cause others can have same field and will update all of them.
So, use objectID.
*/
/*IMPORTANT: it overwrites everything of the objects matching filter.
What happened in code above?:
	finds all that matches {firstName: "John"} this entry.
	overwrites entire {} with new update {}.
*/
/*
HOW TO AVOID OVERWRITING ENTIRE {}.
see below
*/
db.customers.update({firstName: "Steven"}, {
	$set: {
		gender: "male"	
	}
});
db.customers.find().pretty();
/*output: 
before:
{
        "_id" : ObjectId("5bc941a4f1b5c281c905291d"),
        "firstName" : "Steven",
        "lastName" : "Smith"
}
after:
{
        "_id" : ObjectId("5bc941a4f1b5c281c905291d"),
        "firstName" : "Steven",
        "lastName" : "Smith",
        "gender" : "male"
}
*/

//INC operator
//increment his age and kept the rest.
db.customers.update({firstName: "Steven"}, {
	$set: {
		age: 45	
	}
});
db.customers.find().pretty();
db.customers.update({firstName: "Steven"}, {
	$inc: {
		age: 5	
	}
});
db.customers.find().pretty();

//some operators to use with update. DEL?
db.customers.update({firstName: "Steven"}, {
	$unset: {age: 1}
});
db.customers.find().pretty();
/*
Notice: age has 1 when unsetting. wo/it, nothing happens.
*/
//trying to remove non-existing attr.
db.customers.update({firstName: "Mary"}, {firstName: "Mary", lastName:"Samson"} );
db.customers.find().pretty();
/*nothing happens*/
//Using 2rd param aka options.
//if not found insert it.
db.customers.update({firstName: "Mary"}, {firstName: "Mary", lastName:"Samson"}, {upsert:true} );
db.customers.find().pretty();
//RENAME
db.customers.update({firstName: "Steven"}, {$rename: {gender:"sex"}} );
db.customers.find().pretty();
/*
didn't notice change, cause it does not change value, but changes attr.
also, he used quotes for attr, but not needed. 
*/


//DELETE
db.customers.remove({firstName: "Steven"});
db.customers.find().pretty();
/*
does?: removes all objects with firstName Steven.
2nd param aka options: 
	db.customers.remove({firstName: "Steven"}, {justOne:true} ); //true or 1.
*/


//FIND WITH PARAMS
db.customers.find().pretty(); //prints all
//filter
db.customers.find({firstName: "Joan"}).pretty(); 
//OR
db.customers.find( {$or: [{firstName: "Joan"}, {firstName: "John"}]} ).pretty();
//gt or lt
db.customers.find( {age: {$gt: 4}} ).pretty();
//-- i added ages to all 0,50,100 so I can try lt/gt
db.customers.update({firstName: "Mary"}, {
	$set: {
		age: 100
	}
});
db.customers.find().pretty();
//setting nested params
	//w/ {}
db.customers.update({firstName: "Mary"}, {
	$set: {
		address: {
			street: "nunya",
			town: "business"
		}
	}
});
db.customers.find().pretty();
	//same, but with []
db.customers.update({firstName: "Mary"}, {
	$set: {
		memberships: ["mem1", "mem2"]
	}
});
db.customers.find().pretty();
//getting nested params
	//{}
db.customers.find({"address.town":"business"}).pretty();
	//[]
db.customers.find({memberships:"mem1"}).pretty();
/*
NEED QUOTES FOR DOT NOTATION obtained ATTR.s
*/
/*
NOTE: will need quotes for clients/programs that will need quotes in key aswell.
*/


//OTHER, methods
//sort
	//accending
db.customers.find().sort({firstName: 1}).pretty();
	//deccending
db.customers.find().sort({firstName: -1}).pretty();
//count
db.customers.find().count();
db.customers.find({gender: "male"}).count();
//limit
db.customers.find().limit(1);
//can combine^^
//forEach
db.customers.find().forEach((doc)=>{	
	print("Customer Name: " + doc.firstName);
});
/*
print() works, but NOT console.log();
WHAT DOES THIS MEAN? --this is not vanillaJS, but mongoDB's env/program/methods/idk/.
*/










/*
{
	firstName:"john", 
	lastName: "Doe",
	memberships: ['mem1', 'mem1'],
	
}
*/