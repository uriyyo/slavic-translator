import './App.css';
import {useState} from "react"
import * as React from "react";
import {Paper, Button, TextField, Stack, Box} from "@mui/material"
import {Groups, TranslationResult} from "./types";
import {LANGUAGES, SERVER_URL} from "./consts"


async function translate(text: string): Promise<Array<TranslationResult>> {
    return [
        {"src": "en", "dest": "bg", "text": "Hello", "translation": "Здравейте"},
        {"src": "en", "dest": "be","text": "Hello", "translation": "добры дзень"},
        {"src": "en", "dest": "bs", "text": "Hello", "translation": "zdravo"},
        {"src": "en", "dest": "hr", "text": "Hello", "translation": "zdravo"},
        {"src": "en", "dest": "cs", "text": "Hello", "translation": "Ahoj"},
        {"src": "en", "dest": "mk","text": "Hello", "translation": "Здраво"},
        {"src": "en", "dest": "pl", "text": "Hello", "translation": "Witaj"},
        {"src": "en", "dest": "ru", "text": "Hello", "translation": "Привет"},
        {"src": "en", "dest": "sr", "text": "Hello", "translation": "Здраво"},
        {"src": "en", "dest": "sk", "text": "Hello", "translation": "Ahoj"},
        {"src": "en", "dest": "sl", "text": "Hello", "translation": "zdravo"},
        {"src": "en", "dest": "uk", "text": "Hello", "translation": "Здрастуйте"}
    ]

    let payload = Object.keys(LANGUAGES).map(dest => ({
        text,
        dest,
        src: "en",
    }))

    let response = await fetch(
        `${SERVER_URL}/translate`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    return await response.json() as Array<TranslationResult>
}

function constructTranslationResult(translations: any): any {
    let groups: Record<Groups, Array<any>> = {
        [Groups.EAST]: [],
        [Groups.WEST]: [],
        [Groups.SOUTH]: [],
    }

    for (let {translation, dest} of translations)
        groups[LANGUAGES[dest].group].push({translation, dest})

    // @ts-ignore
    return [...Object.entries(groups)]
}

function App() {
    let [groups, setGroups] = useState([])

    const callback = async () => {
        let inp = document.getElementById("translation")

        // @ts-ignore
        let result = await translate(inp.value)
        let converted = constructTranslationResult(result)
        // @ts-ignore
        setGroups(converted);
    }

    return (
        <Box sx={{mx: "auto"}}>
            <Button variant="outlined" onClick={callback}>Translate</Button>
            <TextField id="translation" label="Outlined" variant="outlined"/>
            <Stack direction="row" spacing={5}>
                {
                    groups.map(
                        ([group, translations]) => (
                            <Paper>
                                <text>{group}</text>
                                <div>
                                    {translations.map(({translation, dest}) => (
                                        <div key={dest}>
                                            <span>{LANGUAGES[dest].flag} {LANGUAGES[dest].name} :</span>
                                            <span>{translation}</span>
                                        </div>
                                    ))}
                                </div>
                            </Paper>
                        )
                    )
                }
            </Stack>
        </Box>
    );
}

export default App;
