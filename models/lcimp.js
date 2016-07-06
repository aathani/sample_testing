var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var impLCSchema = new Schema({
  lcNum: Integer,
  customer: String,
  benefBank: String,
  amount: number
});


module.exports = mongoose.model('blobs', blobSchema);

