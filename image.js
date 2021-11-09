
var selected,tempArray;
//function to make service call and get all image details
function slideShowStart() {
    var request = new XMLHttpRequest();
	request.open('GET', 'https://picsum.photos/list');
	request.send();
	request.onload = ()=>{
	tempArray=JSON.parse(request.response);
	var idOfImage=tempArray.map(s=>s.id)
   const shuffledArray = idOfImage.sort(() => 0.5 - Math.random());
	selected = shuffledArray.slice(0, 10);
	setImage(selected);
    
  }  
 } 

window.onload = slideShowStart();
// set random images
function setImage(selected) {
    for(var i=0;i<selected.length;i++){
    const div = document.createElement("div");
	div.setAttribute('class', 'item');
	div.setAttribute('id', 'item'+i);
	const img = document.createElement("img");
	const h2 = document.createElement("h2");
	var itemNew = tempArray.find(itemNew => itemNew.id === selected[i]);
	img.src = "https://picsum.photos/200/300?image="+selected[i];
	h2.textContent = itemNew.author;
    document.querySelector(".imageSlider").appendChild(div);
	document.getElementById('item'+i).appendChild(h2);
	document.getElementById('item'+i).appendChild(img);
   }
 }

var imageSlider =document.getElementsByClassName("imageSlider");
for (let index = 0; index < imageSlider[0].children.length; index++) {
    imageSlider[0].children[index].style.width=parseInt(100/imageSlider[0].children.length)+"%";
}

var btnForNav=function(direction)
{
    var div=document.createElement("div");
    div.setAttribute("class",direction);
    imageSlider[0].after(div);
}

btnForNav("left");
btnForNav("right");
var i=0;
var right=document.getElementsByClassName("right");
var left=document.getElementsByClassName("left");

// function for handling arrow key
var showNav=function(index)
{
    if(index==0)
    {
        left[0].style.display="none";
    }else if(index==1)
    {
        left[0].style.display="block";
        right[0].style.display="block";
    }else
    {
        right[0].style.display="none";
    }
}
//Function for Navigation
let navigation=function(index,dir,point)
{
    imageSlider[0].style.transform="translate3d(0,0,0)";
    if(index===1 && dir=="right")
    {
        imageSlider[0].style.transform="translateX(-"+1.95*100/imageSlider[0].children.length+"%)";
        
    }
    if(index==2)
    {
        imageSlider[0].style.transform="translateX(-"+(1.95+0.86)*100/imageSlider[0].children.length+"%)";
        
    }
    
    if(index==0)
    {
        imageSlider[0].style.transform="translateX(0)"
        
    }else if(index===1 && dir=="left")
    {
        imageSlider[0].style.transform="translateX(-"+0.87*100/imageSlider[0].children.length+"%)"
        
    }
}

showNav(0);
right[0].addEventListener("click",function(){
    i++;
    showNav(i);
    navigation(i,"right");
})
left[0].addEventListener("click",function()
{
    i--;
    showNav(i,"left");
    navigation(i,"left");
})
