// Create File CRUD using CLI

const fs = require("fs");
const path = require("path");

/*
The first two elements of process.argv are not typically 
useful for most command-line scripts, so they are skipped 
by assigning them to empty placeholders ([, , ...]).
*/
const [, , action, type, name] = process.argv;

const fullpath = path.join(__dirname, name);

switch (action) {
  case "create":
    if (type === "file") {
      fs.writeFileSync(fullpath, "");
      console.log(`File ${name} created successfully.`);
    } else if (type == "dir") {
      fs.mkdirSync(fullpath);
      console.log(`Directory ${name} created successfully.`);
    }
    break;
  case "read":
    if (type == "file") {
      if (fs.existsSync(fullpath)) {
        const content = fs.readFileSync(fullpath, "utf-8");
        console.log(`Content of ${name}:${content}`);
      } else if (type == "dir") {
        const files = fs.readdirSync(fullpath);
        console.log(`Files in ${name}: ${files.join(", ")}`);
      } else {
        console.log(`Directory ${name} does not exist.`);
      }
    }
    break;

  case "delete":
    if (fs.existsSync(fullpath)) {
      if (type == "file") {
        fs.unlinkSync(fullpath);
        console.log(`File ${name} deleted successfully.`);
      } else if (type == "dir") {
        fs.rmdirSync(fullpath);
        console.log(`Directory ${name} deleted successfully.`);
      }
    } else {
      console.log(`File or directory ${name} does not exist.`);
    }
    break;
  default:
    console.log(`Usage:
  create file <filename>
  create dir <dirname>
  read file <filename>
  read dir <dirname>
  delete file <filename>
  delete dir <dirname>`);
    break;
}

/**
 * Execution in CLI
node index.js create file test.txt
node index.js create dir myfolder
node index.js read file test.txt
node index.js read dir myfolder
node index.js delete file test.txt
node index.js delete dir myfolder

 */
