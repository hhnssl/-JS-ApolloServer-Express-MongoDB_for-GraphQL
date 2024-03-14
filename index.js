const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/blog-app-graphql");
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// 내가 생성한 리졸버와 스키마로 아폴로서버 인스턴스 생성
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Use the 'start' method to start the Apollo Server
async function startApolloServer() {
  await server.start();

  //Apply middleware after the server has started
  server.applyMiddleware({ app });

  const PORT = 4442;
  app.listen(PORT, () => {
    console.log(
      `Server listening on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

// Start the Apollo server
startApolloServer();
