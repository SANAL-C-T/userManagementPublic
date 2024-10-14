const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads"); // Ensure "uploads" directory exists
    },
    filename: function (req, file, cb) {
        console.log("FormData:", req.body); // Log FormData (if any)
        
        // Get file extension
        const ext = path.extname(file.originalname);

        // Rename file with timestamp
        cb(null, file.fieldname + "-" + Date.now() + ext);
    },
});

const upload = multer({ storage: storage });

const profileImage = (req, res, next) => {
    upload.single("UserProfilePic")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            console.log("Multer Error:", err);
            return res.status(500).send("Multer Error");
        } else if (err) {
            // An unknown error occurred
            console.log("Unknown Error:", err);
            return res.status(500).send("Unknown Error");
        }

        // File uploaded successfully
        console.log("File uploaded successfully");

        // Continue to the next middleware
        next();
    });
};

module.exports = { profileImage };
