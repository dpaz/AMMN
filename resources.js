function Resource(name,modifier,max,quantity,perClick) {
  this.name = name;
  this.modifier = modifier;
  this.max = max;
  this.quantity = quantity;
  this.perClick = perClick;
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

