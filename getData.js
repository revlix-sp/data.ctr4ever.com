const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

const url = "http://ctr4ever.joora.fr/"
const array = [];

const numplayer = 300;

var track_i = 0;

/* ========================================================================= */

/* get the ranking */
function getData(url) {
  axios
    .get(url)
    .then((res) => {
      dataPlayer(res.data);
    })
    .catch((err) => console.error(err));
}

/* ========================================================================= */

/* creation of the json file */
function pushDataJson(data) {
  fs.writeFile("./resources/data/data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) console.log(err);
    console.log("File created.");
  });
}

/* ========================================================================= */

/* recovery of the data on the site */
function dataPlayer(data) {
  const $ = cheerio.load(data);

  for (i = 1; i <= numplayer; i++) {
    $(`.tableau > tbody > tr:nth-child(${i + 1})`).each((index, element) => {
      const speudo = $(element)
        .find("td:nth-child(2)")
        .text();
      const country = $(element)
        .find("td:nth-child(3)")
        .text();
      const link = $(element)
        .find("td:nth-child(2) > a")
        .attr("href");

      console.log(i + " : " + speudo + " : " + country + " : " + link);

      array.push(
        {
          id: i,
          speudo: speudo,
          country: country,
          pid: link,
          track: []
        }
      );
    });
  }
  dataTrack();
}

function dataTrack() {
  axios
    .get(url + array[track_i].pid)
    .then((res) => {

      const $ = cheerio.load(res.data);
      console.log("Rank : " + track_i + " : " + url + array[track_i].pid);

      var name = "";
      var course = "";
      var lap = "";

      var row = 0;

      $("[style=height:30px]").each((index, element) => {
        if (row == 0) {
          name = $(element)
            .find("td:nth-child(1)")
            .text();
          course = $(element)
            .find("td:nth-child(6)")
            .text();

          if (course == 0) {
            course = $(element)
              .find("td:nth-child(6) > img")
              .attr("title");
            if (course == "rank: 1") {course = "1";}
            else if (course == "rank: 2") {course = "2";}
            else if (course == "rank: 3") {course = "3";}
          }

          row = 1;
        }
        else {
          lap = $(element)
            .find("td:nth-child(5)")
            .text();

          if (lap == 0) {
            lap = $(element)
              .find("td:nth-child(5) > img")
              .attr("title");
            if (lap == "rank: 1") {lap = "1";}
            else if (lap == "rank: 2") {lap = "2";}
            else if (lap == "rank: 3") {lap = "3";}
          }

          console.log(name + " : " + course + " : " + lap);

          array[track_i].track.push(
            {name: name, course: course, lap: lap}
          );

          row = 0;
        }
      });

      track_i++;

      if (track_i == numplayer) { pushDataJson(array); }
      else { dataTrack(); }
    })
  .catch((err) => console.error(err));
}

/* ========================================================================= */

function run() {
  getData(url + "rankings.php?mode=af");
}

run();