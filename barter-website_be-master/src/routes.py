from misc import bot, app, limiter
from fastapi import Request
from pydantic import BaseModel
import consts

class SubmitRequestData(BaseModel):
    email: str
    message: str

@app.post("/submit")
@limiter.limit("5/minute")
async def submit(data: SubmitRequestData, request: Request):
    await bot.send_message(
        chat_id=consts.CHAT_ID,
        text=f"<b>Email : {data.email}</b>\n\n{data.message}"
    )
    return ""

