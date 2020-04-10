from flask_wtf import Form
from wtforms import TextField, HiddenField
from wtforms.widgets import TextArea
from wtforms.validators import DataRequired

class TaskForm(Form):
    name = TextField('name', validators=[DataRequired()])
    details = TextField('details', validators=[DataRequired()], widget=TextArea())

class UpdateTaskForm(Form):
    UpdateTask = HiddenField('UpdateTask', validators=[DataRequired()])

class CompleteTaskForm(Form):
    CompleteTask = HiddenField('CompleteTask', validators=[DataRequired()])
