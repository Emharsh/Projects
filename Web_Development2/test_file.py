from app import app
from app import db, models
import datetime

db.create_all()

models.User.query.filter_by(id=5).delete()
