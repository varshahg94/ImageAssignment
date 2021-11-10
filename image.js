var selected, tempArray;
//function to make service call and get all image details
function slideShowStart() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://picsum.photos/list');
    request.send();
    request.onload = () => {
        tempArray = JSON.parse(request.response);
        var idOfImage = tempArray.map(s => s.id)
        const shuffledArray = idOfImage.sort(() => 0.5 - Math.random());
        selected = shuffledArray.slice(0, 10);
        setImage(selected);

    }
}

window.onload = slideShowStart();

//Function for author name to be consistent 
const toTitleCase = (phrase) => {
    return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
//common function for attribute set
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

// set random images
function setImage(selected) {
    for (var i = 0; i < selected.length; i++) {
        const div = document.createElement("div");
        const innerDiv = document.createElement("div");
        if (i == 0)
            setAttributes(div, { "class": "item active", 'id': 'item' + i });
        else
            setAttributes(div, { "class": "item", 'id': 'item' + i });
        setAttributes(innerDiv, { "class": "col-sm-3", 'id': 'innerdiv' + i });
        const img = document.createElement("img");
        const h5 = document.createElement("h5");
        var itemNew = tempArray.find(itemNew => itemNew.id === selected[i]);
        img.src = "https://picsum.photos/200/300?image=" + selected[i];
        img.setAttribute('class', 'img-responsive');
        h5.textContent = toTitleCase(itemNew.author);
        document.querySelector(".carousel-inner").appendChild(div);
        document.getElementById('item' + i).appendChild(innerDiv);
        document.getElementById('innerdiv' + i).append(h5, img);

    }


    //For copying next slide elements
    $('.multi-image-carousel .item').each(function () {

        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i = 0; i < 2; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
    });
}
$('.multi-item-carousel').carousel({
    interval: false
});