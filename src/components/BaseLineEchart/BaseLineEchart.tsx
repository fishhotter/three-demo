import * as React from "react";
import * as echarts from "echarts";
import { useMappedState, IStoreState } from "store/store";
import { Memo, useEffect, useCallback } from "utils/declare";
import { IProps, IBaseValue } from "./base-line-echart.d";

import "./BaseLineEchart.less";

const defaultProps: IProps = {
  option: {},
  noneDataTips: "暂无数据",
  dataZoomEnd: 0,
  chartData: {},
  title: "",
}

BaseLineEchart.defaultProps = JSON.parse(JSON.stringify(defaultProps));

function BaseLineEchart(props: IProps): JSX.Element {
  const domId = `${new Date().getTime() + Math.floor(Math.random() * 1000)}BaseLineEchart`;
  let chartDom: any;
  let myChart: any;

  const { rootFontSize } = useMappedState(
    useCallback((state: IStoreState) => ({
      rootFontSize: state.UiReducer.rootFontSize
    }), [])
  )

  useEffect(() => {
    chartDom = document.getElementById(props.domId || domId as string);
    drawChart();

    return () => {
      resetChart();
    }
  }, [])

  useEffect(() => {
    resetChart(true);
  }, [rootFontSize])

  useEffect(() => {
    drawChart(props.chartData, props.option);
  }, [props.chartData, props.option])

  const getCommonOption = (isXaxis: boolean = true) => {
    return {
      axisLabel: {
        color: '#666666',
        fontSize: .16 * rootFontSize,
        rotate: 0,
        margin: .2 * rootFontSize,
      },
      nameTextStyle: {
        color: "#666666",
        backgroundColor: "transparent"
      },
      axisLine: {
        show: isXaxis ? true : false,
        lineStyle: {
          width: .01 * rootFontSize,
          color: '#DDDDDD'
        }
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: isXaxis ? false : true,
        lineStyle: {
          width: .01 * rootFontSize,
          color: 'rgba(0,0,0,.2)',
          type: "dashed"
        }
      }
    };
  };

  const getMarkLine = (chartData: any) => {
    const markLine: any = [];
    let maxMarkValue: number = 0;

    chartData.baseValue.forEach((item: IBaseValue) => {
      maxMarkValue = Math.max(item.value, maxMarkValue);
      markLine.push({
        lineStyle: {
          color: item.color,
          type: "dashed"
        },
        label: {
          formatter: `{a|${item.name} ${item.value}}`,
          rich: {
            a: {
              color: item.color,
              padding: [.3 * rootFontSize, 0, 0, -0.9 * rootFontSize]
            }
          }
        },
        yAxis: item.value
      })
    })

    return [markLine, maxMarkValue];
  }

  const drawChart = (chartData = props.chartData, optionIn = props.option): void => {
    if (!chartDom) {
      chartDom = document.getElementById(props.domId || domId as string);
    }
    if (!chartDom || !chartData) { return; }

    myChart = echarts.init(chartDom);
    const { dataZoomEnd } = props;
    const baseXaxisConfig = getCommonOption();
    const baseYaxisConfig = getCommonOption(false);
    const [markLine, maxMarkValue] = getMarkLine(chartData);
    const max = Math.ceil(Math.max.apply(undefined, [...chartData.seriesData, (maxMarkValue + Math.ceil(maxMarkValue / 10))]));

    const option: any = {
      tooltip: {
        show: true,
        trigger: 'axis',
        backgroundColor: "#FFF",
        textStyle: {
          color: "#333",
          fontSize: .16 * rootFontSize,
        },
        formatter:  (para: any) => {
          const time = para[0].axisValue.split("/").reverse()[0]
          return typeof para[0].value !== "undefined" ? `${chartData.date} ${time}
${chartData.selectPo}: ${para[0].value.toFixed(1)}` : "--"
        }
      },
      textStyle: {
        color: "rgba(255,255,255,.7)",
      },
      legend: {
        right: "4%",
        itemWidth: 0.08 * rootFontSize,
        itemHeight: 0.08 * rootFontSize,
        itemGap: 0.16 * rootFontSize,
        icon: "stack",
        textStyle: {
          color: "#909295",
          fontSize: 0.16 * rootFontSize
        }
      },
      grid: {
        top: '3%',
        left: '0%',
        bottom: '0%',
        right: '2%',
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        ...baseXaxisConfig,
        data: chartData.xAxisData,
      },
      yAxis: {
        type: "value",
        splitNumber: 4,
        max,
        ...baseYaxisConfig,
      },
      series: [{
        data: chartData.seriesData,
        type: 'line',
        showSymbol: true,
        symbol: 'circle',
        symbolSize: .03 * rootFontSize,
        smooth: true,
        markLine: {
          symbolSize: 0,
          data: markLine
        },
        itemStyle: {
          color: '#417DF5'
        },
        lineStyle: {
          width: .03 * rootFontSize,
          color: "#417DF5"
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#E0E6F9' // 0% 处的颜色
            }, {
              offset: 1, color: '#F7F9FF' // 100% 处的颜色
            }],
          }
        }
      }],
    };
    if (dataZoomEnd && dataZoomEnd > 0) {
      option.dataZoom = [
        {
          type: "slider",
          start: 0,
          end: dataZoomEnd,
          height: 0.07 * rootFontSize,
          width: 1.5 * rootFontSize,
          bottom: 0.03 * rootFontSize,
          left: "center",
          showDetail: false,
          borderColor: "transparent",
          fillerColor: "rgba(0,163,255,1)",
          backgroundColor: "rgba(0,163,255,0.2)",
          zoomOnMouseWheel: false,
          moveOnMouseMove: true,
          realtime: true,
          handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          handleSize: "130%",
          handleStyle: {
            color: "#fff",
            shadowBlur: 0.03 * rootFontSize,
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowOffsetX: 0.02 * rootFontSize,
            shadowOffsetY: 0.02 * rootFontSize
          },
        },
        {
          type: "inside",
          start: 0,
          end: dataZoomEnd,
          height: 0.05 * rootFontSize,
          top: "bottom",
          showDetail: false,
          borderColor: "transparent",
          zoomOnMouseWheel: false,
        },
      ]
    }
    if (props.option.yAxis instanceof Array) {
      option.yAxis = props.option.yAxis
    }

    myChart.clear();
    myChart.setOption(option);
    myChart.setOption(optionIn);
  };

  const resetChart = (isDraw: boolean = false) => {
    if (!myChart) { return; }
    myChart.clear();
    myChart.dispose();

    if (isDraw) {
      drawChart();
    }
  };

  return (
    <div className="baseLineEchart-container">
      {
        props.title !== "" ? <div className="baseLineEchart-title">{props.title}</div> : undefined
      }
      <div id={props.domId || domId} className="chart-content" style={{ display: props.chartData ? "block" : "none"}}/>
      <div className="nodata-tip center-y center-x" style={{ display: props.chartData ? "none" : "block" }}>{props.noneDataTips}</div>
    </div>
  )
}


export default Memo(BaseLineEchart); 
