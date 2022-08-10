const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const {User} = require("./models/User");
const {auth} = require("./middleware/auth");

const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.MongoURI).then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res)=>{
  //회원가입 할떄 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다 

  const user = new User(req.body)

  user.save((err,userInfo) => {
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login',(req, res)=>{
  //find email from db
  User.findOne({email: req.body.email },(err, user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message:"제공된 이메일에 해당되는 유저가 없습니다"
      })
    }

    user.comparePassword(req.body.password, (err, isMatch ) =>{
      if(!isMatch)
        return res.json({loginSuccess:false, message: "비밀번호가 틀렸습니다"})
      //make token
      user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err);
              
      res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess:true, userId: user._id})       
      })
    })
  }) 
})

app.post('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role ===0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) =>{
  User.findOneAndUpdate({ _id: req.user._id},
    {token:""}
    ,(err, user) => {
      if(err) return res.json({ success: false, err});
      return res.status(200).send({
        success: true
      })
    })  
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})