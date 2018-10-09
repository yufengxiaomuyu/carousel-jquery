import '../css/index.css';

let $ct = $('.carousel .img-ct');
let $items = $('.img-ct li');
let $bullets = $('.bullet li')
let imgWidth = $items.width();
let imgCount = $items.length;
let pageIndex = 1;
let isAnimate = false;
let isFocus = false;

//初始化
function init() {
	$ct.prepend($items.last().clone());
	$ct.append($items.first().clone());
	let imgRealCount = $(".img-ct li").length;
	$ct.css({left: -imgWidth,width: imgWidth*imgRealCount});
	autoPlay();
}

//设置分页按钮
function setBullet(index){
	$bullets.removeClass("active").eq(index-1).addClass("active");
};

//播放图片
function playImg(number){
	if (isAnimate === true) return;
	isAnimate = true;
	$ct.animate({left: -pageIndex*imgWidth - number*imgWidth},1000,function(){
		pageIndex += number;
		if (pageIndex === 0) {
			pageIndex = imgCount;
			$ct.css({left: -pageIndex*imgWidth});
		} else if(pageIndex === (imgCount+1)) {
			pageIndex = 1;
			$ct.css({left: -pageIndex*imgWidth});
		}; 
		setBullet(pageIndex);
		isAnimate = false;
		console.log(pageIndex);
	});
};

//单击上、下页按钮
$(".carousel .pre").click(function(){
		playImg(-1);
});
$(".carousel .next").click(function(){
		playImg(1);
});

//单击分页按钮
$bullets.click(function(){
	let newIndex = $(this).index()+1;
	if (newIndex === pageIndex) return;
	playImg(newIndex-pageIndex);
});

//鼠标移至图片时聚焦
$('.carousel').hover(
	function() {
		isFocus = true;
	},
	function() {
		isFocus = false;
	},
);

//自动播放
function autoPlay() { 
	setInterval(function(){
		if(isFocus === true) return;
		playImg(1);
	},2000);
};

//页面加载完毕时执行初始化函数
window.onload = init;