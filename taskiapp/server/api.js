//const models = require('./db');
const models = require('./models/user.model');
const express = require('express');
const router = express.Router();

//create API
router.post('/api/user/register',(req,res) => {
	//there req.body In fact, the body parser middleware is used to parse the data sent by the front end
	//Query name = req.body.name
    console.log("req---"+req.body); 
	models.Login.find({email: req.body.email},(err,data) => {
		if(err){
			res.send({'status': 1002, 'message': 'Query failure', 'data': err});
		}else{
			console.log('Query success' + JSON.stringify(data))
			//data : A collection with the same name in the returned database
			if(data.length > 0){
				res.send({'status': 1001, 'message': 'The user name is already registered！'});
			}else{
				let newEmail = new models.Login({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    role_id : 2
                });
                //newName.save insert to table
                newEmail.save((err,data) => {
                    if (err) {
                        res.send({'status': 1002, 'message': 'Sign up failure！', 'data': err});
                    } else {
                        res.send({'status': 1000, 'message': 'Sign up successful!'});
                    }
                });
			}
		}
	})
})
//signIn api
router.post('/api/user/login',(req,res) => {
	models.Login.find({email: req.body.email, password: req.body.password},(err,data) => {
		if (err) {
            // res.send(err);
            res.send({'status': 1002, 'message': 'Failed to query database!', 'data': err});
        } else {
            console.log(data)
            if (data.length > 0) {
                res.send({'status': 1000, 'message': 'Sign In successful!', 'data': data});
            } else {
                res.send({'status': 1001, 'message': 'Sign In failure. The user is not registered!', 'data': err});
            }
        }
	})
})
//get All user api
router.get('/api/user/all',(req,res) => {
    models.Login.find((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
//delete user
router.post('/api/user/delete',(req,res) => {
    models.Login.remove({name: req.body.name},(err,data) => {
        // if (err) {
        //     //res.send(err);
        //     res.send({'status': 1004, 'message': 'Delete failure!', 'data': err});
        // } else {
        // 	res.send({'status': 1003, 'message': 'Delete successful!', 'data': data});

        // }
    });
    models.Login.find((err,data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({'status': 1000, 'message': 'Update successful！', 'data': data});
        }
    });
});

module.exports = router;