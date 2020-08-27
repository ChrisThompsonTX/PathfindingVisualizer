import React, { Component } from 'react'
import Node from './Components/Node/Node'
import Grid from './Components/Grid/Grid';

export default class PathfindingVisualizer extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            width: 30,
            height: 30,
            start: [10,15],
            finish: [10,35],
        };

    }


    render() {
        const {height, width, start, finish} = this.state;
        return (
            <div>
                <Grid height={height} width={width} start={start} finsih={finish}></Grid>
            </div>
        )
    }
}

