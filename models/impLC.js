var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var impLCSchema = new Schema({
  lcNum: String,
  customer: String,
  benefBank: String,
  amount: String
});


module.exports = mongoose.model('impLC', impLCSchema);

