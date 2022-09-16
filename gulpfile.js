
const { spawn } = require("child_process");
const { watch } = require("gulp");
var gulp = require("gulp");

gulp.task('node-server-start', (cb) => {
    spawn('nodemon', ['node/'], {stdio: 'inherit'})
});

gulp.task('ng-serve', (cb) => {
    spawn('ng', ['serve'], {stdio: 'inherit'})
});

gulp.task('start', ['node-server-start', 'ng-serve'], () => {
    
})

