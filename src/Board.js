import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 0.25 //this is a percentile value in float
  }
  constructor(props) {
    super(props);

    //set initial state
    this.state = {
      hasWon: false, 
      board: this.createBoard()
    }

  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for(let x = 0; x <this.props.nRows; x++){
      let row = []; //for each single row
      //fill up the each row
      for(let y = 0; y < this.props.nCols; y++){    
      //set light is on or off, we use math.random which ranges from 0 - 1 to compare our chanceLight porps (.25
      //if the chances are less than 25% the lights are on i.e true and we push the boolean to row as true
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      //now insert the all rows to board arrya
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    //
    let [y, x] = coord.split("-").map(Number);

    //a nested function - helper
    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    //this.setState({board, hasWon});
  }


  /** Render game board or winning message. */
  
  render() {
    //if the game is own just show winning mesage
    //todo
    //make the tableBoard which is basically an array: we follow the same logic we used to createBoard
    let tblBoard = [];
    //
    for(let x =0; x < this.props.nRows; x++){
      let row = [];
      for(let y = 0; y < this.props.nCols; y++){
        //now push each Cell component into the row array whith props for Cell islit and the value come
        //from state board x, y value as we alredy set it thru creatBoard()
        //also set key with x y index value
        let coord = `${x}-${y}`;
        row.push(<Cell key={coord} isLit={this.state.board[y][x]}/>)
      }
      //we need to push row using tr as per the html table structure
      tblBoard.push(<tr>{row}</tr>);
    }

    return(
      <table className="Board">
        <tbody>
          {tblBoard}
        </tbody>
      </table>
    )
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;
