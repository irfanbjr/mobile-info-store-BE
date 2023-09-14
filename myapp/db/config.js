//  const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://forkhanlala:asdf12345@mobile-app.o4ivefl.mongodb.net/?retryWrites=true&w=majority')
// // mongoose.connect('mongodb://admin:password@mongodb:27017/e-commerce', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });
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
