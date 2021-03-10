var express = require('express');
var router = express.Router();
let landing = require('../controllers/landing')

/* GET home page. */
router.get('/', landing.get_landing)
router.post('/', landing.submit_lead)
router.get('/leads', landing.show_leads)
router.get('/lead/:id', landing.show_lead)
router.get('/lead/:id/edit', landing.show_edit_lead);
router.post('/lead/:id/edit', landing.edit_lead)
router.post('/lead/:id/delete', landing.delete_lead)
module.exports = router;
