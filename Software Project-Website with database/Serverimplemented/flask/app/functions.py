from flask import render_template, request
from app import app
from app import db, models, mail
from flask_mail import Mail, Message
import time, random, string, datetime, uuid, os

################
# BASIC OPERATIONS
# Implement on pages which require a user (type) being logged in.
def logged_in(session, accessLevel):
    if session.get('user') and session.get('randomid'):
        p = models.Users.query.filter_by(email=session['user'], session=session['randomid'], accountType=accessLevel).first();
        if not p:
            return False;
        return True;

def login(request, session):
    if request.method == "POST":
        if request.form['action'] == "Log in":
            p = models.Users.query.filter_by(email=request.form['email'], password=request.form['password']).first()
            if p:
                session['user'] = request.form['email'];
                session['randomid'] = str(uuid.uuid4());
                p.session = session['randomid'];
                db.session.add(p);
                db.session.commit();
                return True;
    return False;

################
# USER OPTIONS
def bookcourse(request, session):
    if request.args.get('book') == None:
        return False
    p = models.Users.query.filter_by(email=session['user'], session=session['randomid']).first();
    userid = p.id
    p = models.course_schedule.query.filter_by(id=request.args.get('book')).first()
    q = models.course_prerequisite.query.filter_by(courseId=p.courseId).all()
    for r in q:
        s = models.user_courses.query.filter_by(userId=userid, courseId=r.requiredCourseId).first()
        if not s:
            return "Not required courses"

    q = models.user_booking.query.filter_by(userId=userid).all()
    occupiedUserDays = []
    for r in q:
        s = models.course_schedule.query.filter_by(id=r.scheduleId).first()
        t = models.Courses.query.filter_by(id=s.courseId).first()
        combinations = '{0:07b}'.format(s.combination)
        daycount = float(s.startDay)
        count = 0
        i = 0
        while count != t.duration:
            if combinations[i] == "1":
                occupiedUserDays.insert(-1,daycount)
                count += 1
            i += 1
            if len(combinations) == i:
                i = 0
            daycount += 1

    q = models.Courses.query.filter_by(id=p.courseId).first()
    runningCourseScheduleDays = []
    combinations = '{0:07b}'.format(p.combination)
    daycount = float(p.startDay)
    count = 0
    i = 0
    while count != q.duration:
        if combinations[i] == "1":
            runningCourseScheduleDays.insert(-1,daycount)
            count += 1
        i += 1
        if len(combinations) == i:
            i = 0
        daycount += 1

    if not set(occupiedUserDays).isdisjoint(runningCourseScheduleDays):
        return "User has other courses clashing with this one"

    q = models.user_booking.query.filter_by(scheduleId=p.id).all()
    r = models.Areas.query.filter_by(id=p.areaId).first()
    s = models.Courses.query.filter_by(id=p.courseId).first()
    if len(q) >= r.capacity or len(q) >= s.maxdelegates:
        p = models.user_booking(userId=userid, scheduleId=p.id, waiting=len(q)+1, reminder=0)
        db.session.add(p)
        db.session.commit()
        p = models.Users.query.filter_by(id=userid).first()
        msg = Message("Confirmation of waiting list booking")
        msg.html = p.name + ", you are in the waiting list for the course " + s.title
        msg.recipients = [p.email]
        mail.send(msg)
        return "Bookings exceeded course or classrooms maximum. Waiting list."

    p = models.user_booking(userId=userid, scheduleId=p.id, reminder=0, waiting=0)
    db.session.add(p)
    db.session.commit()

    p = models.Users.query.filter_by(id=userid).first()
    msg = Message("Confirmation of booking")
    msg.html = p.name + ", congratulations, your booking for " + s.title + " has been successful."
    msg.recipients = [p.email]
    mail.send(msg)
    return "Booked"

def deletebooking(request, session):
    if request.args.get('withdraw') == None:
        return False
    else:
        p = models.Users.query.filter_by(email=session['user'], session=session['randomid']).first();
        q = models.user_booking.query.filter_by(userId=p.id, scheduleId=request.args.get('withdraw')).first()
        r = models.rawcourse_schedule.query.filter_by(scheduleId=request.args.get('withdraw')).first()

        msg = Message("You have unbooked the course")
        msg.html = p.name + ", your booking for " + r.courseTitle + " has been cancelled."
        msg.recipients = [p.email]
        mail.send(msg)
        db.session.delete(q)
        db.session.commit()
    return True

################
# ADMIN OPTIONS
def return_course_details():
    p = models.Courses.query.all()
    return p

def return_area_details():
    p = models.Areas.query.all()
    return p

