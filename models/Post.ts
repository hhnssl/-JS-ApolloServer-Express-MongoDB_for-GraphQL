// Post 모델(몽구스 스키마)
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export const Post = mongoose.model("Post", postSchema);

// module.exports = Post; // Node.js 환경에서 모듈을 내보내는 부분!  Post라는 몽구스 모델을 모듈로 내보내는 역할을 함
// require('./Post') <- 이런식으로 꺼내쓸 수 있게 함!!!
