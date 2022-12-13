// Object Property shorthand

const name = 'kichu';
const userAge = 26;

const user = {
    name,
    age: userAge,
    location: 'Philadelphia'
}

console.table(user);

// Object destructuring (extracting properties from object)

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}

// const label = product.label
// const stock = product.stock

const {label:productLabel, stock, rating = 5} = product
console.log(productLabel) // Red notebook
console.log(stock) // 201
console.log(rating) // 4.2 (if there is no rating property matching on product object, then we will get the default value as 5)

// Object destructuring with function arguments

const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)// order Red notebook 201