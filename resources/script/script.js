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

function searchbar() {
    let input = document.getElementById("searchbar").value;
    let player = document.getElementsByClassName("player");

    input = input.toLowerCase();

    for (i = 0; i < player.length; i++) {
        if (!player[i].innerHTML.toLowerCase().includes(input)) {
            player[i].style.display = "none";
        }
        else {
            player[i].style.display = "table-row";
        }
    }
}

/* ================================================== */

function getData() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            datag = data;
            console.log(data);
            display(0);
        })
        .catch(err => console.log(err));
}

/* ================================================== */

function display(type) {

    ranking.innerHTML = "";

    for (i = 0; i < datag.length; i++) {

        const player = document.createElement("tr");

        player.innerHTML = `
            <td>${datag[i].id}</td>
            <td>${datag[i].speudo}</td>
            <td>${datag[i].country}</td>
        `;

        player.setAttribute("class", "player")

        for (t = 0; t < datag[i].track.length; t++) {

            const rank_course = document.createElement("td");
            const rank_lap = document.createElement("td");

            switch (type) {
                case 0:
                    setColor(0);
                    rank_course.setAttribute("class", addclass);
                    rank_course.innerHTML = datag[i].track[t].course.rank;
                    player.appendChild(rank_course);

                    setColor(1);
                    rank_lap.setAttribute("class", addclass);
                    rank_lap.innerHTML = datag[i].track[t].lap.rank;
                    player.appendChild(rank_lap);
                    break;
                case 1:
                    setColor(2);
                    rank_course.setAttribute("class", addclass);
                    rank_course.innerHTML = datag[i].track[t].course.version;
                    player.appendChild(rank_course);

                    setColor(3);
                    rank_lap.setAttribute("class", addclass);
                    rank_lap.innerHTML = datag[i].track[t].lap.version;
                    player.appendChild(rank_lap);
                    break;
                case 2:
                    setCharacter(datag[i].track[t].course.driver);
                    rank_course.innerHTML = `<img width="30px" src="${addclass}"></img>`;
                    player.appendChild(rank_course);

                    setCharacter(datag[i].track[t].lap.driver);
                    rank_lap.innerHTML = `<img width="30px" src="${addclass}"></img>`;
                    player.appendChild(rank_lap);
                    break;
                case 3:
                    setColor(4);
                    rank_course.setAttribute("class", addclass);
                    rank_course.innerHTML = datag[i].track[t].course.standard;
                    player.appendChild(rank_course);

                    setColor(5);
                    rank_lap.setAttribute("class", addclass);
                    rank_lap.innerHTML = datag[i].track[t].lap.standard;
                    player.appendChild(rank_lap);
                    break;
                case 4:
                    setColor(6);
                    rank_course.setAttribute("class", addclass);
                    rank_course.innerHTML = datag[i].track[t].course.updated_standard;
                    player.appendChild(rank_course);

                    setColor(7);
                    rank_lap.setAttribute("class", addclass);
                    rank_lap.innerHTML = datag[i].track[t].lap.updated_standard;
                    player.appendChild(rank_lap);
                    break;
            }
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
        case 2:
            datatype = datag[i].track[t].course.version;
            break;
        case 3:
            datatype = datag[i].track[t].lap.version;
            break;
        case 4:
            datatype = datag[i].track[t].course.standard;
            break;
        case 5:
            datatype = datag[i].track[t].lap.standard;
            break;
        case 6:
            datatype = datag[i].track[t].course.updated_standard;
            break;
        case 7:
            datatype = datag[i].track[t].lap.updated_standard;
            break;
    }

    if (type == 0 || type == 1) {
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

    if (type == 2 || type == 3) {
        if (datatype == "PAL") { addclass = "tpal" }
        else if (datatype == "NTSC") { addclass = "tntsc" }
        else if (datatype == "N/A") { addclass = "tna" }
    }

    if (type == 4 || type == 5) {
        if (datatype == "0 / GOD") { addclass = "tgod" }
        else if (datatype == "1 / Titan A") { addclass = "ttitana" }
        else if (datatype == "2 / Titan B") { addclass = "ttitanb" }
        else if (datatype == "3 / Titan C") { addclass = "ttitanc" }
        else if (datatype == "4 / Titan D") { addclass = "ttitand" }
        else if (datatype == "5 / Hero A") { addclass = "theroa" }
        else if (datatype == "6 / Hero B") { addclass = "therob" }
        else if (datatype == "7 / Hero C") { addclass = "theroc" }
        else if (datatype == "8 / Hero D") { addclass = "therod" }
        else if (datatype == "9 / Expert A") { addclass = "texperta" }
        else if (datatype == "10 / Expert B") { addclass = "texpertb" }
        else if (datatype == "11 / Expert C") { addclass = "texpertc" }
        else if (datatype == "12 / Expert D") { addclass = "texpertd" }
        else if (datatype == "13 / Advance A") { addclass = "tadvancea" }
        else if (datatype == "14 / Advance B") { addclass = "tadvanceb" }
        else if (datatype == "15 / Advance C") { addclass = "tadvancec" }
        else if (datatype == "16 / Advance D") { addclass = "tadvanced" }
        else if (datatype == "17 / Intermediate A") { addclass = "tintermediatea" }
        else if (datatype == "18 / Intermediate B") { addclass = "tintermediateb" }
        else if (datatype == "19 / Intermediate C") { addclass = "tintermediatec" }
        else if (datatype == "20 / Intermediate D") { addclass = "tintermediated" }
        else if (datatype == "21 / Beginner A") { addclass = "tbeginnera" }
        else if (datatype == "22 / Beginner B") { addclass = "tbeginnerb" }
        else if (datatype == "23 / Beginner C") { addclass = "tbeginnerc" }
        else if (datatype == "24 / Beginner D") { addclass = "tbeginnerd" }
        else if (datatype == "25 / Newbie") { addclass = "tnewbie" }
    }

    if (type == 6 || type == 7) {
        if (datatype == "-4 / GOD+4") { addclass = "tgod4" }
        else if (datatype == "-3 / GOD+3") { addclass = "tgod3" }
        else if (datatype == "-2 / GOD+2") { addclass = "tgod2" }
        else if (datatype == "-1 / GOD+1") { addclass = "tgod1" }
        else if (datatype == "0 / GOD") { addclass = "tgod" }
        else if (datatype == "1 / Myth A") { addclass = "tmytha" }
        else if (datatype == "2 / Myth B") { addclass = "tmythb" }
        else if (datatype == "3 / Myth C") { addclass = "tmythc" }
        else if (datatype == "4 / Myth D") { addclass = "tmythd" }
        else if (datatype == "5 / Titan A") { addclass = "ttitana" }
        else if (datatype == "6 / Titan B") { addclass = "ttitanb" }
        else if (datatype == "7 / Titan C") { addclass = "ttitanc" }
        else if (datatype == "8 / Titan D") { addclass = "ttitand" }
        else if (datatype == "9 / Hero A") { addclass = "theroa" }
        else if (datatype == "10 / Hero B") { addclass = "therob" }
        else if (datatype == "11 / Hero C") { addclass = "theroc" }
        else if (datatype == "12 / Hero D") { addclass = "therod" }
        else if (datatype == "13 / Master A") { addclass = "tmastera" }
        else if (datatype == "14 / Master B") { addclass = "tmasterb" }
        else if (datatype == "15 / Master C") { addclass = "tmasterc" }
        else if (datatype == "16 / Master D") { addclass = "tmasterd" }
        else if (datatype == "17 / Expert A") { addclass = "texperta" }
        else if (datatype == "18 / Expert B") { addclass = "texpertb" }
        else if (datatype == "19 / Expert C") { addclass = "texpertc" }
        else if (datatype == "20 / Expert D") { addclass = "texpertd" }
        else if (datatype == "21 / Advance A") { addclass = "tadvancea" }
        else if (datatype == "22 / Advance B") { addclass = "tadvanceb" }
        else if (datatype == "23 / Advance C") { addclass = "tadvancec" }
        else if (datatype == "24 / Advance D") { addclass = "tadvanced" }
        else if (datatype == "25 / Intermediate A") { addclass = "tintermediatea" }
        else if (datatype == "26 / Intermediate B") { addclass = "tintermediateb" }
        else if (datatype == "27 / Intermediate C") { addclass = "tintermediatec" }
        else if (datatype == "28 / Intermediate D") { addclass = "tintermediated" }
        else if (datatype == "29 / Beginner A") { addclass = "tbeginnera" }
        else if (datatype == "30 / Beginner B") { addclass = "tbeginnerb" }
        else if (datatype == "31 / Beginner C") { addclass = "tbeginnerc" }
        else if (datatype == "32 / Beginner D") { addclass = "tbeginnerd" }
        else if (datatype == "33 / Newbie") { addclass = "tnewbie" }
    }
}

function setCharacter(type) {
    if (type == "Coco") { addclass = "resources/img/coco.gif" }
    else if (type == "Crash") { addclass = "resources/img/crash.gif" }
    else if (type == "Dingodile") { addclass = "resources/img/dingodile.gif" }
    else if (type == "Fake Crash") { addclass = "resources/img/fakecrash.gif" }
    else if (type == "Komodo Joe") { addclass = "resources/img/komodo.gif" }
    else if (type == "N.Tropy") { addclass = "resources/img/ngin.gif" }
    else if (type == "Neo Cortex") { addclass = "resources/img/ntropy.gif" }
    else if (type == "Papu Papu") { addclass = "resources/img/papu.gif" }
    else if (type == "Penta Penguin") { addclass = "resources/img/penta.gif" }
    else if (type == "Pinstripe") { addclass = "resources/img/pinstripe.gif" }
    else if (type == "Polar") { addclass = "resources/img/polar.gif" }
    else if (type == "Pura") { addclass = "resources/img/pura.gif" }
    else if (type == "Roo") { addclass = "resources/img/ripper.gif" }
    else if (type == "Tiny Tiger") { addclass = "resources/img/tiny.gif" }
}

/* ================================================== */

function run() {
    getData();
}

run();