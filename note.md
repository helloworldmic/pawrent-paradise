##TS project template


- [ ] init npm project
```
npm init -y
```
remark:
`-y` ans yes to all questions
- [ ] install packages for TS project
```
npm install  ts-node typescript @types/node
```
Folder Structure:
```
node_modules      package-lock.json package.json
```
- [ ] create and configure `.gitignore`

```
node_modules
.DS_Store
```

- [ ] create 3 files: tsconfig.json, index.js and app.ts

```
touch tsconfig.json index.js app.ts
```


- [ ] configure tsconfig.json, index.js and app.ts

`tsconfig.json`:
```
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "lib": ["es6", "dom"],
        "sourceMap": true,
        "allowJs": true,
        "jsx": "react",
        "esModuleInterop":true,
        "moduleResolution": "node",
        "noImplicitReturns": true,
        "noImplicitThis": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "suppressImplicitAnyIndexErrors": true,
        "noUnusedLocals": true
    },
    "exclude": [
        "node_modules",
        "build",
        "scripts",
        "index.js"
    ]
}
```
`index.js`:

```
require('ts-node/register');
require('./app');
```
`app.ts`:
```
console.log('hello, world!');
```

- [ ] install express
```
npm install express @types/express
```

- [ ] To reduce the repetition, we can use a tool called `ts-node-dev`
```
npm install ts-node-dev
```

- [ ] Add the following to your scripts object of package.json

```
'scripts':{
    "start": "ts-node main.ts",
    "dev": "ts-node-dev main.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

- [ ] To handle HTTP-Session, install express-session:

```
npm install express-session @types/express-session
```

- [ ] Basic Set up of express server
```typescript
import express from 'express'
import expressSession from 'express-session'
import {Request,Response} from 'express'

const app = express()
const PORT = 8080;

app.use(expressSession({
    secret: 'how to write the content is up to you',
    resave:true,
    saveUninitialized:true
}));

app.listen(PORT,()=>{
    console.log(`listening to PORT ${PORT}`)
})
```
- [ ] import expressSession
```typescript
app.use(expressSession({
    secret: 'how to write the content is up to you',
    resave:true,
    saveUninitialized:true
}));
```

- [ ] install package for database
npm install pg @types/pg dotenv @types/dotenv

- [ ] Connect to database
```
import {Client} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

client.connect();
```