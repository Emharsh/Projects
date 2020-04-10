from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import threading
import ssl
import datetime

# Logging
# import logging
# log = logging.getLogger('werkzeug')
# log.setLevel(logging.ERROR)

print("REMEMBER TO RUN FROM flask/../ folder!!")

# Database Access
app = Flask(__name__)
app.config.from_object('config')
app.config['UPLOAD_FOLDER'] = 'flask/app/static/areapictures/'
db = SQLAlchemy(app)
from app import models

app.secret_key = 'annoying-unautomatic-and-more-secure-secret-key'


# Email Management (Threaded)
from flask_mail import Mail, Message
app.config['MAIL_DEFAULT_SENDER'] = "testnetwork49@gmail.com"
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = "testnetwork49@gmail.com"
app.config['MAIL_PASSWORD'] = "testnetwork"
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
class EmailManagement (threading.Thread):
    def run(self):
        mail = Mail(app)
        while 1 == 2:
            with app.app_context():
                p = models.user_booking().all;
                msg = Message("Hello")
                msg.body = "Test";
                msg.recipients = ["testnetwork49@gmail.com"]
                # msg.html = "<b>Text</b>"
                mail.send(msg)
email = EmailManagement();
email.start();
mail = Mail(app)

# Database Management (Threaded)
class DatabaseManagement (threading.Thread):
    def run(self):
        mail = Mail(app)
        while 1==1:
            with app.app_context():
                p = models.user_bookings.query.all()
                for q in p:
                    r = models.course_schedule.query.filter_by(id=q.scheduleId).first()
                    s = models.Users.query.filter_by(id=p.userId).first()
                    unixdays = time.time() + 3600 / 86400
                    if r.startDay <= (unixdays + 2):
                        p = models.user_booking().all;
                        msg = Message("Reminder of course")
                        msg.body = "In two days a course starts";
                        msg.recipients = [s.email]
                        mail.send(msg)
                        databasethread = DatabaseManagement()
                        databasethread.start()
                        # Waiting remindewr
                        # Completed courses
# Import other file
from app import views, models
