const models = require('./models/task.model');
const express = require('express');
const router = express.Router();

//add task API
router.post('/api/task/addTask',(req,res) => {
	//there req.body In fact, the body parser middleware is used to parse the data sent by the front end
	//Query status（0:pending； 1:ongoing； 2:finish； 3:ignore； 4:expire ）
	models.Task.find({user_id: req.body.userId, start_time: req.body.startTime, end_time: req.body.endTime, status: { $ne : 3 || 4}},(err,data) => {
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
	}).sort({created_on: -1})
})
//update task
router.post('/api/task/updateTask',(req,res) => {
    models.Task.findById(req.body.id, { status: 0},(err,data) => {
		if(err){
			res.send({'status': 1002, 'message': 'Failure to query database!', 'data': err});
		}else{
            console.log('updateTask Query success')
            console.log(data)
            if(data != null){
                models.Task.findByIdAndUpdate(req.body.id, {
                    title : req.body.title,
                    content : req.body.content,
                    start_time : req.body.startTime,
                    end_time : req.body.endTime,
                    category_id : req.body.categoryId,
                    level: req.body.level
                }, (err2,data2) => {
                    if (err2) {
                        res.send({'status': 1002, 'message': 'Save failure!', 'data': err2});
                
                    } else {
                        res.send({'status': 1000, 'message': 'Save successful!', 'data': data2});
                    }
                });
            } else {
                res.send({'status': 1001, 'message': 'Cannot modify the task', 'data': err2});
            }
        }
    })
})

//update task status
router.post('/api/task/updateStatus',(req,res) => {
    models.Task.find({ _id: req.body.id},(err,data) => {
		if(err){
			res.send({'status': 1002, 'message': 'Failure to query database!', 'data': err});
		}else{
            console.log('updateStatus Query success data.length'+ data.length);
            if(data.length > 0){
                console.log("--find--");
                console.log(data)
                //status are ongoing and pending can be modified
                console.log(data[0].status)
                if(data[0].status == 0 
                    || (data[0].status == 1 && (req.body.status == 2 || req.body.status == 3)) ){
                    models.Task.findByIdAndUpdate(req.body.id, {status: req.body.status}, (err2,data2) => {
                        console.log('updateStatus updated')
                        if (err2) {
                            res.send(err2);
                        } else {
                            // let qStatus = req.body.q_status
                            // if(qStatus == -1){
                            //     qStatus = { $in:[0, 1, 2, 3, 4]}
                            // }
                            // models.Task.find({user_id: req.body.userId, status: qStatus},(err3,data3) => {
                            //     console.log('updateStatus find', data3.length)
                            //     if (err3) {
                            //         res.send(err3);
                            //     } else {
                            //         res.send(data3);
                            //     }
                            // });
                            res.send({'status': 1000, 'message': 'Update success ' , 'data': data2});
                        }
                    });

                } else {
                    res.send({'status': 1001, 'message': 'The task does not be modified ' , 'data': err});
                }
                
            } else {
                res.send({'status': 1001, 'message': 'The task does not exist ' , 'data': err});
            }
        }
    })
})


