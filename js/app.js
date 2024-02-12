(function() {
  const INITIAL = {
    X: null,
    Y: null,
  }

  const INITIAL_MARGIN = {
    X: null,
    Y: null,
  }

  function distance(a, b) {
    return a - b
  }

  function currentMargin(id) {
    const p = document.getElementById("layer-1")
    var style = p.currentStyle || window.getComputedStyle(p)

    return {
      X: parseFloat(style.marginLeft.slice(0, -2)),
      Y: parseFloat(style.marginTop.slice(0, -2)),
    }
  }

  function bounded(distance) {
    if ( distance > 200 ) {
      return 200
    } else if (distance < -200) {
      return -200
    }

    return distance
  }

  function getPosition(element) {
    var rect = element.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top
    };
  }

  function directionVariance(point, variance) {
    return point
    if ( variance % 2 == 0 ) {
      return -point
    } else {
      return point
    }
  }

  function withVariance({x, y}, variance) {
    return {
      x: directionVariance(x * Math.sin(( Math.PI )/26 * variance), variance),
      y: directionVariance(y * Math.sin(( Math.PI )/26 * variance), variance),
    }
  }

  function spread(event, id, variance) {
    const layer = document.getElementById(id)
    const distances = withVariance({
      x: distance(INITIAL.X, event.pageX),
      y: distance(INITIAL.Y, event.pageY),
    }, variance)

    console.log(distances);
    layer.style.top = bounded(distances.y) + 'px'
    layer.style.left = bounded(distances.x) + 'px'
  }

  document.onmousemove = handleMouseMove;
  function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    if (!INITIAL.X && !INITIAL.Y) {
      INITIAL.X = event.pageX
      INITIAL.Y = event.pageY
      margins = currentMargin("layer-1")
      INITIAL_MARGIN.X = margins.X
      INITIAL_MARGIN.Y = margins.Y
    } else {
      for (let i = 2; i <= 27; i++) {
        const variance = i
        spread(event, "layer-" + i, variance)
      }
    }
  }
})();
