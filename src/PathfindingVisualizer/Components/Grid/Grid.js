import React, { Component } from 'react'
import Node from '../Node/Node'
import './grid.css'

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;


export default class Grid extends Component {

    constructor(props) {
        super(props)
        this.state = {
            grid: [],
            width: 40,
            height: 30
        }
    }

    componentDidMount() {
        const grid = getInitialGrid(this.state.height, this.state.width);
        this.setState({grid});
        console.log(grid)
    }

    // handleMouseDown(row, col) {
    //     const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //     this.setState({ grid: newGrid, mouseIsPressed: true });
    // }

    // handleMouseEnter(row, col) {
    //     if (!this.state.mouseIsPressed) return;
    //     const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //     this.setState({ grid: newGrid });
    // }

    // handleMouseUp() {
    //     this.setState({ mouseIsPressed: false });
    // }

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <div>
                <div className="grid">

                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, isWall } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={
                                                (row, col) => this.handleMouseDown(row, col)
                                            }
                                            onMouseEnter={
                                                (row, col) => this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={
                                                () => this.handleMouseUp()
                                            }
                                            row={row}>
                                        </Node>
                                    );
                                })}
                            </div>
                        );
                    })}

                </div>
            </div>
        )
    }


}

const getInitialGrid = (height, width) => {
    const grid = [];
    for (let row = 0; row < height; row++) {
        const currentRow = [];
        for (let col = 0; col < width; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
}

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};