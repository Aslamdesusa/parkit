import Hapi from 'hapi'; //importing hapi
const db = require('../database').db; // requiring data from malab 
const Joi = require('joi'); // requiring joi from validation of key information 
const parkingModel = require('../models/parking_slot'); // requiring parking schema



const routes = [
//The first route for testing that the route is running or not
{
	path: '/test',
	method: 'GET',
	handler: function(request, reply){
		reply('hello world')
	}
},
// getting form where user can add data 
{
	path: '/add/parking',
	method: 'GET',
	handler: function(request, h){
		h.view('form1', null,{layout: 'layout2'})
	}
},
// getting home page with all 100 data
{
	method: 'GET',
	path: '/',
	handler: (request, reply) =>{
		parkingModel.find({},(err, data) => {
			if (err){
				// if it will show any error while getting view(index.html) with  data then it will throw this message 
				reply('error in getting data.....')		
			}else{
				// if index.html and there details will get succesfully then return this
				reply.view('index', {details : data},{layout: 'layout2'});
			}
		}); 	   
	}
},

{
		method: 'GET',
		path: '/deleting/parkingslot/{uuid}',
		handler: function(request, h){
			//update rendome number in the field because because of it will make the field messmatch  
			var rendom = Math.floor(Math.random() * 90000) + 10000;
			// json data if user will delete any data then it will update there 
			var parkings = ({
				Registration: rendom,
				Color: '',
			});
		//find car data by his ID and updateing it to null value.
		parkingModel.findOneAndUpdate({"_id": request.params.uuid}, parkings, function(error, data){
			if(error){
				// if it will show any error while updating data then it will throw this message 
				h('err deleting data')
			}else{
				console.log(data)
				// if data will succesfully updated then return this
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
				// if it will catch any error while updating data then it will retrun this message
				reply('this data already taken')
			}else{
				// if data will succesfully posted then return this
				return reply.view('sweetalert', {message: 'Slot successfully allotted in databases', parking: data}, {layout: 'layout2'})
			}
		})
	}
},
]
export default routes;