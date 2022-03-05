from numpy import NaN
import pandas as pd

# 레시피 DB
df = pd.read_csv('./data/recipe.csv', encoding='utf-8')
df_cnt = df['RECIPE_ID'].count()


def get_recipe():
    recipes = []
    for i in range(df_cnt):
        recipe = {}
        recipe['recipe_id'] = df.loc[i]['RECIPE_ID']
        recipe['name'] = df.loc[i]['RECIPE_NM_KO']
        recipe['summary'] = df.loc[i]['SUMRY']
        recipe['nation'] = df.loc[i]['NATION_NM']
        recipe['typ'] = df.loc[i]['TY_NM']
        recipe['time'] = df.loc[i]['COOKING_TIME']
        recipe['quantity'] = df.loc[i]['QNT']
        recipe['level'] = df.loc[i]['LEVEL_NM']
        recipe['calorie'] = df.loc[i]['CALORIE']
        recipe['img'] = df.loc[i]['IMG_URL']
        recipe['video'] = df.loc[i]['VIDEO_LINK']
        recipes.append(recipe)

    return recipes


# 레시피 재료 DB
df2 = pd.read_csv('./data/recipe_ingrd.csv', encoding='cp949')
df2_cnt = df2['RECIPE_ID'].count()


def get_recipe_ingrd():

    ingrds = []
    for i in range(df2_cnt):
        ingrd = {}
        ingrd['recipe_id'] = int(df2.loc[i]['RECIPE_ID'])
        ingrd['name'] = df2.loc[i]['IRDNT_NM']
        if df2.loc[i]['IRDNT_CPCTY'] is NaN:
            ingrd['capacity'] = None
        else:
            ingrd['capacity'] = df2.loc[i]['IRDNT_CPCTY']
        ingrd['typ'] = df2.loc[i]['IRDNT_TY_NM']
        ingrds.append(ingrd)

    return ingrds


# 레시피 조리방법 DB
df3 = pd.read_csv('./data/recipe_process.csv', encoding='cp949')
df3_cnt = df3['RECIPE_ID'].count()


def get_recipe_process():
    procs = []
    for i in range(df3_cnt):
        proc = {}
        proc['recipe_id'] = df3.loc[i]['RECIPE_ID']
        proc['cooking_no'] = df3.loc[i]['COOKING_NO']
        proc['content'] = df3.loc[i]['COOKING_DC']
        procs.append(proc)

    return procs


# 레시피 조리방법 DB
df4 = pd.read_csv('./data/ingredients.csv', encoding='cp949')
df4_cnt = df4['name'].count()


def get_ingrds():
    ingrds = []
    for i in range(df4_cnt):
        ingrd = {}
        ingrd['name'] = df4.loc[i]['name']
        ingrd['category'] = df4.loc[i]['category']
        ingrds.append(ingrd)

    return ingrds
