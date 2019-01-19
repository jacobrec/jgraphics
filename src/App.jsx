import React, { Component } from 'react'
import JGraphics from "./JGraphics"

class MyGame extends JGraphics {
    setup(){
        this.view.setDimensions(80, 60)
        this.view.isYAxisUpPositive(true)
        this.view.setCenter(40, 30)


        this.draw_mode = this.draw.MODE_LINE
        this.draw.background("rgb(49,49,49)")

        this.draw.rectangle(0, 0, 10, 10, "#0099CC")
        this.input.onMouseClick((x,y) => console.log(`${x}:${y}`), {x: 0, y: 0, width: 10, height: 10})
    }

    loop(delta){
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
