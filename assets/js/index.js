// 获取用户信息
function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token'),
    // },
    success: (res) => {
      //   console.log(res);
      if (res.status !== 0) return layer.msg('获取用户信息失败！');
      layer.msg('获取用户信息成功！');
      renderAvatar(res.data);
    },
    //控制用户的访问权限
    // complete: res => {
    //   // console.log(res);
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
    //     //清空token
    //     localStorage.removeItem("token");
    //     //跳转至首页
    //     location.href = "/login.html"
    //   }
    // }
  });
}
// 渲染用户信息
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  //渲染欢迎语
  $('#welcome').html(`欢迎 ${name}`);
  //按需求渲染头像  有上传头像用上传头像，没有就用文字头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide();
    let firstName = name[0].toUpperCase();
    $('.text-avatar').html(firstName);
  }
};
//退出登入
$('#btnLogout').click(() => {
  layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
    // 1、清除本地储存的token
    localStorage.removeItem('token');
    // 2、跳转至登录页面
    location.href = '/login.html'
  });
});


//切换高亮
function change(){
  $('#change').addClass('layui-this').next().removeClass('layui-this')
}
//获取用户列表
getUserInfo();
