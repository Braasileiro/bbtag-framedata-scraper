import Stats from './Stats';

export default class Character {
    name: string;
    icon: string;
    portrait: string;
    color: string;
    stats: Stats;
    url: string;
    framedata: any;
    
    constructor(
        name: string = "",
        icon: string = "",
        portrait: string = "",
        color: string = "",
        stats: Stats = new Stats(),
        url: string = "",
        framedata: any = {}
    ) {
        this.name = name;
        this.icon = icon;
        this.portrait = portrait;
        this.color = color;
        this.stats = stats;
        this.url = url;
        this.framedata = framedata;
    }
}
