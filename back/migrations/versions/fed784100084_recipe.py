"""empty message

Revision ID: fed784100084
Revises: 104efac049e8
Create Date: 2022-03-01 08:27:42.875395

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column
from data.seed_data_read import get_recipe, get_recipe_ingrd, get_recipe_process


# revision identifiers, used by Alembic.
revision = 'fed784100084'
down_revision = '104efac049e8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Recipe',
                    sa.Column('id', sa.Integer(),
                              autoincrement=True, nullable=False),
                    sa.Column('recipe_id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.VARCHAR(length=255), nullable=False),
                    sa.Column('summary', sa.Text(), nullable=True),
                    sa.Column('nation', sa.VARCHAR(length=255), nullable=True),
                    sa.Column('typ', sa.VARCHAR(length=255), nullable=True),
                    sa.Column('time', sa.Integer(), nullable=True),
                    sa.Column('quantity', sa.Integer(), nullable=True),
                    sa.Column('level', sa.Integer(), nullable=True),
                    sa.Column('calorie', sa.Integer(), nullable=True),
                    sa.Column('img', sa.VARCHAR(length=255), nullable=True),
                    sa.Column('like', sa.Integer(),
                              server_default='0', nullable=False),
                    sa.Column('video', sa.VARCHAR(length=255), nullable=True),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('recipe_id')
                    )
    op.create_table('RecipeIngrd',
                    sa.Column('id', sa.Integer(),
                              autoincrement=True, nullable=False),
                    sa.Column('recipe_id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.VARCHAR(length=255), nullable=False),
                    sa.Column('capacity', sa.Text(), nullable=True),
                    sa.Column('typ', sa.VARCHAR(length=255), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['recipe_id'], ['Recipe.recipe_id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('RecipeProcess',
                    sa.Column('id', sa.Integer(),
                              autoincrement=True, nullable=False),
                    sa.Column('recipe_id', sa.Integer(), nullable=False),
                    sa.Column('cooking_no', sa.Integer(), nullable=True),
                    sa.Column('content', sa.Text(), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['recipe_id'], ['Recipe.recipe_id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###
    recipes = get_recipe()
    ingrds = get_recipe_ingrd()
    procs = get_recipe_process()

    seed_recipes = table('Recipe',
                         column('recipe_id', sa.Integer),
                         column('name', sa.VARCHAR),
                         column('summary', sa.Text),
                         column('nation', sa.VARCHAR),
                         column('typ', sa.VARCHAR),
                         column('time', sa.Integer),
                         column('quantity', sa.Integer),
                         column('level', sa.Integer),
                         column('calorie', sa.Integer),
                         column('img', sa.VARCHAR),
                         column('video', sa.VARCHAR)
                         )
    op.bulk_insert(seed_recipes, recipes)

    seed_ingrds = table('RecipeIngrd',
                        column('recipe_id', sa.Integer),
                        column('name', sa.VARCHAR),
                        column('capacity', sa.VARCHAR),
                        column('typ', sa.VARCHAR),
                        )
    op.bulk_insert(seed_ingrds, ingrds)

    seed_procs = table('RecipeProcess',
                       column('recipe_id', sa.Integer),
                       column('cooking_no', sa.Integer),
                       column('content', sa.Text),
                       )
    op.bulk_insert(seed_procs, procs)


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('RecipeProcess')
    op.drop_table('RecipeIngrd')
    op.drop_table('Recipe')
    # ### end Alembic commands ###