def schedule_course(request):
    if request.method == "POST":
        if request.form['action'] == "Schedule course":
            a = models.Courses.query.filter_by(id=request.form['courseId']).first()
            if not a:
                return
            p = models.course_schedule.query.filter_by(areaId=request.form['areaId']).all()
            occupiedAreaDays = []
            for q in p:
                combinations = '{0:07b}'.format(q.combination)
                daycount = float(q.startDay)
                count = 0
                i = 0
                while count != a.duration:
                    if combinations[i] == "1":
                        occupiedAreaDays.insert(-1,daycount)
                        count += 1
                    i += 1
                    if len(combinations) == i:
                        i = 0
                    daycount += 1

            p = models.course_schedule.query.filter_by(trainerId=request.form['trainerId']).all()
            occupiedTrainerDays = []
            for q in p:
                combinations = '{0:07b}'.format(q.combination)
                daycount = float(q.startDay)
                count = 0
                i = 0
                while count != a.duration:
                    if combinations[i] == "1":
                        occupiedTrainerDays.insert(-1,daycount)
                        count += 1
                    i += 1
                    if len(combinations) == i:
                        i = 0
                    daycount += 1

            inputcombination = 0
            unixdays = (time.mktime(datetime.datetime.strptime(request.form['date'], "%Y-%m-%d").timetuple()) + 3600) / 86400
            startDay = round(((unixdays / 7) - int(unixdays / 7)) * 7, 1) #Day of the week. The db startday is the unix day
            for day in request.form.getlist('days'):
                # The start day is the most powerful, the highets binary number
                # so that when calculating the combination, it is the first check
                # The days start from thursday (1/1/1970)
                if startDay == 0:
                    if day == "Thursday":
                        inputcombination += 2*2*2*2*2*2
                    if day == "Friday":
                        inputcombination += 2*2*2*2*2
                    if day == "Saturday":
                        inputcombination += 2*2*2*2
                    if day == "Sunday":
                        inputcombination += 2*2*2
                    if day == "Monday":
                        inputcombination += 2*2
                    if day == "Tuesday":
                        inputcombination += 2
                    if day == "Wednesday":
                        inputcombination += 1
                if startDay == 1:
                    if day == "Friday":
                        inputcombination += 2*2*2*2*2*2
                    if day == "Saturday":
                        inputcombination += 2*2*2*2*2
                    if day == "Sunday":
                        inputcombination += 2*2*2*2
                    if day == "Monday":
                        inputcombination += 2*2*2
                    if day == "Tuesday":
                        inputcombination += 2*2
                    if day == "Wednesday":
                        inputcombination += 2
                    if day == "Thursday":
                        inputcombination += 1
                if startDay == 2:
                    if day == "Saturday":
                        inputcombination += 2*2*2*2*2*2
                    if day == "Sunday":
                        inputcombination += 2*2*2*2*2
                    if day == "Monday":
                        inputcombination += 2*2*2*2
                    if day == "Tuesday":
                        inputcombination += 2*2*2
                    if day == "Wednesday":
                        inputcombination += 2*2
                    if day == "Thursday":
                        inputcombination += 2
                    if day == "Friday":
                        inputcombination += 1
                if startDay == 3:
                    if day == "Sunday":
                        inputcombination += 2*2*2*2*2*2
                    if day == "Monday":
                        inputcombination += 2*2*2*2*2
                    if day == "Tuesday":
                        inputcombination += 2*2*2*2
                    if day == "Wednesday":
                        inputcombination += 2*2*2
                    if day == "Thursday":
                        inputcombination += 2*2
                    if day == "Friday":
                        inputcombination += 2
                    if day == "Saturday":
                        inputcombination += 1
                if startDay == 4:
                    if day == "Monday":
                        inputcombination += 2*2*2*2*2*2
                    if day == "Tuesday":
                        inputcombination += 2*2*2*2*2
                    if day == "Wednesday":
                        inputcombination += 2*2*2*2
                    if day == "Thursday":
                        inputcombination += 2*2*2
                    if day == "Friday":
                        inputcombination += 2*2
                    if day == "Saturday":
                        inputcombination += 2
                    if day == "Sunday":
                        inputcombination += 1
                if startDay == 5:
                    if day == "Tuesday":
                        inputcombination += 2*2*2*2*2*2
                    if day == "Wednesday":
                        inputcombination += 2*2*2*2*2
                    if day == "Thursday":
                        inputcombination += 2*2*2*2
                    if day == "Friday":
                        inputcombination += 2*2*2
                    if day == "Saturday":
                        inputcombination += 2*2
                    if day == "Sunday":
                        inputcombination += 2
                    if day == "Monday":
                        inputcombination += 1
                if startDay == 6:
                    if day == "Wednesday":
                        inputcombination += 2*2*2*2*2*2
                    if day == "Thursday":
                        inputcombination += 2*2*2*2*2
                    if day == "Friday":
                        inputcombination += 2*2*2*2
                    if day == "Saturday":
                        inputcombination += 2*2*2
                    if day == "Sunday":
                        inputcombination += 2*2
                    if day == "Monday":
                        inputcombination += 2
                    if day == "Tuesday":
                        inputcombination += 1

            # print(inputcombination)
            # print('{0:07b}'.format(inputcombination))

            newScheduleDays = []
            combinations = '{0:07b}'.format(inputcombination)
            daycount = unixdays
            count = 0
            i = 0
            while count != a.duration:
                if combinations[i] == "1":
                    newScheduleDays.insert(-1,daycount)
                    count += 1
                i += 1
                if len(combinations) == i:
                    i = 0
                daycount += 1
            # print(occupiedTrainerDays)
            # print(occupiedAreaDays)
            # print(newScheduleDays)
            if set(newScheduleDays).isdisjoint(occupiedTrainerDays) and set(newScheduleDays).isdisjoint(occupiedAreaDays):
                b = models.course_schedule(courseId=request.form['courseId'], areaId=request.form['areaId'], trainerId=request.form['trainerId'], startDay=unixdays, endDay=newScheduleDays[-2], combination=inputcombination)
                db.session.add(b)
                p = models.course_schedule.query.filter_by(courseId=request.form['courseId'], areaId=request.form['areaId'], trainerId=request.form['trainerId'], startDay=unixdays, endDay=newScheduleDays[-2], combination=inputcombination).first()
                q = models.Areas.query.filter_by(id=request.form['areaId']).first()
                r = models.Trainers.query.filter_by(id=request.form['trainerId']).first()
                arInfo = q.city + " - " + q.areaType
                rawCombination = ""
                for i in request.form.getlist('days'):
                    rawCombination = rawCombination + " " + i
                # print(rawCombination)
                endingday = datetime.datetime.fromtimestamp(int(newScheduleDays[-2]) * 86400).strftime('%Y-%m-%d')
                s = models.rawcourse_schedule(scheduleId=p.id, courseTitle=a.title, areaInfo=arInfo, trainerName=r.name, startDay=request.form['date'], combination=rawCombination, endDay=endingday)
                db.session.add(s)
                db.session.commit()
    return

