let data_players = "";

fetch("resources/data/players.json")
    .then(res => res.json())
    .then(data => {
        data_players = data
        avg();
    })
    .catch(err => console.log(err));


function avg() {
    for (i = 0; i < data_players.length; i++) {
        let avg = 0;
        if (data_players[i].record.length != 0) {
            data_players[i].record.reduce(function (a, b, index) {
                if (index > 0 && index <= 36) {
                    if (b != null) {
                        avg = avg + b.rank;
                    } else {
                        avg = avg + Number(data_players.length);
                    }
                }
            });
            if (data_players[i].record.length < 37) {
                let miss = 37 - data_players[i].record.length;
                avg = avg + miss * Number(data_players.length);
            }
        } else {
            avg = avg + Number(data_players.length) * 36;
        }

        data_players[i] = {...data_players[i], rank_avg: avg/36}
    }

    data_players.sort((a, b) => parseFloat(a.rank_avg) - parseFloat(b.rank_avg));

    display();
}

function display() {
    for (i = 0; i < data_players.length; i++) {
        const player = document.createElement("tr");

        player.innerHTML = `
            <td>${i + 1}</td>
            <td>${data_players[i].speudo}</td>
            <td>${data_players[i].country}</td>
            <td>${data_players[i].age}</td>
        `;

        document.getElementById("list").appendChild(player);

        for (t = 1; t <= 36; t++) {
            let addclass = "";
            const rank = document.createElement("td");

            if (data_players[i].record[t] != null) {
                rank.innerHTML = data_players[i].record[t].rank;

                if (data_players[i].record[t].rank == 1) { addclass = "t1" }
                else if (data_players[i].record[t].rank == 2) { addclass = "t2" }
                else if (data_players[i].record[t].rank == 3) { addclass = "t3" }
                else if (data_players[i].record[t].rank <= 5) { addclass = "t5" }
                else if (data_players[i].record[t].rank <= 10) { addclass = "t10" }
                else if (data_players[i].record[t].rank <= 20) { addclass = "t20" }
                else if (data_players[i].record[t].rank <= 30) { addclass = "t30" }
                else if (data_players[i].record[t].rank <= 40) { addclass = "t40" }
                else if (data_players[i].record[t].rank <= 50) { addclass = "t50" }
                else if (data_players[i].record[t].rank <= 60) { addclass = "t60" }
                else if (data_players[i].record[t].rank <= 70) { addclass = "t70" }
                else if (data_players[i].record[t].rank <= 80) { addclass = "t80" }
                else if (data_players[i].record[t].rank <= 100) { addclass = "t100" }
                else if (data_players[i].record[t].rank <= 125) { addclass = "t125" }
                else if (data_players[i].record[t].rank <= 150) { addclass = "t150" }
                else if (data_players[i].record[t].rank <= 175) { addclass = "t175" }
                else if (data_players[i].record[t].rank <= 200) { addclass = "t200" }
                else if (data_players[i].record[t].rank <= 225) { addclass = "t225" }
                else if (data_players[i].record[t].rank <= 250) { addclass = "t250" }
                else if (data_players[i].record[t].rank <= 275) { addclass = "t275" }
                else if (data_players[i].record[t].rank <= 300) { addclass = "t300" }
                else if (data_players[i].record[t].rank <= 325) { addclass = "t325" }
                else if (data_players[i].record[t].rank <= 350) { addclass = "t350" }
                else if (data_players[i].record[t].rank <= 375) { addclass = "t375" }
                else if (data_players[i].record[t].rank <= 400) { addclass = "t400" }
                else if (data_players[i].record[t].rank > 400) { addclass = "t400p" }
            } else {
                rank.innerHTML = "N/A";

                addclass = "t400p"
            }

            rank.setAttribute("class", addclass);
            player.appendChild(rank);
        }

        document.getElementById("list").appendChild(player);
    }
}