//get All task api
router.post('/api/task/all',(req,res) => {
    if(req.body.status == -1){
        console.log("---all--1");
        models.Task.find({user_id: req.body.userId}, (err,data) => {
            if (err) {
                res.send(err);
            } else {
                console.log("---all--2:"+data.length);
                res.send(data);
            }
        });
    } else {
        models.Task.find({status: req.body.status, user_id: req.body.userId},(err,data) => {
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
        if (err) {
            //res.send(err);
            res.send({'status': 1004, 'message': 'Delete failure!', 'data': err});
        } else {
        	res.send({'status': 1003, 'message': 'Delete successful!', 'data': data});

        }
        // models.Task.find({user_id: req.body.userId}, (err1,data1) => {
        //     if (err1) {
        //         console.log(err1)
        //     } else {
        //         res.send({'status': 1000, 'message': 'Update successful！', 'data': data1});
        //     }
        // });
    });
    
});

//batch update task status
router.get('/api/task/updateTasksStatus',(req,res) => {
    /*status=0, start_time<=currentTime update to 1
    status=1, end_time<=currentTime update to 2
    status=0, end_time<=currentTime update to 4
    */
   models.Task.find({status: 0, user_id: req.body.userId},(err,data) => {
        if (err) {
            res.send(err);
        } else {
            if(data.length > 0){
                let ids = [];
                let ids2 = [];
                data.forEach(function(item) {
                    let startTime = Date.parse(new Date(item.start_time));
                    let endTime = Date.parse(new Date(item.end_time));
                    let nowTime = new Date().getTime();
                    // console.log("startTime");
                    // console.log(startTime);
                    // console.log("nowTime");
                    // console.log(nowTime);
                    if(startTime <= nowTime){
                        // console.log("item._id");
                        // console.log(item._id);
                        ids.push(item._id);
                    }
                    if(endTime <= nowTime){
                        ids2.push(item._id);
                    }
                });
                if(ids.length > 0){
                    models.Task.updateMany(
                        {_id: { $in : ids }}, 
                        {$set:{status: 1 }},(err1,data1) => {
                    console.log("data1");
                    console.log(data1);
                        if (err1) {
                            res.send({'status': 1002, 'message': 'batch update failure!', 'data': err1});
                        } else {
                            console.log("update status to 1 count:" + data1.n);
                            //res.send({'status': 1000, 'message': 'batch update successful!', 'data': data1});
                        }
                
                    });
                }
                if(ids2.length > 0){
                    models.Task.updateMany(
                        {_id: { $in : ids2 }}, 
                        {$set:{status: 4 }},(err1,data1) => {
                    console.log("data1");
                    console.log(data1);
                        if (err1) {
                            res.send({'status': 1002, 'message': 'batch update failure!', 'data': err1});
                        } else {
                            console.log("update status to 4 count:" + data1.n);
                            //res.send({'status': 1000, 'message': 'batch update successful!', 'data': data1});
                        }
                
                    });
                }
                
            }
            
        }
    });

    models.Task.find({status: 1, user_id: req.body.userId },(err,data) => {
        if (err) {
            res.send(err);
        } else {
            if(data.length > 0){
                let ids = [];
                data.forEach(function(item) {
                    let endTime = Date.parse(new Date(item.end_time));
                    let nowTime = new Date().getTime();
                    if(endTime <= nowTime){
                        ids.push(item._id);
                    }
                });
                if(ids.length > 0){
                    models.Task.updateMany(
                        {_id: { $in : ids }}, 
                        {$set:{status: 2 }},(err1,data1) => {
                    console.log("data1");
                    console.log(data1);
                        if (err1) {
                            res.send({'status': 1002, 'message': 'batch update failure!', 'data': err1});
                        } else {
                            console.log("update status to 2 count:" + data1.n);
                            res.send({'status': 1000, 'message': 'batch update successful!', 'data': data1});
                        }
                
                    });
                }
                
            }
            
        }
    });
    
    
});

//get user task report date
router.post('/api/task/getTaskiData',(req,res) => {
    console.log("into-getTaskiData--");
    console.log(req);
    //status（0:pending； 1:ongoing； 2:finish； 3:ignore； 4:expire ）
    let count0 = 0.00;
    let count1 = 0.00;
    let count2 = 0.00;
    let count3 = 0.00;
    let count4 = 0.00;
    models.Task.find({user_id: req.body.userId },(err,data) => {
        if (err) {
            res.send({'status': 1002, 'message': 'Get data failure!', 'data': err});
        } else {
            if(data.length > 0){
                data.forEach(function(item) {
                    if(0 == item.status){
                        count0 +=1;
                    } else if(1 == item.status){
                        count1 +=1;
                    } else if(2 == item.status){
                        count2 +=1;
                    } else if(3 == item.status){
                        count3 +=1;
                    } else if(4 == item.status){
                        count4 +=1;
                    }
                });
                let total = count0 + count1 + count2 + count3 + count4;
                if(total > 0){
                    count0 = parseInt(count0/total*100);
                    count1 = parseInt(count1/total*100);
                    count2 = parseInt(count2/total*100);
                    count3 = parseInt(count3/total*100);
                    count4 = parseInt(count4/total*100);
                }
                var chartData = [{"name": "Pending", "value": count0}, 
                                 {"name": "On Going", "value": count1},
                                 {"name": "Completed", "value": count2},  
                                 {"name": "Ignore", "value": count3},
                                 {"name": "Expired", "value": count4}];
                console.log(chartData);
                res.send({'status': 1000, 'message': 'Get data successful!', 'data': chartData});
            }
        }
    });
    

});

module.exports = router;