def delete_schedule(request):
    if request.args.get('delschedule') == None:
        return False
    else:
        p = models.course_schedule.query.filter_by(id=request.args.get('delschedule')).first();
        db.session.delete(p)
        q = models.user_booking.query.filter_by(scheduleId=request.args.get('delschedule')).all()
        for r in q:
            db.session.delete(r)
        r = models.rawcourse_schedule.query.filter_by(scheduleId=request.args.get('delschedule')).first()
        db.session.delete(r)
        db.session.commit()
    return True

def return_trainer_details():
    p = models.Trainers.query.all()
    return p

def create_course(request):
    if request.method == "POST":
        if request.form['action'] == "Create course":
            # print("TEsT")
            p = models.Courses(title=request.form['title'], description=request.form['description'], duration=request.form['duration'], maxdelegates=request.form['maxdelegates'])
            db.session.add(p);
            db.session.commit()
            p = models.Courses.query.filter_by(title=request.form['title'], description=request.form['description'], duration=request.form['duration'], maxdelegates=request.form['maxdelegates']).first()
            for prerequisite in request.form.getlist('prerequisites'):
                q = models.course_prerequisite(courseId=p.id, requiredCourseId=prerequisite)
                db.session.add(q)
                db.session.commit()
    return

def edit_course(request):
    if request.method == "POST":
        if request.form['action'] == "Edit course":
            p = models.Courses.query.filter_by(id=request.form['id']).first()
            p.title = request.form['title']
            p.description = request.form['description']
            p.duration = request.form['duration']
            p.maxdelegates = request.form['maxdelegates']
            db.session.add(p);
            db.session.commit();
    return

def delete_course(request):
    if not request.args.get('delcourse') == None:
        p = models.Courses.query.filter_by(id=request.args.get('delcourse')).first()
        q = models.course_prerequisite.query.filter_by(courseId=request.args.get('delcourse')).all()
        for r in q:
            db.session.delete(r)
        db.session.delete(p);
        db.session.commit();
        return True
    # if request.method == "POST":
    #     if request.form['action'] == "Delete course":
    #         p = models.Courses.query.filter_by(id=request.form['id']).first()
    #         db.session.delete(p);
    #         db.session.commit();
    return

