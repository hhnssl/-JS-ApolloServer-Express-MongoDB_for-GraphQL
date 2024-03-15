자바스크립트
몽고디비
익스프레스
아폴로서버
그래프큐엘

# 쿼리와 뮤테이션의 차이
- 쿼리는 SELECT 연산에 사용. REST API로 따지자면 Get에 해당
- 뮤테이션은 INSERT, UPDATE, DELETE 연산에 사용. REST API로 따지자면 Post, Put, Patch, Delete에 해당 함


# 참고
https://dev.to/fredabod/a-simple-crud-app-with-graphql-apollo-server-mongodb-and-express-227f


# 구조 및 역할 설명
```
📦graphql-blog-app  
┣ 📂models  
┃ ┗ 📜Post.js                        DB에 넣기 전에 요청 데이터 구조가 postSchema와 일치하는지 검사하는 역할  
┣ 📜index.js                         typeDefs, resolvers로 아폴로서버 인스턴스 생성&몽고디비 연결  
┣ 📜schema.js [typeDefs]             타입 정의 for GraphQL  
┗ 📜resolvers.js [resolvers]         실제로 작업이 일어나는 곳. 명세서를 실물로 만든 것과 비슷한?  
```

# 실행 방법
`node index.js`


# 아폴로서버에서 실행할 쿼리 및 뮤테이션
1. 
```graphql
mutation AddBlogMutation{
  createPost(title: "My Dev.to Blog4", content: "My Dev Blog Content4"){
    id
    title
    content
  }
}
```

2.
```graphql
mutation updateBlog{
  updatePost(id: "65f298f2b8be70f316b511eb", title: "Dev Updated Title", content: "Dev Updated Content"){
    id
    title
    content
  }
}
```

3. 
```graphql
query getAllPost{
  posts{
    id
    title
    content
  }
}
```

4.
```graphql
query getPostById{
  post(id: "65f298f2b8be70f316b511eb"){
    id
    title
    content
  }
}
```

5. 
```graphql
mutation deleteMutation{
  deletePost(id: "65f298f2b8be70f316b511eb"){
    id
    title
    content
  }
}
```


============================================

# JS -> TS 마이그레이션
1. TS 환경 설정
  - `npm install typescript -D`
  - `tsconfig.json` 파일 생성 및 설정
2. ts 파일로 변환
  2.1 컴파일 에러가 나는 것 위주로 수정
    ```
    /* 모듈 export 방식 변경  */
    // schema.ts
    module.exports = typeDefs; 
    =>
    export const typeDefs = gql`...`

    // resolvers.ts
    module.exports = resolvers;
    =>   
    export const resolvers ={...};
    

    /* import 방식 변경*/
    //index.ts
    const typeDefs = require("./schema");
    const resolvers = require("./resolvers");
    =>

    import { typeDefs } from "./schema";
    
    ``` 
  
  2.2 실행해보기
    `npm start`
    * package.json에 스크립트 없어서 compile과 start 추가함(https://codesandbox.io/p/devbox/as4-alpha-example-vmpzkj?file=%2Fpackage.json%3A10%2C5-10%2C55&fontsize=14&hidenavigation=1&theme=dark)
  => 에러 발생

3. 2.2에 대한 원인 찾기
  3.1 에러메시지
  `Error: Cannot find module './models/Post'`
  
  3.2 해결
  - Post 모듈 export/import 방식을 변경
  - 오류가 나는 이유는 ts -> js로 변환되는 과정에서 폴더 구조나 실행 구조가 바뀌어서 모듈을 못찾는듯
  
===> 여기까지 했을 때 정상 작동 확인


1. any 타입 선언
1. any 타입을 더 적절한 타입으로 변경


# 참고
https://joshua1988.github.io/ts/etc/convert-js-to-ts.html