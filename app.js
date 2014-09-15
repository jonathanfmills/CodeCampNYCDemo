var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SpeakerTracker');

var Speaker = require('./app/model/speakers')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;

var router = express.Router();

router.get('/',function(req,res){
    res.json({message:"hello"});
});

app.use('/api', router);

router.route('/speakers')
    .post(function(req,res){
        var speaker = new Speaker();

        speaker.name = req.body.name;

        speaker.save(function (err) {
            if(err)
                res.send(err);

            res.json({message:"Thanks for the new speaker"});
        });
    })
    .get(function(req, res){
        Speaker.find(function (err, speakers) {
            if(err)
                res.send(err);
            res.json(speakers);
        });
    })
router.route('/speakers/:speaker_Id')
    .get(function(req,res){
        Speaker.findById(req.params.speaker_Id, function(err,speaker){
            if(err)
                res.send(err);
            res.json(speaker);
        })
    })
    .put(function(req,res){
        Speaker.findById(req.params.speaker_Id, function(err,speaker){
            if(err)
                res.send(err);
            speaker.name = req.body.name;
            speaker.save(function(err){
                if(err)
                    res.send(err);
                res.json({message:"Speaker Updated"});
            });
        })
    })
    .delete(function(req,res){
        Speaker.remove({_id:req.params.speaker_Id},function(err,speaker){
            if(err)
                res.send(err)
            res.json({message:"speaker deleted"})
        })
    })
app.listen(port);
console.log("listening on port " + port)

