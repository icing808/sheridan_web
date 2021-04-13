//Schema  Model  Entity
const mongoose = require('mongoose');

//1.Schema  is the table structure
const loginSchema = mongoose.Schema({
  name : String,
  password : String,
  email: String,
  role_id: Number,
  created_on:{
    type: Date,
    default: Date.now
  },
  modified_on:{
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false,
  timestamps: { createdAt: 'created_on', updatedAt: 'modified_on' }
});
/*2.Model It is constructed by schema. In addition to the database skeleton defined by schema, 
* it can also operate the database concretely.
* This means that a users table is created in the database of Zhao, and the format is defined in loginschema
*/
const Models = {
    Login : mongoose.model('users',loginSchema)
}

module.exports = Models;