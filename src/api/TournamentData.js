/* eslint-disable no-undef */
// noinspection DuplicatedCode

import path from "path";
import {readFileSync} from "fs";
import {STATICS_URL} from "@/api/poke-api";

let FORCE_TYPE_ABILITIES = {
    182: {
        name: 'Pixilate',
        forced_from: 'Normal',
        forced_type: 'Fairy'
    },
    96: {
        name: 'Normalize',
        forced_from: '*',
        forced_type: 'Normal'
    },
    184: {
        name: 'Aerilate',
        forced_from: 'Normal',
        forced_type: 'Flying'
    },
    206: {
        name: 'Galvanize',
        forced_from: 'Normal',
        forced_type: 'Electric'
    },
    174: {
        name: 'Refrigerate',
        forced_from: 'Normal',
        forced_type: 'Ice'
    }
}

class FocedMovement {
    constructor(ability, move_id) {
        if (!move_id) return;
        let move_file = path.join(__static, 'data', 'move_data.json');
        let type_file = path.join(__static, 'data', 'type_data.json');
        let move_data = readFileSync(move_file);
        let type_data = readFileSync(type_file);

        let move_json = JSON.parse(move_data)
        let move = move_json[move_id];
        let coverage_data = JSON.parse(type_data)

        this.move_name = move.movename;
        this.flavor_text = move.falvor_text;
        this.power = move.movepower;
        this.accuracy = move.moveaccuracy;
        this.category = move.movecategoryname;

        let move_type = move.typename;
        let forced_type = ability.toString() in FORCE_TYPE_ABILITIES;

        if (forced_type) {
            let ability_data = FORCE_TYPE_ABILITIES[ability];
            if (move_type === ability_data.forced_from) {
                move_type = ability_data.forced_type;
            } else if (ability_data.forced_from === '*') {
                move_type = ability_data.forced_type;
            }
        }

        this.type = move_type;
        this.coverage_data = coverage_data[move_type.toLowerCase()];
    }
}

class ForcedPokemon {
    constructor(data) {
        this.dex_number = data.dex_number
        this.held_item_num = data.held_item_num
        this.ability_num = data.ability_num
        this.nature_num = data.nature_num
        this.form = data.form
        this.evattack = data.evattack
        this.evdefense = data.evdefense
        this.evspeed = data.evspeed
        this.evspatk = data.evspatk
        this.evspdef = data.evspdef
        this.moves = []

        this.moves.push(new FocedMovement(data.ability_num, data.moves[0]));
        this.moves.push(new FocedMovement(data.ability_num, data.moves[1]));
        this.moves.push(new FocedMovement(data.ability_num, data.moves[2]));
        this.moves.push(new FocedMovement(data.ability_num, data.moves[3]));
        this.mote = data.mote

        let fileData = readFileSync(path.join(__static, 'data', 'mon_data.json')).toString();
        let fileformData = readFileSync(path.join(__static, 'data', 'pokemon_forms.json')).toString();
        let pokedata = JSON.parse(fileData);
        let formdata = JSON.parse(fileformData);

        let pokemon;

        try {
            if (this.dex_number in formdata) {
                let form = formdata[this.dex_number][this.form];
                if (form in pokedata[this.dex_number]) {
                    pokemon = pokedata[this.dex_number][form];
                } else {
                    pokemon = pokedata[this.dex_number]["0"]
                }
            } else {
                pokemon = pokedata[this.dex_number]["0"]
            }
        } catch (e) {
            console.error('failed for pokemon dex: ', this.dex_number)
            return;
        }

        this.attack = data.attack;
        this.defense = data.defense;
        this.speed = data.speed;
        this.spatk = data.spatk;
        this.spdef = data.spdef;
        this.species = pokemon.name;
        this.sprite_url = STATICS_URL + `/sprites/master/sprites/pokemon/${this.dex_number}.png`;
        this.types = pokemon.types.map((value) => {
            return {name: value.name.toLowerCase()}
        });
    }
}

export function getTeam(trainer_name) {
    let trainer_file_path = path.join(__static, 'data', 'trainers', `${trainer_name}.json`);
    let trainer_file = readFileSync(trainer_file_path);
    let pokedata = JSON.parse(trainer_file);
    return pokedata.team.map((pokemonData) => new ForcedPokemon(pokemonData))
}