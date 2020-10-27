import React from 'react';
import { Form, Row, Col, } from 'antd';
import BaseComponent from './BaseComponent';
import styles from './Form.less';
const FormItem = Form.Item;

export const DEFAULT_LAYOUT = 'horizontal';
export const DEFAULT_FORM_ITEM_LAYOUT = {
  labelCol: { sm: {span: 6}, xs:{span:24} },
  wrapperCol: { sm: {span: 18}, xs:{span:24} },
};
export const FORM_ITEM_LAYOUT_8 = {
  labelCol: { sm: {span: 8}, xs:{span:24} },
  wrapperCol: { sm: {span: 16}, xs:{span:24} },
};
const COL_LAYOUT = { xs: 24, sm: 24, lg: 12, xl: 8, xxl: 6};

function isPromise(obj) {
  if (typeof obj === 'object' && typeof obj.then === 'function') {
    return true;
  }
  return false;
}

// function compare(origin, target) {
//   if (typeof target === 'object') {
//     if (typeof origin !== 'object' || !origin) return false;
//     if (Object.keys(origin).length !== Object.keys(target).length) return false;
//     for (let key in target) if (!compare(origin[key], target[key])) return false;
//     return true;
//   } else { return origin === target; }// 属性值的对比结果
// }
function compare(origin, target) {
  if (typeof target === 'object' && typeof origin === 'object') {
    if(target === origin) {
      return true;
    }
    if (Object.keys(origin).length !== Object.keys(target).length) return false;
    for (let key in target) if (!compare(origin[key], target[key])) return false;
    return true;
  } else if(typeof target === 'function' && typeof origin === 'function') {
    if(target === origin) {
      return true;
    }
    if(target.toString() === origin.toString()) {
      return true;
    }
    return false;
  } else { 
    return origin === target;
  }// 属性值的对比结果
}

// todo 代码待优化
const DummyState = {};
export default class SmartForm extends BaseComponent {
  constructor(props) {
    super(props);
    // 标识是否触发过校验，如果触发过校验，修改formItem的都要validate该formItem
    this.validated = false;
    // 存储格式为key: item.key, value: item在this.formItems数组index
    this.keys = new Map();
    // 存放item的交互项
    this.interactions = [];
    this.formData = {};
    if (props.defaultValue) {
      this.formData = props.defaultValue;
    }
    this.formItems = this.props.formItems.map(item=> {
      return Object.assign({}, item);
    });
    this.formItems.forEach((item, index) => {
      this.keys.set(item.key, index);
      // 收集defaultvalue
      if (item.defaultValue || typeof (item.defaultValue) !== 'undefined') {
        this.setValue(item.key, item.defaultValue);
      }
      if (item.value) {
        this.setValue(item.key, item.value);
      }
    });
  }

  setValue(key, value) {
    this.formData[key] = value;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.formItems !== this.props.formItems || this.state !== nextState;
  }
  /**
   * 设置某个key的value值
   *  做的操作也包括将formItems的value设置为undefined,防止在switchComponent里重设置了value值
   * 一切以key，value为准
   * @param {*} key 
   * @param {*} value 
   */
  SetValue(key, value) {
    this.setValue(key, value);
    const index = this.keys.get(key);
    if (typeof index !== 'undefined') {
      const item = this.formItems[index];
      if (typeof item !== 'undefined' && typeof item.value !== 'undefined') {
        item.value = undefined;
      }
    }
  }

  componentDidMount() {
    const items = this.formItems;
    this.collectInteract(items);
    this.recollectValue(items);
  }

  // 从proxy中获取data
  extractFormData() {
    return Object.assign({}, this.formData);
  }
    // 重置form: 重新从props.formItems里获取formItem
    ResetFormdata = () => {
      this.formItems = this.props.formItems.map(item=> {
        return Object.assign({}, item);
      });
      this.interactions = [];
      this.formData = {};
      this.recollectValue(this.formItems);
      this.collectInteract(this.props.formItems);
      // 将所有的错误信息重置
      this.resetError();
      this.setState({});
    }

    resetError() {
      this.formItems.forEach(item=> {
        item.validateStatus = '';
        item.help = '';
      });
    }
    /**
     * 从start项开始添加items, 如果start空则追加到formItems的末尾
     * @param {*} items
     * @param {*} start
     */
    DynamicAdd(items, start) {
      if (typeof start === 'number') {
        this.formItems.splice(start, 0, ...items);
      } else {
        Array.prototype.push.call(this.formItems, ...items);
      }

      // 重新生成keys
      this.reMapKeys();
      // 重新收集interact, 同时要将formData重置成js普通对象，不然会重复劫持数据
      this.formData = this.extractFormData();
      this.collectInteract(this.formItems);
      this.setState(DummyState);
    }

    reMapKeys() {
      this.formItems.forEach((item, index)=> {
        this.keys.set(item.key, index);
      });
    }
    /**
     * 从key项之前添加items项
     */
    DynamicAddBeforeKey(items, key) {
      const keyIndex = this.keys.get(key);
      this.DynamicAdd(items, keyIndex);
    }

