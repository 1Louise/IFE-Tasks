var treeroot = document.getElementById("treeroot");
var deep = document.getElementById("deep");
var wide = document.getElementById("wide");
var deepsearch = document.getElementById("deepsearch");
var widesearch = document.getElementById("widesearch");
var outputData = [];
var width = 0;
var timer, selected;

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
      if (value == outputData[i].firstChild.nodeValue.trim()) {
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

/*var divs = document.getElementsByTagName("div");

for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener("click", function(event) {
      reset();//先设置div的背景颜色为白色
      this.style.backgroundColor = "yellow";   //点击子元素，捕捉到click事件，事件冒泡，父元素也绑定了click事件，父元素也发现有click
      event.stopPropagation();//阻止事件冒泡
      selected=this;
    });
}*/

//使用事件代理，就不需要在添加了节点后又重新全部绑定事件了
treeroot.addEventListener("click", function(event) {
  var target = event.target;
  if (target && target.tagName == "DIV") {
    reset();
    target.style.backgroundColor = "yellow"; //点击子元素，捕捉到click事件，事件冒泡，父元素也绑定了click事件，父元素也发现有click
    event.stopPropagation(); //阻止事件冒泡
    selected = target;
  }
})

var budelete = document.getElementById("budelete");
var buadd = document.getElementById("buadd");

budelete.addEventListener("click", function() {
  selected.parentNode.removeChild(selected);
});

buadd.addEventListener("click", function() {
  var addtext = document.getElementById("addtext");

  var div = document.createElement("div");
  div.innerHTML = addtext.value;
  div.className = "added";
  selected.appendChild(div);
});