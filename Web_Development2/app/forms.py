from flask_wtf import Form
from wtforms import TextField, HiddenField,TextField, TextAreaField, SubmitField, PasswordField, validators
from wtforms.widgets import TextArea
from wtforms.validators import DataRequired
from models import db, User
from app import models

# class TaskForm(Form):
#     name = TextField('name', validators=[DataRequired()])
#     details = TextField('details', validators=[DataRequired()], widget=TextArea())
#
# class UpdateTaskForm(Form):
#     UpdateTask = HiddenField('UpdateTask', validators=[DataRequired()])
#
# class CompleteTaskForm(Form):
#     CompleteTask = HiddenField('CompleteTask', validators=[DataRequired()])

class ContactForm(Form):
  name = TextField("Name",  [validators.Required("Please enter your name.")])
  email = TextField("Email",  [validators.Required("Please enter your email address."), validators.Email("Please enter your email address.")])
  subject = TextField("Subject",  [validators.Required("Please enter a subject.")])
  message = TextAreaField("Message",  [validators.Required("Please enter a message.")])
  submit = SubmitField("Send")

class SignupForm(Form):
  firstname = TextField("First name",  [validators.Required("Please enter your first name.")])
  lastname = TextField("Last name",  [validators.Required("Please enter your last name.")])
  email = TextField("Email",  [validators.Required("Please enter your email address."), validators.Email("Please enter your email address.")])
  password = PasswordField('Password', [validators.Required("Please enter a password.")])
  submit = SubmitField("Create account")

  def __init__(self, *args, **kwargs):
    Form.__init__(self, *args, **kwargs)

  def validate(self):
    if not Form.validate(self):
      return False

    user = models.User.query.filter_by(email = self.email.data.lower()).first()
    if user:
      self.email.errors.append("That email is already taken")
      return False
    else:
      return True

class SigninForm(Form):
  email = TextField("Email",  [validators.Required("Please enter your email address."), validators.Email("Please enter your email address.")])
  password = PasswordField('Password', [validators.Required("Please enter a password.")])
  submit = SubmitField("Sign In")

  def __init__(self, *args, **kwargs):
    Form.__init__(self, *args, **kwargs)

  def validate(self):
    if not Form.validate(self):
      return False

    user = models.User.query.filter_by(email = self.email.data.lower()).first()
    if user and user.check_password(self.password.data):
      return True
    else:
      self.email.errors.append("Invalid e-mail or password")
      return False
