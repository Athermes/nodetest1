var express = require('express');
var router = express.Router();

/*
 * GET ads.
 */

router.get('/location_ads', function(req, res) {
    var db = req.db;
	
	if (db === null) {res.json('empty');}
	else {
    db.collection('local_ads').find({"position.lat": "23.0954"}).toArray(function (err, items) {
        res.json(items);
    });
	
	}
});
// 2014 07 07 start open
router.post('/location_ads02', function(req, res) {
    var db = req.db;
	
	if (db === null) {res.json('empty');}
	else {
	//res.send({msg: ''});
    //res.send({"text": "post done!"});
    console.log('req.body' + req.body);
    db.collection('local_ads').find({"position.lat": "23.0954"}).toArray(function (err, items) {
        //var a1 = new Array() ; 
        var a2 = new Array() ;
        //a1.push(items);
        a2.push(req.body);
        items = items.concat(a2);
        console.log(items); 
        res.json(items);
        
    });
	
	}
});
// 2014 07 07 close 
//
router.get('/userlist', function(req, res) {
    var db = req.db;
	
	if (db === null) {res.json('empty');}
	else {
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
	
	}
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    db.collection('userlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.delete('/deleteuser/:id', function(req, res){
	var db = req.db; 
	var userToDelete = req.params.id;
	db.collection('userlist').removeById(userToDelete, function(err,result){
		res.send((result === 1) ? { msg: ''} : { msg : err } ); 
	});
});

/*
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});
*/
module.exports = router;