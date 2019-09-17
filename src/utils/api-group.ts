export const weatherApi = {
    weatherDay: "/pubserver/commonapi/gis/weatherDay"
  };
  
  export const loginApi = {
    login: "bizunit1/api/user/login",
    projectId: "bizunit1/api/user/project/getProjectByCodeTp",
    checkAuth: "bizunit1/api/user/user/getUserBasicInfo"
  };
  
  
  let baseUrl = ""
  
  if(process.env.NODE_ENV !== "development"){
    baseUrl = "bizunit1/api/smellywater/"
  }
  
  export const gisApi = {
      statistics: baseUrl+"smellyWater/gisStatistics",
      gisShow: baseUrl+"smellyWater/gisShow", // GIS展示
      gisDetail: baseUrl+"smellyWater/blackodorDetail",
      gisChart: baseUrl+"smellyWater/lineChart",
      gisSearch: baseUrl + "gis/searchName"
  } 