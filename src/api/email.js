import express from 'express';
import { forwardContactFormInfoSendGrid } from '../mailer';
import formidable from 'formidable';
import axios from 'axios';

const router = express.Router();

// @route    POST api/email
// @desc     Forward contact form info to email
// @access   Public
router.post('/',  (req, res) => {
  const form = formidable({multiples: true});
  form.parse(req, async (err, fields, files) => {
    if (err) {
      ext(err);
      return res.json(err);
    }

    if(fields.token===""||fields.token===undefined){
      return res.json({
        "msg": "no token",
      })
    }
    
    const response = await axios.request({
      url: 'https://www.google.com/recaptcha/api/siteverify',
      method: 'post',
      params: {
        secret: process.env.GOOGLE_RECAPTCHA_SECRET,
        response: fields.token
      }
    })

    const {
      success
    } = response.data

    if (!success) {
      return res.json({
        "valid": false,
      })
    }
    
    const form = {
      name: (fields.name ? fields.name : ""),
      email: (fields.email ? fields.email : ""),  
      subject: (fields.subject ? fields.subject : ""),
      message: (fields.message ? fields.message : ""),
      filePath: (files.file ?  files.file.path : ""),
      fileName: (files.file ?  files.file.name : ""),
      fileType: (files.file ?  files.file.type : "")
    }

    await forwardContactFormInfoSendGrid(form)

    return res.json({
      "valid": true,
    })
  });
});



module.exports = router;