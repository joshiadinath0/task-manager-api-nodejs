const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task =require('./task')



const userSchema = new mongoose.Schema({
    
    
    
    
    name:{
    type:String,
    required:true,
    trim:true
},
password:{
 type:String,
 required:true,
 trim:true,
 
 
 validate(value){
     if(value==="password"){
         throw new Error("Password cannot be password")
     }
     if(value.length<=6){
        throw new Error("Password must be greater than 6")
     }
 }   
},
email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    unique:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is invalid")                
        }
    }
},
age:{
    type:Number,
    default:0,
    validate(value) {
        if(value < 0){
            throw new Error('Age must be a positive number')
        }
    }
},
    tokens: [{
        token:{
            type: String,
            required:true
            
        }
    }],
    avatar:{
        type:Buffer
    }
},{
timestamps:true

})


//virtual property to relate task and user

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'

})








userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject

}

userSchema.methods.generateAuthToken =async function () {
    const user = this
    const token = jwt.sign({ _id:user._id.toString() },process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token:token})
    await user.save()
    return token

}


userSchema.statics.findByCredentials= async (email,password) =>{

    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to Log In!')
    }

    const isMatch =await bcrypt.compare(password,user.password)
    if(!isMatch)
{
    throw new Error('Unable to Log In!')  
}

return user



}





//delete user atasks when user is removed
userSchema.pre('save',async function(next){
    const user= this
    await Task.deleteMany({owner:user._id})
    
    next()
})





// Hashing plaintext
userSchema.pre('save',async function(next){

    const user = this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }

    next()
})

const User=mongoose.model('User',userSchema)


module.exports =User