    /**
     * 从key项之后添加items项
     */
    DynamicAddAfterKey(items, key) {
      const keyIndex = this.keys.get(key);
      this.DynamicAdd(items, keyIndex + 1);
    }

    UpdateValueByKey(value, key) {
      this.formData = Object.assign(this.formData, {[key]: value});
      this.setState(DummyState);
    }

    /**
     * 由于在删除的过程中，keys中index会变化，要重新生成keys
     * todo: 这操作频繁还有必要通过map存取吗
     */
    rearrageKeys() {
      const newKeys = new Map();
      this.formItems.forEach((item, index) => {
        newKeys.set(item.key, index);
      });
      this.keys = newKeys;
    }

    // 判断两次的props，如果有props发生变化，则要重新赋值给this.formItems
    componentWillReceiveProps(nextProps) {
      if (!compare(nextProps, this.props)) {
        this.formItems = nextProps.formItems.map(item=> {
          return Object.assign({}, item);
        });
        // 这里要重新收集item的值;
        this.recollectValue(nextProps.formItems);
      }

    }
    /**
     * 根据key删除formItems
     * @param {*} items item数组
     */
    DeleteItems(keys) {
      keys.forEach(key => {
        const index = this.keys.get(key);
        if (Number.isInteger(index)) {
          this.formItems.splice(index, 1);
          this.rearrageKeys();

          delete this.formData[key];
        }
      });

      this.setState(DummyState);
    }

    collectInteract(items) {
      const interactItems = items.filter(item => item.interact);
      const self = this;
      this.formData = new Proxy(this.formData, {
        set(target, key, value) {
          Reflect.set(target, key, value);
          for (const interactItem of interactItems) {
            // interact数据格式：[fn, depends], depends:为数组
            if (Array.isArray(interactItem.interact)) {
              const [fn, depends] = interactItem.interact;
              if (depends && depends.includes(key)) {
                const newItem = fn(self);
                if (newItem && !isPromise(newItem)) {
                  self.ChangeItemByKey(newItem.key, newItem);
                } else if(newItem && isPromise(newItem)) {
                  newItem.then(data=> {
                    self.ChangeItemByKey(data.key, data);
                  });
                }
              }
            }
          }
          return true;
        }
      });
    }

    // 重置后要重新收集数据
    recollectValue(formItems) {
      formItems.forEach((item, index) => {
        this.keys.set(item.key, index);
        // 收集DefaultValue
        this.initDefaultValue(item);
        // 收集Show的value值
        this.initShowValue(item);
      });
    }

    initShowValue(item) {
      if (item.type === 'Show') {
        this.setValue(item.key, item.value);
      }
    }

    initDefaultValue(item) {
      if ( item.defaultValue !== null || (typeof (item.defaultValue) !== 'undefined' && typeof (this.formData[item.key]) === 'undefined')) {
        this.setValue(item.key, item.defaultValue);
      }

      if (typeof (item.value) !== 'undefined') {
        this.setValue(item.key, item.value);
      }
    }

    setFormItemError(item, error) {
      const formItem = this.formItems[this.keys.get(item.key)];
      formItem.validateStatus = 'error';
      formItem.help = error; // 为一个error string值

      this.setState({});
    }

    setFormItemOk(item) {
      const formItem = this.formItems[this.keys.get(item.key)];
      formItem.validateStatus = '';
      formItem.help = '';

      this.setState({});
    }

    onCustomComponentChange = (form, item, value, ...other)=> {
      if(value && typeof value === 'object' && typeof value.target !== 'undefined') {
        form.formData[item.key] = value.target.value;
        item.value = value.target.value;
      } else {
        form.formData[item.key] = value;
        item.value = value;
      }
      
      const {onChange, validateTrigger} = item;
      onChange && onChange(value, ...other);
      if (!validateTrigger || 
        (Object.prototype.toString.call(validateTrigger) === '[object Array]' && validateTrigger.indexOf('onChange') > -1)) {
          this.ValidateItem(item);
      }
      this.setState({});
    }

    switchComponent=(item) => {
      // 这里是用户自定义的组件
      //eslint-disable-next-line
      const { type, onChange, defaultValue, smartProps, validateTrigger, validateStatus, ...other } = item;
      if (typeof type === 'function') {
        if (typeof (item.value) !== 'undefined') {
          this.setValue(item.key, item.value);
        }

        if(validateTrigger && validateTrigger.length > 0) {
          let triggers = validateTrigger.reduce((pre, next)=> {
            if(next !== 'onChange') {
              pre[next] = this.ValidateItem.bind(this, item);
            }
            return pre;
          }, {});
          return React.createElement(type, {
            form: this, item,
            value: this.formData[item.key] || defaultValue, 
            onChange: this.onCustomComponentChange.bind(this, this, item),
            ...triggers,
            ...other,
            ...smartProps
          });
        }

        return React.createElement(type, {
          form: this, item,
          value: this.formData[item.key] || defaultValue, 
          onChange: this.onCustomComponentChange.bind(this, this, item),
          ... other,
          ... smartProps
        });
      }
    }

