import fs from 'fs';
import got from 'got';
import { JSDOM } from 'jsdom';
import Character from './model/Character';
import Framedata from './model/Framedata';
import Stats from './model/Stats';

const EMPTY_STRING = '';
const REGEX_LINEBREAK = RegExp('[\n\r]', 'g');
const URL_BASE = 'https://www.dustloop.com/wiki/index.php?title=BBTag'
const JSON_CHARACTERS = JSON.parse(fs.readFileSync('./assets/characters.json', 'utf8'));


async function init() {
    let KEY = '';
    let DATA = {};

    for await (let name of getCharacterNames()) {
        KEY = getCharacterKey(name);
        
        await getCharacterFramedata(KEY, name).then(result => (<any>DATA)[KEY] = (<Character> result));
    }

    if (!fs.existsSync('./output')) fs.mkdirSync('./output');

    fs.writeFileSync('./output/framedata.json', JSON.stringify(DATA, null, 2));
}

async function getCharacterFramedata(key: string, name: string): Promise<any> {
    console.log(`Retrieving '${key}' framedata...`);

    return got(`${URL_BASE}/${getCharacterUrl(name)}/Frame_Data`).then(response => {
        let dom = new JSDOM(response.body);

        let tables = [...dom.window.document.querySelectorAll('table.wikitable')].filter(o => o.querySelector('th')?.textContent)

        let character = new Character();

        character.name = name;

        character.color = getCharacterColor(character.name);

        character.stats = getStats(tables[0].querySelectorAll('td'));

        character.url = response.url;

        character.framedata = getFramedata(tables);

        return character;

    }).catch(e => {
        console.log(e);
    });
}

function getCharacterNames(): string[] {
    return Object.keys(JSON_CHARACTERS);
}

function getCharacterKey(name: string): string {
    return JSON_CHARACTERS[name]['json'];
}

function getCharacterUrl(name: string): string {
    return JSON_CHARACTERS[name]['url'];
}

function getCharacterColor(name: string): string {
    return JSON_CHARACTERS[name]['color'];
}

/*
 * Framedata
 */

// Character Stats
function getStats(tds: any): Stats {
    if (assert(tds)) {
        return new Stats(
            elementTrimNewLineOrEmpty(tds[0]),
            elementTrimNewLineOrEmpty(tds[1]),
            elementTrimNewLineOrEmpty(tds[2])
        );
    }

    return new Stats();
}

// Character Framedata
function getFramedata(tables: Element[]) {
    let trs, tds, name, notes, moves = {};

    for (let i = 1; i < tables.length; i++) {
        trs = tables[i].querySelectorAll('tr');

        for (let j = 1; j < trs.length; j++) {

            // Name
            name = getMoveName(trs[j]);

            if (name != EMPTY_STRING) {

                // Notes
                notes = getMoveNotes(trs[j + 1]?.querySelector('ul')?.querySelectorAll('li'));

                // Move framedata
                tds = trs[j].querySelectorAll('td');

                (<any>moves)[name] = new Framedata(
                    elementTrimNewLineOrEmpty(tds[0]),
                    elementTrimNewLineOrEmpty(tds[1]),
                    elementTrimNewLineOrEmpty(tds[2]),
                    elementTrimNewLineOrEmpty(tds[3]),
                    elementTrimNewLineOrEmpty(tds[4]),
                    elementTrimNewLineOrEmpty(tds[5]),
                    elementTrimNewLineOrEmpty(tds[6]),
                    elementTrimNewLineOrEmpty(tds[7]),
                    elementTrimNewLineOrEmpty(tds[8]),
                    elementTrimNewLineOrEmpty(tds[9]),
                    elementTrimNewLineOrEmpty(tds[10]),
                    elementTrimNewLineOrEmpty(tds[11]),
                    elementTrimNewLineOrEmpty(tds[12]),
                    elementTrimNewLineOrEmpty(tds[13]),
                    elementTrimNewLineOrEmpty(tds[14]),
                    elementTrimNewLineOrEmpty(tds[15]),
                    elementTrimNewLineOrEmpty(tds[16]),
                    elementTrimNewLineOrEmpty(tds[17]),
                    elementTrimNewLineOrEmpty(tds[18]),
                    elementTrimNewLineOrEmpty(tds[19]),
                    elementTrimNewLineOrEmpty(tds[20]),
                    notes,
                    "",
                );

                if (notes != EMPTY_STRING) j++;
            }
        }
    }

    return moves;
}

// Framedata Move Name
function getMoveName(tr: any): string {
    let name = EMPTY_STRING;

    if (assert(tr)) {
        let name_small;

        name = elementTextContentOrEmpty(tr.querySelector('th'));
        name_small = elementTextContentOrEmpty(tr.querySelector('small'));

        if (assert(name)) {
            name = textTrimNewLineOrEmpty(name.replace(name_small, ` ${name_small}`));

            // Fixes
            name = name.replace('+', EMPTY_STRING); // B+C
            name = name.trim(); // Removes unnecessary whitespaces   
        }
    }

    return name;
}

// Framedata Move Notes
function getMoveNotes(lis: any): string {
    let note = EMPTY_STRING;

    if (assert(lis)) {
        for (let i = 0; i < lis.length; i++) {
            if (i == 0) {
                note = lis[i].textContent;
            } else {
                note = note.concat('\n', lis[i].textContent);
            }
        }
    }

    return note;
}


/*
 * Util
 */
function assert(object: any): boolean {
    return object != (null || undefined)
}

function textTrimNewLineOrEmpty(text?: string): string {
    return text?.replace(REGEX_LINEBREAK, EMPTY_STRING) || EMPTY_STRING;
}

function elementTextContentOrEmpty(element?: any): string {
    return element?.textContent || EMPTY_STRING;
}

function elementTrimNewLineOrEmpty(element?: any): string {
    return element?.textContent?.replace(REGEX_LINEBREAK, EMPTY_STRING) || EMPTY_STRING;
}


/*
 * Entry
 */
init();
