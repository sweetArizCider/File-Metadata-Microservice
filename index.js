var express = require('express');
var cors = require('cors');
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
require('dotenv').config()

var app = express();

app.use(
  express.urlencoded({
      extended: true,
      inflate: true,
      limit: "1mb",
      parameterLimit: 5000,
      type: "application/x-www-form-urlencoded",
  })
);

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'),async(req,res)=>{
  const file = req.file
  
  if(!file){
    res.status(400).json({error: 'You should submit a file'});
  }
  res.status(200).json({name: file.originalname, type: file.mimetype, size: file.size});
})






const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
