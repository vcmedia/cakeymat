const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController');

// This is how you can normally code this, but we are using controllers to clean up the code which were imported above
// router.post('/', (req, res) => {
//     res.send('Register Route')
// })

const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

// Must be exported to server.js where we use app.use('ENDPOINT', require('./routes/userRoutes'))
module.exports = router