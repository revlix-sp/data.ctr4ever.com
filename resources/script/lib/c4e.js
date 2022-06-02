import * as fsmod from "./fsmod.js";

export {
    track_list, standard_list, standard_time,
    /* ---------- */
    convert_driver, //? Convert the driver display on ctr4ever from the image to its name
    convert_time, //? Convert the time indicated on ctr4ever
    /* ---------- */
    getTrackId, //? Get the id of the circuit corresponding to the cid of ctr4ever
    getTrackName, //? Get the name of the circuit corresponding to the cid of ctr4ever
    getTrackType, //? Get the type of the circuit corresponding to the cid of ctr4ever
    getDriverType, //? Get the type of driver to use corresponding to the cid of ctr4ever
    getInfoCID, //? Get all the information from the track cid
    /* ---------- */
    getInfoStandard //? Get the ID and name of the standard reached
}

const track_list = [
    "Crash Cove", "Roo Tubes", "Tiger Temple", "Coco Park", "Mystery Caves", "Blizzard Bluff", "Sewer Speedway","Dingo Canyon", "Papu Pyramid",
    "Dragon Mines", "Polar Pass", "Cortex Castle", "Tiny Arena", "Hot Air Skyway", "N.Gin Labs", "Oxide Station", "Slide Coliseum", "Turbo Track"
]

const standard_list = {
    standard: [
        "GOD", "Titan A", "Titan B", "Titan C", "Titan D", "Hero A", "Hero B", "Hero C", "Hero D",
        "Expert A", "Expert B", "Expert C", "Expert D", "Advanced A", "Advanced B", "Advanced C", "Advanced D",
        "Intermediate A", "Intermediate B", "Intermediate C", "Intermediate D", "Beginner A", "Beginner B", "Beginner C", "Beginner D",
        "Newbie"
    ],
    updated_standard: [
        "GOD+4", "GOD+3", "GOD+2", "GOD+1", "GOD", "Myth A", "Myth B", "Myth C", "Myth D", "Titan A", "Titan B", "Titan C", "Titan D",
        "Hero A", "Hero B", "Hero C", "Hero D", "Master A", "Master B", "Master C", "Master D", "Expert A", "Expert B", "Expert C", "Expert D",
        "Advanced A", "Advanced B", "Advanced C", "Advanced D", "Intermediate A", "Intermediate B", "Intermediate C", "Intermediate D",
        "Beginner A", "Beginner B", "Beginner C", "Beginner D", "Newbie"
    ]
}

const standard_time = fsmod.readJson("./resources/script/lib/c4e/standardTime.json");

/**
 * Convert the driver display on ctr4ever from the image to its name
 *
 * @param {string} driver source of the image
 * @returns {string} name of the character
 */
 function convert_driver(driver) {
    switch (driver) {
        case "driver/x1.gif.pagespeed.ic.YIlIiwMfHC.png": return "Coco";
        case "driver/x2.gif.pagespeed.ic.EvJjjeTp9j.png": return "Crash";
        case "driver/x3.gif.pagespeed.ic.DkkSXPZPpV.png": return "Dingodile";
        case "driver/x4.gif.pagespeed.ic.M2Jr_BnH7n.png": return "Fake Crash";
        case "driver/x5.gif.pagespeed.ic.4xZx0D8rnK.png": return "Komodo Joe";
        case "driver/x6.gif.pagespeed.ic.UWhQvkIMcI.png": return "N.Gin";
        case "driver/x7.gif.pagespeed.ic.zYMZwTH7gu.png": return "N.Tropy";
        case "driver/x8.gif.pagespeed.ic.pX-W5ZSkwj.png": return "Neo Cortex";
        case "driver/x9.gif.pagespeed.ic.k3rvXjaN2h.png": return "Papu Papu";
        case "driver/x10.gif.pagespeed.ic.cYYRWKzG2q.png": return "Penta Penguin";
        case "driver/x11.gif.pagespeed.ic.GoUBG6MS6t.png": return "Pinstripe";
        case "driver/x12.gif.pagespeed.ic.DsmhbkHp_q.png": return "Polar";
        case "driver/x13.gif.pagespeed.ic.iOdoaq112n.png": return "Pura";
        case "driver/x14.gif.pagespeed.ic.bt9azBfZ6Z.png": return "Roo";
        case "driver/x15.gif.pagespeed.ic.c4NdZbNBFW.png": return "Tiny Tiger";
        case "driver/x16.gif.pagespeed.ic.cYYRWKzG2q.png": return "Penta Penguin";
        case "driver/x0.gif.pagespeed.ic.x_u9LS7LMN.png": return "N/A";
        default: return "N/A";
    }
}

