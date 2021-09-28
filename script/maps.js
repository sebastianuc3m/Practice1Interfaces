function moveLeft(type) {
  let elements = [];
  for (var i=1; i<6; i++){
    elements[i-1] = document.getElementById(type+String(i));
  }

  for (var i=0; i<5; i++) {
    if (i<4) {
      var newId = type+String(i+2);
      elements[i].id = newId;
    }
    else if (i==4) {
      var newId = type+'1';
      elements[i].id = newId;
    }
  }
  var newNode = document.getElementById(type+'1');
  var referenceNode = document.getElementById(type+'2');
  var insertedNode = referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function moveRight(type) {
  let elements = [];
  for (var i=1; i<6; i++){
    elements[i-1] = document.getElementById(type+String(i));
  }

  for (var i=0; i<5; i++) {
    if (i == 0) {
      elements[i].id = type+'5';
    }

    if (i>0) {
      elements[i].id = type+String(i);
    }
  }

  var newNode = document.getElementById(type+'5');
  var referenceNode = document.getElementById(type+'4');
  var insertedNode = referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
