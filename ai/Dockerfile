FROM ubuntu:18.04

RUN apt-get update && apt-get install -y python-pip
RUN pip install --upgrade pip

WORKDIR /app

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .