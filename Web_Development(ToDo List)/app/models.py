from app import db
from datetime import datetime

class TaskForm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    details = db.Column(db.String(500))
    complete = db.Column(db.Boolean)