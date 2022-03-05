FROM python:3

WORKDIR /app

COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt -f https://download.pytorch.org/whl/cu110/torch_stable.html

COPY . .

CMD [ "python", "app.py" ]