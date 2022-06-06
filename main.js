import './style.css'
import interact from 
'https://cdn.interactjs.io/v1.10.11/interactjs/index.js'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

function imageCreate(jsonObj) {
  jsonObj.forEach(image => {
    console.log(image.url);
    var img = document.createElement('img');
    img.src = image.url;
    img.alt = image.name;
    img.className = 'draggable';
    img.style.position = 'absolute';
    img.style.top = `${getRandomInt(500)}px`;
    img.style.left = `${getRandomInt(1000)}px`;
    document.getElementById('app').appendChild(img); 
  });
}


var requestURL = 'https://raw.githubusercontent.com/zuck-dev/sticker_louise/main/public/imagesList.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'txt';
request.send();

request.onload = function() {
  var Image = eval(request.response);
  console.table(Image);
  imageCreate(Image)

}

