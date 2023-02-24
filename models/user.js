const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            nickname: {
                type:Sequelize.STRING(30),
                allowNull : true,
                unique : true,
            },
            password : {
                type : Sequelize.STRING(100),
                allowNull : true,

            },
            provider : {
                //로그인방식S
                type : Sequelize.STRING(10),
                allowNull:flase,
                defaultValue : 'local',

            },
            id : {
                type : Sequelize.STRING(30),
                allowNull : true,
            }
            ,birthdate : {
                type : Sequelize.STRING(25),
                allowNull:true,
            },
                
            }, {
                //super.init의 두 번째 인수 : 테이블 자체에 대한 설명하는 변수 넣기 (그래야 데이터들 넣을수있으니까)
                sequelize, // static init 메서드의 매개변수와 연결되는 옵션, db.sequelize 객체를 넣어야 함 -> 추후에 models/index.js에서 연결
                timestamps:true,
                underscored:false,
                modelName:'User',
                tableName:'user',
                paranoid:true,
                charset:'utf8',
                collate:'utf8_general_ci',

            

        });
    }
    static associate(db) {
        db.User.hasMany(db.Post);

        db.User.belongsToMany(db.User, {

        });

    }
}