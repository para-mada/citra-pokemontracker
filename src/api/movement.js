import {readFileSync} from 'fs'
import path from "path";

function Movement(slot, id, pp) {
    if (id === 0) return;
    // eslint-disable-next-line no-undef
    let move_data = path.join(__static, 'data', 'move_data.json');
    // eslint-disable-next-line no-undef
    let type_file = path.join(__static, 'data', 'type_data.json');
    // eslint-disable-next-line no-unused-vars
    let data = readFileSync(move_data);
    let type_data = readFileSync(type_file);
    let res = JSON.parse(data)
    let type_res = JSON.parse(type_data)
    let json_res = res[id];
    if (json_res === undefined) {
        return;
    }
    let coverage_data = type_res[json_res.typename.toLowerCase()];
    return {
        slot: slot,
        current_pp: pp,
        move_name: json_res.movename,
        max_pp: json_res.movepp,
        type: json_res.typename,
        power: json_res.movepower,
        accuracy: json_res.moveaccuracy,
        category: json_res.movecategoryname,
        coverage: coverage_data
    };

}

export {
    Movement
}