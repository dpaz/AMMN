function Building(name,modifier,quantity,cost,button) {
  this.name = name;
  this.modifier = modifier;
  this.quantity = quantity;
  this.cost = cost;
  this.button = button;
}

Resource.prototype.name = function() {
  return this.name;
};

Resource.prototype.modifier = function() {
  return this.modifier;
};

Resource.prototype.quantity = function() {
  return this.quantity;
};

Resource.prototype.cost = function() {
  return this.cost;
};

Resource.prototype.button = function() {
  return this.button;
};
