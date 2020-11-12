export default class Framedata {
    damage: string;
    cancel: string;
    p1: string;
    p2: string;
    attributes: string;
    guard: string;
    startup: string;
    active: string;
    recovery: string;
    frameAdv: string;
    level: string;
    blockstun: string;
    hitstun: string;
    untech: string;
    hitstunCh: string;
    untechCh: string;
    blockstop: string;
    hitstop: string;
    chStop: string;
    inv: string;
    hitbox: string;
    notes: string;
    sprite: string;

    constructor(
        damage: string,
        cancel: string,
        p1: string,
        p2: string,
        attributes: string,
        guard: string,
        startup: string,
        active: string,
        recovery: string,
        frameAdv: string,
        level: string,
        blockstun: string,
        hitstun: string,
        untech: string,
        hitstunCh: string,
        untechCh: string,
        blockstop: string,
        hitstop: string,
        chStop: string,
        inv: string,
        hitbox: string,
        notes: string,
        sprite: string
    ) {
        this.damage = damage;
        this.cancel = cancel;
        this.p1 = p1;
        this.p2 = p2;
        this.attributes = attributes;
        this.guard = guard;
        this.startup = startup;
        this.active = active;
        this.recovery = recovery;
        this.frameAdv = frameAdv;
        this.level = level;
        this.blockstun = blockstun;
        this.hitstun = hitstun;
        this.untech = untech;
        this.hitstunCh = hitstunCh;
        this.untechCh = untechCh;
        this.blockstop = blockstop;
        this.hitstop = hitstop;
        this.chStop = chStop;
        this.inv = inv;
        this.hitbox = hitbox;
        this.notes = notes;
        this.sprite = sprite;
    }
}
