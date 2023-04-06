# **Upco**

### 배포 주소

**[https//upco.space](https://upco.space)**
<br>

![업코](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGmfpW%2Fbtr744UE9p6%2FLrJST6j0fpzxvwVe1KYkv1%2Fimg.png)

<br><br>

### 업코 네이밍

'upco'는, '엎'어지면 '코'닿는 곳에서 만나는 사람들의 준말로,
가볍고 튀는 네이밍으로 사람들에게 쉽게 다가가고자 했습니다.
<br><hr><br>

### 기획의도

- 우리 'Upco'는 '위치기반 동네친구 찾기 서비스'입니다. 이미 우리 서비스와 비슷한 특성을 가진 서비스는 많지만, 기존 시장에 나와 있는 '친구 찾기' 서비스가 단순 남녀 관계에 초점을 가지고 있는 경우가 많아 건전하게 사용할 수 없었고, 신뢰할 수 없는 단순 명시적인 거리로 근처 유저를 추천해주는 것에 대해 불편함을 느낄 수밖에 없었습니다.
- 때문에 저희는 이를 보완하여, 명시적인 거리가 아닌 지도 상에서 사용자와 가깝고 연령대와 공감대가 비슷한 유저들의 위치를 보여주며, 동시에 서로를 오프라인 만남으로까지 연결시킬 수 있는 서비스를 만들게 되었습니다.
  <br><br>

<br><hr><br>

### 기술스택

![기술스택](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FyhzQI%2Fbtr725mBy5N%2F1JJTfOTFpPeI9KMcdkUmgk%2Fimg.png)
<br><hr><br>

### flow-chart

![flow-chart](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FecZPrD%2Fbtr74t74RVe%2FPYQ2ekybnq6xvUMEDguEt1%2Fimg.png)

<br><hr><br>

### 백엔드 아키텍쳐

![아키텍쳐](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbxsKFK%2Fbtr74fB6eco%2F5VlALd4B0IaO1rgq3IONI1%2Fimg.jpg)

<br><hr><br>

### ERD

![ERD](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fp3NlK%2Fbtr74uMHWjm%2FgbhfacW0x7yYKjJSzKA9kk%2Fimg.png)

<br><hr><br>

### API

![API](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPoWLT%2Fbtr7XcUeBIe%2F7MB5ewNOzQjZeSqBrsqank%2Fimg.png)

<br><hr><br>

### 팀원 소개

![전체샷](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGJY5I%2Fbtr75s8TKpa%2F2rt4StkSwoOTq6CwVHlezk%2Fimg.jpg)

<br><hr><br>

### 백엔드 팀원

![백엔드](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FuFWjs%2Fbtr75tmYknj%2F1ZgoSwXQc91lqtvRKJUG30%2Fimg.png)

| 이름   | github                           |
| ------ | -------------------------------- |
| 이진호 | https://github.com/zynoobb       |
| 박민   | https://github.com/stoicperson   |
| 김현준 | https://github.com/Tktor         |
| 김서우 | https://github.com/turnaroundwoo |

<br><hr><br>

### 폴더 구조

```bash
.
├── .github/
│   └── workflows/
│       ├── chat.yml
│       ├── gateway.yml
│       └── nestjs.yml
├── .vscode/
│   └── settings.json
├── chat/
│   ├── controllers/
│   │   ├── ChatController.js
│   │   └── MessageController.js
│   ├── models/
│   │   ├── chatModel.js
│   │   └── messageModel.js
│   ├── routes/
│   │   ├── ChatRoute.js
│   │   └── MessageRoute.js
│   ├── swagger/
│   │   ├── chat.swagger.js
│   │   ├── config.js
│   │   └── message.swagger.js
│   ├── index.js
│   ├── socket.js
│   ├── .eslintrc.js
│   ├── .prettierrc
│   ├── dockerfile.dev
│   ├── dockerfile.prod
│   ├── deployment.yml
│   ├── kustomization.yml
│   ├── service.yml
│   ├── package.json
│   └── yarn.lock
├── gateway/
│   ├── default.dev.conf
│   ├── dockerfile.dev
│   └── ingress-service.yml
└── nestjs/
    ├── node_modules
    ├── src/
    │   ├── auth/
    │   │   ├── guards/
    │   │   │   ├── gql-auth.guard.ts
    │   │   │   └── social-auth.guard.ts
    │   │   ├── interfaces/
    │   │   │   └── auth-service.interface.ts
    │   │   ├── strategies/
    │   │   │   ├── jwt-access.strategy.ts
    │   │   │   ├── jwt-refresh.strategy.ts
    │   │   │   ├── jwt-social-google-strategy.ts
    │   │   │   └── jwt-social-kakao-strategy.ts
    │   │   ├── auth.controller.ts
    │   │   ├── auth.module.ts
    │   │   ├── auth.resolver.ts
    │   │   └── auth.service.ts
    │   ├── blocks/
    │   │   ├── entities/
    │   │   │   └── block.entity.ts
    │   │   ├── interfaces/
    │   │   │   └── block-service.interface.ts
    │   │   ├── blocks.module.ts
    │   │   ├── blocks.resolver.ts
    │   │   └── blocks.service.ts
    │   ├── common/
    │   │   ├── decorator/
    │   │   │   └── public-access.ts
    │   │   ├── filter/
    │   │   │   └── http-exception.filter.ts
    │   │   ├── interfaces/
    │   │   │   ├── context.ts
    │   │   │   ├── oauthuser.ts
    │   │   │   └── provider.ts
    │   │   └── util/
    │   │       └── getrandomnickname.ts
    │   ├── files/
    │   │   ├── interfaces/
    │   │   │   └── files-service.interface.ts
    │   │   ├── files.module.ts
    │   │   ├── files.resolver.ts
    │   │   └── files.service.ts
    │   ├── friend/
    │   │   ├── dto/
    │   │   │   └── create-friend.dto.ts
    │   │   ├── entities/
    │   │   │   └── friend.entity.ts
    │   │   ├── interfaces/
    │   │   │   └── friend-service.interface.ts
    │   │   ├── friends.module.ts
    │   │   ├── friends.resolver.ts
    │   │   └── friends.service.ts
    │   ├── interests/
    │   │   ├── entities/
    │   │   │   └── interest.entity.ts
    │   │   ├── interfaces/
    │   │   │   └── interest-service.interface.ts
    │   │   ├── interests.module.ts
    │   │   ├── interests.resolver.ts
    │   │   └── interests.service.ts
    │   ├── mails/
    │   │   ├── interfaces/
    │   │   │   └── mail-service.interface.ts
    │   │   ├── mails.module.ts
    │   │   ├── mails.resolver.ts
    │   │   └── mails.service.ts
    │   ├── maps/
    │   │   ├── dto/
    │   │   │   ├── find-arounduser.input.ts
    │   │   │   ├── find-arounduser.output.ts
    │   │   │   └── save-userlocation.input.ts
    │   │   ├── interfaces/
    │   │   │   └── map-service.interface.ts
    │   │   ├── maps.module.ts
    │   │   ├── maps.resolver.ts
    │   │   └── maps.service.ts
    │   ├── notices/
    │   │   ├── dto/
    │   │   │   └── create-notice.input.ts
    │   │   ├── entities/
    │   │   │   └── notice.entity.ts
    │   │   ├── interfaces/
    │   │   │   └── notices.service.interface.ts
    │   │   ├── notices.module.ts
    │   │   ├── notices.resolver.ts
    │   │   └── notices.service.ts
    │   ├── questions/
    │   │   ├── dto/
    │   │   │   └── create-question.input.ts
    │   │   ├── entities/
    │   │   │   └── question.entity.ts
    │   │   ├── interfaces/
    │   │   │   └── question-service.interface.ts
    │   │   ├── questions.module.ts
    │   │   ├── questions.resolver.ts
    │   │   └── questions.service.ts
    │   ├── users/
    │   │   ├── dto/
    │   │   │   ├── create-user.dto.ts
    │   │   │   └── update-user.dto.ts
    │   │   ├── entities/
    │   │   │   └── user.entity.ts
    │   │   ├── interfaces/
    │   │   │   └── user-service.interface.ts
    │   │   ├── users.module.ts
    │   │   ├── users.resolver.ts
    │   │   └── users.service.ts
    │   ├── app.module.ts
    │   └── main.ts
    ├── .dockerignore
    ├── .gitignore
    └── docker-compose.dev.yaml
```

### env 내용

```
.env
############### chat ###############
MONGODB_CONNECTION
MONGO_ID
MONGO_PASSWORD

############### nestjs #################
TYPEORM_HOST=mysql
TYPEORM_PORT=mysql port
TYPEORM_USERNAME=mysql user name
TYPEORM_PASSWORD=mysql user password
TYPEORM_DATABASE=mysql
REDIS_CONNECTION=Redis connection url
REDIS_HOST=redis host
REDIS_PORT=redis port
REDIS_DB=redis DB
JWT_ACCESS_KEY=Jwt Access Secret key
JWT_REFRESH_KEY=Jwt Refresh Secret key
ORIGIN=frontend url
MAIL_SERVICE=gmail
MAIL_AUTH_USER=gmail auth user
MAIL_AUTH_PASSWORD=gmail auth password
TZ='asia/Seoul'
GOOGLE_CLIENT_ID=google auth client id
GOOGLE_CLIENT_SECRET=google auth secret key
KAKAO_CLIENT_ID=kakao auth client id
KAKAO_CLIENT_SECRET=kakao auth secret key
GCP_STORAGE_ID=gcp project id
GCP_STORAGE_KEYFILE=gcp key file
GCP_STORAGE_BUCKET=gcp bucket name
```

### 서버 구동 방법

```
docker-compose -f ./docker-compose.dev.yaml build

docker-compose -f ./docker-compose.dev.yaml up
```
