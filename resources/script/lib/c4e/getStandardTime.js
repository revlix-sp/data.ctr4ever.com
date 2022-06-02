import axios from "axios";
import cheerio from "cheerio";
import * as fsmod from "../fsmod.js";
import * as c4e from "../c4e.js";

let state = 0;

let data_standard = {}

function stateScript() {
    switch (state) {
        case 0:
            data_standard = {standard: []}
            for (let i = 0; i < 18; i++) {
                data_standard.standard.push({name: c4e.track_list[i], course: [], lap: []});
            }
            getPage("http://ctr4ever.joora.fr/standards.php", "standard");
            break;

        case 1:
            data_standard = {...data_standard, updated_standard: []}
            for (let i = 0; i < 18; i++) {
                data_standard.updated_standard.push({name: c4e.track_list[i], course: [], lap: []});
            }
            getPage("http://ctr4ever.joora.fr/updated_standards.php", "updated_standard");
            break;

        case 2:
            fsmod.createJson("./resources/script/lib/c4e/standardTime.json", data_standard);
            break;
    }
    state++;
}

function getPage(url, info) {
    axios
        .get(url)
        .then((res) => {
            const $ = cheerio.load(res.data);

            $(`.centre > .tableau > tbody`).each((id_tb, element) => {
                $(element).find(`tr`).each((id_tr, element) => {

                    $(element).find(`[align=right]`).each((index, element) => {
                        data_standard
                            [info]
                            [(id_tr%2 == 0) ? id_tr/2-1 : (id_tr-1)/2-1]
                            [(id_tr%2 == 0) ? "course" : "lap"]
                            .push(c4e.convert_time($(element).text()));
                    });

                });
            });

            stateScript();
        })
        .catch((err) => console.error(err));
}

stateScript();