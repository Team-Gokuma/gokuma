"""empty message

Revision ID: fec985a8ee49
Revises: bb963866736b
Create Date: 2022-03-01 08:28:51.843481

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column


# revision identifiers, used by Alembic.
revision = 'fec985a8ee49'
down_revision = 'bb963866736b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Bookmark',
                    sa.Column('id', sa.Integer(),
                              autoincrement=True, nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('recipe_id', sa.Integer(), nullable=False),
                    sa.Column('checked', sa.Boolean(), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['recipe_id'], ['Recipe.recipe_id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['User.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('UserLike',
                    sa.Column('id', sa.Integer(),
                              autoincrement=True, nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('recipe_id', sa.Integer(), nullable=False),
                    sa.Column('checked', sa.Boolean(), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['recipe_id'], ['Recipe.recipe_id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['User.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###
    seed_bookmark = table('Bookmark',
                          column('user_id', sa.Integer),
                          column('recipe_id', sa.Integer),
                          column('checked', sa.Boolean),
                          )
    op.bulk_insert(seed_bookmark, [
                   {'user_id': 1, 'recipe_id': 1, 'checked': True}])

    seed_userlike = table('UserLike',
                          column('user_id', sa.Integer),
                          column('recipe_id', sa.Integer),
                          column('checked', sa.Boolean),
                          )
    op.bulk_insert(seed_userlike, [
                   {'user_id': 1, 'recipe_id': 1, 'checked': True}])


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('UserLike')
    op.drop_table('Bookmark')
    # ### end Alembic commands ###
