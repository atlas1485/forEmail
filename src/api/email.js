import express from 'express';
import { forwardContactFormInfoSendGrid } from '../mailer';
import formidable from 'formidable';

const router = express.Router();

// @route    POST api/email
// @desc     Forward contact form info to email
// @access   Public
router.post('/',  (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const form = {
      name: fields.name,
      email: fields.email,
      subject: fields.subject,
      message: fields.message,
      filepath: files.attachment.path
    }
    forwardContactFormInfoSendGrid(form);
    res.sendStatus(200)
  });
});


module.exports = router;