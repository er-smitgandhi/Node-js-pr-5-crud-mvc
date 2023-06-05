const express = require('express');

const routes = express.Router();

const fileupload = require('../config/fileupload');

const crudcontroller = require("../controllers/CrudController");

routes.get('/',crudcontroller.index);
routes.post('/insertData',fileupload,crudcontroller.addData);
routes.get('/deletedata',crudcontroller.deletedata);
routes.get('/editdata',crudcontroller.editdata);
module.exports = routes;