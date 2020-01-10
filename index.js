const fs = require("fs");
const path = require("path")
const mkdirp = require("mkdirp");
const { exec } = require("child_process");

if (!fs.existsSync("./package.json")) {
    console.log("Please run 'npm init' before you run this.");
    process.exit(1);
}

const TEMPLATE_DIR = path.join(__dirname, "pkg");
const MODE_0666 = parseInt("0666", 8);

function copyFile(from, to) {
    write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), "utf-8"))
}

function copyMultipleFiles(fromDir, toDir) {
    fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
        .forEach(file => {
            if (fs.lstatSync(path.join(TEMPLATE_DIR, fromDir, file)).isFile()) {
                copyFile(path.join(fromDir, file), path.join(toDir, file))
            }

        })
}

function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
    console.log("\x1b[36mcreate\x1b[0m : " + file)
}

mkdirp.sync("./tasks")
mkdirp.sync("./src")
mkdirp.sync("./src/html")
mkdirp.sync("./src/html/layouts")
mkdirp.sync("./src/images")
mkdirp.sync("./src/js")
mkdirp.sync("./src/media")
mkdirp.sync("./src/scss")

copyMultipleFiles("tasks", "./tasks");
copyMultipleFiles("src/html", "./src/html");
copyMultipleFiles("src/html/layouts", "./src/html/layouts");
copyMultipleFiles("src/js", "./src/js");
copyMultipleFiles("src/images", "./src/images");
copyMultipleFiles("src/media", "./src/media");
copyMultipleFiles("src/scss", "./src/scss");
copyFile("gulpfile.js", "./gulpfile.js")

exec("npm i -D @babel/core @babel/preset-env gulp gulp-babel gulp-clean-css gulp-concat gulp-connect gulp-imagemin gulp-pug gulp-rename gulp-sass gulp-sourcemaps gulp-uglify imagemin-jpeg-recompress", (err, stdout, stderr) => {

    if (err) {
        console.log(err);
        process.exit(1);
    }
    stdout.on("data",(data)=>{
        console.log(data.toString())
    })
    console.log(stdout)
})