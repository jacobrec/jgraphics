import React, { Component } from 'react'
import JGraphics from "./JGraphics"

class MyGame extends JGraphics {
    setup(){
        this.view.setDimensions(80, 60)
        this.view.isYAxisUpPositive(true)
        this.view.setCenter(40, 30)


        this.draw_mode = this.draw.MODE_LINE
        this.draw.background("rgb(49,49,49)")

        this.draw.rectangle(10, 10, 10, 10, "#0099CC")
        this.draw.ellipse(5, 5, 5, 5, "#0099CC")

        this.draw.triangle(0, 0, 1, 1, 1, 0, "#0099CC")
        this.draw.triangle(0, 0, 2, 2, 2, 0)

        this.draw.loadImage(require("./logo.png"))

        this.x = 0;
        this.y = 0;
    }

    loop(delta){
        //this.draw.image(require("./logo.png"), this.x, this.y, 10, 10)
        console.log(this.input.getMouse())
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <MyGame fps={1} id="jgraphic-panel" width="800" height="600"/>
            </div>
        );
    }
}

export default App
