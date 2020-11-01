const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose 
mongoose.connect('mongodb://localhost:27017/articulos', {useNewUrlParser: true});
app.use(cors());
app.use(bodyParser.json());



app.listen(3050, function () {
  console.log('MongDB server API listening on port 3050!');
});




app.get('/test',(req,res)=>
{
    let json ={
        "GUID":"d68a2d74-d783-43e4-9eb9-cf752547c98c",
        "Location":{"lat":6.1055975555555,"long":-81.05845555584},
        "Province":"FlaflaShuhushshfragragragLandia",
        "Canton":"Tangamandapioasdasdasdsadasdasdsad",
        "TimeStamps":"2020-11-01T21:30:55+0000",
        "State":  1,
        "SecurityLevel" : 1
    }
    res.json(json);
})
app.post('/performanceTest/:json',(req,res)=>
{  
    let json = JSON.parse (req.params.json)
    console.log(json);
    const Articles = mongoose.model('Article',new Schema({
    GUID:String,
    location:{lat:Number,long:Number},
    Province:String,
    Canton:String,
    TimeStamps:Date,
    State:Number,
    SecurityLevel:Number
}))
const newArticle = new Articles({
        GUID:json.GUID,
        location:json.Location,
        Province:json.Province,
        Canton:json.Canton,
        TimeStamps:json.TimeStamps,
        State:json.State,
        SecurityLevel:json.SecurityLevel
      })
      newArticle.save((err,post)=>
      {
          if(err)
          {
              console.log("se cayó");
          }
          res.send("Lo metió")
      })
})