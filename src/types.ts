export enum Groups {
    EAST = 'east',
    WEST = 'west',
    SOUTH = 'south',
}

export interface LanguageInfo {
    name: string;
    flag: string,
    group: Groups,
}

export interface TranslationResult {
    src: string;
    dest: string;
    text: string;
    translation: string;
}