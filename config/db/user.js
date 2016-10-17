var mongoose      = require("mongoose")
  , Schema        = mongoose.Schema
  ;

var User = new Schema({
  provider: String,
  googleId: String,
  displayName: String,
  name: {
    familyName: String,
    givenName: String,
    middleName: String
  },
  emails: Array,
  photos: Array
});

User.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.__v;
    return ret
  }
};

mongoose.model("User", User);