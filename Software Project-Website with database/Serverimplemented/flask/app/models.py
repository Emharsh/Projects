from app import db

# Users and Admins (can login)
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    password = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
    address = db.Column(db.String(128))
    phoneNumber = db.Column(db.Integer)
    accountType = db.Column(db.Boolean)
    disability = db.Column(db.Boolean)
    session = db.Column(db.Integer)
    profilePic = db.Column(db.String(128))

# Bookings of a user for a schedule
class user_booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    scheduleId = db.Column(db.Integer, db.ForeignKey('course_schedule.id'))
    waiting = db.Column(db.Integer)
    reminder = db.Column(db.Boolean)

# Courses completed by the user
class user_courses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    courseId = db.Column(db.Integer, db.ForeignKey('courses.id'))

# Trainers (cant login)
class Trainers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    address = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
    phoneNumber = db.Column(db.Integer)

# Courses which can be scheduled
class Courses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128))
    description = db.Column(db.String(128))
    duration = db.Column(db.Integer)
    maxdelegates = db.Column(db.Integer)

# Prerequisites of each individual course
class course_prerequisite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    courseId = db.Column(db.Integer, db.ForeignKey('courses.id'))
    requiredCourseId = db.Column(db.Integer, db.ForeignKey('courses.id'))

# Training areas available to book a course on
class Areas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(128))
    streetAddress = db.Column(db.String(128))
    areaType = db.Column(db.String(128))
    accessibility = db.Column(db.Integer)
    capacity = db.Column(db.Integer)
    imagename = db.Column(db.String(128))
    facilities = db.Column(db.String(128))

# Schedule of the courses available
class course_schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    courseId = db.Column(db.Integer, db.ForeignKey('courses.id'))
    areaId = db.Column(db.Integer, db.ForeignKey('areas.id'))
    trainerId = db.Column(db.Integer, db.ForeignKey('users.id'))
    startDay = db.Column(db.String(128))
    endDay = db.Column(db.Integer)
    combination = db.Column(db.Integer)

class rawcourse_schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    scheduleId = db.Column(db.Integer, db.ForeignKey('course_schedule.id'))
    courseTitle = db.Column(db.String(128))
    areaInfo = db.Column(db.String(128))
    trainerName = db.Column(db.String(128))
    startDay = db.Column(db.String(128))
    endDay = db.Column(db.String(128))
    combination = db.Column(db.String(128))
