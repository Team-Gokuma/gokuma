FROM python:3.8

WORKDIR /app

ENV FLASK_APP=app.py

ENV FLASK_ENV=development

COPY ./requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt
RUN apt-get update && apt-get -y install libgl1-mesa-glx

COPY . .

CMD ["python", "app.py"] 