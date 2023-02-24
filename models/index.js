const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post =require("./post");

const db ={};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

//new Sequelize로 Mysqli연결 객체 생성하기

db.sequelize = sequelize;
db.User =  User;
db.Post = Post;

//각 객체의 실행
User.init(Sequelize);
Post.init(sequelize);

//관계 연결하기
User.associate(db);
Post.associate(db);

module.exports = db;