    // 显示formItem 前面那个require红点
    renderIfRequire=(item) => {
      if (item.rules && item.rules.includes('require')) {
        return true;
      }
    }

    renderColumns() {

      let { columnSize, onFormDataChange, fixedFormItemHeight } = this.props;
      const items = this.formItems;
      if (typeof (columnSize) === 'undefined') {
        return items.map((item, i) => {
          return (
            <Col key={item.key} {... COL_LAYOUT} style={fixedFormItemHeight ? {height: fixedFormItemHeight} : {}}>
              <FormItem
                label={item.name}
                help={item.help}
                validateStatus={item.validateStatus}
                className={this.renderIfRequire(items[i]) ? 'ant-form-item-require' : ''}
                {... DEFAULT_FORM_ITEM_LAYOUT}
              >
                {this.switchComponent(item)}
              </FormItem>
            </Col>
          );
        });
      }

      columnSize = columnSize || 1;
      if (24 % columnSize) {
        throw new Error('每行列数要是24的倍数！');
      }
      const span = 24 / columnSize;
      let children = [];
      for (let i = 0; i < items.length; i++) {
        children.push(
          <Col span={span} key={i} style={columnSize > 1 && fixedFormItemHeight ?  {heght: fixedFormItemHeight} : {}}>
            <FormItem
              className={this.renderIfRequire(items[i]) ? 'ant-form-item-require' : ''}
              label={items[i].name}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              help={items[i].help}
              validateStatus={items[i].validateStatus}
            >
              {this.switchComponent(items[i], onFormDataChange)}
            </FormItem>
          </Col>
        );
      }
      return (
        <Row gutter={24}>
          {children}
        </Row>
      );
    }

    // todo 支持异步校验
    getValue() {
      // 先校验一遍
      this.Validate();
      for (const item of this.formItems) {
        if (item.validateStatus === 'error') {
          return;
        }
      }
      return this.__formatData(this.extractFormData());
    }

    getValueWithNoValidate() {
      return this.__formatData(this.extractFormData());
    }

    // 格式化form的数据
    __formatData(formData) {
      const res = {};
      Object.keys(formData).forEach(key=> {
        if(formData[key] !== null || (typeof formData[key] !== 'undefined' && formData[key] !== '')) {
          const formItem = this.formItems[this.keys.get(key)];
          res[key] = formData[key];
          if (formItem.format && res[key]) {
            if(typeof res[key].format === 'function') {
              res[key] = res[key].format(formItem.format);
            } else if (typeof formItem.format === 'function') {
              res[key] = formItem.format(res[key]);
            }
          }
        }
      });
      return res;
    }

    isEmpty(value) {
      if (value === '' || value === undefined) {
        return true;
      }
      return false;
    }

    /**
     * changeItem为item的改变对象，不是一整个item
     */
    ChangeItemByKey(key, changeItem) {
      const index = this.keys.get(key);
      const item = this.formItems[index];
      if (typeof (changeItem.defaultValue) !== 'undefined') {
        this.setValue(key, changeItem.defaultValue);
        this.setValue(key, changeItem.value);
      }
      const newItem = Object.assign(item, changeItem);
      this.formItems.splice(index, 1, newItem);

      // 如果是改变的rules属性，就要重新校验该item的value
      if (Object.keys(changeItem).includes('rules') && this.validated) {
        this.ValidateItem(newItem);
      }
      // 改变item的时候要触发react render
      this.setState(DummyState);
    }

    ValidateItem(item) {
      const rules = item.rules;
      const formData = this.formData;
      if (rules && rules.length > 0) {
        for (const rule of rules) {
          if (rule === 'require') {
            if (this.isEmpty(formData[item.key])) {
              this.setFormItemError(item, '请输入必填项！');
              return;
            }
          } else if (rule === 'number' && !this.isEmpty(formData[item.key])) {
            if(Number.isNaN(formData[item.key] * 1) || typeof(formData[item.key] * 1) !== 'number') {
              this.setFormItemError(item, '输入框内容必须为数字！');
              return;
            }
          } else if (typeof rule === 'function') {              
            const ruleRes = rule(formData,item.key);
            if (!ruleRes.ok) {
              this.setFormItemError(item, ruleRes.error);
              return;
            }
          }
          this.setFormItemOk(item);
        }
      } else {
        this.setFormItemOk(item);
      }
    }
    
    Validate() {
      this.validated = true;
      for (const item of this.formItems) {
        this.ValidateItem(item);
      }
    }

    includesRequire=()=> {
      const formItems  = this.formItems;
      for(let i = 0; i < formItems.length; i ++) {
        if(formItems[i].rules && formItems[i].rules.includes('require')) {
          return true;
        }
      }
      return false;
    }
    
    render() {
      let { layout = DEFAULT_LAYOUT, style } = this.props;
      if (this.includesRequire()) {
        style = {
          ...style,
          padding: '0 12px'
        };
      }
      return (
        <Form className={layout === 'inline' ? styles['ant-advanced-search-form'] : ''} layout={layout} style={style || {}}>
          {
            this.renderColumns()
          }
        </Form>
      );
    }

}
