const mongoose =  require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); //built in module

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"pls enter your name"],
        maxLength:[30,"Name cannot Exceed"],
        minLength:[4,"Name should be morethan 4 cahracter"],       
    },
    email:{
        type:String,
        required:[true,"pls Enter your Email"],
        unique:true,
        validate:[validator.isEmail,"pls enter a valid email"],
    },

    password:{
        type:String,
        required:[true,"pls Enter your password"],
        minLength:[8,"password should greater then 8"],
        select:false
    },

    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    role:{
        type:String,
        default:"user"
    },

    createdAt: {
        type: Date,
        default: Date.now,
      },
      
    resetPasswordToken:String,
    resetPasswordExpire: Date,
    
});




userSchema.pre("save",async function(next){

    if(!this.isModified('password')){
        next();
    }

    this.password =await bcrypt.hash(this.password,10);
});


// jwt token genrating
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE,
    });
}


//comparing pass
userSchema.methods.comparePassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password)
}


//genarating password
userSchema.methods.getResetPass = function (){

    //genration token
    const Resettoken = crypto.randomBytes(20).toString('hex');

    //hashjing and adding to userschema
    this.resetPasswordToken = crypto.createHash("sha256").update(Resettoken).digest("hex");

    this.resetPasswordExpire = Date.now()+ 15 * 60*1000;

    return Resettoken;

}

module.exports = mongoose.model('User',userSchema);