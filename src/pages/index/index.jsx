import { Fragment, useMemo, useState } from 'react';
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtCheckbox, AtRadio } from 'taro-ui'
import './index.scss'

const disCountsOptions = [
  { value: '1', label: 'OL双折' },
  { value: '0.90', label: '9折' },
  { value: '0.82', label: '82折' },
];

const majorCateOptions = [
  { value: 'light', label: '轻物', addNum: 200 },
  { value: 'heavy', label: '重物', addNum: 300 },
];

const minorCateOptions = [
  { value: 'singleProduct', label: '单品', shipFee: 10, addNum: 200 },
  { value: 'ligntCloth', label: '轻衣', shipFee: 15, addNum: 200 },
  { value: 'ligntShoes', label: '轻鞋', shipFee: 20, addNum: 200 },
  { value: 'heavyCloth', label: '重衣', shipFee: 25, addNum: 300 },
];

const majorCateAddNumMap = {};
const minorCateAddNumMap = {};
const majorCateShipFeeMap = {};

majorCateOptions.forEach(({ value, addNum }) => majorCateAddNumMap[value] = addNum);
minorCateOptions.forEach(({ value, shipFee, addNum }) => {
  minorCateAddNumMap[value] = addNum;
  majorCateShipFeeMap[value] = shipFee;
});

export default () => {

  const [originPrice, setOriginPrice] = useState();
  const [quantity, setQuantity] = useState(1);
  const [disCounts, setDisCounts] = useState([]);
  const [majorCate, setMajorCate] = useState('light');
  const [minorCate, setMinorCate] = useState('singleProduct');
  const minorFlag = disCounts.includes('0.82');

  const amount = useMemo(() => {
    if (disCounts.length === 0) return '折扣不能为空';
    if (!originPrice) return '原价不能为空';
    if (!quantity) return '数量不能为空';
    if (!majorCate) return '大类不能为空';
    if (!minorCate) return '小类不能为空';
    const rideNum = originPrice < 100 ? 10 : 7.3 * 1.2;
    const totalDisCount = disCounts.reduce((total, current) => total * current, [1]);
    const shipFee = minorFlag ? majorCateShipFeeMap[minorCate] : 0;
    const addNum = minorFlag ? minorCateAddNumMap[minorCate] : majorCateAddNumMap[majorCate];
    const realPrice = (originPrice * totalDisCount + shipFee) * rideNum + addNum;
    return realPrice * quantity;
  }, [originPrice, quantity, disCounts, majorCate, minorCate, minorFlag]);

  return (
    <View className='calc-helper-wrapper'>
      <AtForm>
        <View className='panel-title'>折扣</View>
        <AtCheckbox
          name='disCounts'
          options={disCountsOptions}
          selectedList={disCounts}
          className='check-box-dis-count'
          onChange={value => setDisCounts(value)}
        />
        {minorFlag && (
          <Fragment>
            <View className='panel-title'>小类</View>
            <AtRadio
              name='minorCate'
              options={minorCateOptions}
              value={minorCate}
              className='radio-cate'
              onClick={value => setMinorCate(value)}
            />
          </Fragment>
        )}
        {!minorFlag && (
          <Fragment>
            <View className='panel-title'>大类</View>
            <AtRadio
              name='majorCate'
              options={majorCateOptions}
              value={majorCate}
              className='radio-cate'
              onClick={value => setMajorCate(value)}
            />
          </Fragment>
        )}
        <View className='panel-title'>原价</View>
        <AtInput
          name='originPrice'
          type='digit'
          value={originPrice}
          placeholder='请输入原价'
          onChange={value => setOriginPrice(value)}
        />
        <View className='panel-title'>数量</View>
        <AtInput
          name='quantity'
          type='number'
          value={quantity}
          onChange={value => setQuantity(value)}
        />
        <View className='panel-title'>金额</View>
        <AtInput
          disabled
          name='amount'
          type='digit'
          value={amount}
          className='calc-result-amount'
        />
      </AtForm>
    </View>
  );
} 