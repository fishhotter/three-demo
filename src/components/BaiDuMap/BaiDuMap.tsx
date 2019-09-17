import * as React from "react";
import { Memo, useEffect, ISyntheticEvent, useState } from "utils/declare";
import { Input } from "antd";
import { IProp } from "./baidu-map.d";

import BaseDialog from "components/BaseDialog/BaseDialog";

import PointIcon from "assets/image/gis/point.png";

import "./BaiDuMap.less";

const Search: any = Input.Search;
const myWindow: any = window;
const BMap = myWindow.BMap;
const BMapLib = myWindow.BMapLib;
const MAP_CENTER = [114.064, 22.5484];
const ZOOM = 14;
const INPUT_CLASS = "ant-input";
const SEARCH_CLASS = "ant-input-group-addon";

let map: any;
let marker: any;
let ac: any;
let local: any;
let searchMarker: any;
let pointResult: number[];

function BaiDuMap(props: IProp): JSX.Element {
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]); 
  const [searchDisplay, setSearchDisplay] = useState("none"); 
  const [searchValue, setSearchValue] = useState(""); 
  pointResult = props.pointResult || [];

  useEffect(() => {
    initMap();
    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    }
    }, []
  )

  const onDocumentClick = (e: any) => {
    e.preventDefault();
    const classList = e.target.classList;
    if (classList && Array.prototype.indexOf.call(classList, INPUT_CLASS) === -1 
      && Array.prototype.indexOf.call(classList, SEARCH_CLASS) === -1) {
      setSearchDisplay("none");
    }
  }

  const coordConvert = (point: any, func: any) => {
    const convertor = new BMap.Convertor();
    const ggPoint = [new BMap.Point(point[0], point[1])];
    convertor.translate(ggPoint, 1, 5, func);
  }

  const initNowPoint = () => {
    if (pointResult.length === 0) { return; }
    const myIcon = new BMap.Icon(PointIcon, new BMap.Size(26, 37));
    const point = new BMap.Point(pointResult[0], pointResult[1]);
    const markerNow = new BMap.Marker(point, { icon: myIcon });  // 创建标注
    map.addOverlay(markerNow);
    map.centerAndZoom(point, ZOOM);
    setInfoWindow(point, markerNow);
    
  }

  const initMap = () => {
    if (BMap.Map) {
      map = new BMap.Map("baidumap-container", { enableMapClick: false });
      if (pointResult.length === 0) {
        coordConvert(MAP_CENTER, (data: any) => {
          if (data.status === 0) {
            map.centerAndZoom(data.points[0], ZOOM);
          }
        })
      } else {
        map.centerAndZoom(new BMap.Point(pointResult[0], pointResult[1]), ZOOM);
      }
      map.enableScrollWheelZoom(true);
      map.addEventListener("click", (e: any) => {
        if (marker) { map.removeOverlay(marker); }
        if (searchMarker) { map.removeOverlay(searchMarker); }
        const pointTemp = new BMap.Point(e.point.lng, e.point.lat)
        marker = new BMap.Marker(pointTemp);
        pointResult = [e.point.lng, e.point.lat];
        map.addOverlay(marker);
        setInfoWindow(pointTemp, marker);
      }, false)
      const styleOptions = {
        strokeColor: "red",    // 边线颜色。
        fillColor: "red",      // 填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       // 边线的宽度，以像素为单位。
        strokeOpacity: 0.8,    // 边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      // 填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' // 边线的样式，solid或dashed。
      }
      // tslint:disable-next-line:no-unused-expression
      new BMapLib.DrawingManager(map, {
        isOpen: false, // 是否开启绘制模式
        enableDrawingTool: true, // 是否显示工具栏
        drawingToolOptions: {
          anchor: BMap.BMAP_ANCHOR_TOP_RIGHT, // 位置
          offset: new BMap.Size(5, 5), // 偏离值
        },
        circleOptions: styleOptions, // 圆的样式
        polylineOptions: styleOptions, // 线的样式
        polygonOptions: styleOptions, // 多边形的样式
        rectangleOptions: styleOptions // 矩形的样式
      });
      initLocal();
      initNowPoint();
    }
  }

  const initLocal = () => {
    ac = new BMap.Autocomplete({
      "input": "search-key",
      "location": map,
      "onSearchComplete":  getSearchResult,
    });

    local = new BMap.LocalSearch(map, { // 智能搜索
      onSearchComplete: () => {
        if (!local.getResults()) { return; }
        map.removeOverlay(searchMarker);  
        const pp = local.getResults().getPoi(0).point;    // 获取第一个智能搜索的结果
        pointResult = [pp.lng, pp.lat];
        map.centerAndZoom(pp, 18);
        searchMarker = new BMap.Marker(pp);
        map.addOverlay(searchMarker);    // 添加标注
        setInfoWindow(pp, searchMarker);
      }
    });
  }

  const handleSearch = (value: any) => {
    if (value) {
      const myValue = value.province + value.city + value.district + value.street + value.business;
      local.search(myValue);
      setSearchDisplay("none");
      setSearchValue(value.district + value.street + value.business);
    }
  }

  const getSearchResult = (data: any) => {
    ac.hide();
    if (data) {
      const result = data.Ar;
      setSearchResult(result);
      if (result.length > 0) { setSearchDisplay("block"); }
    }
  }

  const setInfoWindow = (point: any, markerIn: any) => {
    const label = new BMap.Label(`经纬度：[ ${point.lng.toFixed(3)}, ${point.lat.toFixed(3)} ]`, { offset: new BMap.Size(-60, -25) });
    markerIn.setLabel(label);
  }

  const onChange = (ev: ISyntheticEvent): void => {
    ev.preventDefault();
    const value: string = ev.target.value as string;
    setSearchKey(value);
    setSearchValue(value);
  }

  const onSearch = (value: string): void => {
    ac.search(value)
  }

  const onComfirm = () => {
    if (props.onConfirm) {
      props.onConfirm(pointResult);
      onPopCancel();
    }
  }

  const onPopCancel = () => {
    if (props.onCancel) { props.onCancel(); }
  }
  
  return (
    <BaseDialog isShowPop={props.isShowPop} isBackIcon={true} size={{ width: "9.56rem", height: "5.8rem" }} onCancel={onPopCancel}>
      <div className="map-pop-container">
        <div className="pop-header">
          <span className="header-title">请选择位置</span>
        </div>  
        <div className="baidumap-container">
          <div className="search-container">
            <Search placeholder="请输入河流断面名称" onSearch={onSearch} onChange={onChange} enterButton={true} value={searchValue} />
          </div>
          <div id="baidumap-container" >
            BaiDuMap
          </div>
          <div className="map-search-container" style={{display: searchDisplay}}>
            {
              searchResult.map((item: any) => 
                <div className="map-search-item" key={item.business} title={`${item.district} ${item.business}`} 
                  onClick={() => handleSearch(item)}>
                  {`${item.district} ${item.business}`}
                </div>
              )
            }
          </div>
          <input type="text" id="search-key" value={searchKey} onChange={() => ({})}/>
        </div>
        <button className="baidumap-confirm" onClick={onComfirm}>确 认</button>
      </div>
    </BaseDialog>
  );
}

export default Memo(BaiDuMap); 