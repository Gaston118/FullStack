const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://gaston118:${password}@cluster0.zxl4bzf.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*
//MANDAR DATOS

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: false,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})*/

//OBTENCION DE DATOS 

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })