import React, { Component } from 'react'
import Node from '../Node/Node'
import { dijkstra, getNodesInShortestPathOrder } from '../../Algos/dijkstra';

import './grid.css'



export default class Grid extends Component {

    constructor(props) {
        super(props)
        this.state = {
            grid: [],
            width: 30,
            height: 30,
            startNode: [15,5],
            endNode: [15,25],
            mouseIsPressed: false,
            changeStart: false,
            changeEnd: false,
        }
    }

    componentDidMount() {
        const grid = this.getInitialGrid(this.state.height, this.state.width);
        this.setState({grid});
        console.log(grid)
    }

    handleMouseDown(row, col) {
        if (row === this.state.startNode[0] && col === this.state.startNode[1]) {
            this.setState({ changeStart:true });
        } else if (row === this.state.endNode[0] && col === this.state.endNode[1]) {
            this.setState({ changeEnd: true });
        } else {
            const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid });
        }
        this.setState({mouseIsPressed: true})
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        if (this.state.changeStart) {
            const newGrid = this.getNewNode(this.state.grid, row, col, "changeStart")
            this.setState({ startNode:[row,col] });
        } else if (this.state.changeEnd) {
            this.setState({ endNode: [row, col] });
        } else {
            const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid });
        }
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
        this.setState({ changeEnd: false });
        this.setState({ changeStart: false });
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }

    // Algos //

        //Dijkstras

        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
            for (let i = 0; i <= visitedNodesInOrder.length; i++) {
                if (i === visitedNodesInOrder.length) {
                    setTimeout(() => {
                        this.animateShortestPath(nodesInShortestPathOrder);
                    }, 10 * i);
                    return;
                }
                setTimeout(() => {
                    const node = visitedNodesInOrder[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-visited';
                }, 10 * i);
            }
        }

        visualizeDijkstra() {
            const { grid } = this.state;
            const startNode = grid[this.state.startNode[0]][this.state.startNode[1]];
            const finishNode = grid[this.state.endNode[0]][this.state.endNode[1]];
            const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
        }

    //render

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (

            <>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstra's Algorithm
                </button>
                <div className="grid__container">
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
            </>
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

    getNewGridWithWallToggled(grid, row, col) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

    getNewNode(grid, row, col) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isStart: true,
        };
        const oldStart = newGrid[this.state.startNode[0],this.state.startNode[1]]
        const oldNode = {
            ...oldStart,
            isStart: false,
        };
        newGrid[this.state.startNode[0]][this.state.startNode[1]] = oldNode;
        newGrid[row][col] = newNode;
        this.setState({startNode: [row,col]})
        return newGrid;
    };


}
