require('dotenv').config();
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})
const Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  const tazeRussel = new Person ({
    name: "Charles Taze Russel ",
    age: 78,
    favoriteFoods: ["eggs", "fish", "fresh fruit"]
  })
  tazeRussel.save(function(err, data){
    if(err) return console.error(err);
    done(null, data);
  })
};
const arrayOfPeople = [
  { name: "Charles Taze Russel ", age: 78, favoriteFoods: ["fish"] },
  { name: "William Tyndale", age: 58, favoriteFoods: ["fresh fruit"] },
  { name: "Miguel Servet", age: 42, favoriteFoods: ["eggs"] }
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    if(err) return console.error(err);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound){
    if(err) return conole.error(err);
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data){
    if(err) return console.log(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function(err, person){
    if(err) return console.log(error);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, personUpdate)=>{
      if(err) return console.error(err);
      done(null, personUpdate);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, updateAge){
    if(err) return console.error(err);
    done(null, updateAge);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, removeDoc)=>{
    if(err) return console.error(err);
    done(null, removeDoc)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name: nameToRemove}, (err, response)=>{
    if(err) return console.error(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(err, people){
    if(err) return console.error(err)
    done(null, people);
  })
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
