const express = require('express')
const path=require('path')
const file_uploader = require('express-fileupload')
app=express()
app.use(file_uploader())
//Limit the file
/* app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, //Bytes
  })); */
app.post('/upload',async(req,res)=>{
//check any file uploaded or not
if(!req.files){
    res.status(400)
    res.send("Upload A File!")
    return
}
var  samplefile=req.files.file  //fetch a file with name 'file'
samplefile.name=await (Date.now())+samplefile.name //rename the file
var  upload_dir='./upload/'+samplefile.name
var  extension=path.extname(samplefile.name).toLocaleLowerCase(); //return .jpeg /.png ,etc
console.log(extension)
//Check file extensions
if(extension!='.jpeg'&& extension!='.jpg'&& extension!='.png'){
    res.status(400)
    res.send("Upload A image File!")
    return
}
else{
    try{
   await samplefile.mv(upload_dir)} 
   catch(err){
     console.log(err)
   }
   finally{
      return res.status(200).send("File Uploaded to "+upload_dir)
   }
}
})
app.listen(3000,()=>{
    console.log("Server is Active")
})