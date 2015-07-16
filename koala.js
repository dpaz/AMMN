function Koala(quantity,max,cost,button,counter,available) {
  this.quantity = quantity;         
  this.max = max;
  this.cost = cost;
  this.button = button;
  this.counter = counter;
  this.available = available;
}

Resource.prototype.quantity = function() {
  return this.quantity;
};

Resource.prototype.max = function() {
  return this.max;
};

Resource.prototype.cost = function() {
  return this.cost;
};

Resource.prototype.button = function() {
  return this.button;
};

Resource.prototype.counter = function() {
  return this.counter;
};

Resource.prototype.available = function() {
  return this.available;
};



