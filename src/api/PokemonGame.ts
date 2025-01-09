// noinspection JSUnusedGlobalSymbols

import {Pokemon} from './pokemon'
import {RomData} from './romData'

enum CombatType {
    OFF,
    NORMAL,
    DOUBLE,
    TRIPLE
}

enum TeamOwner {
    YOU,
    ENEMY
}

class GameData {
    public readonly enemy_data: TeamData;
    public readonly your_data: TeamData;
    public readonly combat_info: CombatData;

    constructor(options: GameData) {
    }
}

class TeamData {
    team: Array<Pokemon>
    owner: TeamOwner

    constructor(options: TeamData) {
        // @ts-ignore
        this.owner = options.owner
        this.team = options.team
    }
}

class CombatData {
    combat_type: CombatType

    constructor(options: CombatData) {
        this.combat_type = options.combat_type
    }
}

export class PokemonGame {
    rom: RomData
    data: GameData

    constructor(rom) {
        this.rom = rom;
        this.data = new GameData({
            your_data: {
                team: [],
                owner: TeamOwner.YOU
            },
            enemy_data: {
                team: [],
                owner: TeamOwner.ENEMY
            },
            combat_info: {
                combat_type: CombatType.OFF
            }
        });
    }
}