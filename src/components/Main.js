require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');
//获取图片相关数据
var imageDatas = require('../data/imagesDatas.json');

class AppComponent extends React.Component {

  //利用自执行函数,讲图片名信息转成图片URL路径信息
  getImageUrl(imageDataArr) {
    for (var i = 0; i < imageDataArr.length; i++) {
      var singleImageData = imageDataArr[i];
      singleImageData.imageUrl = require('../images/' + singleImageData.fileName);
      imageDataArr[i] = singleImageData;
    }

    return imageDataArr;
  }

  componentWillMount() {
    imageDatas = this.getImageUrl({imageDatas});
  }

  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator"/>
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <section className="stage">
          <section className="img-sec">
          </section>
          <nav className="controller-nav">
          </nav>
        </section>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
