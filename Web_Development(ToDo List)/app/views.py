from flask import render_template, flash , redirect
from app import app
from .forms import TaskForm, UpdateTaskForm, CompleteTaskForm
from app import db, models
import datetime

@app.route('/')
def Home():
    user = { }
    return render_template('index.html', title = 'TODO List', user = user)

@app.route('/Create_Tasks', methods = ['GET', 'POST'])
def Create_Tasks():
    form = TaskForm()
    if form.validate_on_submit():
        db.create_all()
        p = models.TaskForm(name=form.name.data, details=form.details.data, complete=False)
        db.session.add(p)
        db.session.commit()
        return redirect('/View_All_Tasks')
    return render_template('Create_Tasks.html', title='Create Tasks', form=form)

@app.route('/View_All_Tasks')
def View_All_Tasks():
    querytasks = models.TaskForm.query.all()
    return render_template('View_All_Tasks.html', title = 'View All Tasks', querytasks=querytasks)

@app.route('/View_Uncomplete_Tasks', methods = ['GET', 'POST'])
def View_Uncomplete_Tasks():
    querytasks = models.TaskForm.query.filter_by(complete=False).all()
    form = UpdateTaskForm()
    if form.UpdateTask.data:
        p = models.TaskForm.query.get(form.UpdateTask.data)
        p.complete = True
        db.session.add(p)
        db.session.commit()
        return redirect('View_Uncomplete_Tasks')
    return render_template('View_Uncomplete_Tasks.html', title='View Uncomplete Tasks', querytasks=querytasks, form=form)

@app.route('/View_Complete_Tasks', methods = ['GET', 'POST'])
def View_Complete_Tasks():
    querytasks = models.TaskForm.query.filter_by(complete=True).all()
    form = CompleteTaskForm()
    if form.CompleteTask.data:
        p = models.TaskForm.query.get(form.CompleteTask.data)
        db.session.delete(p)
        db.session.commit()
        return redirect('View_Complete_Tasks')
    return render_template('View_Complete_Tasks.html', title = 'View Complete Tasks', querytasks=querytasks, form=form)
