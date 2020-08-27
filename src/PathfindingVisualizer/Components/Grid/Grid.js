import React, { Component } from 'react'
import Node from '../Node/Node'
import './grid.css'



export default class Grid extends Component {

    constructor(props) {
        super(props)
        this.state = {
            grid: [],
            width: 30,
            height: 30,
            startNode: [15,5],
            endNode: [15,25]
        }
    }

    componentDidMount() {
        const grid = this.getInitialGrid(this.state.height, this.state.width);
        this.setState({grid});
        console.log(grid)
    }

    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

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

    getInitialGrid(height, width) {
        const grid = [];
        for (let row = 0; row < height; row++) {
            const currentRow = [];
            for (let col = 0; col < width; col++) {
                currentRow.push(this.createNode(col, row));
            }
            grid.push(currentRow);
        }
        return grid;
    }

    createNode(col, row) {
        return {
            col,
            row,
            isStart: row === this.state.startNode[0] && col === this.state.startNode[1],
            isFinish: row === this.state.endNode[0] && col === this.state.endNode[1],
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        };
    };

}

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};