# def schedule_course(request):
#     if request.method == "POST":
#         if request.form['action'] == "Schedule course":
#             p = models.course_schedule(courseId=request.form['course'], areaId=request.form['area'], trainerId=request.form['trainer'], startDay=request.form['startDay'], monday=request.form['monday'], tuesday=request.form['tuesday'], wednesday=request.form['wednesday'], thursday=request.form['thursday'], friday=request.form['friday'], saturday=request.form['saturday'], sunday=request.form['sunday'])
#             db.session.add(p);
#             db.session.commit();
#     return

def create_trainer(request):
    if request.method == "POST":
        if request.form['action'] == "Create lecturers":
            p = models.Trainers(name=request.form['name'], address=request.form['address'], email=request.form['email'], phoneNumber=request.form['phone'])
            db.session.add(p);
            db.session.commit();
    return

def edit_trainer(request):
    if request.method == "POST":
        if request.form['action'] == "Edit lecturers":
            p = models.Trainers.query.filter_by(id=request.form['id']).first()
            p.name = request.form['name']
            p.address=request.form['address']
            p.email=request.form['email']
            p.phoneNumber=request.form['phone']
            db.session.add(p);
            db.session.commit();
    return

def delete_trainer(request):
    if not request.args.get('deltrainer') == None:
        p = models.Trainers.query.filter_by(id=request.args.get('deltrainer')).first()
        db.session.delete(p);
        db.session.commit();
        return True
    # if request.method == "POST":
    #     if request.form['action'] == "Delete lecturers":
    #         p = models.Trainers(id=request.form['id']).first()
    #         db.session.delete(p);
    #         db.session.commit();
    return

def create_area(request):
    if request.method == "POST":
        if request.form['action'] == "Create training area":
            imagename = ""
            if not request.files['image'].filename == '':
                imagename = str(int(time.time())) + ".png"
                request.files['image'].save(os.path.join(app.config['UPLOAD_FOLDER'], imagename))
            else:
                imagename = "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"
            p = models.Areas(city=request.form['city'], streetAddress=request.form['address'], areaType=request.form['type'], accessibility=request.form['accessibility'], capacity=request.form['capacity'], imagename=imagename, facilities=request.form['facilities'])
            db.session.add(p);
            db.session.commit();
    return

def edit_area(request):
    if request.method == "POST":
        if request.form['action'] == "Edit training area":
            p = models.Areas.query.filter_by(id=request.form['id']).first()
            p.city=request.form['city']
            p.streetAddress=request.form['address']
            p.areaType=request.form['type']
            p.accessibility=request.form['accessibility']
            p.capacity=request.form['capacity']
            db.session.add(p);
            db.session.commit();
    return

def delete_area(request):
    if not request.args.get('delarea') == None:
        p = models.Areas.query.filter_by(id=request.args.get('delarea')).first()
        db.session.delete(p);
        db.session.commit();
        return True
    # if request.method == "POST":
    #     if request.form['action'] == "Delete training area":
    #         p = models.Areas.query.filter_by(id=request.form['id']).first()
    #         db.session.delete(p);
    #         db.session.commit();
    return

def create_user(request):
    if request.method == "POST":
        if request.form['action'] == "Create user":
            password = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(5))
            p = models.Users(name=request.form['name'], password=password, address=request.form['address'], email=request.form['email'], phoneNumber=request.form['phone'], disability=request.form['dis'], accountType=0)
            msg = Message("Your FDM password")
            msg.html = "Your password:<br> " + password + "<br><br> Thank you for registering with FDM."
            msg.recipients = [request.form['email']]
            mail.send(msg)
            db.session.add(p);
            db.session.commit();
    return

def edit_user(request):
    if request.method == "POST":
        if request.form['action'] == "Edit user":
            password = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(5))
            p = models.Users(id=request.form['id'])
            p.name=request.form['name']
            p.password=request.form['password']
            p.address=request.form['address']
            p.email=request.form['email']
            p.phoneNumber=request.form['phone']
            db.session.add(p);
            db.session.commit();
    return

def delete_user(request):
    if request.method == "POST":
        if request.form['action'] == "Delete user":
            password = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(5))
            p = models.Users(id=request.form['id'])
            db.session.add(p);
            db.session.commit();
    return

################
# GENERAL OPTIONS
def apply_for_instructor(request):
    if 'action' in request.form and request.form == "POST":
        msg = Message("New instructor request")
        msg.html = request.form['name'] + " has applied for instructor from the website: <br><br>" + request.form['comments'] + "<br><br> Phone number: " + request.form['phone']
        msg.recipients = ["testnetwork49@gmail.com"]
        mail.send(msg)
        return

def contact_process(request):
    if request.form == "POST":
        msg = Message("Contact from " + request.form['name'] + ": " + request.form['subject'])
        msg.html = "Return email: " + request.form['email'] + "<br><br> Message: " + request.form['message']
        msg.recipients = ["testnetwork49@gmail.com"]
        mail.send(msg)
        return
