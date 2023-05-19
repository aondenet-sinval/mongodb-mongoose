const mongoose = require('mongoose')
//Conexão local:

// variavel url no vercel mongo_uri: PIZZA_MONGO_URI
// const url = mongodb+srv://<username>:<password>@cluster0.biqov.mongodb.net/?retryWrites=true&w=majority
//   `mongodb+srv://mongodb-atlas-ssa:${password}@cluster0.biqov.mongodb.net/?retryWrites=true&w=majority`
const url ='mongodb://localhost:27017/pizzaria-react'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema( {
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
} )

const Person = mongoose.model('Person', personSchema)
// const peopleFavorites = new Person ({
//   name: "Robert",
//   age: 16,
//   favoriteFoods: ["fish", "fresh fruit"]
// })
// //
// peopleFavorites.save().then(result => {
//   console.log('people saved!')
//   mongoose.connection.close()
// })
//Search produtos
// Person.find( {} )
//   .then(result => {
//     result.forEach(produto => {
//       console.log(produto)
//     } )
//     mongoose.connection.close()
//   } )
// const nameToRemove = "Mary";
// Person.deleteMany({name: nameToRemove}, (err, response)=>{
//   if(err) return console.error(err);
//   console.log(response);
// })
const foodToSearch = "burrito";
Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(err, people){
    if(err) return console.error(err)
    console.log(people);
  })
  // Person.find({ favoriteFoods: foodToSearch })
  // .sort({ name: 1 })
  // .limit(2)
  // .select({ age: 0 })
  // .exec()
  // .then(people => {
  //   console.log(people);
  // }).catch(err => {
  //   console.error(err)
  // })
