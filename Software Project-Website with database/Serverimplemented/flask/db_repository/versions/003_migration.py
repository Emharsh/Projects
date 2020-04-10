from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
course_schedule = Table('course_schedule', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('courseId', Integer),
    Column('areaId', Integer),
    Column('trainerId', Integer),
    Column('startDay', String(length=128)),
    Column('endDay', Integer),
    Column('combination', Integer),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['course_schedule'].columns['endDay'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['course_schedule'].columns['endDay'].drop()
