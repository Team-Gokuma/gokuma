import io
import json
import config

import torch
from PIL import Image
from flask import Flask, jsonify, request


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object(config)
    return app


app = create_app()


@app.route('/test', methods=['GET'])
def home():
    return jsonify({"result": "home"})


dic = {'0': '가리비', '1': '건포도', '2': '게맛살', '3': '고구마', '4': '고등어', '5': '고추', '6': '귤', '7': '그린올리브', '8': '꼬막', '9': '노랑파프리카', '10': '녹색피망', '11': '느타리버섯', '12': '단호박', '13': '달걀', '14': '닭고기', '15': '당근', '16': '대추', '17': '대파', '18': '딸기', '19': '랍스타', '20': '레몬', '21': '마', '22': '마늘', '23': '무김치', '24': '문어', '25': '물미역', '26': '바게트빵', '27': '바나나', '28': '밤', '29': '밥', '30': '방울토마토', '31': '배추김치', '32': '백도', '33': '베이글', '34': '베이컨', '35': '복숭아', '36': '브로콜리', '37': '블루베리', '38': '비엔나소시지', '39': '사과', '40': '산딸기',
       '41': '살구', '42': '새우', '43': '순대', '44': '스파게티면', '45': '슬라이스치즈', '46': '시금치', '47': '아몬드', '48': '아보카도', '49': '애호박', '50': '양배추', '51': '양파', '52': '오디', '53': '오미자', '54': '오이', '55': '오징어', '56': '은행', '57': '인삼', '58': '잣', '59': '적양배추', '60': '전복', '61': '치커리', '62': '케일', '63': '콩나물', '64': '크랜베리', '65': '토마토', '66': '피망', '67': '할라피뇨', '68': '호두', '69': '호박씨', '70': '훈제연어', '71': '훈제오리', '72': '올리고당', '73': '마요네즈', '74': '간장', '75': '고추장', '76': '된장', '77': '케첩', '78': '우유', '79': '참치통조림', '80': '햄통조림'}

model = torch.hub.load('ai/yolov5', 'custom',
                       path='', source='local')
img = f"data/images/test5.jpg"


def Detection(img_path, model=model, dic=dic):
    img = Image.open(img_path)
    result = model(img).pandas().xyxy[0]['name'].unique()
    return [dic[x] for x in result]


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
        data = Detection(file)
        return jsonify({'data': data})


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
