express 설치
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

Model은 Schema(데이터 구조 정의)를 감싸주는 역할   
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