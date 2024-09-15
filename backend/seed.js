const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const clothingProducts = [
  {
    name: "Classic White T-Shirt",
    price: 19.99,
    description: "Soft cotton basic white t-shirt, unisex",
    imageUrl: "https://example.com/white-tshirt.jpg",
    category: "Tops",
    size: ["S", "M", "L", "XL"],
    color: "White"
  },
  {
    name: "Slim Fit Jeans",
    price: 49.99,
    description: "Blue denim slim fit jeans for men",
    imageUrl: "https://example.com/slim-jeans.jpg",
    category: "Bottoms",
    size: ["30x32", "32x32", "34x32", "36x32"],
    color: "Blue"
  },
  {
    name: "Floral Summer Dress",
    price: 39.99,
    description: "Light and breezy floral print summer dress",
    imageUrl: "https://example.com/floral-dress.jpg",
    category: "Dresses",
    size: ["S", "M", "L"],
    color: "Multicolor"
  },
  {
    name: "Leather Jacket",
    price: 129.99,
    description: "Classic black leather jacket for men",
    imageUrl: "https://example.com/leather-jacket.jpg",
    category: "Outerwear",
    size: ["M", "L", "XL"],
    color: "Black"
  },
  {
    name: "Athletic Running Shorts",
    price: 24.99,
    description: "Breathable running shorts with inner lining",
    imageUrl: "https://example.com/running-shorts.jpg",
    category: "Activewear",
    size: ["S", "M", "L", "XL"],
    color: "Navy"
  },
  {
    name: "Wool Sweater",
    price: 59.99,
    description: "Warm knit wool sweater for winter",
    imageUrl: "https://example.com/wool-sweater.jpg",
    category: "Tops",
    size: ["S", "M", "L", "XL"],
    color: "Gray"
  },
  {
    name: "Formal Button-Up Shirt",
    price: 44.99,
    description: "Crisp white formal button-up shirt",
    imageUrl: "https://example.com/formal-shirt.jpg",
    category: "Tops",
    size: ["15", "15.5", "16", "16.5", "17"],
    color: "White"
  },
  {
    name: "Yoga Pants",
    price: 34.99,
    description: "Stretchy and comfortable yoga pants",
    imageUrl: "https://example.com/yoga-pants.jpg",
    category: "Activewear",
    size: ["XS", "S", "M", "L"],
    color: "Black"
  },
  {
    name: "Denim Jacket",
    price: 69.99,
    description: "Classic blue denim jacket, unisex",
    imageUrl: "https://example.com/denim-jacket.jpg",
    category: "Outerwear",
    size: ["S", "M", "L", "XL"],
    color: "Blue"
  },
  {
    name: "Silk Blouse",
    price: 79.99,
    description: "Elegant silk blouse for women",
    imageUrl: "https://example.com/silk-blouse.jpg",
    category: "Tops",
    size: ["S", "M", "L"],
    color: "Ivory"
  }
];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch((err) => console.log('MongoDB connection error:', err));

const seedClothingProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log('Deleted existing products');

    const createdProducts = await Product.insertMany(clothingProducts);
    console.log('Added sample clothing products:', createdProducts);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding clothing products:', error);
    mongoose.connection.close();
  }
};

seedClothingProducts();