
const trainerRoutes = require('./trainers');
const memberRoutes = require('./members');
const editMemberRoutes = require('./editMember');
const commentRoutes = require('./comments');
const courseRoutes = require('./courses');
const ExpressError = require('../utils/ExpressError');
const path = require('path');
const enrollRoutes = require('./enroll');


const constructorMethod = (app) => {
    app.use('/members', memberRoutes);
    app.use('/edit', editMemberRoutes)
    app.use('/fitclub/trainers', trainerRoutes);
    app.use('/fitclub/courses', courseRoutes);
    app.use('/fitclub/trainers/:id/comments', commentRoutes);
    app.use('/enroll', enrollRoutes);
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.all('*', (req, res, next) => {
        next(new ExpressError('Page Not Found', 404));
    });

    app.use((err, req, res, next) => {
        const {statusCode = 500} = err;
        if(!err.message) err.message = 'Oh No, Something Went Wrong!';
        res.status(statusCode).render('error', {err});
    });
  };
  
  module.exports = constructorMethod;

