import struct from 'python-struct';
import {decryptData} from "./PokemonCrypt";
import {STATICS_URL} from './poke-api'
import {Movement} from "./movement";
import {readFileSync} from 'fs'
import path from "path";

export function validatePokemon(dex_number) {
    return dex_number >= 1 && dex_number <= 808;
}

export class Pokemon {
    cleanNickData(nickElements) {
        let result = '';
        for (let char of nickElements) {
            if (char === 0) {
                return result;
            } else {
                result += String.fromCharCode(char);
            }
        }

        return result;
    }

    constructor(move_data, data) {
        let raw_data = decryptData(data);
        this.dex_number = struct.unpack("<H", raw_data.subarray(8, 10))[0]
        if (this.dex_number === 0 || this.dex_number >= 808) return;
        this.held_item_num = struct.unpack("<H", raw_data.subarray(10, 12))[0]
        this.ability_num = struct.unpack("B", raw_data.subarray(20, 21))[0]  // Ability
        this.nature_num = struct.unpack("B", raw_data.subarray(28, 29))[0]   // Nature

        this.form = struct.unpack("B", raw_data.subarray(29, 30))[0]         // FORM: mega, mega-x, mega-y, alola...

        this.evhp = struct.unpack("B", raw_data.subarray(30, 31))[0]         // HP EV
        this.evattack = struct.unpack("B", raw_data.subarray(31, 32))[0]     // Attack EV
        this.evdefense = struct.unpack("B", raw_data.subarray(32, 33))[0]    // Defense EV
        this.evspeed = struct.unpack("B", raw_data.subarray(33, 34))[0]      // Speed EV
        this.evspatk = struct.unpack("B", raw_data.subarray(34, 35))[0]      // Special attack EV
        this.evspdef = struct.unpack("B", raw_data.subarray(35, 36))[0]      // Special defense EV
        let mote = struct.unpack("12<H", raw_data.subarray(64, 90))
        this.moves = []

        this.moves.push(Movement(this.ability_num, 0, struct.unpack("<H", raw_data.subarray(90, 92))[0], struct.unpack("<B", raw_data.subarray(98, 99))[0], move_data));
        this.moves.push(Movement(this.ability_num, 1, struct.unpack("<H", raw_data.subarray(92, 94))[0], struct.unpack("<B", raw_data.subarray(99, 100))[0], move_data));
        this.moves.push(Movement(this.ability_num, 2, struct.unpack("<H", raw_data.subarray(94, 96))[0], struct.unpack("<B", raw_data.subarray(100, 101))[0], move_data));
        this.moves.push(Movement(this.ability_num, 3, struct.unpack("<H", raw_data.subarray(96, 98))[0], struct.unpack("<B", raw_data.subarray(101, 102))[0], move_data));

        let ivloc = struct.unpack("<I", raw_data.subarray(116, 120))[0]
        this.friendship = struct.unpack("B", raw_data.subarray(202, 203))[0]   // Friendship
        this.level_met = struct.unpack("<H", raw_data.subarray(221, 223))[0]   // Level met

        this.statusbyte = struct.unpack("<B", raw_data.subarray(332, 333))[0]  // Status byte
        this.level = struct.unpack("B", raw_data.subarray(336, 337))[0]        // Current level
        this.cur_hp = struct.unpack("<H", raw_data.subarray(340, 342))[0]      // Current HP
        this.maxhp = struct.unpack("<H", raw_data.subarray(342, 344))[0]       // Max HP
        this.attack = struct.unpack("<H", raw_data.subarray(344, 346))[0]      // Attack stat
        this.defense = struct.unpack("<H", raw_data.subarray(346, 348))[0]     // Defense stat
        this.speed = struct.unpack("<H", raw_data.subarray(348, 350))[0]       // Speed stat
        this.spatk = struct.unpack("<H", raw_data.subarray(350, 352))[0]       // Special attack stat
        this.spdef = struct.unpack("<H", raw_data.subarray(352, 354))[0]       // Special defense stat
        this.ivhp = ivloc & 31                                                 // HP IV
        this.ivattack = (ivloc >> 5) & 31                                      // Attack IV
        this.ivdefense = (ivloc >> 10) & 31                                    // Defense IV
        this.ivspeed = (ivloc >> 15) & 31                                      // Speed IV
        this.ivspatk = (ivloc >> 20) & 31                                      // Special attack IV
        this.ivspdef = (ivloc >> 25) & 31                                      // Special defense IV
        this.sprite_url = STATICS_URL + `/sprites/master/sprites/pokemon/${this.dex_number}.png`;
        this.sprite_back_url = STATICS_URL + `/sprites/master/sprites/pokemon/back/${this.dex_number}.png`;
        this.mote = this.cleanNickData(mote);
        // eslint-disable-next-line no-undef
        let fileData = readFileSync(path.join(__static, 'data', 'mon_data.json')).toString();
        // eslint-disable-next-line no-undef
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

        this.species = pokemon.name;
        this.types = pokemon.types.map((value) => {
            return {name: value.name.toLowerCase()}
        })
    }

    isAlive() {
        return this.cur_hp >= 0;
    }
}
