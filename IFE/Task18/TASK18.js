var inputData = [];

function paint() {
  var data = document.getElementById("data");
  data.innerHTML = "";

  for (var arr in inputData) {
    var div = document.createElement("div");

    div.style.backgroundColor = "yellow";
    div.style.cursor = "pointer";
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.float = "left";
    div.style.marginRight = "20px";
    div.style.textAlign = "center";
    div.innerHTML = inputData[arr];
    data.appendChild(div); //或者去掉for in遍历数组，改为prepend()

    (function(arr) {
      div.addEventListener("click", function() {
        alert("Delete this one!");

        inputData.splice(arr, 1);
        paint();
      });
    })(arr);
  }
}

var leftin = document.getElementById("left-in");
var rightin = document.getElementById("right-in");
var leftout = document.getElementById("left-out");
var rightout = document.getElementById("right-out");

leftin.addEventListener("click", function() {
  var content = document.getElementsByClassName("form-input")[0].value;

  if (content == "") {
    alert("Please input something!");
  } else {

    inputData.unshift(content);
    paint();
  }
});

rightin.addEventListener("click", function() {
  var content = document.getElementsByClassName("form-input")[0].value;

  if (content == "") {
    alert("Please input something!");
  } else {
    inputData.push(content);
    paint();
  }
});

leftout.addEventListener("click", function() {
  var content = document.getElementsByClassName("form-input")[0].value;

  if (inputData.length==0) {
    alert("There are no numbers!");
  } else {
    alert(inputData[0]+" is deleted!");
    inputData.splice(0, 1);
    paint();
  }
});

rightout.addEventListener("click", function() {
  var content = document.getElementsByClassName("form-input")[0].value;

  if (inputData.length==0) {
    alert("There are no numbers!");
  } else {
    alert(inputData[inputData.length-1]+" is deleted!");
    inputData.pop();
    paint();
  }
});