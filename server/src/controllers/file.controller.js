import { upload } from "../middlewares/multer.js";
import { File } from "../models/file.model.js";

// const uploadFile = async (req, res) => {
//   try {

//     const fileLocalPath = await req.file.filename;
//     console.log(fileLocalPath);

//     const newFile = await File({
//       file: fileLocalPath,
//     });

//     console.log(newFile)

//     await newFile.save();
//     res.json({ success: true, message: "File Upload successfully" });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: "Error in file upload",
//     });
//   }
// };



const uploadFile =(req, res)=>{
  const isAdmin = req.user.isAdmin

  if (isAdmin) {
    upload.array('file', 10)(req, res, async (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            message: 'File size exceeds the maximum limit of 1MB',
          });
        }
        return res.status(400).send({ message: "error while upload multiple file",  });
      }
      try {
        const fileDocs = req.files.map((file) => ({ file: file.filename }));
        await File.insertMany(fileDocs);
        res.status(200).send({ message: 'Files uploaded successfully', files: fileDocs });
      } catch (error) {
        res.status(500).send({ message: 'Error saving files to database', error });
      }
    });
  } else {
    // Allow single file for non-admins
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ message: "you can upload just one file at a time",});
      }
      if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
      }
      try {
        const fileDoc = new File({ file: req.file.filename });
        await fileDoc.save(); // Save single file to MongoDB
        res.status(200).send({ message: 'File uploaded successfully', file: fileDoc });
      } catch (error) {
        res.status(500).send({ message: 'Error saving file to database', error });
      }
    });
  }
}


const getFile = async (req, res) => {
  try {
    const files = await File.find();
    res.json({ status: 200, file: files });
  } catch (error) {
    res.json({
      success: false,
      message: "Error in getting file",
    });
  }
};



export { uploadFile, getFile};
