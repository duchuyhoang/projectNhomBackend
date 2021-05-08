class User{
    constructor(id){
this.id=id
    }

static getUserInfo(id){

// get the user info by mysql

return {
avatar:"https://scontent.fhan5-6.fna.fbcdn.net/v/t31.18172-8/27788301_747405972119527_849243654152381069_o.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=a1WzBnDpWUUAX8IHO1q&_nc_ht=scontent.fhan5-6.fna&oh=c043f153db6cf0c5867842181190e531&oe=60BF3CD1",
id:id,
firstName:"Huy",
middleName:"Đức",
lastName:"Hoàng",
}


}

}

module.exports =User;