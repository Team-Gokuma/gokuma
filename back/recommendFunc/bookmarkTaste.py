import numpy as np
import pandas as pd
import heapq


# 레시피 하나당 10개의 레시피를 추천해주는 함수


def get_recommendations(name, cosine_sim, name_to_index, df):
    # 선택한 레피시의 이름으로부터 해당 레피시의 인덱스를 받아온다.
    idx = name_to_index[name]

    # 해당 레시피와 모든 레시피와의 유사도를 가져온다.
    sim_scores = list(enumerate(cosine_sim[idx]))

    # 유사도에 따라 레시피들을 정렬한다.
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # 가장 유사한 10개의 레시피를 받아온다.(자기 자신 포함)
    sim_scores = sim_scores[1:11]

    # 가장 유사한 10개의 레시피 인덱스를 얻는다.
    recipe_index = [idx[0] for idx in sim_scores]

    # 가장 유사한 10개의 레시피 이름과 유사도 값을 리턴한다.
    temp = list(df['RECIPE_NM_KO'].iloc[recipe_index])
    result = []
    for i in range(len(temp)):
        result.append((temp[i], sim_scores[i][1]))

    return result


# 최종적으로 종합하여 10개의 레시피를 추천해주는 함수
def Recommendation(names, cosine_sim, name_to_index, df):
    # 찜목록 레시피별로 10개씩 추천레시피 가져온다
    recipes_10s = []
    for i in names:
        recipes_10s += get_recommendations(i, cosine_sim, name_to_index, df)

    # 추천된 각각의 레시피들을 유사도 순으로 정렬하고 이름을 가져온다
    recipes_10s = sorted(recipes_10s, key=lambda x: -x[1])
    recipes_10s = [x[0] for x in recipes_10s]

    # 중복 추천된 레시피들을 찾기 위해 dict를 만들어 중복 수를 확인한다
    recipe_dict = {}
    for menu in recipes_10s:
        if menu in recipe_dict.keys():
            recipe_dict[menu] += 1
        else:
            recipe_dict[menu] = 1

    # 최대heap을 사용하여 중복을 많이 받은 순으로 정렬한다(찜목록 제외)
    heap = []
    for key, value in recipe_dict.items():
        if key not in names:
            heapq.heappush(heap, (-value, key))

    # 2개 이상 중복된 레시피들을 먼저 menu_list에 넣는다
    menu_list = [x[1] for x in heap if x[0] < -1]

    # 1개씩만 추천된 레시피들 중에서 유사도가 높은 순서대로 나머지 10개를 채워넣는다(찜목록 제외)
    i = 0
    while len(menu_list) < 10:
        recipe = recipes_10s[i]
        if (recipe not in menu_list) & (recipe not in names):
            menu_list.append(recipe)
        i += 1

    return menu_list[:10]


def bookmarkTaste(names):
    df = pd.read_csv('./data/recipe.csv', encoding='utf-8')
    cosine_sim = np.load("./recommendFunc/recipe_matrix_new.npy")
    name_to_index = dict(zip(df['RECIPE_NM_KO'], df.index))

    return Recommendation(names, cosine_sim, name_to_index, df)


# names = ['나물비빔밥']
# print(bookmarkTaste(names))
