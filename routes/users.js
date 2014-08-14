var express = require('express');
var router = express.Router();

/*
 * GET ads.
 */

router.get('/location_ads', function(req, res) {
    var db = req.db;

    if (db === null) {
        res.json('empty');
    }
    else {
        db.collection('local_ads').find({
            "position.lat": "23.0954"
        }).toArray(function(err, items) {
            res.json(items);
        });

    }
});
// 2014 07 07 start open
router.post('/location_ads02', function(req, res) {
    var db = req.db;

    if (db === null) {
        res.json('empty');
    }
    else {
        //res.send({msg: ''});
        //res.send({"text": "post done!"});
        console.log('req.body.GPS.lat  ' + req.body.GPS.lat);
        db.collection('request_tracking').insert(req.body, function(error, result) {
            if (error === null) {
                console.log('payLoad tracking OK');
            }
            else {
                console.log('payLoad tracking error');
            }

        });
        /*
    db.collection('local_ads').find({"position.lat": "23.0954"}).toArray(function (err, items) {
        //var a1 = new Array() ; 
        var a2 = new Array() ;
        //a1.push(items);
        a2.push(req.body);
        items = items.concat(a2);
        console.log(items); 
        res.json(items);
        
    });
	*/
        // ads square share

        var queryCondition = {
            "$and": [{
                "$and": [{
                    "pointNE.lat": {
                        "$gt": 39.9953
                    }
                }, {
                    "pointSW.lat": {
                        "$lt": 39.9953
                    }
                }]
            }, {
                "$and": [{
                    "pointNE.long": {
                        "$gt": -75.37
                    }
                }, {
                    "pointSW.long": {
                        "$lt": -75.37
                    }
                }]
            }]
        };
        //debugger; 
        console.log('befor change' + queryCondition.$and[0].$and[0]["pointNE.lat"].$gt);
        console.log(req.body.GPS);
        queryCondition.$and[0].$and[0]["pointNE.lat"].$gt = + req.body.GPS.lat;
        queryCondition.$and[0].$and[1]["pointSW.lat"].$lt = + req.body.GPS.lat;
        queryCondition.$and[1].$and[0]["pointNE.long"].$gt = + req.body.GPS.long;
        queryCondition.$and[1].$and[1]["pointSW.long"].$lt = + req.body.GPS.long;
        console.log('after change' + queryCondition.$and[0].$and[0]["pointNE.lat"].$gt);
        console.log('whole '  + JSON.stringify(queryCondition));
        //debugger; 
        db.collection('MapData').find(

        /*   
	        {
	    "$and" :[ 
		     {"pointNE.lat" : {"$gt" : req.body.lat } }  ,   
		    	{"pointSW.lat" : {"$lt" : req.body.lat } }
		        ] 
        } 
	     */
        // ////  parseInt(req.body.lat)

        queryCondition

        //////

        ).toArray(function(err, items) {
            //var a2 = new Array();
            //a2.push(req.body.GPS.lat);
            //items = items.concat(a2);
            console.log(items);
            res.json(items);

        });

        // close:  ads square share

    }
});
// 2014 07 07 close 
router.get('/userlist', function(req, res) {
    var db = req.db;

    if (db === null) {
        res.json('empty');
    }
    else {
        db.collection('userlist').find().toArray(function(err, items) {
            res.json(items);
        });
    }
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    db.collection('userlist').insert(req.body, function(err, result) {
        res.send(
        (err === null) ? {
            msg: ''
        } : {
            msg: err
        });
    });
});

router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? {
            msg: ''
        } : {
            msg: err
        });
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