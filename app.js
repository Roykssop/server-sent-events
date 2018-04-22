var express = require('express')
  , app = express()
  , sse = require('./sse')
const events = require('events');
var connections = []


EventEmitter = new events.EventEmitter();

app.use(sse)

/*setInterval(function(){
    b++;
    connections.forEach(function(res){
        res.sseSend(b);
    })
},4000)*/

app.get('/stream', function(req, res) {
  res.sseSetup()
  res.sseSend()
  connections.push(res)
})

app.get('/:id', function(req, res) {
    EventEmitter.emit("connect",{ person : req.params.id });
})

EventEmitter.on('connect', (arg) =>{
    connections.forEach(function(res){
        res.sseSend(arg);
    })
});

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})