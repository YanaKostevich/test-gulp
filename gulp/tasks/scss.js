import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries'; //групування медіа запросів

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev }) // карта джерел, для того, щоб ми могли побачити де помилка
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss(
                    {
                        webpClass: ".webp",
                        noWebpClass: ".no-webp"
                    }
                    )
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                        grid: true,
                        overrideBrowserslist: ["last 3 versions"],
                        cascade: true
                    })
            )
        )
        // .pipe(groupCssMediaQueries())
        // .pipe(webpcss(
        //     {
        //         webpClass: ".webp",
        //         noWebpClass: ".no-webp"
        //     }
        // ))
        // .pipe(autoprefixer({
        //     grid: true,
        //     overrideBrowserslist: ["last 3 versions"],
        //     cascade: true
        // }))
         
        // якщо потрібен не зжатий файл - 
        .pipe(app.gulp.dest(app.path.build.css)) // якщо потрібен не зжатий файл 
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        // .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"    // якщо потрібен  зжатий файл 
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}