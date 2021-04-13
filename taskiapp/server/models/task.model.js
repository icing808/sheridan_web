//Schema  Model  Entity
const mongoose = require('mongoose');

//1.Schema  is the table structure
const taskSchema = mongoose.Schema({
  user_id : String,
  title: String,
  content: String,
  category_id: Number,
  start_time: String,
  end_time: String,
  status: Number,
  level: Number,
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
const TaskModels = {
    Task : mongoose.model('task',taskSchema)
}

module.exports = TaskModels;
