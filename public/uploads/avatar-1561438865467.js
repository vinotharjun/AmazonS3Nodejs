
const AWS = require('aws-sdk');
const fs=require("fs");
const s3 = new AWS.S3({
    accessKeyId: "AKIAJ56OYQ7V6HBUZXNQ",
    secretAccessKey: "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",
    Bucket: "resume-datasets"
});

const uploadString=(string)=>{
    const params={
            Bucket:"resume-datasets",
            Key:"test.txt",
            Body:string
    }
    s3.upload(params,(err,data)=>{
        if(err){
        throw err
        }
        console.log(`string uploaded ${data}`)
    })
}
const uploadFile=(file)=>{
    fs.readFile(file,(err,data)=>{
        if (err){
            throw err;
        }
        console.log(data);
        const params={
            Bucket:"resume-datasets",
            Key:file,
            Body:data
        }
        s3.upload(params,(err,data)=>{
            if(err) throw err
            console.log("file uploaded")
        })
    })
    // const  params={
    //   Bucket:"resume-datasets",
    //   Key:file.name,
    //   Body=""  
    // }
}
 uploadFile("gift.pdf")