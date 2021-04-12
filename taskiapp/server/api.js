const models = require('./db');
const express = require('express');
const router = express.Router();

//create API
router.post('/api/user/register',(req,res) => {
	//there req.body In fact, the body parser middleware is used to parse the data sent by the front end
	//Query name = req.body.name 
	models.Login.find({name: req.body.name},(err,data) => {
		if(err){
			res.send({'status': 1002, 'message': '查询失败', 'data': err});
		}else{
			console.log('查询成功'+data)
			//data : A collection with the same name in the returned database
			if(data.length > 0){
				res.send({'status': 1001, 'message': '该用户名已经注册！'});
			}else{
				let newName = new models.Login({
                    name : req.body.name,
                    password : req.body.password
                });
                //newName.save insert to table
                newName.save((err,data) => {
                    if (err) {
                        res.send({'status': 1002, 'message': '注册失败！', 'data': err});
                    } else {
                        res.send({'status': 1000, 'message': '注册成功!'});
                    }
                });
			}
		}
	})
})
//signIn api
router.post('/api/user/login',(req,res) => {
	models.Login.find({name: req.body.name, password: req.body.password},(err,data) => {
		if (err) {
            // res.send(err);
            res.send({'status': 1002, 'message': '查询数据库失败!', 'data': err});
        } else {
            console.log(data)
            if (data.length > 0) {
                res.send({'status': 1000, 'message': '登录成功!', 'data': data});
            } else {
                res.send({'status': 1001, 'message': '登录失败，该用户没有注册!', 'data': err});
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
        if (err) {
            //res.send(err);
            res.send({'status': 1004, 'message': '删除失败!', 'data': err});
        } else {
        	res.send({'status': 1003, 'message': '删除成功!', 'data': data});

        }
    });
    models.Login.find((err,data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({'status': 1000, 'message': '更新成功！', 'data': data});
        }
    });
});

module.exports = router;