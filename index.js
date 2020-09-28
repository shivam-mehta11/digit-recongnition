var express = require('express');
var app = express();
const fs= require('fs');
const multer = require('multer');
const { TesseractWorker }= require('tesseract.js');
//const { createBrotliCompress } = require('zlib');
var port = 3000|| process.env.PORT;

const worker= new TesseractWorker();

const storage= multer.diskStorage({
  destination: (req,file,cb)=>{
      cb(null,"./uploads");
  }, 
 filename: (req,file,cb)=>{
      cb(null,file.originalname);
}
});

const upload = multer({storage:storage}).single("avatar");
app.set("view engine","ejs");

//routes
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "digitclassifier.html" ); //added the static  file to the git
})

app.get('/pdf',(req,res)=>{
 res.render('index.ejs');
});

app.post('/upload',(req,res)=>{
    upload(req,res,err=>{
      //  console.log(req.file);
      fs.readFile(`./uploads/${req.file.originalname}`,(err,data)=>{
          if(err) return console.log("This is error",err);
           worker.recognize(data,"eng",{tessjs_create_pdf:'1'})
           .progress(progress=>{
               console.log(progress);
           })
           .then(result=>{
               res.send(result.text);
           })
           .finally(()=> worker.terminate());
      });
    });
});

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port);
})
