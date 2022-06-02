import axios from "axios";
import cheerio from "cheerio";

let state = 0;

function stateScript() {
    switch (state) {
        case 0:
            getPage(/* url of the page */);
            break;

        case 1:
            getPage(/* url of the page */);
            break;

    }
    state++;
}

function getPage(url) {
    axios
        .get(url)
        .then((res) => {
            const $ = cheerio.load(res.data);

            stateScript();
        })
        .catch((err) => console.error(err));
}

stateScript();