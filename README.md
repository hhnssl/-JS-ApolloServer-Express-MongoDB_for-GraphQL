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
`
📦graphql-blog-app
┣ 📂models
┃ ┗ 📜Post.js                        DB에 넣기 전에 요청 데이터 구조가 postSchema와 일치하는지 검사하는 역할
┣ 📜index.js                         typeDefs, resolvers로 아폴로서버 인스턴스 생성&몽고디비 연결
┣ 📜schema.js [typeDefs]             타입 정의 for GraphQL
┗ 📜resolvers.js [resolvers]         실제로 작업이 일어나는 곳. 명세서를 실물로 만든 것과 비슷한?
`

# 실행 방법
`node index.js`


# 아폴로서버에서 실행할 쿼리 및 뮤테이션
1. 
`mutation AddBlogMutation{
  createPost(title: "My Dev.to Blog4", content: "My Dev Blog Content4"){
    id
    title
    content
  }
}
`

2.
`
mutation updateBlog{
  updatePost(id: "65f298f2b8be70f316b511eb", title: "Dev Updated Title", content: "Dev Updated Content"){
    id
    title
    content
  }
}
`

3. 
`
query getAllPost{
  posts{
    id
    title
    content
  }
}
`

4.
`
query getPostById{
  post(id: "65f298f2b8be70f316b511eb"){
    id
    title
    content
  }
}
`

5. 
`
mutation deleteMutation{
  deletePost(id: "65f298f2b8be70f316b511eb"){
    id
    title
    content
  }
}
`