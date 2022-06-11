$(function () {
  const form = layui.form;
  //自定义校验规则
  form.verify({
    //密码位数验证
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //校验原密码与新密码不能相同
    samePwd: (value) => {
      if (value === $('[name=oldPwd').val()) return ' 新密码不能和原密码相同';
    },
    //校验新密码和确认密码是否一致
    rePwd: (value) => {
      if (value !== $('[name=newPwd]').val()) return '新密码与确认密码保持一致';
    },
  });

  //更新密码
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        //强行清空token
        localStorage.removeItem('token');
        //跳转至登录界面
        window.parent.location.href = '/login.html';
      },
    });
  });
});
