const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content : {
                type : Sequelize.STRING(1000),
                allowNull : false,
            },},{
                sequelize,
                timestamps:true,
                underscored:false,
                modelName : 'Post',
                tableName:'posts',
                paranoid:false,
                charset : 'uft8mb4',
                collate : 'uft8mb4_general_ci',

            
        });
    }
    static associate(db) {
        db.Post.belongsTo(db.User); // 1(User):N(Post) 관계, 게시글의 작성자를 알 수 있게 됨 - post.getUser, post.addUser 같은 관계 메서드가 생김
        

    }
};