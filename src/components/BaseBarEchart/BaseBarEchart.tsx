import * as React from "react";
import * as echarts from "echarts";
import { useMappedState, IStoreState } from "store/store";
import { Memo, useEffect, useCallback } from "utils/declare";
import { IProps } from "./base-bar-echart.d";

import "./BaseBarEchart.less";

const defaultProps: IProps = {
  option: {},
  noneDataTips: "暂无数据",
  dataZoomEnd: 0,
  chartData: {},
  title: "",
}

BaseBarEchart.defaultProps = JSON.parse(JSON.stringify(defaultProps));

function BaseBarEchart(props: IProps): JSX.Element {
  const domId = `${new Date().getTime() + Math.floor(Math.random() * 1000)}BaseBarEchart`
  let myChart: any;
  let chartDom: any;

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


  const drawChart = (chartData = props.chartData, optionIn = props.option): void => {
    if (!chartDom) {
      chartDom = document.getElementById(props.domId || domId as string);
    }
    if (!chartDom || !chartData) { return; }

    myChart = echarts.init(chartDom);
    const dataAxis = chartData.xAxisData;
    const data = chartData.seriesData;
    const option: any = {
      tooltip: {
        show: true,
        trigger: 'axis',
        backgroundColor: "#FFF",
        textStyle: {
          color: "#333",
          fontSize: .16 * rootFontSize,
        },
      },
      grid: {
        left: .16 * rootFontSize * 5,
        top: .16 * rootFontSize * 2,
        right: .16 * rootFontSize * 5,
        bottom: .16 * rootFontSize * 5,
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          textStyle: {
            color: '#333',
            fontSize: .14 * rootFontSize,
          },
          rotate: -45,
          show: true,
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(51,51,51,0.2)"
          }
        },
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "rgba(51,51,51,0.7)",
            fontSize: .16 * rootFontSize,
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(51,51,51,0.2)"
          }
        }
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ]
              )
            }
          },
          data
        }
      ]
    };

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
      {
        props.chartData ? <div id={props.domId || domId} className="chart-content" />
          : <div className="nodata-tip center-y center-x">{props.noneDataTips}</div>
      }
    </div>
  )
}


export default Memo(BaseBarEchart); 
