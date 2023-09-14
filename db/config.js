
//  const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://forkhanlala:qwert12345@mobile-app.o4ivefl.mongodb.net',function()
// {
//     console.log("Mongo db connected")
// })
// mongoose.connect('mongodb://admin:password@localhost:3001/e-commrece');

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://admin:password@host-machine-ip:27017/e-commerce', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://forkhanlala:asdf12345@mobile-app.o4ivefl.mongodb.net/');
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectToDatabase();

