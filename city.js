function Building(name,modifier,quantity,cost) {
  this.name = name;
  this.modifier = modifier;
  this.quantity = quantity;
  this.cost = cost;
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