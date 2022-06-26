// eslint-disable-next-line strict
exports.dateformate = time => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const result = `${year}年${month}月${day}日`;
  return result;
};

exports.configdata = str => {
  const appid = 'wx2efb9723cf3582d5';
  const redirect_uri = 'http://www.xiaozhoubg.com/qrlogin';
  const state = Math.floor(Math.random() * 10000);
  const wxLoginUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=${state}#wechat_redirect`;

  data = {
    url: wxLoginUrl,
  };
  return data[str];
};
