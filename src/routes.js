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
	path: '/',
	handler: (request, reply) =>{
		// db.orders.find().count()
		parkingModel.find({},(err, data) => {
			if (err){
				reply('error in getting data.....')		
			}else{
				reply.view('index', {details : data},{layout: 'layout2'});
			}
		}); 	   
	}
},
{
		method: 'GET',
		path: '/deleting/parkingslot/{uuid}',
		handler: function(request, h){
		var parkings = ({
			Registration: '',
			Color: '',
		});
		//find car data by his ID and updateing it to null value.
		parkingModel.findOneAndUpdate({"_id": request.params.uuid}, parkings, function(error, data){
			if(error){
				h('err deleting data')
			}else{
				console.log(data)
				return h.view('sweetalert', {message: 'data successfully deleted from databases', parking: data}, {layout: 'layout2'})
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
]
export default routes;