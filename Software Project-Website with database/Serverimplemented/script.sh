#!/bin/bash
#cd ~
name="flask"
virtualenv $name
source $name/bin/activate


$name/bin/pip install flask
#$name/bin/pip install flask-login
$name/bin/pip install flask-mail
$name/bin/pip install flask-sqlalchemy
$name/bin/pip install sqlalchemy-migrate
#$name/bin/pip install flask-whooshalchemy
#$name/bin/pip install flask-wtf
#$name/bin/pip install flask-babel
#$name/bin/pip install coverage

#deactivate to exit
#from flask import Flask on a python shell to test flask env

cd $name/
mkdir app
mkdir app/static
mkdir app/templates
mkdir tmp

cd ../
cp -r shitflask/app flask/
cp shitflask/db_create.py flask/db_create.py
cp shitflask/db_migrate.py flask/db_migrate.py
cd shitflask
cp config.py ../flask/config.py
cp launchserver.sh ../flask/launchserver.sh
cp run.py ../flask/run.py
cd ../
python flask/db_create.py
