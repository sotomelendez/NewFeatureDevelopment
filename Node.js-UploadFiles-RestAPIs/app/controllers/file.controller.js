const uploadFolder = __basedir + '/uploads/';
const fs = require('fs');
const multer = require('../config/multer.config.js');
let upload = multer.single("file");


// exports.uploadFile = (req, res) => {
// 	res.send('File uploaded successfully! -> filename = ' + req.file.filename);
// }

exports.uploadFile = (req, res) => {
	upload(req, res, function(err) {
		try {
			if(err) {
				res.status(400).json({ msg : err});
			}
			else {
				res.status(200).send();		
			}
		}
		catch(ex) {
			res.status(500).send();
		}
	});
}
 
exports.listUrlFiles = (req, res) => {
	fs.readdir(uploadFolder, (err, files) => {
		for (let i = 0; i < files.length; ++i) {
			files[i] = "http://localhost:8080/api/file/" + files[i];
		}
		
		res.send(files);
	})
}

exports.listUrlFilesPaged = (req, res) => {
	let page = req.query.page;
	fs.readdir(uploadFolder, (err, files) => {
		let start = (page-1)*20;
		let responseFiles = [];
		for (let i = 0; i < 20 && start < files.length; i++, start++) {
			responseFiles.push("http://localhost:8080/api/file/" + files[start]);
			// console.log(i + "," + start);
		}
		res.send(responseFiles);
	})
}

exports.getFilesPage = (req, res) => {
	let page = req.query.page;
	fs.readdir(uploadFolder, (err, files) => {
		let start = (page-1)*20;
		let responseFiles = [];
		for (let i = 0; i < 20 && start < files.length; i++, start++) {
			responseFiles.push("http://localhost:8080/api/file/" + files[start]);
		}
		
	})
}

exports.getFilesPageByType = (req, res) => {
	let page = req.query.page;
	let type = req.query.type;
	fs.readdir(uploadFolder, (err, files) => {
		let start = (page-1)*20;
		let responseFiles = [];
		for (let i = 0; i < 20 && start < files.length; i++, start++) {
			if(files[start].includes(type))
				responseFiles.push("http://localhost:8080/api/file/" + files[start]);
		}
	})
}

exports.downloadFile = (req, res) => {
	let filename = req.params.filename;
	res.download(uploadFolder + filename);  
}