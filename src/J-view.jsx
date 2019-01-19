export const ExportMap = {
    UNPACK_LOC: "view",
    MODULE_INIT: (self) => {_set_center(self, 0, 0)},
    setDimensions: _set_dimensions,
    isYAxisUpPositive: _is_y_axis_up_positive,
    setCenter: _set_center,
    _get_canvas_x: _get_canvas_x,
    _get_canvas_y: _get_canvas_y,
    _scale_canvas_x: _scale_canvas_x,
    _scale_canvas_y: _scale_canvas_y,
    _get_world_x: _get_world_x,
    _get_world_y: _get_world_y,
    _scale_world_x: _scale_world_x,
    _scale_world_y: _scale_world_y,
}
function _set_dimensions(self, width, height){
    self.width = width
    self.height = height
}

function _is_y_axis_up_positive(self, isYFlipped) {
    self.isYFlipped = isYFlipped
}

function _set_center(self, x, y) {
    self.center = {x, y}
}

function _get_canvas_x(self, x) {
    return ((self.width/2 - self.center.x + x) / self.width) * self._width
}

function _get_canvas_y(self, y, height) {
    const tmp = () => (((self.height/2 - self.center.y + y) / self.height) * self._height)
    if(self.isYFlipped)
        return self._height - tmp() - (height ? _scale_canvas_y(self, height) : 0)
    return tmp()
}

function _scale_canvas_x(self, x) {
    return (x / self.width) * self._width
}

function _scale_canvas_y(self, y) {
    return (y / self.height) * self._height
}

function _get_world_x(self, x) {
    return x / self._width * self.width - self.width/2 + self.center.x
}

function _get_world_y(self, y, height) {
    if(self.isYFlipped)
        y = self._height - y

    return y / self._height * self.height - self.height/2 + self.center.y
}

function _scale_world_x(self, x) {
    return (x / self._width) * self.width
}

function _scale_world_y(self, y) {
    return (y / self._height) * self.height
}
