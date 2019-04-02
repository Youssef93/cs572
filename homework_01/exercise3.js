function applyCoupon(item) {
  return function(discount) {
    item.price = item.price - (discount / 100) * item.price;
    return item;
  }
}

const item = {
  name: 'test',
  price: 200
};

console.log(applyCoupon(item)(10));