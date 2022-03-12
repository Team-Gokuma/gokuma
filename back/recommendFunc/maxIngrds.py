import pandas as pd


def jaccardSimilarity(list1, list2):
    s1 = set(list1)
    s2 = set(list2)
    temp_s2 = len(s2)
    cnt = 65
    while len(s2) < 20:
        s2.add(chr(cnt))
        cnt += 1
    return (float(len(s1.intersection(s2)) / len(s1.union(s2))), len(s1.intersection(s2)), temp_s2-len(s1.intersection(s2)))


def includedRecipe(items, df):
    result = []
    recipe_data = df["RECIPE_ID"].values[:]
    for i in recipe_data:
        list2 = df[df["RECIPE_ID"] == i]["재료목록"].values[0]
        temp = jaccardSimilarity(items, list2)
        if temp[0] > 0:
            result.append((i, temp[0], temp[1], temp[2]))
    result = sorted(result, key=lambda x: (-x[1], x[3]))
    return result[:10]


def maxIngrds(items):

    df = pd.read_csv('./data/recipe.csv', encoding='utf-8')
    df_ingrd = pd.read_csv('./data/recipe_ingrd.csv', encoding='cp949')

    temp = []
    recipe_data = df["RECIPE_ID"].values[:]
    for i in recipe_data:
        indnt_nm = list(df_ingrd[df_ingrd["RECIPE_ID"] == i]["IRDNT_NM"])
        temp.append(indnt_nm)
    ing_dataframe = pd.Series(temp)
    df["재료목록"] = ing_dataframe

    # df.to_csv('df_ingrd.csv', encoding='utf-8-sig')

    return includedRecipe(items, df)


# items = ['밥', '달걀', '돼지고기', '표고버섯', '양파', '당근', '대파']
# print(maxIngrds(items))
