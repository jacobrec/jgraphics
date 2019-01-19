# JGraphics
A simple graphics tool, for react


## Example Usage
```
import React, { Component } from 'react'
import JGraphics from "./JGraphics"

class MyGame extends JGraphics {
    // Setup is called once
    setup(){ /* Any JGraphic method can be used here */ }

    // Loop is called many times based on the fps
    loop(delta){ /* Any JGraphic method can be used here */ }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <!-- Shown below are the default props, any can be left out -->
        <MyGame fps={60} id="jgraphic-panel" width="800" height="600"/>
        <!-- Be careful no two panels have the same ID -->
      </div>
    );
  }
}

```
## Methods
### View Methods
#### Set Dimensions
`function setDimensions(width, height)`
Sets the dimensions used for rendering things. A 1x1 square will look much
bigger in a 10x10 panel then a 100x100 panel
Usage: `this.view.setDimensions(80, 60)`

#### Set Center
`function setCenter(x, y)`
Sets the center of the view, by default it is (0, 0)
Usage: `this.view.setCenter(40, 30)`

#### Is Y Axis Up Positive
`function isYAxisUpPositive(bool)`
If true, it will set the y axis so that higher up the screen is higher
coordinates. Older graphics systems sometimes had the top left corner as (0, 0).
For that effect, you would need to set this false.
Usage: `this.view.isYAxisUpPositive(true)`


### Graphics Methods
#### Set Mode
`function setMode(mode)`
Switch between line and fill mode. Is fill mode by default
Usage: `this.draw.setMode(this.draw.MODE_FILL)`
Usage: `this.draw.setMode(this.draw.MODE_LINE)`

#### Background
`function background(color)`
Sets the background color. You may want to call this at the start of each loop.
Color may be any valid html color. Eg) "blue", "#0099cc", "rgb(0, 100, 200)"
Usage: `this.draw.background("blue")`

#### Ellipse
`function ellipse(x, y, width, height [, color])`
Draws an ellipse, centered on (x+width/2, y+height/2). If no colour is provided,
it will use the last used color, probably the background color. Respects the draw mode
Usage: `this.draw.ellipse(0, 0, 20, 20, "blue")`
Usage: `this.draw.ellipse(0, 0, 20, 20)`

#### Rectangle
`function rectangle(x, y, width, height [, color])`
Draws an rectangle, centered on (x+width/2, y+height/2). If no colour is provided,
it will use the last used color, probably the background color. Respects the
draw mode
Usage: `this.draw.rectangle(0, 0, 20, 20, "blue")`
Usage: `this.draw.rectangle(0, 0, 20, 20)`

#### Triangle
`function triangle(x1, y1, x2, y2, x3, y3 [, color])`
Draws a triangle, at the 3 points. If no colour is provided, it will use the
last used color, probably the background color. Respects the draw mode

Usage: `this.draw.triangle(0, 0, 1, 1, 1, 0, "#0099CC")`
Usage: `this.draw.triangle(0, 0, 2, 2, 2, 0)`

#### Image
`function image(imgPath, x, y, width, height)`
Draws an image, centered on (x+width/2, y+height/2). Images should be loaded
first with the loadImage function. If the image is not yet loaded, nothing will
be drawn
Usage: `this.draw.image(require("./logo.png"), 10, 10, 10, 10)`

#### Load Image
`function loadImage(imgPath)`
Loads an image. This is not instant. It is recommended to load images in setup,
then draw them in loop
Usage: `this.draw.image(require("./logo.png"), 10, 10, 10, 10)`

#### Load Image
`function isImageLoaded(imgPath)`
returns true if the image is loaded
Usage: `this.draw.isImageLoaded(require("./logo.png"))`


### Input Methods
#### isKeyPressed: _is_key_pressed,
#### onKeyDown: _on_key_down,
#### onKeyUp: _on_key_up,
#### onMouseClick: _on_mouse_click,
#### getMouse: _get_mouse,
