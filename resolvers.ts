import { Post } from "./models/Post";

// Import the Post model. 동일한 디렉토리에 있는 파일이라고 가정한다.
const { model } = require("mongoose");
// const Post = require("./models/Post");

// resolvers는 그래프큐엘 쿼리와 뮤테이션에 응답하는 방법을 정의한다.
// schema.js 에 정의한 typeDefs에 상응하네..!
export const resolvers = {
  // # 쿼리 리졸버 객체는 read 작업(operation)을 처리한다.
  Query: {
    // 1. 모든 데이터를 가져오기 위한 리졸버
    posts: async () => {
      try {
        // 모든 포스트들을 찾고 반환하기 위해 Post 모델(몽구스)을 사용한다.
        return await Post.find();
      } catch (error) {
        throw new Error("Error fetching posts from the database");
      }
    },

    // 2. id로 포스트를 가져오기 위한 리졸버
    post: async (parent, { id }) => {
      try {
        // id로 특정한 포스트를 찾고 반환하기 위해 Post 모델을 사용한다.
        return await Post.findById(id);
      } catch (error) {
        throw new Error(`Error fetching post with ID: ${id} from the database`);
      }
    },
  },

  // 뮤테이션 리졸버 객체는 쓰기 연산을 처리한다.
  Mutation: {
    // 1. 새로운 포스트를 생성하는 리졸버
    createPost: async (parent, { title, content }) => {
      try {
        // Post 모델을 사용해서 새 포스트 인스턴스를 생성함
        const post = new Post({ title, content });

        // 새 포스트를 데이터베이스에 저장하고 반환한다.
        return await post.save();
      } catch (error) {
        throw new Error(`Error createing a new post in the database`);
      }
    },

    // 2. 포스트를 업뎃하는 리졸버
    updatePost: async (parent, { id, title, content }) => {
      try {
        // id로 포스트를 찾고 업데이트하고 업뎃한 포스트를 반환
        return await Post.findByIdAndUpdate(
          id,
          { title, content },
          { new: true }
        );
      } catch (error) {
        throw new Error(`Error updating post with ID: ${id} in the database`);
      }
    },

    // 3. id로 포스트를 삭제하는 리졸버
    deletePost: async (parent, { id }) => {
      try {
        // id로 포스트를 찾고 삭제하고 삭제한 포스트를 반환
        return await Post.findByIdAndDelete(id);
      } catch (error) {
        throw new Error(`Error deleting post with ID: &{id} from the database`);
      }
    },
  },
};

// 아폴로서버에서 사용하기 위한 리졸버 내보내기
// module.exports = resolvers;
