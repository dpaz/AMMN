function Job(name,modifier,max,quantity,suc,plus,perTick,counter) {
  this.name = name;
  this.modifier = modifier;
  this.max = max;
  this.quantity = quantity;
  this.suc = suc;
  this.plus = plus;
  this.perTick = perTick;
  this.counter = counter;
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

Resource.prototype.suc = function() {
  return this.suc;
};

Resource.prototype.plus = function() {
  return this.plus;
};

Resource.prototype.perTick = function() {
  return this.perTick;
};

Resource.prototype.counter = function() {
  return this.counter;
};

