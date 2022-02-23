FROM ubuntu:18.04

RUN apt-get update && apt-get install -y python3 python3-pip sudo

WORKDIR /app

COPY ./requirements.txt .

RUN pip3 install -r requirements.txt
RUN pip3 install torch==1.10.2+cu113 torchvision==0.11.3+cu113 torchaudio===0.10.2+cu113 -f https://download.pytorch.org/whl/cu113/torch_stable.html

COPY . .