/* eslint-disable */
import axios from "axios";
import wx from "weixin-js-sdk";
import API_CONFIG from "@/utils/api";

/**
 * 微信分享至朋友圈
 * @param {*} _this vue实例
 * @param {*} title 标题
 * @param {*} desc 描述
 * @param {*} link 页面链接
 * @param {*} imgUrl 分享img
 */
export const commonShare = (_this, data, title, desc, link, imgUrl) => {
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appid, // 必填，公众号的唯一标识
    imestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.noncestr, // 必填，生成签名的随机串
    signature: data.signature,// 必填，签名
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
  });

  wx.ready(function () { //需在用户可能点击分享按钮前就先调用
    // // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
    // wx.updateAppMessageShareData({ 
    //   title: title, // 分享标题
    //   desc: desc, // 分享描述
    //   link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致`
    //   imgUrl: imgUrl, // 分享图标
    //   success: function () {
    //     // 设置成功
    //     _this.$toast.success("设置成功");
    //   }
    // });
    // // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
    // wx.updateTimelineShareData({ 
    //   title: title, // 分享标题
    //   link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //   imgUrl: imgUrl, // 分享图标
    //   success: function () {
    //     // 设置成功
    //     _this.$toast.success("设置成功");
    //   }
    // });
    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户点击了分享后执行的回调函数
        _this.$toast.success("分享成功");
      }
    });
    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
      // 用户点击了分享后执行的回调函数
      _this.$toast.success("分享成功");
      }
    });
  })

}