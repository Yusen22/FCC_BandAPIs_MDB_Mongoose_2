require('dotenv').config();
const mongoose = require('mongoose')


// Created MONGO_URI in .env and connected to database

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// Creates schema with schemaTypes, and then produces a model called Person

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  // Creates person with Person model 
  const billyConolly = new Person({
    name: 'Billy Conolly',
    age: 82,
    favouriteFoods: ['Haggis', 'Nips and Tatties']
  })

  // Saves billyConnoly model with an error callback and done
  billyConolly.save((err, data) => {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
}

// Creates array of people. then creates many people using People model 

var arrayOfPeople = [
  {
    name: 'Billy Conolly',
    age: 82,
    favouriteFoods: ['Haggis', 'Nips and Tatties']
  },
  {
    name: 'Bob Mortimer',
    age: 42,
    favouriteFoods: ['Parmo', 'Sausage and mash ']
  }
]

let createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};



var findPeopleByName = function (personName, done) {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return done(err)
    return done(null, personFound);
  });
};


// Finds person by specific food 

let findOneByFood = function (food, done) {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

// Find person by id

var findPersonById = function (personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err)
    person.favoriteFoods.push(foodToAdd)
    person.save((err, personUpdated) => {
      if (err) return console.log(err)
      done(null, personUpdated)
    })
  })
};

// finds person by name and changes age to 20 

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new:true}, (err, docSent)  => {
    if(err) return console.log(err);
    done(null, docSent);
  }) 
};


// Finds by id and removes 

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, idDeleted) => {
    if(err) return console.log(err)
    done(null, idDeleted)
  })
};

// Finds all people with name Mary and removes 

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, personRemoved) => {
    if(err) console.log(err)
    done(null, personRemoved)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
