export const ExportMap = {
  UNPACK_LOC: "draw",
  MODULE_INIT: (self) => {},
  MODE_FILL: "fill",
  MODE_LINE: "line",
  background: _draw_background,
  ellipse: _draw_ellipse,
  rectangle: _draw_rectangle,
  triangle: _draw_triangle,
  line: _draw_line,
  image: _draw_image,
  isImageLoaded: _draw_is_img_loaded,
  loadImage: _draw_get_img,
}

function _set_color(self, color, force_fill, force_line) {
  if(!color)
    return
  if(force_line)
    self._context.strokeStyle = color
  else if(self.draw_mode === self.draw.MODE_FILL || force_fill)
    self._context.fillStyle = color
  else if(self.draw_mode === self.draw.MODE_LINE)
    self._context.strokeStyle = color
}

function _draw_background(self, color) {
  _set_color(self, color, true)
  self._context.fillRect(0, 0, self._width, self._height)
}


function _draw_line(self, x1, y1, x2, y2, color) {
  _set_color(self, color, true, true)

  self._context.beginPath();
  self._context.moveTo(self.view._get_canvas_x(x1), self.view._get_canvas_y(y1));
  self._context.lineTo(self.view._get_canvas_x(x2), self.view._get_canvas_y(y2));
  self._context.closePath()

  self._context.stroke()

}

function _draw_ellipse(self, x, y, width, height, color) {
  _set_color(self, color)
  // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
  self._context.beginPath();
  self._context.ellipse(
    self.view._get_canvas_x(x)+self.view._scale_canvas_x(width)/2, self.view._get_canvas_y(y, height)+self.view._scale_canvas_y(height)/2,
    self.view._scale_canvas_x(width)/2, self.view._scale_canvas_y(height)/2,
    0, 0, 2*Math.PI, false
  )

  self._context.closePath()
  _draw_finish(self)
}

function _draw_rectangle(self, x, y, width, height, color) {
  _set_color(self, color)

  if(self.draw_mode === self.draw.MODE_FILL) {
    self._context.fillRect(
      self.view._get_canvas_x(x), self.view._get_canvas_y(y, height),
      self.view._scale_canvas_x(width), self.view._scale_canvas_y(height)
    )
  }else {
    self._context.strokeRect(
      self.view._get_canvas_x(x), self.view._get_canvas_y(y, height),
      self.view._scale_canvas_x(width), self.view._scale_canvas_y(height)
    )
  }
}

function _draw_image(self, img_path, x, y, width, height) {
  self._context.drawImage(_draw_get_img(self, img_path),
    self.view._get_canvas_x(x), self.view._get_canvas_y(y, height),
    self.view._scale_canvas_x(width), self.view._scale_canvas_y(height)
  )
}

function _draw_triangle(self, x1, y1, x2, y2, x3, y3, color) {
  _set_color(self, color)

  self._context.beginPath();
  self._context.moveTo(self.view._get_canvas_x(x1), self.view._get_canvas_y(y1));
  self._context.lineTo(self.view._get_canvas_x(x2), self.view._get_canvas_y(y2));
  self._context.lineTo(self.view._get_canvas_x(x3), self.view._get_canvas_y(y3));
  self._context.closePath()

  _draw_finish(self)
}

function _draw_finish(self) {
  if(self.draw_mode === self.draw.MODE_FILL) {
    self._context.fill()
  }else{
    self._context.stroke()
  }
}

function _draw_is_img_loaded(self, path) {
  if(!self._image_map.has(path))
    return false
  return self._image_map.get(path).complete
}

function _draw_get_img(self, path) {
  if(self._image_map.has(path)) {
    return self._image_map.get(path)
  }
  let img = new Image()
  img.src = path

  self._image_map.set(path, img)
  return self._image_map.get(path)
}
