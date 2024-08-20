# Fase 1: Costruire l'applicazione
FROM node:21-bookworm AS builder

WORKDIR /Trustalert-prediction-interface

RUN apt update

COPY package.json ./

RUN npm install

# Copia il resto del codice sorgente
COPY . .

# Costruisce l'applicazione
RUN npm run build

# Fase 2: Eseguire l'applicazione
FROM node:21-bookworm AS runner

WORKDIR /

RUN apt update
RUN apt-get install gcc make libbz2-dev zlib1g-dev libncurses5-dev libncursesw5-dev liblzma-dev bzip2 g++ rsync libsqlite3-dev -y

RUN apt-get install build-essential libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev -y
COPY ./Python-3.11.2.tar.xz /tmp/Python-3.11.2.tar.xz
RUN tar -xf /tmp/Python-3.11.2.tar.xz

WORKDIR /Python-3.11.2
RUN ./configure --enable-optimizations
RUN make install

WORKDIR /app

COPY ./bert_medical_records ./bert_medical_records

RUN pip3 install -r ./bert_medical_records/requirements.txt
COPY download_server/sslcert /app/sslcert

# Copia solo i file necessari dall'immagine di costruzione
COPY --from=builder /Trustalert-prediction-interface/node_modules ./node_modules
COPY --from=builder /Trustalert-prediction-interface/.next ./.next
COPY --from=builder /Trustalert-prediction-interface/public ./public
COPY --from=builder /Trustalert-prediction-interface/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]