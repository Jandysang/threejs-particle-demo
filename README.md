# threejs-particle-demo
基于three.js的粒子动画效果案例代码

## 作者
联系邮箱：sangming12@sina.cn

## 初次创建时间
2024-02-05

## 项目背景和技术依赖
在偶然的机会中，我帮助别人实现了类似如下图所示的效果：

![图片描述](./src/assets/images/WechatIMG349.png)

对应的网址是：[https://up.qq.com/act/a20170301pre/index.html](https://up.qq.com/act/a20170301pre/index.html)

核心功能已经复现，但如果想完全复刻该效果，还有两个细节功能需要完善：

1. 光影效果，可以参考案例地址：[https://threejs.org/examples/#webgpu_lights_custom](https://threejs.org/examples/#webgpu_lights_custom)
2. 鼠标按压效果目前没有现成的案例可供参考，需要进行定制开发。

## 项目框架
该项目使用了 webpack 4.0 和 ejs-loader 等方案构建多页面静态应用解决方案。用来承载当前案例的app框架，请参考以下代码：

[git@github.com:Jandysang/webpack-mpa.git](git@github.com:Jandysang/webpack-mpa.git)

如果你有任何其他需求或者进一步的问题，都可以告诉我。

## 初始化

```js
  npm config set registry https://registry.npmmirror.com/

  npm install

  npm run dev
```