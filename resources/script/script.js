const url = "resources/data/data.json";
const table = document.getElementById("table");
var datag = "";

var addclass = "";

var actualzoom = 100;

/* ================================================== */

function zoom(type) {
    if (type == 0 && actualzoom < 200) {
        actualzoom += 10;
    }
    else if (type == 1 && actualzoom > 10) {
        actualzoom -= 10;
    }
    table.setAttribute("style", "zoom:" + actualzoom + "%");
}

/* ================================================== */

function getData() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            datag = data;
            console.log(data);
            display();
        })
        .catch(err => console.log(err));
}

/* ================================================== */

function display() {
    for (i = 0; i < datag.length; i++) {

        const player = document.createElement("tr");

        player.innerHTML = `
            <td>${datag[i].id}</td>
            <td>${datag[i].speudo}</td>
            <td>${datag[i].country}</td>
        `;

        for (t = 0; t < datag[i].track.length; t++) {
            const rank_course = document.createElement("td");
            const rank_lap = document.createElement("td");

            setColor(0);
            rank_course.setAttribute("class", addclass);
            rank_course.innerHTML = datag[i].track[t].course.rank;
            player.appendChild(rank_course);

            setColor(1);
            rank_lap.setAttribute("class", addclass);
            rank_lap.innerHTML = datag[i].track[t].lap.rank;
            player.appendChild(rank_lap);
        }

        document.getElementById("ranking").appendChild(player);
    }
}

/* ================================================== */

function setColor(type) {
    var datatype = "";
    switch (type) {
        case 0:
            datatype = datag[i].track[t].course.rank;
            break;
        case 1:
            datatype = datag[i].track[t].lap.rank;
            break;
    }

    if (datatype == 1) { addclass = "t1" }
    else if (datatype == 2) { addclass = "t2" }
    else if (datatype == 3) { addclass = "t3" }
    else if (datatype <= 5) { addclass = "t5" }
    else if (datatype <= 10) { addclass = "t10" }
    else if (datatype <= 20) { addclass = "t20" }
    else if (datatype <= 30) { addclass = "t30" }
    else if (datatype <= 40) { addclass = "t40" }
    else if (datatype <= 50) { addclass = "t50" }
    else if (datatype <= 60) { addclass = "t60" }
    else if (datatype <= 70) { addclass = "t70" }
    else if (datatype <= 80) { addclass = "t80" }
    else if (datatype <= 100) { addclass = "t100" }
    else if (datatype <= 125) { addclass = "t125" }
    else if (datatype <= 150) { addclass = "t150" }
    else if (datatype <= 175) { addclass = "t175" }
    else if (datatype <= 200) { addclass = "t200" }
    else if (datatype <= 225) { addclass = "t225" }
    else if (datatype <= 250) { addclass = "t250" }
    else if (datatype <= 275) { addclass = "t275" }
    else if (datatype <= 300) { addclass = "t300" }
    else if (datatype <= 325) { addclass = "t325" }
    else if (datatype <= 350) { addclass = "t350" }
    else if (datatype <= 375) { addclass = "t375" }
    else if (datatype <= 400) { addclass = "t400" }
    else if (datatype > 400) { addclass = "t400p" }
}

/* ================================================== */

function run() {
    getData();
}

run();