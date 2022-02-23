FROM ubuntu:18.04

RUN apt-get update && apt-get install -y python3 python3-pip sudo

WORKDIR /app

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .