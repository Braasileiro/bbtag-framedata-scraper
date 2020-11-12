export default class Stats {
    health: string;
    prejump: string;
    backdash: string;
    fdash: string;
    notes: string;
    
    constructor(
        health: string = "",
        prejump: string = "",
        backdash: string = "",
        fdash: string = "",
        notes: string = ""
    ) {
        this.health = health;
        this.prejump = prejump;
        this.backdash = backdash;
        this.fdash = fdash;
        this.notes = notes;
    }
}
