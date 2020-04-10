from flask import render_template, request, redirect, session
from app import app
from app import db, models, mail
from .functions import *
from flask_mail import Mail, Message
import os
import datetime, time


# p = models.Users(name="Test", password="test", email="testnetwork49@gmail.com", phoneNumber=123456789, gender=0, accountType=1, disability=0)
# db.session.add(p);
# db.session.commit();
# p = models.Users.query.all();
# for q in p:
#     print(q.name);
# db.session.commit();

# if not logged_in(session, 1):
    # return redirect("/", code=302);

# INDEX PAGE
@app.route('/', methods=['POST','GET'])
def index():
    apply_for_instructor(request)
    schedule_course(request)
    return render_template('index.html')

@app.route('/index', methods=['POST','GET'])
def urlindex():
    apply_for_instructor(request)
    return redirect("/", code=302)

# LOGIN PAGE
@app.route('/page-login', methods=['POST','GET'])
def page_login():
    login(request,session)
        # return redirect("/user-page", code=302)
    if logged_in(session, 0):
        return redirect("/user-page", code=302)
    if logged_in(session, 1):
        return redirect("/admin", code=302)
    apply_for_instructor(request)
    return render_template('page-login.html')

# FORGOT PASSWORD PAGE
@app.route('/forget-password', methods=['POST','GET'])
def forget_password():
    if request.method == "POST":
        p = models.Users.query.filter_by(email=request.form["email"]).first()
        if p:
            msg = Message("Your password")
            msg.body = "Use this password to login: " + p.password;
            msg.recipients = [p.email]
            mail.send(msg)
        return redirect("/page-login", code=302)
    return render_template('forget-password.html')

# ADMIN PAGE
@app.route('/admin', methods=['POST', 'GET'])
def admin():
    if not logged_in(session, 1):
        return redirect("/page-login", code=302)
    apply_for_instructor(request)
    create_area(request)
    if delete_area(request):
        return redirect("/admin", code=302)
    create_course(request)
    if delete_course(request):
        return redirect("/admin", code=302)
    create_trainer(request)
    if delete_trainer(request):
        return redirect("/admin", code=302)
    schedule_course(request)
    if delete_schedule(request):
        return redirect("/admin", code=302)
    create_user(request)
    users = models.Users.query.filter_by(accountType=0).all()
    areas = models.Areas.query.all()
    trainers = models.Trainers.query.all()
    courses = models.Courses.query.all()
    schedules = models.course_schedule.query.all()
    bookings = models.user_booking.query.all()
    rawschedules = models.rawcourse_schedule.query.all()
    return render_template('admin.html', users=users, areas=areas, trainers=trainers, courses=courses, schedules=schedules, bookings=bookings, rawschedules=rawschedules)

# Admin PAGE
@app.route('/admin-user-management', methods=['POST', 'GET'])
def admin_user_management():
    if not logged_in(session, 1):
        return redirect("/page-login", code=302)
    if request.args.get('user') == None:
        return redirect("/admin", code=302)
    print(request.args.get('user'))
    p = models.Users.query.filter_by(id=request.args.get('user')).first()
    bookings = models.user_booking.query.filter_by(userId=p.id).all()
    schedules = models.course_schedule.query.all()
    rawschedules = models.rawcourse_schedule.query.all()
    unixdays = time.time() + 3600 / 86400
    apply_for_instructor(request)
    return render_template('admin-user-management.html', user=p, bookings=bookings, rawschedules=rawschedules, schedules=schedules, unixdays=unixdays)

# Admin PAGE
@app.route('/admin-user-edit-details', methods=['POST', 'GET'])
def admin_user_edit_details():
    if not logged_in(session, 1):
        return redirect("/page-login", code=302)
    # apply_for_instructor(request)
    return render_template('admin-user-edit-details.html')

# USER PAGE
@app.route('/user-page', methods=['POST', 'GET'])
def user_page():
    if not logged_in(session, 0):
        return redirect("/page-login", code=302)
    if bookcourse(request,session):
        return redirect("/user-page", code=302)
    if deletebooking(request,session):
        return redirect("/user-page", code=302)
    apply_for_instructor(request)
    p =  models.Users.query.filter_by(email=session['user'], session=session['randomid']).first();
    unixdays = time.time() + 3600 / 86400
    bookings = models.user_booking.query.filter_by(userId=p.id).all()
    schedules = models.course_schedule.query.all()
    rawschedules = models.rawcourse_schedule.query.all()
    return render_template('user-page.html', p=p, unixtime=unixdays, bookings=bookings, test=request.args.get('delcourse'), rawschedules=rawschedules, schedules=schedules)

