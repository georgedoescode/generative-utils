function createCoordsTransformer(svg) {
  const pt = svg.createSVGPoint();

  return function (e) {
    pt.x = e.clientX;
    pt.y = e.clientY;

    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };
}

export { createCoordsTransformer };