/**
 * Convert the time indicated on ctr4ever
 *
 * @param {string} vartime time indicated on ctr4ever
 * @returns {number} time in hundredths of seconds
 */
 function convert_time(vartime) {
    let time_edit = Number(vartime.slice(-2)) + (Number(vartime.slice(-6, -4)) * 100);
    if (vartime.length == 8) {
        return time_edit + Number(vartime.slice(0, 1)) * 6000;
    }
    else if (vartime.length == 7) {
        return 0 - time_edit;
    }
    else {
        return time_edit;
    }
}

/**
 * Get the id of the circuit corresponding to the cid of ctr4ever
 *
 * @param {number} id cid to watch
 * @returns track id
 */
function getTrackId(id) {
    if (id <= 36 || id >= 73) {
        if (id >= 181) {
            id = id - 180;
        } else if (id >= 145) {
            id = id - 144;
        } else if (id >= 109) {
            id = id -108;
        } else if (id >= 73) {
            id = id - 72;
        }
        if (id%2 == 0) {
            return (id/2)-1;
        } else {
            return ((id+1)/2)-1;
        }
    } else {
        if (id <= 54) {
            id = id - 36;
        } else {
            id = id - 54;
        }
        return id - 1;
    }
}

/**
 * Get the name of the circuit corresponding to the cid of ctr4ever
 *
 * @param {number} id cid to watch
 * @returns track name
 */
function getTrackName(id) {
    return track_list[getTrackId(id)];
}

/**
 * Get the type of the circuit corresponding to the cid of ctr4ever
 *
 * @param {number} id cid to watch
 * @returns track type
 */
function getTrackType(id) {
    if (id <= 36 || id >= 73) {
        if (id%2 == 0) {
            return "lap";
        } else {
            return "course";
        }
    } else {
        if (id <= 54) {
            return "sl";
        } else {
            return "relic race";
        }
    }
}

/**
 * Get the type of driver to use corresponding to the cid of ctr4ever
 *
 * @param {number} id cid to watch
 * @returns type of driver use
 */
function getDriverType(id) {
    if (id <= 72) {
        return "all";
    } else if (id <= 108) {
        return "fast";
    } else if (id <= 144) {
        return "acc";
    } else if (id <= 180) {
        return "medium";
    } else if (id <= 216) {
        return "slow";
    }
}

/**
 * Get all the information from the track cid
 *
 * @param {number} id cid to watch
 * @returns data array concerning the cid given
 */
function getInfoCID(id) {
    return {
        id: getTrackId(id),
        name: getTrackName(id),
        type: getTrackType(id),
        driver: getDriverType(id)
    };
}

/**
 * Get the ID and name of the standard reached
 *
 * @param {number} idtrack track ID
 * @param {number} time time to watch
 * @param {number} type 0 = standard/1=updated_standard
 * @returns id and name of the standard
 */
function getInfoStandard(idtrack, time, type) {
    if (idtrack <= 36 || idtrack >= 73) {
        const id = standard_time
            [(type == 0) ? "standard" : "updated_standard"]
            [getTrackId(idtrack)]
            [getTrackType(idtrack)]
            .findIndex((compare) => compare > time);
        if (id == -1) {
            return {
                id: standard_list[(type == 0) ? "standard" : "updated_standard"].lastIndexOf("Newbie"),
                name: "Newbie"
            };
        }
        return { id: id, name: standard_list[(type == 0) ? "standard" : "updated_standard"][id] };
    }
    return "N/A";
}