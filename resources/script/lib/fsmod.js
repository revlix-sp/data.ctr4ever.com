import * as fs from "fs";

export {
    createJson, //? Create a json file with data
    readJson //? Read a Json file
}

/**
 * Create a json file with data
 *
 * @param {string} dir direction of the json file
 * @param {string} data data to put in the file
 */
function createJson(dir, data) {
    fs.writeFile(dir, JSON.stringify(data, null, 2), (err) => {
        if (err) console.log(err);
        else console.log("File created.");
    });
}

/**
 * Read a Json file
 *
 * @param {string} dir Direction of the file to open
 * @returns data from the json file
 */
function readJson(dir) {
    let data = fs.readFileSync(dir);
    return data = JSON.parse(data);
}