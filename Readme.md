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
