var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');



function _onFormEnd(res, fields, files) {

    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;

    /* The file name of the uploaded file */
    var file_name = this.filename || this.openedFiles[0].name;

    /* Location where we want to copy the uploaded file */
    var new_location = 'uploads/';

    var new_file_path = new_location + file_name;

    fs.copy(temp_path, new_file_path, function(err) {
        if (err) {
            console.error(err);
            res.status(500).send({err : err});

        } else {
            console.log("success! " + new_file_path);
            res.send({filename : file_name});
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

        console.log('incoming file: ' + JSON.stringify(fields) + ', ' + JSON.stringify(files));

        this.filename = fields.filename;

    }.bind(form));

    form.on('end', _onFormEnd.bind(form, res));
};


router.get('/', get);
router.post('/upload', post);

module.exports = router;
