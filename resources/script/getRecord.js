import axios from "axios";
import cheerio from "cheerio";
import * as fsmod from "./lib/fsmod.js";
import * as c4e from "./lib/c4e.js";

let state = 0;

let listplayer = [];
let any = 1;

function stateScript() {
    switch (state) {
        case 0:
            getPage("http://ctr4ever.joora.fr/list.php", 0);
            break;

        case 1:
            getPage(`http://ctr4ever.joora.fr/track.php?cid=${any}`, 1);
            break;

        case 2:
            fsmod.createJson("./resources/data/players.json", listplayer);
            break;
    }
    state++;
}

function getPage(url, info) {
    axios
        .get(url)
        .then((res) => {
            switch (info) {
                case 0:
                    getPlayers(res.data);
                    break;
                case 1:
                    getRecord(res.data);
                    break;
            }
        })
        .catch((err) => console.error(err));
}

function getPlayers(page) {
    const $ = cheerio.load(page);

    $(`.tableau > tbody > .content`).each((index, element) => {
        listplayer.push({
            pid: $(element).find("td:nth-child(1) > a").attr("href").substring(15),
            speudo: $(element).find("td:nth-child(1) > a").text(),
            country: $(element).find("td:nth-child(2)").text(),
            age: $(element).find("td:nth-child(3)").text(),
            latest: $(element).find("td:nth-child(6)").text(),
            record: []
        });
        console.log(listplayer[index].speudo);
    });

    listplayer.sort((a, b) => parseFloat(a.pid) - parseFloat(b.pid));

    stateScript();
}

function getRecord(page) {
    const $ = cheerio.load(page);

    console.log("Page : " + any + " Track : " + c4e.getTrackName(any));

    $(`.tableau > tbody > [title]`).each((index, element) => {
        listplayer[
            listplayer.findIndex(function(player) {
                return player.speudo == $(element).find("td:nth-child(2) > a").text();
            })
        ].record[any] = {
            rank: Number($(element).find("td:nth-child(1)").text()),
            time: c4e.convert_time($(element).find("td:nth-child(4)").text()),
            driver: c4e.convert_driver($(element).find("td:nth-child(5) > img").attr("src")),
            version: $(element).find("td:nth-child(6)").text(),
            date: $(element).find("td:nth-last-child(2)").text(),
            video: $(element).find("td:nth-last-child(1) > a").attr("href"),
            standard: c4e.getInfoStandard(any, c4e.convert_time($(element).find("td:nth-child(4)").text()), 0),
            updated_standard: c4e.getInfoStandard(any, c4e.convert_time($(element).find("td:nth-child(4)").text()), 1)
        }
        console.log(index);
    });

    if (any < 216) {
        any++;
        getPage(`http://ctr4ever.joora.fr/track.php?cid=${any}`, 1);
    } else {
        stateScript();
    }
}

stateScript();