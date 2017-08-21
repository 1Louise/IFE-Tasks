var treeroot = document.getElementById("treeroot");
var opre = document.getElementById("opre");
var oin = document.getElementById("oin");
var opost = document.getElementById("opost");
var outputData = [];
var timer;

function preOrder(node) {
  if (!(node == null)) {
    outputData.push(node); //node赋值就是赋get到的element
    preOrder(node.firstElementChild);
    preOrder(node.lastElementChild);
  }
}

function inOrder(node) {
  if (!(node == null)) {
    inOrder(node.firstElementChild);
    outputData.push(node);
    inOrder(node.lastElementChild);
  }
}

function postOrder(node) {
  if (!(node == null)) {
    postOrder(node.firstElementChild);
    postOrder(node.lastElementChild);
    outputData.push(node);
  }
}

function change() {
  var i = 0;
  timer = setInterval(function() { //不能使用for循环，否则还没到间隔时间，已经完成了全部操作
    if (i == 0) {
      outputData[i].style.backgroundColor = "cyan";
      ++i;
    } else if (i > 0 && i < outputData.length) {
      outputData[i].style.backgroundColor = "cyan";
      outputData[i - 1].style.backgroundColor = "white";
      ++i;
    } else {
      outputData[i-1].style.backgroundColor = "white";
      clearInterval(timer);
    }
  }, 600);
}

function reset(){
  outputData=[];
  clearInterval(timer);
  var divs=document.getElementsByTagName("div");
  for(var i=0;i<divs.length;i++){
    divs[i].style.backgroundColor="white";
  }
}

opre.addEventListener("click", function() {
  reset();
  preOrder(treeroot);
  change();
});

oin.addEventListener("click",function(){
  reset();
  inOrder(treeroot);
  change();
});

opost.addEventListener("click",function(){
  reset();
  postOrder(treeroot);
  change();
});