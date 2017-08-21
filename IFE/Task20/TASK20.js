var inputData = [];

function paint(array) {
  var data = document.getElementById("data");
  data.innerHTML = "";

  for (var arr in array) {
    var div = document.createElement("div");
//最好采用设置div的className, 例：div.className="display"，可分离js与css代码
    div.style.backgroundColor = "yellow";
    div.style.cursor = "pointer";
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.float = "left";
    div.style.marginRight = "20px";
    div.style.textAlign = "center";
    div.innerHTML = array[arr];
    data.appendChild(div); //或者去掉for in遍历数组，改为prepend()

    (function(arr) {
      div.addEventListener("click", function() {
        alert("Delete this one!");

        array.splice(arr, 1);
        //inputData中也要删除对应项，且需要传入array 不然点击删除后，不能重绘剩余内容
        inputData.splice(arr,1);
        paint(array);
      });
    })(arr);
  }
}

var leftin = document.getElementById("left-in");
var rightin = document.getElementById("right-in");
var leftout = document.getElementById("left-out");
var rightout = document.getElementById("right-out");
var search = document.getElementById("search");

function judge(contnt) { //判断输入内容是否为空
  if (contnt.length < 1) {
    alert("Please input something!");
    return false;
  } else {
    return true;
  };
}

function nullEle(contnt) { //判断是否有空元素，如果有，删除
  for (var arr in contnt) {
    if (contnt[arr] == "") {
      contnt.splice(arr, 1);
    }
  }
}

leftin.addEventListener("click", function() {
  var content = document.getElementsByClassName("form-input")[0].value;//将输入的值转化成一个数组
  var contentarr = content.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/); // ^在方括号表达式中使用表示不接受该字符集合
  nullEle(contentarr);

  if (judge(contentarr)) {
    inputData = contentarr.concat(inputData);
    paint(inputData);
  }
});

rightin.addEventListener("click", function() {
  var content = document.getElementsByClassName("form-input")[0].value;
  var contentarr = content.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
  nullEle(contentarr);

  if (judge(contentarr)) {
    inputData = inputData.concat(contentarr);
    paint(inputData);
  }
});

leftout.addEventListener("click", function() {
  if (inputData.length == 0) {
    alert("There are no numbers!");
  } else {
    alert(inputData[0] + " is deleted!");
    inputData.splice(0, 1);
    paint(inputData);
  }
});

rightout.addEventListener("click", function() {
  if (inputData.length == 0) {
    alert("There are no numbers!");
  } else {
    alert(inputData[inputData.length - 1] + " is deleted!");
    inputData.pop();
    paint(inputData);
  }
});

search.addEventListener("click", function() {
  var searchcont = document.getElementsByClassName("form-search")[0].value;
  var changeData = [];

  for (var i = 0; i < inputData.length; i++) {
    changeData[i] = inputData[i];
  }

  for (var arr in inputData) {
    if (inputData[arr].match(searchcont)) {
      changeData[arr] = inputData[arr].replace(new RegExp(searchcont, "g"), "<span>" + searchcont + "</span>");
      paint(changeData);
      var span = document.getElementsByTagName("span");
      for (var i = 0; i < span.length; i++) {
        span[i].style.backgroundColor = "red";  //还可以先paint，再依次取div出来，去进行正则匹配
      }
    }
  }
});

/*两种方法：1. 对inputData = ["哈韩"， “韩寒”]，进行replace，只是让字符串数组改成了 inputData= ["哈<span>韩</span>", "<span>韩</span>寒"]
本身html并没有改变，需要依照inputData里的值创建html里的element
2. 已经创建了div, html里已经有了 <div>哈韩</div><div>韩寒</div>，
这时候获取element 后，replace div里面的innerHTML, 变成<div>哈<span>韩</span></div>，这样就是在html上改变了的

*/
