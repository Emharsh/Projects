from app import db, models
import datetime
db.create_all()

p = models.Task.query.all()
print p

for i in models.Task.query.all():
    print i.id
    print i.Task
    print i.Title
    print i.complete
