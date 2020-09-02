const multer = require('multer');
const path = require('path');
 
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, __basedir + '/uploads/')
	},
	filename: (req, file, cb) => {
	  cb(null, file.originalname)
	}
});

function checkFileType(file, cb){
	const filetypes = /jpeg|jpg|png/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);
  
	if(mimetype && extname){
	  return cb(null,true);
	} else {
	  cb('Error: Images Only!');
	}
}
 
var upload = multer({storage: storage, 
	limits: { fileSize : 500000 },
	fileFilter: function(_req, file, cb){
		checkFileType(file, cb);
	}
});

module.exports = upload;