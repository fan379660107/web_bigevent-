// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options) => {
  // console.log(options);
  //在请求前拼接上根路径
  options.url = 'http://big-event-api-t.itheima.net' + options.url;
  //注入 token
  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token'),
    };
  }
  options.complete = (res) => {
    // console.log(res);
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      //清空token
      localStorage.removeItem('token');
      //跳转至首页
      location.href = '/login.html';
    }
  };
});
