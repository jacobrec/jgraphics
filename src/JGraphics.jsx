import React, { Component } from 'react'
import { ExportMap as jgraphics } from "./J-graphics"
import { ExportMap as jview } from "./J-view"
import { ExportMap as jinput } from "./J-input"

export default class JGraphics extends Component{
    constructor(props){
        super(props)
        this.state = {
            setup: false
        }
        this._width = props.width || 800
        this._height = props.height || 600
        this._id = this.props.id || "jgraphic-panel"
        this._fps = this.props.fps || 30

        this.draw_mode = "fill"

        this._image_map = new Map()


    }

    _unpack_module(src){
        let dest = src.UNPACK_LOC
        this[dest] = {}
        dest = this[dest]
        const isFunc = (obj) => !!(obj && obj.constructor && obj.call && obj.apply)
        Object.keys(src).forEach((key) => {
            dest[key] = isFunc(src[key]) ?
                (...params) => src[key](this, ...params)
                : src[key]
        }, this)

        src.MODULE_INIT(this)
    }

    render(){
        return <canvas id={this._id} width={this._width} height={this._height}></canvas>
    }
    componentDidMount() {
        this._unpack_module(jgraphics)
        this._unpack_module(jview)
        this._unpack_module(jinput)

        if(!this.state.setup)
            this._setup()
    }

    // Private getters

    get _canvas() { return document.getElementById(this._id) }
    get _context() { return this._canvas.getContext("2d") }


    // Private Methods
    async _setup() {
        await this.setState({ ...this.state, setup: true })
        this.setup()
        this._time = Date.now()
        setInterval(() => this._loop(), 1000/this._fps)
    }

    async _loop() {
        const now = Date.now()
        const delta = Date.now() - this._time
        this._time = now

        this.loop(delta/1000)
    }
}
