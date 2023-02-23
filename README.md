<h1 align="center">
  NLW - Habits
</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=E51C44&labelColor=0A1033">

 <img src="https://img.shields.io/static/v1?label=NLW&message=06&color=E51C44&labelColor=0A1033" alt="NLW 06" />
</p>


![cover](.github/cover.png?style=flat)



## 💻 Projeto
Esse projeto foi feito durante a NLW Setup da Rocketseat na trilha Ignite, em sua 11° edição, onde desenvolvemos um website que faz o controle de hábitos.

## ✨ Tecnologias

-   [ ] TypeScript
-   [ ] React Native
-   [ ] Expo
-   [ ] NativeWind
-   [ ] Vector Icons
-   [ ] React Native SVG
-   [ ] React Native SVG Transformer
-   [ ] DayJs
-   [ ] React Navigation


## 🔖 Executando o projeto

```bash
git clone https://github.com/Felipe-007/Habits.git
```

## Server
```bash
# Acesse a pasta server
cd Habits/server
# Instale as dependências
npm i
# Crie um arquivo .env em `/Habits/server/.env` e cole o seguinte código:
DATABASE_URL="file:./dev.db"
# Com o arquivo .env criado na raiz do `server` rode o seguinte comando:
npx prisma migrate dev
# Rode o servidor:
npm run dev
# O servidor será inicializado no <http://localhost:3333>
```

## Web
```bash
# Acesse a pasta web
cd Habits/web
# Instale as dependências
npm i
# Execute o projeto web:
npm run dev
# A web será inicializada no <http://localhost:5173>
```

## Mobile
```bash
# Acesse a pasta mobile
cd Habits/mobile
# Instale as dependências
npm i
# Execute o projeto mobile:
npx expo start --clear
# Acesse o arquivo axios.ts, disponível em `Habits\mobile\src\lib` e altere de acordo com o seu IP e porta do servidor
```

## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

<br />

<div align="center">
  <small>Agradecimentos ao professor Rodrigo Gonçalves</small>  
</div>