/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var chart=document.getElementsByClassName("aqi-chart-wrap")[0];  //第一个class
  chart.innerHTML = "";

  for(var date in chartData){
    var div=document.createElement("div");
    div.style.height=chartData[date];
    div.style.width="150px";
    div.style.backgroundColor = getRandomColor(); 
    chart.appendChild(div);

    //闭包 或 div.title = date + "[AQI]:" + chartData[date];
    (function(arg) {
      div.addEventListener("mouseover", function(){ 
        this.title=arg + " [AQI]: "+chartData[arg];
      });
    })(date);
    
  }
}

function getRandomColor(){
  return '#'+(function(color){
    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])&& (color.length == 6) ?  color : arguments.callee(color);
  })('');    
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  // 确定是否选项发生了变化
  
  
  if(pageState.nowGraTime!==event.target.value){
    pageState.nowGraTime=event.target.value;

  // 设置对应数据
    initAqiChartData();

  // 调用图表渲染函数
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  var nowCity=document.getElementById("city-select").value;
  // 确定是否选项发生了变化 
  if(pageState.nowSelectCity!=nowCity){
    pageState.nowSelectCity=nowCity;
  
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();

  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var form = document.getElementById("form-gra-time");
  form.addEventListener("change",function(event){
    graTimeChange(event);
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select=document.getElementById("city-select");
  select.innerHTML="";
  for (var city in aqiSourceData){
    var option=document.createElement("option");
    option.innerHTML=city;
    select.appendChild(option);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.addEventListener("change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var city = pageState.nowSelectCity;
  var graTime = pageState.nowGraTime;
  chartData = {};    //变成空对象

  switch (graTime) {
    case "day":
      chartData = aqiSourceData[city];
    break;

    case "week":
      var total = 0;
      var count = 0;
      var week = 1;
      for (var date in aqiSourceData[city]) {
        var day = new Date(date);
        if (day.getDay() == 0) {    //getDay()方法表示的数字为周几，周日为0，周六为6
          count++;
          total += aqiSourceData[city][date];

          chartData["第" + week + "周"] = total / count;
          week++;

          total = 0;
          count = 0;

        } else {
          count++;
          total += aqiSourceData[city][date];
        }
      }

      if(count!=0){
        chartData["第" + week + "周"]=total/count;   //最后几个数据，没有满一周的情况
      }
    break;

    case "month":
      var total=0;
      var count=0;
      var month=0;
      for (var date in aqiSourceData[city]) {
        var day = new Date(date);
        if(month == day.getMonth()){
          total += aqiSourceData[city][date];
          count++;
        }else{
          month++;
          chartData[ month +"月"]=total/count;
          total = aqiSourceData[city][date];
          count = 1;
        }
      }
      if(count!=0){
          month++;
          chartData[ month +"月"]=total/count;  //最后一个月的数据
        }
    break;

    default:;

  }
  

  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

window.onload = init;