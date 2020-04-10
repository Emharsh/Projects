from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
course_schedule = Table('course_schedule', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('courseId', INTEGER),
    Column('areaId', INTEGER),
    Column('trainerId', INTEGER),
    Column('startDay', VARCHAR(length=128)),
    Column('combination', INTEGER),
    Column('monday', BOOLEAN),
    Column('tueday', BOOLEAN),
    Column('wednesday', BOOLEAN),
    Column('thursday', BOOLEAN),
    Column('friday', BOOLEAN),
    Column('saturday', BOOLEAN),
    Column('sunday', BOOLEAN),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['course_schedule'].columns['friday'].drop()
    pre_meta.tables['course_schedule'].columns['monday'].drop()
    pre_meta.tables['course_schedule'].columns['saturday'].drop()
    pre_meta.tables['course_schedule'].columns['sunday'].drop()
    pre_meta.tables['course_schedule'].columns['thursday'].drop()
    pre_meta.tables['course_schedule'].columns['tueday'].drop()
    pre_meta.tables['course_schedule'].columns['wednesday'].drop()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['course_schedule'].columns['friday'].create()
    pre_meta.tables['course_schedule'].columns['monday'].create()
    pre_meta.tables['course_schedule'].columns['saturday'].create()
    pre_meta.tables['course_schedule'].columns['sunday'].create()
    pre_meta.tables['course_schedule'].columns['thursday'].create()
    pre_meta.tables['course_schedule'].columns['tueday'].create()
    pre_meta.tables['course_schedule'].columns['wednesday'].create()
