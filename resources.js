function Resource(name,modifier,max,quantity,perClick,counter,perTick) {
  this.name = name;
  this.modifier = modifier;
  this.max = max;
  this.quantity = quantity;
  this.perClick = perClick;
  this.counter = counter;
  this.perTick = perTick;
}

Resource.prototype.name = function() {
  return this.name;
};

Resource.prototype.modifier = function() {
  return this.modifier;
};

Resource.prototype.max = function() {
  return this.max;
};

Resource.prototype.quantity = function() {
  return this.quantity;
};

Resource.prototype.perClick = function() {
  return this.perClick;
};

Resource.prototype.counter = function() {
  return this.counter;
};

Resource.prototype.perTick = function() {
  return this.perTick;
};
