export const ExportMap = {
    UNPACK_LOC: "input",
    MODULE_INIT: _input_init,
    isKeyPressed: _is_key_pressed,
    onKeyDown: _on_key_down,
    onKeyUp: _on_key_up,
    onMouseClick: _on_mouse_click,
    getMouse: _get_mouse,

    _mouse_x: 0,
    _mouse_y: 0,
    _is_mouse_clicked: false,
    _key_map: new Map(),
    _user_key_listeners: {
        up: new Map(),
        down: new Map(),
    },
    _user_click_listeners: []
}

function _input_init(self) {
    self._canvas.onmousemove = function (e) {
        self.input._mouse_x = self.view._get_world_x(e.clientX)
        self.input._mouse_y = self.view._get_world_y(e.clientY)
    }
    self._canvas.onmousedown = (e) => { self.input._is_mouse_clicked = true }
    self._canvas.onmouseup = (e) => { self.input._is_mouse_clicked = false }
    self._canvas.onmouseclick = (e) => {
        self.input._user_key_listeners.forEach((user) => {
            if (self.input._mouse_x > user.bounds.x &&
                self.input._mouse_x < user.bounds.x + user.bounds.width &&
                self.input._mouse_y > user.bounds.y &&
                self.input._mouse_y < user.bounds.y + user.bounds.height) {
                user.handler(self.input._mouse_x, self.input._mouse_y)
            }
        })
    }

    window.addEventListener("keydown", (e) => {
        self.input._key_map.set(e.key, true)
        if (self.input._user_key_listeners.down.has(e.key))
            self.input._user_key_listeners.down.get(e.key)()
    }, true);

    window.addEventListener("keyup", (e) => {
        self.input._key_map.set(e.key, false)
        if (self.input._user_key_listeners.up.has(e.key))
            self.input._user_key_listeners.up.get(e.key)()
    }, true);

}

function _is_key_pressed(self, key) {
    if (!self.input._key_map.has(key))
        return false
    return self.input._key_map.get(key)
}

function _on_key_down(self, key, handler) {
    self.input._user_key_listeners.down.set(key, handler)
}

function _on_key_up(self, key, handler) {
    self.input._user_key_listeners.up.set(key, handler)
}

function _on_mouse_click(self, handler, bounds = {}) {
    self.input._user_click_listeners.append({bounds, handler})
}

function _get_mouse(self) {
    return {
        x: self.input._mouse_x,
        y: self.input._mouse_y,
        isClicked: self.input._is_mouse_clicked
    }
}
