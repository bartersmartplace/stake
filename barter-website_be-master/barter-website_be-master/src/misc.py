from aiogram import Bot
from aiogram.enums import ParseMode
import consts
from fastapi import FastAPI
from slowapi.util import get_remote_address
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

bot = Bot(consts.BOT_TOKEN, parse_mode=ParseMode.HTML)
app = FastAPI(root_path="/api")
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)