const {Router} = require('express');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

const router = Router();

router.use('/users', userRouter);
// router.use('/users', ((req, res, next)=>{
//     console.log(req)
// }));
router.use('/posts', postRouter);

module.exports = router;