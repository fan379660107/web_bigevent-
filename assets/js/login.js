$(function () {
    $('#link_reg').click(() => {
      $('.login-box').hide();
      $('.reg-box').show();
    });
    $('#link_login').click(() => {
      $('.reg-box').hide();
      $('.login-box').show();
    });
    //先引入form  来着 layui
    const form = layui.form;
    //自定义校验规则
    form.verify({
      //数组的方式
      pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
      //函数方法
      repwd: (value) => {
        //1、先获取密码框的值
        const pwd = $('.reg-box [name=password]').val();
        //2、判断两次密码是否一致
        if (pwd !== value) return '两次密码不一致';
      },
    });
    // 基本路径
  //   const baseUrl = 'http://www.liulongbin.top:3007';
    // 监听注册表单，发送注册请求
    $('#form_reg').submit((e) => {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data: {
          username: $('#form_reg [name=username]').val(),
          password: $('#form_reg [name=password]').val(),
        },
        success: (res) => {
          if (res.status !== 0) return layer.msg(res.message);
          layer.msg(res.message);
          //模拟点击事件，跳转到登录
          $('#link_login').click();
        },
      });
    });
    // 监听登录表单，发送登录请求
    $('#form_login').submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '/api/login',
        data: $(this).serialize(),
        success: (res) => {
          //   console.log(res);
          if (res.status !== 0) return layer.msg(res.message);
          layer.msg(res.message);
          // 1、把token 存到本地
          localStorage.setItem('token', res.token);
          // 2、跳转至首页
          location.href = '/index.html';
        },
      });
    });
  });
  