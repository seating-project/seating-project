# pull official base image
FROM python:3.10.6-alpine

# set work directory
WORKDIR /app

# RUN apk add --no-cache gcc musl-dev linux-headers

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN apk add --update postgresql-client
# install temp dependencies for build of pyscopg2 etc
# RUN apk add --update --no-cache --virtual .tmp-build-deps \
# postgresql-dev
RUN pip install --no-cache-dir -r requirements.txt && pip install Pillow
# RUN pip install Pillow
  # && apk del --no-cache .tmp-build-deps

  # copy entrypoint.sh
  # COPY ./entrypoint.sh .

  # ENTRYPOINT ["python3"]

  # copy project
COPY . .

# RUN python manage.py migrate

EXPOSE 8000

# CMD [ "python", "manage.py", "runserver" ]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# run entrypoint.sh
#ENTRYPOINT ["/app/entrypoint.sh"]
