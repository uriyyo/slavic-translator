from asyncio import gather
from functools import partial
from typing import Callable, Any, Awaitable

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator
from pydantic import BaseModel
from anyio import to_thread

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_methods={"*"},
    allow_origins=[
        "http://localhost:3000",
    ]
)

translator = Translator(
    service_urls=[
        "translate.google.com.ua",
        "translate.google.com",
    ]
)


class TranslatorRequest(BaseModel):
    src: str
    dest: str
    text: str


class TranslationResult(TranslatorRequest):
    translation: str

    class Config:
        orm_mode = True


def _make_async(func: Callable[..., Any]) -> Callable[..., Awaitable[Any]]:
    async def wrapper(*args, **kwargs):
        return await to_thread.run_sync(partial(func, *args, **kwargs))

    return wrapper


@_make_async
def _translate(data: TranslatorRequest) -> TranslationResult:
    result = translator.translate(**data.dict())

    return TranslationResult(
        src=result.src,
        dest=result.dest,
        text=result.origin,
        translation=result.text,
    )


@app.post("/translate", response_model=list[TranslationResult])
async def main(data: list[TranslatorRequest]) -> list[TranslationResult]:
    return await gather(*[_translate(r) for r in data])


if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app)
