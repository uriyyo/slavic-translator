import './App.css';
import {useState} from "react";

const LANGUAGES = {
    'bg': {
        name: 'bulgarian',
        flag: '🇧🇬',
    },
    'be': {
        name: 'belarusian',
        flag: '🇧🇾',
    },
    'bs': {
        name: 'bosnian',
        flag: '🇧🇦',
    },
    'hr': {
        name: 'croatian',
        flag: '🇭🇷',
    },
    'cs': {
        name: 'czech',
        flag: '🇨🇿',
    },
    'mk': {
        name: 'macedonian',
        flag: '🇲🇰',
    },
    'pl': {
        name: 'polish',
        flag: '🇵🇱',
    },
    'ru': {
        name: 'russian',
        flag: '🇷🇺',
    },
    'sr': {
        name: 'serbian',
        flag: '🇷🇸',
    },
    'sk': {
        name: 'slovak',
        flag: '🇸🇰',
    },
    'sl': {
        name: 'slovenian',
        flag: '🇸🇮',
    },
    'uk': {
        name: 'ukrainian',
        flag: '🇺🇦',
    },
}

async function translate(text) {
    let payload = Object.keys(LANGUAGES).map(dest => ({
        text,
        dest,
        src: "en",
    }))

    let response = await fetch(
        "http://127.0.0.1:8000/translate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );
    return await response.json()
}

function App() {
    let [translation, setTranslation] = useState([])

    return (
        <div>
            <input id={"translation"}/>
            <button onClick={async () => {
                let inp = document.getElementById("translation")
                // @ts-ignore
                let result = await translate(inp.value)

                setTranslation(result)
            }}>
                Translate
            </button>
            <div>
                {translation.map(({translation, dest}) => (
                    <div>
                        <span>{LANGUAGES[dest].flag} {LANGUAGES[dest].name} :</span>
                        <span>{translation}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
