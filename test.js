Function.prototype.call = function (context, ...args) {
  context = context === undefined || context === null ? window : context;
};
