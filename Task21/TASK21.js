var content = document.getElementsByClassName("input-text")[0];
var inputData;
var sourceData = [];
var textData;
var hobbyData = [];
var data = document.getElementById("data");

function render(object, array) {
  object.innerHTML = "";

  for (var arr in array) {
    var div = document.createElement("div");
    div.className = "display";
    div.innerHTML = array[arr];
    object.appendChild(div);

    (function(arr) {
      div.addEventListener("mouseover", function() {
        this.style.backgroundColor = "red"; //不能使用div，这里的div在调用事件处理函数时，是去找的外面循环最后一次创建的这个div，而this才指向的是当前被点击的
        this.innerHTML = "删除：" + array[arr];
      });
    })(arr);
    (function(arr) {
      div.addEventListener("mouseout", function() {
        this.style.backgroundColor = "yellow";
        this.innerHTML = array[arr];
      });
    })(arr);
    (function(arr) {
      div.addEventListener("click", function() {
        array.splice(arr, 1);
        render(object, array);
      });
    })(arr);
  }

  // 可以使用事件代理，事件绑定在object上，然后判断event.target是否是class为display的div
  // 当前这种渲染逻辑下不太好用事件代理，只需要在object绑定一次，而不能每次调用render都在object上绑定一次
  /*object.addEventListener("mouseover", function(event) {
    var target = event.target;
    if (event.target && event.target.className == "display") {
      target.style.backgroundColor = "red";
      target.innerHTML = "删除：" + target.textContent;
    }
  });

  object.addEventListener("mouseout", function(event) {
    var target = event.target;
    if (event.target && event.target.className == "display") {
      target.style.backgroundColor = "yellow";
      target.innerHTML = target.textContent.replace(/删除：/, "");
    }
  });*/
}

function match(para) { //判断是否重复
  for (var i = 0; i < sourceData.length; i++) {
    if (sourceData[i] == para) {
      return true;
    }
  }
  //最好加上一个return false
  return false;
}

content.addEventListener("keyup", function(event) {
  // 可以输入"3  4"的原因在于，输入空格后，空格还没keyup,又输入了4，最终keyup时，获取的inputData就成了"3  4"
  // 此时要么选择删除空格后的输入，即只取3
  /*if (event.keyCode != 13 && event.keyCode != 32 && event.keyCode != 188) {
    inputData = this.value.trim(); //按键起来的这个value
  } else*/
  if (event.keyCode == 13 || event.keyCode == 32 || event.keyCode == 188) {
    // inputData在输入了空格，逗号，回车的时候赋值即可
    // 通过split去掉第一个空格，逗号，回车后的内容
    inputData = this.value.trim().split(/[,\s\n]+/)[0];
    if (match(inputData)) {
      content.value = "";
    } else if (sourceData.length >= 10) {
      sourceData.splice(0, 1);
      sourceData.push(inputData);
      render(data, sourceData);
      content.value = "";
    } else if (inputData != "" && inputData != undefined) { // 不能用null来比较，获取input里的值时，input的value至少为"", 不会为null
                                                            // 当inputData尚未赋值时，inputData为undefined
      sourceData.push(inputData);
      render(data, sourceData);
      content.value = "";
    } else {
      content.value = "";
    }
  }
});

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

var confirm = document.getElementById("confirm");
var hobby = document.getElementById("hobby");

function noRepeat(array) { //去重
  for (var i = 0; i < hobbyData.length; i++) {
    for (var j = 0; j < array.length; j++) {
      if (hobbyData[i] == array[j]) {
        array.splice(j, 1);
      }
    }
  }
}

confirm.addEventListener("click", function() {
  var textarea = document.getElementsByClassName("input-textarea")[0].value;
  var txtarr = textarea.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
  nullEle(txtarr);

  if (judge(txtarr)) {
    if (hobbyData.length >= 10) {
      noRepeat(txtarr);
      hobbyData.splice(0, txtarr.length);
      hobbyData = hobbyData.concat(txtarr);
      render(hobby, hobbyData);
    } else {
      noRepeat(txtarr);
      hobbyData = hobbyData.concat(txtarr);
      render(hobby, hobbyData);
    }
  }
});