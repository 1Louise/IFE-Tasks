var treeroot = document.getElementById("treeroot");
var deep = document.getElementById("deep");
var wide = document.getElementById("wide");
var deepsearch = document.getElementById("deepsearch");
var widesearch = document.getElementById("widesearch");
var outputData = [];
var width = 0; //广度优先遍历的索引值
var timer;

function deeptranverse(node) {
  if (!(node == null)) {
    outputData.push(node);
    for (var i = 0; i < node.children.length; i++) {
      deeptranverse(node.children[i]);
    }
  }
}

function widetranverse(node) {
  if (!(node == null)) {
    outputData.push(node);
    widetranverse(node.nextElementSibling);
    node = outputData[width++];
    widetranverse(node.firstElementChild);
  }
}

function change(value) {
  var i = 0;
  timer = setInterval(function() { //不能使用for循环，否则还没到间隔时间，已经完成了全部操作
    if (i == 0) {
      if (value == outputData[i].firstChild.nodeValue.trim()) {
        outputData[i].style.backgroundColor = "red";
      } else {
        outputData[i].style.backgroundColor = "blue";
      }
      ++i;
    } else if (i > 0 && i < outputData.length) {
      /*if (value == outputData[i].firstChild.nodeValue.trim()) {
        if (outputData[i - 1].style.backgroundColor == "red") {
          outputData[i].style.backgroundColor = "red";
        } else {
          outputData[i].style.backgroundColor = "red";
          outputData[i - 1].style.backgroundColor = "white";
        }
      } else {
        if (outputData[i - 1].style.backgroundColor == "red") {
          outputData[i].style.backgroundColor = "blue";
        } else {
          outputData[i].style.backgroundColor = "blue";
          outputData[i - 1].style.backgroundColor = "white";
        }
      }*/

      // 简化： 遍历到i时，如果i为查找值，设置红色背景否则蓝色背景；再看i-1,若i-1不为查找值，设置白色
      if (value == outputData[i].firstChild.nodeValue.trim()) {
        outputData[i].style.backgroundColor = "red";
      } else {
        outputData[i].style.backgroundColor = "blue";
      }

      if (value != outputData[i - 1].firstChild.nodeValue.trim()) {
        outputData[i - 1].style.backgroundColor = "white";
      }

      ++i;
    } else {
      if (outputData[i - 1].style.backgroundColor != "red") {
        outputData[i - 1].style.backgroundColor = "white";
      }
      clearInterval(timer);
    }
  }, 600);
}

function reset() {
  outputData = [];

  //reset时width也要置0，否则第二次查找的无法进行
  width = 0;
  clearInterval(timer);
  var divs = document.getElementsByTagName("div");
  for (var i = 0; i < divs.length; i++) {
    divs[i].style.backgroundColor = "white";
  }
}

deep.addEventListener("click", function() {
  reset();
  deeptranverse(treeroot);
  change();
});

wide.addEventListener("click", function() {
  reset();
  widetranverse(treeroot);
  change();
})

deepsearch.addEventListener("click", function() {
  var search = document.getElementById("search").value;
  reset();
  deeptranverse(treeroot);
  change(search);
});

widesearch.addEventListener("click", function() {
  var search = document.getElementById("search").value;
  reset();
  widetranverse(treeroot);
  change(search);
});