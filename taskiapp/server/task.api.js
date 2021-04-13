const models = require('./models/task.model');
const express = require('express');
const router = express.Router();

//add task API
router.post('/api/task/addTask',(req,res) => {
	//there req.body In fact, the body parser middleware is used to parse the data sent by the front end
	//Query status（0:pending； 1:ongoing； 2:finish； 3:ignore； 4:expire ）
	models.Task.find({start_time: req.body.startTime, end_time: req.body.endTime, status: { $ne : 3 }},(err,data) => {
		if(err){
			res.send({'status': 1002, 'message': 'Failure to query database!', 'data': err});
		}else{
			console.log('Query success')
			//data : A collection with the same name in the returned database
			if(data.length > 0){
				res.send({'status': 1001, 'message': 'The task is already exists'});
			}else{
				let newTask = new models.Task({
                    user_id: req.body.userId,
                    title : req.body.title,
                    content : req.body.content,
                    start_time : req.body.startTime,
                    end_time : req.body.endTime,
                    category_id : req.body.categoryId,
                    level: req.body.level,
                    status: 0
                });
                //insert to table
                newTask.save((err,data) => {
                    if (err) {
                        res.send({'status': 1002, 'message': 'Add Task failure！', 'data': err});
                    } else {
                        res.send({'status': 1000, 'message': 'Add Task successful!'});
                    }
                });
			}
		}
	}).sort({_id: -1})
})
//update task
router.post('/api/task/updateTask',(req,res) => {
    models.Task.find({ status: 0},(err,data) => {
		if(err){
			res.send({'status': 1002, 'message': 'Failure to query database!', 'data': err});
		}else{
            console.log('Query success')
            if(data.length > 0){
                let updateTask = new models.Task({
                    title : req.body.title,
                    content : req.body.content,
                    start_time : req.body.startTime,
                    end_time : req.body.endTime,
                    category_id : req.body.categoryId,
                    level: req.body.level
                });
                updateTask.update((err,data) => {
                    if (err) {
                        // res.send(err);
                        res.send({'status': 1002, 'message': 'Failed to update database!', 'data': err});
                    } else {
                        console.log(data);
                        res.send({'status': 1000, 'message': 'Update Task successful!', 'data': data});
                        // if (data.length > 0) {
                        //     res.send({'status': 1000, 'message': 'Sign In successful!', 'data': data});
                        // } else {
                        //     res.send({'status': 1001, 'message': 'Sign In failure. The user is not registered!', 'data': err});
                        // }
                    }
                })
            } else {
                res.send({'status': 1001, 'message': 'Cannot modify the task', 'data': err});
            }
        }
    })
})

//update task status
router.post('/api/task/updateStatus',(req,res) => {
    //status: 1 -- on going
    models.Task.find({ _id: req.body.id, status: 0},(err,data) => {
		if(err){
			res.send({'status': 1002, 'message': 'Failure to query database!', 'data': err});
		}else{
            console.log('updateStatus Query success data.length'+ data.length);
            if(data.length > 0){
                models.Task.findByIdAndUpdate(req.body.id, {status: req.body.status}, (err,data) => {
                    console.log('updateStatus updated')
                    // if (err) {
                    //     // res.send(err);
                    //     res.send({'status': 1002, 'message': 'Failed to update database!', 'data': err});
                    // } else {
                    //     console.log(data);
                    //     res.send({'status': 1000, 'message': 'Update Task successful!', 'data': data});
                    // }
                    models.Task.find({status: req.body.q_status},(err1,data1) => {
                        console.log('updateStatus find', data1.length)
                        if (err1) {
                            res.send(err1);
                        } else {
                            res.send(data1);
                        }
                    });
                });
                
            } else {
                res.send({'status': 1001, 'message': 'The task isn\'t start, cannot be update' , 'data': err});
            }
        }
    })
})


//get All task api
router.post('/api/task/all',(req,res) => {
    if(req.body.status == -1){
        console.log("---all--1");
        models.Task.find((err,data) => {
            if (err) {
                res.send(err);
            } else {
                console.log("---all--2:"+data.length);
                res.send(data);
            }
        });
    } else {
        models.Task.find({status: req.body.status},(err,data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        });
    }
    
});
//get one task api
router.post('/api/task/getTask',(req,res) => {
    models.Task.findById(req.body.id, (err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

//delete task
router.post('/api/task/delete',(req,res) => {
    models.Task.remove({_id: req.body.id},(err,data) => {
        // if (err) {
        //     //res.send(err);
        //     res.send({'status': 1004, 'message': 'Delete failure!', 'data': err});
        // } else {
        // 	res.send({'status': 1003, 'message': 'Delete successful!', 'data': data});

        // }
        models.Task.find((err1,data1) => {
            if (err1) {
                console.log(err1)
            } else {
                res.send({'status': 1000, 'message': 'Update successful！', 'data': data1});
            }
        });
    });
    
});

module.exports = router;