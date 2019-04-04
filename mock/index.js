const Mock = require("mockjs");

const roles = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    systemList: ["gather", "metadata", "analysis", "security"],
    menuList: [
      "/gather/designplatform",
      "/gather/taskCenter",
      "/metadata/server",
      "/metadata/system/system",
      "/metadata/system/theme"
    ]
  },
  {
    id: 2,
    username: "peng",
    password: "peng",
    systemList: ["gather", "metadata", "security"],
    menuList: ["/metadata/server"]
  }
];

const proxy = {
  "POST /login": (req, res) => {
    let message = "";
    let code = "200";
    let data = {};
    let errorField = "";
    const { username, password } = req.body;
    const user = roles.filter(index => index.username === username)[0];

    if (!user || !user.username) {
      code = "-1";
      message = "用户名不存在!";
      errorField = "username";
    } else if (!password || password !== user.password) {
      code = "-1";
      message = "密码错误!";
      errorField = "password";
    } else {
      code = "200";
      message = "登录成功。";
      const { systemList, menuList } = user;
      data = { systemList, menuList };
    }

    return res.json({
      message,
      errorField,
      code,
      data
    });
  }
};

module.exports = proxy;
