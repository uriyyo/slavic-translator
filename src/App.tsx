import './App.css'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material'
import { Groups, TranslationResult } from './types'
import { LANGUAGES, SERVER_URL } from './consts'
import { debounceTime, from, fromEvent, map, switchMap, tap } from 'rxjs'

async function translate(text: string): Promise<Array<TranslationResult>> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { src: 'en', dest: 'bg', text: 'Hello', translation: 'Здравейте' },
        { src: 'en', dest: 'be', text: 'Hello', translation: 'добры дзень' },
        { src: 'en', dest: 'bs', text: 'Hello', translation: 'zdravo' },
        { src: 'en', dest: 'hr', text: 'Hello', translation: 'zdravo' },
        { src: 'en', dest: 'cs', text: 'Hello', translation: 'Ahoj' },
        { src: 'en', dest: 'mk', text: 'Hello', translation: 'Здраво' },
        { src: 'en', dest: 'pl', text: 'Hello', translation: 'Witaj' },
        { src: 'en', dest: 'ru', text: 'Hello', translation: 'Привет' },
        { src: 'en', dest: 'sr', text: 'Hello', translation: 'Здраво' },
        { src: 'en', dest: 'sk', text: 'Hello', translation: 'Ahoj' },
        { src: 'en', dest: 'sl', text: 'Hello', translation: 'zdravo' },
        { src: 'en', dest: 'uk', text: 'Hello', translation: 'Здрастуйте' },
      ])
    }, 200)
  })

  let payload = Object.keys(LANGUAGES).map(dest => ({
    text,
    dest,
    src: 'en',
  }))

  let response = await fetch(`${SERVER_URL}/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return (await response.json()) as Array<TranslationResult>
}

function constructTranslationResult(translations: any): any {
  let groups: Record<Groups, Array<any>> = {
    [Groups.EAST]: [],
    [Groups.WEST]: [],
    [Groups.SOUTH]: [],
  }

  for (let { translation, dest } of translations)
    groups[LANGUAGES[dest].group].push({ translation, dest })

  // @ts-ignore
  return [...Object.entries(groups)]
}

function App() {
  const [groups, setGroups] = useState([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const callback = async value => {
    const result = await translate(value)
    return constructTranslationResult(result)
  }

  useEffect(() => {
    const subscription = fromEvent<Event>(inputRef.current, 'input')
      .pipe(
        debounceTime(100),
        map(() => inputRef.current.value),
        tap(() => setLoading(true)),
        switchMap(value => from(callback(value)))
      )
      .subscribe(groups => {
        setGroups(groups)
        setLoading(false)
      })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Container maxWidth={'md'}>
      <TextField
        inputRef={inputRef}
        sx={{ mb: 2 }}
        label="Translate"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: loading && (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ),
        }}
      />
      <Grid container spacing={2}>
        {groups.map(([group, translations]) => (
          <Grid item xs={4} key={group}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title={group} />
              <CardContent>
                {translations.map(({ translation, dest }) => (
                  <div key={dest}>
                    <span>
                      {LANGUAGES[dest].flag} {LANGUAGES[dest].name} :
                    </span>
                    <span>{translation}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default App