# USER PAGE
@app.route('/logout', methods=['POST', 'GET'])
def logout():
    session.clear()
    # apply_for_instructor(request)
    return redirect("/", code=302)

# CONTACT US PAGE
@app.route('/contact-us', methods=['POST','GET'])
def contact_us():
    # contact_process(request);
    # apply_for_instructor(request)
    return render_template('contact-us.html')

# CALENDER PAGE
@app.route('/calendar', methods=['POST', 'GET'])
def calender():
    if not logged_in(session, 1):
        return redirect("/page-login", code=302)
    apply_for_instructor(request)

    daycount = float(time.time() + 3600 / 86400)
    days = []
    nextdays = []
    nextnextdays = []
    occupiedAreaDays = []
    while(len(days) < 31):
        days.insert(-1, datetime.datetime.fromtimestamp(int(daycount)).strftime('%Y-%m-%d'))
        occupiedAreaDays.insert(-1, False)
        daycount += 86400
    days = [days[-1]] + days
    days.pop()
    while(len(nextdays) < 31):
        nextdays.insert(-1, datetime.datetime.fromtimestamp(int(daycount)).strftime('%Y-%m-%d'))
        occupiedAreaDays.insert(-1, False)
        daycount += 86400
    nextdays = [nextdays[-1]] + nextdays
    nextdays.pop()
    while(len(nextnextdays) < 31):
        nextnextdays.insert(-1, datetime.datetime.fromtimestamp(int(daycount)).strftime('%Y-%m-%d'))
        occupiedAreaDays.insert(-1, False)
        daycount += 86400
    nextnextdays = [nextnextdays[-1]] + nextnextdays
    nextnextdays.pop()

    p = models.course_schedule.query.filter_by(areaId=request.args.get('room')).all()
    for q in p:
        a = models.Courses.query.filter_by(id=q.courseId).first()
        combinations = '{0:07b}'.format(q.combination)
        daycount = float(time.time() + 3600 / 86400)
        count = 0
        i = 0 # Combination number
        while count != a.duration:
            if combinations[i] == "1":
                print("test")
                occupiedAreaDays[int(daycount) - int(float(time.time() + 3600 / 86400))] = True
                count += 1 # Dont exceed duration
            i += 1# Combination number
            if len(combinations) == i:
                i = 0
            daycount += 1
    print(occupiedAreaDays)
    return render_template('calendar.html', occupied=occupiedAreaDays, areas=p, days=days, nextdays=nextdays, nextnextdays=nextnextdays)

# EDIT DETAILS PAGE
@app.route('/edit-details', methods=['POST', 'GET'])
def edit_details():
    if not logged_in(session, 0):
        return redirect("/page-login", code=302)
    apply_for_instructor(request)
    return render_template('edit-details.html')

# POPULAR COURSES PAGE
@app.route('/popular_courses', methods=['POST', 'GET'])
def popular_courses():
    # UpcomingEvents()
    apply_for_instructor(request)
    return render_template('popular_courses.html')

# POPULAR COURSE1 PAGE
@app.route('/popular_course1', methods=['POST', 'GET'])
def popular_course1():
    # UpcomingEvents()
    apply_for_instructor(request)
    return render_template('popular_course1.html')

# POPULAR COURSE2 PAGE
@app.route('/popular_course2', methods=['POST', 'GET'])
def popular_course2():
    # UpcomingEvents()
    apply_for_instructor(request)
    return render_template('popular_course2.html')

# POPULAR COURSE3 PAGE
@app.route('/popular_course3', methods=['POST', 'GET'])
def popular_course3():
    # UpcomingEvents()
    apply_for_instructor(request)
    return render_template('popular_course3.html')

# POPULAR COURSE4 PAGE
@app.route('/popular_course4', methods=['POST', 'GET'])
def popular_course4():
    # UpcomingEvents()
    apply_for_instructor(request)
    return render_template('popular_course4.html')

# POPULAR COURSE5 PAGE
@app.route('/popular_course5', methods=['POST', 'GET'])
def popular_course5():
    # UpcomingEvents()
    apply_for_instructor(request)
    return render_template('popular_course5.html')

# POPULAR COURSE6 PAGE
@app.route('/popular_course6', methods=['POST', 'GET'])
def popular_course6():
    # UpcomingEvents()
    apply_for_instructor(request)
    return render_template('popular_course6.html')
