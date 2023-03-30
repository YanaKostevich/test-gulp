import replace from "gulp-replace"; // пошук и заміна
import plumber from "gulp-plumber"; // обробка помилок
import notify from "gulp-notify"; // повідомлення (підсказки)
import browsersync from "browser-sync"; // локальний сервер
import newer from "gulp-newer"; // провірка оновлень
import ifPlugin from "gulp-if";

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}