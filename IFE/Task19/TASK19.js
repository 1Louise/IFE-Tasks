var inputData = [];

function paint() {
  var data = document.getElementById("data");
  data.innerHTML = "";

  for (var arr in inputData) {
    var div = document.createElement("div");

    div.style.backgroundColor = "purple";
    div.style.height = inputData[arr];
    div.style.width = "20px";
    div.style.cursor = "pointer";
    div.style.marginRight = "8px";
    data.appendChild(div); //或者去掉for in遍历数组，改为prepend()

    (function(arr) {
      div.addEventListener("click", function() {
        alert("Delete this one!");

        inputData.splice(arr, 1);
        paint();
      });
    })(arr);  //循环取得arr
  }
}

var leftin = document.getElementById("left-in");
var rightin = document.getElementById("right-in");
var leftout = document.getElementById("left-out");
var rightout = document.getElementById("right-out");
var bubble = document.getElementById("bubble");

leftin.addEventListener("click", function() {
  var content = document.getElementsByClassName("form-input")[0].value;

  if (content == "" || !content.match(/^\d+$/)) {
    alert("Please input an integer!");
  } else if (inputData.length > 60) {
    alert("Numbers can not exceed 60!");
    return false;
  } else if (content >= 10 && content <= 100) {
    inputData.unshift(content);
    paint();
  } else {
    alert("Please input the number in 10-100!");
    return false;
  }
});

rightin.addEventListener("click", function() {
  var content = document.getElementsByClassName("form-input")[0].value;

  if (content == "" || !content.match(/^\d+$/)) {
    alert("Please input an integer!");
  } else if (inputData.length > 60) {
    alert("Numbers can not exceed 60!");
    return false;
  } else if (content >= 10 && content <= 100) {
    inputData.push(content);
    paint();
  } else {
    alert("Please input the number in 10-100!");
    return false;
  }
});

leftout.addEventListener("click", function() {
  var content = document.getElementsByClassName("form-input")[0].value;

  if (inputData.length == 0) {
    alert("There are no numbers!");
  } else {
    if (content >= 10 && content <= 100) {
      alert(inputData[0] + " is deleted!");
      inputData.splice(0, 1);
      paint();
    } else {
      alert("Please input the number in 10-100!");
      return false;
    }
  }
});

rightout.addEventListener("click", function() {
  var content = document.getElementsByClassName("form-input")[0].value;

  if (inputData.length == 0) {
    alert("There are no numbers!");
  } else {
    if (content >= 10 && content <= 100) {
      alert(inputData[inputData.length - 1] + " is deleted!");
      inputData.pop();
      paint();
    } else {
      alert("Please input the number in 10-100!");
      return false;
    }
  }
});

bubble.addEventListener("click", function() {
  var i = inputData.length - 1;
  var j = 0;
  var timer = setInterval(function() {
    if (j == i) {
      --i;
      j = 0;
    } else if (i < 1) {
      clearInterval(timer);
    } else if ((inputData[j] - inputData[j + 1]) > 0) { //使用inputData[j] > inputData[j + 1]，存的字符，因此'100'<'15'
      var t = inputData[j];
      inputData[j] = inputData[j + 1];
      inputData[j + 1] = t;
      paint();
      ++j;
    } else {
      ++j;
    }
  }, 300);
});