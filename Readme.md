# express 설치
```
npm install express --save
```

```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
3000번 포트를 열어서 get으로 url주소 설정 listen으로 실행시 알람   

# Model은 Schema(데이터 구조 정의)를 감싸주는 역할   
정보를 하나하나 지정   
models\User.js   

```
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
        
``` 
몽구스를 가져와 name 타입String 길이 50으로 지정  



```
module.exports = {User}
```
다른 파일에서도 User로 사용가능   
```
const {User} = require("./models/User")
```

# body-parser
body 데이터를 분석(parser)해 req.body로 출력
```
npm install body-parser --save
```

```
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
```
POST의 URL인코딩방식(위) JSON방식(아래) 분석

```
const user = new User(req.body)
```
body에서 받아와 USER 형태(변수)의 user(변수명)로 만듬

```
res.status(200).json({
      success: true
    })
```
res: client로 응답 보냄
# 라우팅
주소 매핑(apt.get, apt.post)   
```
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```   
# Nodemon
소스코드 변경시 자동으로 적용시켜줌
backend 스크립트
```
"backend": "nodemon server/index.js",
```
# 모듈 사용
다른 파일로부터 정보를 가져옴
```
module.exports ={
  Name:'ksm'
}
```
```
const config = require('./config/Info')
~~~
config.Name
```

# Node 환경
```
if(process.env.NODE_ENV == 'production'){
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}
```

# bcrypt
```
const bcrypt = require('bcrypt');
const saltRounds=10;
```
salt를 사용 해쉬 함수를 통해 암호화함

# pre
```
userSchema.pre('save', function(next){
    var user=this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function (err, salt){
            if(err) return next(err)            
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })    
    } else{
        next()
    }   
})
```
save호출시 실행전에 이함수 실행후 next를 통해 다음 save로 넘어감

# 미들웨어
```
app.post('/api/users/auth', auth, (req, res) => {
```
auth를 통과하지 못하면 실행하지않음