var fs = require('fs');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var rename = require("gulp-rename");
var ejs = require("gulp-ejs");
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var data = require('gulp-data');
var changed  = require('gulp-changed');
var imagemin = require('gulp-imagemin');

// htmlに関するタスク
gulp.task('build-html', function(){
	var buildView = gulp.src(['./_src/**/*.ejs'])
	.pipe(data(file => {
	return {
		filename: file.path,
		data: require(("./" + file.path.slice(file.path.indexOf("_src")).slice("_src",file.path.lastIndexOf("/") - file.path.lastIndexOf("") + 1) + "/data.json")), //各ejsテンプレートごとのjsonファイルを相対パスで読み込む
    }
	}))
	.pipe(ejs({
		fileKind: 'view'
	}))
	.pipe(rename({extname: '.html'}))
	.pipe(gulp.dest('./_view/'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./_view/"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});
 
gulp.task('watch', function () {
  gulp.watch(['./_src/**/*.ejs'], ['build-html']);
  gulp.watch(['./_src/**/*.ejs'], ['bs-reload']);
});
gulp.task('default', ['browser-sync', 'bs-reload', 'watch', 'build-html']);