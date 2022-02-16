import {Groups, LanguageInfo} from "./types"

export const LANGUAGES: Record<string, LanguageInfo> = {
    'bg': {
        name: 'bulgarian',
        flag: '🇧🇬',
        group: Groups.SOUTH,
    },
    'be': {
        name: 'belarusian',
        flag: '🇧🇾',
        group: Groups.EAST,
    },
    'bs': {
        name: 'bosnian',
        flag: '🇧🇦',
        group: Groups.SOUTH,
    },
    'hr': {
        name: 'croatian',
        flag: '🇭🇷',
        group: Groups.SOUTH,
    },
    'cs': {
        name: 'czech',
        flag: '🇨🇿',
        group: Groups.WEST,
    },
    'mk': {
        name: 'macedonian',
        flag: '🇲🇰',
        group: Groups.SOUTH,
    },
    'pl': {
        name: 'polish',
        flag: '🇵🇱',
        group: Groups.WEST,
    },
    'ru': {
        name: 'russian',
        flag: '🇷🇺',
        group: Groups.EAST,
    },
    'sr': {
        name: 'serbian',
        flag: '🇷🇸',
        group: Groups.SOUTH,
    },
    'sk': {
        name: 'slovak',
        flag: '🇸🇰',
        group: Groups.WEST,
    },
    'sl': {
        name: 'slovenian',
        flag: '🇸🇮',
        group: Groups.SOUTH,
    },
    'uk': {
        name: 'ukrainian',
        flag: '🇺🇦',
        group: Groups.EAST,
    },
}

export const SERVER_URL = "http://127.0.0.1:8000"