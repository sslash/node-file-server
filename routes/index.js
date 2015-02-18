var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var morgan = require('morgan');
var logger = morgan('combined');



function _onFormEnd(fields, files) {

    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;

    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;

    /* Location where we want to copy the uploaded file */
    var new_location = 'uploads/';

    fs.copy(temp_path, new_location + file_name, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log("success!")
        }
    });
}


function get (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html' });
  var form = '<form action="/upload" enctype="multipart/form-data" method="post">Add a title: <input name="title" type="text" /><br><br><input multiple="multiple" name="upload" type="file" /><br><br><input type="submit" value="Upload" /></form>';
  res.end(form);
};


function post(req, res) {

    var form = new formidable.IncomingForm();

    form.parse(req, function onParse(err, fields, files) {

        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));

    });

    form.on('end', _onFormEnd);
};


router.get('/', get);
router.post('/upload', post);

module.exports = router;
