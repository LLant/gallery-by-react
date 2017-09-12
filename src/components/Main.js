require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
let yeomanImage = require('../images/yeoman.png');
//获取图片相关数据
var Constant = {
  centerPos: {
    left: 0,
    right: 0
  },
  hPosRange: {     //水平方向取值范围
    leftSecX: [0, 0],
    rightSecX: [0, 0],
    y: [0, 0],
  },
  vPosRange: {     //垂直方向的取值范围
    x: [0, 0],
    topY: [0, 0]
  }
};
class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],

      imgsArrangeArr: [{
        pos: {
          left: '0',
          top: '0'
        }
      }]
    };
    this.rearrange = this.rearrange.bind(this);
  }


  //利用自执行函数,讲图片名信息转成图片URL路径信息
  getImageUrl(imageDataArr) {
    for (var i = 0; i < imageDataArr.length; i++) {
      var singleImageData = imageDataArr[i];
      // singeImageData.imageUrl = require('../images/'+singeImageData.fileName);
      imageDataArr[i] = singleImageData;
    }
    return imageDataArr;
  }

  getData() {
    axios.get('../data/imagesDatas.json?type=text').then(
      res => {
        // console.log(res);
        this.setState({
          list: res.data
        })
      }
    );
  }

  componentDidMount() {
    this.getData();
    let aa = [];
    aa = this.getImageUrl(this.state.list);
    this.setState({
      list: aa
    });

    //为每张图片计算位置的范围
    //拿到舞台的大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,    //scrollWidth对象实际内容的宽度
      stageH = stageDOM.scrollHeight,
// scrollWidth：对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大。
// clientWidth：对象内容的可视区的宽度，不包滚动条等边线，会随对象显示大小的变化而改变。
// offsetWidth：对象整体的实际宽度，包滚动条等边线，会随对象显示大小的变化而改变。
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    //拿到一个imageFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure1),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    //计算中心图片的位置点
    Constant.centerPos.left = halfStageW - halfImgW;
    Constant.centerPos.top = halfStageH - halfImgH;
    //计算左右侧图片的位置
    Constant.hPosRange.leftSecX[0] = -halfImgW;
    Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    Constant.hPosRange.y[0] = -halfImgH;
    Constant.hPosRange.y[1] = stageH - halfImgH;
    //计算上侧图片的位置
    Constant.vPosRange.topY[0] = -halfImgH;
    Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    Constant.vPosRange.x[0] = halfImgW - imgW;
    Constant.vPosRange.x[1] = halfImgW;

    this.rearrange(0);
    this.init(this.state.list);
  };

  //重新布局所有图片
  //
  rearrange(centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,

      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,

      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,

      //存储放置在上部图片的状态信息
      //上部放0、1张
      imgsArrangeTopArr = [],
      topImgNum = Math.ceil(Math.random() * 2),   //取一个或者不取
      topImgSpliceIndex = 0,

      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
    //向/从数组中添加/删除项目，然后返回被删除的项目

    //居中centerIndex的图片
    imgsArrangeCenterArr[0].pos = centerPos;

    //取出要布局上侧的图片的状态信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    //布局位于上侧的图片
    imgsArrangeTopArr.forEach(function (value, index) {
      imgsArrangeTopArr[index].pos = {
        top: this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      }
    });

    //布局左右两侧的图片
    for (var i = 0, j = i < imgsArrangeArr.length, k = j / 2; i < j; i++) {
      var hPosRangeLORX = null;

      //前半部分布局左边，后半部分布局右边
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }

      imgsArrangeArr[i].pos = {
        top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
      }
    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0,
        imgsArrangeTopArr[0]);
    }

    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  };

  获取区间内的一个随机数

  getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
  }

  init(list) {
    //初始化
    list.forEach((value, index) => {
      let imgsArrangeArrTemp = this.state.imgsArrangeArr;
      if (!imgsArrangeArrTemp[index]) {
        imgsArrangeArrTemp[index] = {
          pos: {
            left: 0,
            top: 0
          }
        };
        this.setState({
          imgsArrangeArr: imgsArrangeArrTemp
        })
      }
    });

  }

  render() {

    var controllerUnits = [],
      imgFigures = [];

    var imgsArrangeArrTemp = this.state.imgsArrangeArr;
    this.state.list.forEach((value, index) => {
      // this.init(this.state.list);

      let imageUrl = '../images/' + value.fileName;

      var styleObj = {};
      //如果属性中指定了这张图片的位置，则使用
      if (imgsArrangeArrTemp[index].pos) {
        styleObj = imgsArrangeArrTemp[index].pos;
      }
      let ingFigureRef='imgFigure'+index;
      imgFigures.push(
        <figure key={index} className="img-figure" ref={ingFigureRef} style={styleObj}>
          <img src={imageUrl} alt={value.title}/>
          <figcaption>
            <h2 className="img-title">{value.title}</h2>
            <div>
              <p>
                {value.desc}
              </p>
            </div>
          </figcaption>
        </figure>
      );
    });

    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator"/>
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!
        </div>
        <section className="stage" ref="stage">
          <section className="img-sec">
            {imgFigures}
          </section>
          <nav className="controller-nav">
            {controllerUnits}
          </nav>
        </section>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
