import express from 'express'
import { authUser, deleteUser, getUserbyId, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser)
router.get('/', protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.delete('/:id', protect, admin, deleteUser)
router.put('/:id', protect, admin, updateUser)
router.get('/:id', protect, admin, getUserbyId)
export default router;