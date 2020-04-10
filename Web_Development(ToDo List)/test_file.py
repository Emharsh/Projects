from app import app
from app import db, models
import datetime

db.create_all()

models.TaskForm.query.filter_by(id=4).delete()
