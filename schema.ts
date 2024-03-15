// 그래프큐엘 스키마

const { gql } = require("apollo-server-express");

// gql 템플릿 리터럴을 사용하여 그래프큐엘 스키마(정의서? 명세서?) 정의.
export const typeDefs = gql`
  # 블로그 포스트를 표현하는 Post 타입
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  # Query 타입으로 데이터를 패칭할 수 있는 쿼리들을 정의한다.
  type Query {
    posts: [Post] # 모든 포스트 리스트를 가져오는 쿼리
    post(id: ID!): Post # id를 넣으면 해당 포스트를 가져오는 쿼리
  }

  # 뮤테이션 타입으로 데이터 수정할 수 있는 뮤테이션을 정의한다.
  type Mutation {
    createPost(title: String!, content: String!): Post # 새로운 포스트를 생성하는 뮤테이션
    updatePost(id: ID!, title: String, content: String): Post # 존재하는 포스트를 업뎃하는 뮤테이션
    deletePost(id: ID!): Post # 포스트를 삭제하는 뮤테이션
  }
`;

// module.exports = typeDefs; // require 함수로 꺼내쓸수있음
