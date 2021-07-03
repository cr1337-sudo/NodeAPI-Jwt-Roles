const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
   username: {
      type: String,
      unique: true
   },
   email: {
      type: String,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   roles: [{
      //Relacion del esquema User con el esquema Rol ( One to Many)
      ref: "Role",
      type: Schema.Types.ObjectId,
   }]
},
   {
      timestamps: true,
      versionKey: false
   });

userSchema.statics.encryptPassword = async (password) => {
   //Algoritmo que se aplica para cifrar, se cifra 10 veces
   const salt = await bcrypt.genSalt(10);

   //Acá se cifra la contraseña
   return await bcrypt.hash(password, salt);


}
userSchema.statics.comparePassword = async (password, receivedPassword) => {
   return await bcrypt.compare(password, receivedPassword)//true o false
 }


module.exports = model("User", userSchema)