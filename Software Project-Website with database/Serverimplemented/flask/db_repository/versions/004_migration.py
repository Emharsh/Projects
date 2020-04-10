from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
rawcourse_schedule = Table('rawcourse_schedule', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('scheduleId', Integer),
    Column('courseTitle', String(length=128)),
    Column('areaInfo', String(length=128)),
    Column('trainerName', String(length=128)),
    Column('startDay', String(length=128)),
    Column('endDay', String(length=128)),
    Column('combination', String(length=128)),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['rawcourse_schedule'].columns['endDay'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['rawcourse_schedule'].columns['endDay'].drop()
