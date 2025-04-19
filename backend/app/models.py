from pydantic import BaseModel

class Health(BaseModel):
    status: str
from typing import List
from pydantic import BaseModel

class Mention(BaseModel):
    id: int
    client: str
    text: str
    source: str

class Release(BaseModel):
    client: str
    title: str
    body: str

