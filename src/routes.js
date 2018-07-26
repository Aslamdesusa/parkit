import Hapi from 'hapi';
const db = require('../database').db;
const Joi = require('joi');
const parkingModel = require('../models/parking_slot');



const routes = [
{
	path: '/test',
	method: 'GET',
	handler: function(request, reply){
		reply('hello world')
	}
},
{
	path: '/add/parking',
	method: 'GET',
	handler: function(request, h){
		h.view('form1', null,{layout: 'layout2'})
	}
},
{
	method: 'GET',
	path: '/view/all/parking_slot',
	handler: (request, reply) =>{
		// db.orders.find().count()
		parkingModel.find({},(err, data) => {
			if (err){
				reply('error in getting data.....')		
			}else{
				reply.view('typo', {cardetails : data},{layout: 'layout2'});
			}
		}); 	   
	}
},
{
		method: 'GET',
		path: '/deleting/parkingslot/{uuid}',
		handler: function(request, h){
		var parkings = ({
			"Registration": '',
			"Color": '',
		});
		//find car data by his ID and updateing it to null value.
		parkingModel.findOne({_id: request.params.uuid}, function(error, data){
			if(error){
				return reply('err deleting data')
			}else{
				console.log(data)
				h(data)
				// return reply.view('sweetalert', {message: 'data successfully deleted from databases', parking: data}, {layout: 'layout2'})
			}
		});
	}
},
{
	method: 'POST',
	path: '/post/car/details',
	handler: function(request, reply){
		parkingModel.findOneAndUpdate({Color: ''}, request.payload, function(err, data){
			if (err) {
				reply('this data already taken')
			}else{
				return reply.view('sweetalert', {message: 'Slot successfully allotted in databases', parking: data}, {layout: 'layout2'})
			}
		})
	}
},

	{
    	method: 'GET',
    	path: '/get/complaint/by/{uuid}',
    	config:{
       		validate:{
				params:{
					uuid:Joi.string().required()
				}
			}
		},
    	handler: function(request, reply){
    		parkingModel.findOne({_id :request.params.uuid}, function(err, data){
    			if (err) {
    				reply({
    					statusCode: 503,
    					message: 'no metch found',
    					data: err
    				});
    			}else{
    				reply({
    					statusCode: 200,
    					message: "your data has been found results are here.",
    					data: data
    				});
    			}
    		});
    	}
    },
]
export default routes;