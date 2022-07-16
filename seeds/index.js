const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '62c8f5be66a1415349591873',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://source.unsplash.com/collection/483251',
      description: 'A spicy place!',
      price,
      images: [
        {
            url: 'https://res.cloudinary.com/cherrycoke/image/upload/v1657845652/YelpCamp/cwixxjvzqxfrukq0selx.jpg',
            filename: 'YelpCamp/cwixxjvzqxfrukq0selx'
        },
        {
            url: 'https://res.cloudinary.com/cherrycoke/image/upload/v1657845652/YelpCamp/i9gxo4heuaof3rb4qn1h.jpg',
            filename: 'YelpCamp/i9gxo4heuaof3rb4qn1h'
        }
    ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})