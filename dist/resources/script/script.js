const url = "/dist/resources/data/data.json";

var datag = "";

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

        for(t = 0; t < datag[i].track.length; t++) {
            const rank_course = document.createElement("td");
            const rank_lap = document.createElement("td");
            var addclass = "";

            if (datag[i].track[t].course == 1) { addclass = "t1" }
            else if (datag[i].track[t].course == 2) { addclass = "t2" }
            else if (datag[i].track[t].course == 3) { addclass = "t3" }
            else if (datag[i].track[t].course >= 4 && datag[i].track[t].course <= 5) { addclass = "t5" }
            else if (datag[i].track[t].course >= 6 && datag[i].track[t].course <= 10) { addclass = "t10" }
            else if (datag[i].track[t].course >= 11 && datag[i].track[t].course <= 20) { addclass = "t20" }
            else if (datag[i].track[t].course >= 21 && datag[i].track[t].course <= 30) { addclass = "t30" }
            else if (datag[i].track[t].course >= 31 && datag[i].track[t].course <= 40) { addclass = "t40" }
            else if (datag[i].track[t].course >= 41 && datag[i].track[t].course <= 50) { addclass = "t50" }
            else if (datag[i].track[t].course >= 51 && datag[i].track[t].course <= 60) { addclass = "t60" }
            else if (datag[i].track[t].course >= 61 && datag[i].track[t].course <= 70) { addclass = "t70" }
            else if (datag[i].track[t].course >= 71 && datag[i].track[t].course <= 80) { addclass = "t80" }
            else if (datag[i].track[t].course >= 81 && datag[i].track[t].course <= 100) { addclass = "t100" }
            else if (datag[i].track[t].course >= 101 && datag[i].track[t].course <= 125) { addclass = "t125" }
            else if (datag[i].track[t].course >= 126 && datag[i].track[t].course <= 150) { addclass = "t150" }
            else if (datag[i].track[t].course >= 151 && datag[i].track[t].course <= 175) { addclass = "t175" }
            else if (datag[i].track[t].course >= 176 && datag[i].track[t].course <= 200) { addclass = "t200" }
            else if (datag[i].track[t].course >= 201 && datag[i].track[t].course <= 225) { addclass = "t225" }
            else if (datag[i].track[t].course >= 226 && datag[i].track[t].course <= 250) { addclass = "t250" }
            else if (datag[i].track[t].course >= 251 && datag[i].track[t].course <= 275) { addclass = "t275" }
            else if (datag[i].track[t].course >= 276 && datag[i].track[t].course <= 300) { addclass = "t300" }
            else if (datag[i].track[t].course >= 301 && datag[i].track[t].course <= 325) { addclass = "t325" }
            else if (datag[i].track[t].course >= 326 && datag[i].track[t].course <= 350) { addclass = "t350" }
            else if (datag[i].track[t].course >= 351 && datag[i].track[t].course <= 375) { addclass = "t375" }
            else if (datag[i].track[t].course >= 376 && datag[i].track[t].course <= 400) { addclass = "t400" }
            else if (datag[i].track[t].course > 400) { addclass = "t400p" }
            rank_course.setAttribute("class", addclass);
            rank_course.innerHTML = datag[i].track[t].course;
            player.appendChild(rank_course);

            if (datag[i].track[t].lap == 1) { addclass = "t1" }
            else if (datag[i].track[t].lap == 2) { addclass = "t2" }
            else if (datag[i].track[t].lap == 3) { addclass = "t3" }
            else if (datag[i].track[t].lap >= 4 && datag[i].track[t].lap <= 5) { addclass = "t5" }
            else if (datag[i].track[t].lap >= 6 && datag[i].track[t].lap <= 10) { addclass = "t10" }
            else if (datag[i].track[t].lap >= 11 && datag[i].track[t].lap <= 20) { addclass = "t20" }
            else if (datag[i].track[t].lap >= 21 && datag[i].track[t].lap <= 30) { addclass = "t30" }
            else if (datag[i].track[t].lap >= 31 && datag[i].track[t].lap <= 40) { addclass = "t40" }
            else if (datag[i].track[t].lap >= 41 && datag[i].track[t].lap <= 50) { addclass = "t50" }
            else if (datag[i].track[t].lap >= 51 && datag[i].track[t].lap <= 60) { addclass = "t60" }
            else if (datag[i].track[t].lap >= 61 && datag[i].track[t].lap <= 70) { addclass = "t70" }
            else if (datag[i].track[t].lap >= 71 && datag[i].track[t].lap <= 80) { addclass = "t80" }
            else if (datag[i].track[t].lap >= 81 && datag[i].track[t].lap <= 100) { addclass = "t100" }
            else if (datag[i].track[t].lap >= 101 && datag[i].track[t].lap <= 125) { addclass = "t125" }
            else if (datag[i].track[t].lap >= 126 && datag[i].track[t].lap <= 150) { addclass = "t150" }
            else if (datag[i].track[t].lap >= 151 && datag[i].track[t].lap <= 175) { addclass = "t175" }
            else if (datag[i].track[t].lap >= 176 && datag[i].track[t].lap <= 200) { addclass = "t200" }
            else if (datag[i].track[t].lap >= 201 && datag[i].track[t].lap <= 225) { addclass = "t225" }
            else if (datag[i].track[t].lap >= 226 && datag[i].track[t].lap <= 250) { addclass = "t250" }
            else if (datag[i].track[t].lap >= 251 && datag[i].track[t].lap <= 275) { addclass = "t275" }
            else if (datag[i].track[t].lap >= 276 && datag[i].track[t].lap <= 300) { addclass = "t300" }
            else if (datag[i].track[t].lap >= 301 && datag[i].track[t].lap <= 325) { addclass = "t325" }
            else if (datag[i].track[t].lap >= 326 && datag[i].track[t].lap <= 350) { addclass = "t350" }
            else if (datag[i].track[t].lap >= 351 && datag[i].track[t].lap <= 375) { addclass = "t375" }
            else if (datag[i].track[t].lap >= 376 && datag[i].track[t].lap <= 400) { addclass = "t400" }
            else if (datag[i].track[t].lap > 400) { addclass = "t400p" }
            rank_lap.setAttribute("class", addclass);
            rank_lap.innerHTML = datag[i].track[t].lap;
            player.appendChild(rank_lap);
        }

        document.getElementById("ranking").appendChild(player);
    }
}

/* ================================================== */

function run() {
    getData();
}

run();