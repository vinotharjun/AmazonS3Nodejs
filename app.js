const express = require("express");

const hbs = require("express-handlebars");
const nodemailer=require("nodemailer");
var multer  = require('multer')
const fs=require("fs")
const AWS = require('aws-sdk');

const path=require("path");
const port=process.env.PORT||3000;
const app =express();
const url = require('url');   
app.engine("handlebars",hbs())
app.set('view engine','handlebars');
app.use('/public',express.static(path.join(__dirname,'public')));

const s3 = new AWS.S3({
    accessKeyId: "AKIAJVDPOODLBYE4O53A",
    secretAccessKey: "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",
    Bucket: "resume-datasets"
});
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      console.log(req.body)
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({
    storage: storage
  }).array('avatar',1000);
  
  app.get("/",(req,res)=>{
    res.render("index",{msg:req.query.valid,color:req.query.color})
  })


  //file upload
app.post("/send",(req,res)=>{
  var resObj = res;
  upload(req, res, (err) => {
    if (err) throw err
    let array=req.files;
     uploadFile(array[0]["path"],array[0]["filename"], resObj);
    //  res.send('File Uploaded successfully')
  })
})

const uploadFile=(file,fullname,res)=>{
  fs.readFile(file,(err,data)=>{
      if (err){
          throw err;

      }
      console.log(data);
      const params={
          Bucket:"resume-datasets",
          Key:new Date().getTime().toString()+"-"+fullname,
          Body:data
      }
      s3.upload(params,(err,data)=>{
          if(err) {
            throw err;
            res.send("Some error occured")
          }

          console.log("file uploaded");
          res.send("File uploaded succcessfully")
          
      })
  })

}
  app.listen(port,()=>{
      console.log("leander")
  })
  
