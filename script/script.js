var last_width = 1280;

function mapResize () {
  if (last_width != screen.width) {
    last_width = screen.width;
    if (screen.width <= 768 && screen.width > 600) {
      document.getElementById('barna-area').coords = "160,290,200,325";
      document.getElementById('milan-area').coords = "255,205,320,260";
      document.getElementById('vienna-area').coords = "330,180,370,220";
    }

    else if (screen.width <= 600) {
      document.getElementById('barna-area').coords = "130,280,170,325";
      document.getElementById('milan-area').coords = "220,220,280,255";
      document.getElementById('vienna-area').coords = "270,180,310,220";
    }
  }
}

setInterval(mapResize, 1);
