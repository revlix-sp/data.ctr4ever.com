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
          age: "",
          description: "",
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
      var course_version = "";
      var course_standard = "";
      var course_ustandard = "";
      var course_driver = "";

      var lap = "";
      var lap_version = "";
      var lap_standard = "";
      var lap_ustandard = "";
      var lap_driver = "";

      var row = 0;

      //Info Player
      const age = $("[cellpadding=5] > tbody > tr:nth-child(3) > td:nth-child(2)").text();
      const description = $("[cellpadding=5] > tbody > tr:nth-child(4) > td:nth-child(2)").text();

      console.log(age + " : " + description);

      array[track_i].age = age;
      array[track_i].description = description;

      //Player Record
      $("[style=height:30px]").each((index, element) => {
        if (row == 0) {
          name = $(element)
            .find("td:nth-child(1)")
            .text();
          course = $(element)
            .find("td:nth-child(6)")
            .text();
          course_version = $(element)
            .find("td:nth-child(5)")
            .text();
          course_standard = $(element)
            .find("td:nth-child(8)")
            .text();
          course_ustandard = $(element)
            .find("td:nth-child(9)")
            .text();
          course_driver = $(element)
            .find("td:nth-child(4) > img")
            .attr("src");

          if (course == 0) {
            course = $(element)
              .find("td:nth-child(6) > img")
              .attr("title");
            if (course == "rank: 1") {course = "1";}
            else if (course == "rank: 2") {course = "2";}
            else if (course == "rank: 3") {course = "3";}
          }

          if (course_driver == "driver/x1.gif.pagespeed.ic.YIlIiwMfHC.png") { course_driver = "Coco"; }
          else if (course_driver == "driver/x2.gif.pagespeed.ic.EvJjjeTp9j.png") { course_driver = "Crash"; }
          else if (course_driver == "driver/x3.gif.pagespeed.ic.DkkSXPZPpV.png") { course_driver = "Dingodile"; }
          else if (course_driver == "driver/x4.gif.pagespeed.ic.M2Jr_BnH7n.png") { course_driver = "Fake Crash"; }
          else if (course_driver == "driver/x5.gif.pagespeed.ic.4xZx0D8rnK.png") { course_driver = "Komodo Joe"; }
          else if (course_driver == "driver/x6.gif.pagespeed.ic.UWhQvkIMcI.png") { course_driver = "N.Gin"; }
          else if (course_driver == "driver/x7.gif.pagespeed.ic.zYMZwTH7gu.png") { course_driver = "N.Tropy"; }
          else if (course_driver == "driver/x8.gif.pagespeed.ic.pX-W5ZSkwj.png") { course_driver = "Neo Cortex"; }
          else if (course_driver == "driver/x9.gif.pagespeed.ic.k3rvXjaN2h.png") { course_driver = "Papu Papu"; }
          else if (course_driver == "driver/x10.gif.pagespeed.ic.cYYRWKzG2q.png") { course_driver = "Penta Penguin"; }
          else if (course_driver == "driver/x11.gif.pagespeed.ic.GoUBG6MS6t.png") { course_driver = "Pinstripe"; }
          else if (course_driver == "driver/x12.gif.pagespeed.ic.DsmhbkHp_q.png") { course_driver = "Polar"; }
          else if (course_driver == "driver/x13.gif.pagespeed.ic.iOdoaq112n.png") { course_driver = "Pura"; }
          else if (course_driver == "driver/x14.gif.pagespeed.ic.bt9azBfZ6Z.png") { course_driver = "Roo"; }
          else if (course_driver == "driver/x15.gif.pagespeed.ic.c4NdZbNBFW.png") { course_driver = "Tiny Tiger"; }
          else if (course_driver == "driver/x16.gif.pagespeed.ic.cYYRWKzG2q.png") { course_driver = "Penta Penguin"; }

          row = 1;
        }
        else {
          lap = $(element)
            .find("td:nth-child(5)")
            .text();
          lap_version = $(element)
            .find("td:nth-child(4)")
            .text();
          lap_standard = $(element)
            .find("td:nth-child(7)")
            .text();
          lap_ustandard = $(element)
            .find("td:nth-child(8)")
            .text();
          lap_driver = $(element)
            .find("td:nth-child(3) > img")
            .attr("src");

          if (lap == 0) {
            lap = $(element)
              .find("td:nth-child(5) > img")
              .attr("title");
            if (lap == "rank: 1") {lap = "1";}
            else if (lap == "rank: 2") {lap = "2";}
            else if (lap == "rank: 3") {lap = "3";}
          }

          if (lap_driver == "driver/x1.gif.pagespeed.ic.YIlIiwMfHC.png") { lap_driver = "Coco"; }
          else if (lap_driver == "driver/x2.gif.pagespeed.ic.EvJjjeTp9j.png") { lap_driver = "Crash"; }
          else if (lap_driver == "driver/x3.gif.pagespeed.ic.DkkSXPZPpV.png") { lap_driver = "Dingodile"; }
          else if (lap_driver == "driver/x4.gif.pagespeed.ic.M2Jr_BnH7n.png") { lap_driver = "Fake Crash"; }
          else if (lap_driver == "driver/x5.gif.pagespeed.ic.4xZx0D8rnK.png") { lap_driver = "Komodo Joe"; }
          else if (lap_driver == "driver/x6.gif.pagespeed.ic.UWhQvkIMcI.png") { lap_driver = "N.Gin"; }
          else if (lap_driver == "driver/x7.gif.pagespeed.ic.zYMZwTH7gu.png") { lap_driver = "N.Tropy"; }
          else if (lap_driver == "driver/x8.gif.pagespeed.ic.pX-W5ZSkwj.png") { lap_driver = "Neo Cortex"; }
          else if (lap_driver == "driver/x9.gif.pagespeed.ic.k3rvXjaN2h.png") { lap_driver = "Papu Papu"; }
          else if (lap_driver == "driver/x10.gif.pagespeed.ic.cYYRWKzG2q.png") { lap_driver = "Penta Penguin"; }
          else if (lap_driver == "driver/x11.gif.pagespeed.ic.GoUBG6MS6t.png") { lap_driver = "Pinstripe"; }
          else if (lap_driver == "driver/x12.gif.pagespeed.ic.DsmhbkHp_q.png") { lap_driver = "Polar"; }
          else if (lap_driver == "driver/x13.gif.pagespeed.ic.iOdoaq112n.png") { lap_driver = "Pura"; }
          else if (lap_driver == "driver/x14.gif.pagespeed.ic.bt9azBfZ6Z.png") { lap_driver = "Roo"; }
          else if (lap_driver == "driver/x15.gif.pagespeed.ic.c4NdZbNBFW.png") { lap_driver = "Tiny Tiger"; }
          else if (lap_driver == "driver/x16.gif.pagespeed.ic.cYYRWKzG2q.png") { lap_driver = "Penta Penguin"; }

          console.log(name + " : [ " + course + ", " + course_version + ", " + course_standard + ", " + course_ustandard + ", " + course_driver + " ] : [ " + lap + ", " + lap_version + ", " + lap_standard + ", " + lap_ustandard + ", " + lap_driver + " ]");

          array[track_i].track.push(
            {
              name: name,
              course: {
                rank: course,
                version: course_version,
                standard: course_standard,
                updated_standard: course_ustandard,
                driver: course_driver
              },
              lap: {
                rank: lap,
                version: lap_version,
                standard: lap_standard,
                updated_standard: lap_ustandard,
                driver: lap_driver
              }
            }
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