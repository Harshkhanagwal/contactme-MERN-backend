const express = require('express');
const router = express.Router();
const authmiddleware = require('../Middlewares/auth-middleware')
const { getallusers, getAllcontact, deleteuser, updateuser, deletecontact } = require('../controller/admin-controller')

router.route('/getallusers').get(authmiddleware, authmiddleware, getallusers);
router.route('/getallcontacts').get(authmiddleware, authmiddleware, getAllcontact);
router.route('/deleteuser/:id').delete(authmiddleware, authmiddleware, deleteuser);
router.route('/updateuser/:id').patch(authmiddleware, authmiddleware, updateuser);
router.route('/deletecontact/:id').delete(authmiddleware, authmiddleware, deletecontact);

module.exports = router;
