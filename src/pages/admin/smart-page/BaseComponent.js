import { Component } from 'react';
/**
 * 整体设想：
 *  不全部依赖数据驱动，全部数据驱动其实有各种限制
 * 给每个组件添加一个ReactID, 和parent属性，每个父组件持有所有children的instance
*/
export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.children = new Map();
    if (props.parent) {
      props.parent.children.set(props.ReactID, this);
      this.parent = props.parent;
    }
  }

  // id: 为以'.'分割，找寻
  getChildComponent(id) {
    return id.split('.').reduce((pre, next) => {
      if (pre && pre.children) {
        return pre.children.get(next);
      }
      return null;
    }, this);
  }
}
