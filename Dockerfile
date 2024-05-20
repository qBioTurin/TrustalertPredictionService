# Fase 1: Costruire l'applicazione
FROM node:21-bookworm AS builder

WORKDIR /Trustalert-prediction-interface

# Aggiorna e installa 'at'
RUN apt update

# Copia solo i file necessari per l'installazione delle dipendenze
COPY package.json ./

# Installa dipendenze e pulisce la cache per ridurre la dimensione dell'immagine
RUN npm i --production && npm cache clean --force

# Copia il resto del codice sorgente
COPY . /tmp
RUN rm -rf /tmp/node_modules
RUN mv /tmp/* .

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

COPY ./predictionPython ./predictionPython

RUN pip3 install -r ./predictionPython/requirements.txt

# Copia solo i file necessari dall'immagine di costruzione
COPY --from=builder /Trustalert-prediction-interface/node_modules ./node_modules
COPY --from=builder /Trustalert-prediction-interface/.next ./.next
COPY --from=builder /Trustalert-prediction-interface/public ./public
COPY --from=builder /Trustalert-prediction-interface/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]