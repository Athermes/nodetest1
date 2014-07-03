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

//
router.get('/userlist', function(req, res) {
    var db = req.db;
	
	if (db == null) {res.json('empty');}
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