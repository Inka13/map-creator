import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.tileSize = 30;
    this.map = {rows: 15, cols: 30, board: []};
    this.state = {
      map: this.map,
      sign: "field",
    }
  }
  componentDidMount = () => {

    this.createMap();

  }
  handleClick = (e) => {
        console.log(this.state.map.board[0][0]);
        var temp = e.target.id.split('_');
        var x=temp[0];
        var y=temp[1];
        this.map.board[x][y].type = this.state.sign;
        this.setState({
          map: this.map,
        });
  }
  handleChange = (e) => {
    var sign=e.target.id;
    this.setState({
      sign: sign
    });
  }
  createMap = () => {
    this.map.board=[];
    for(let i = 0; i < this.map.rows; i++){
      this.map.board.push([]);
      for(let j = 0; j < this.map.cols; j++){
        if(i === 0 || i === (this.map.rows - 1) || j === 0 || j === (this.map.cols - 1)){
          var tile = {
            type: "wall",
            contains: {
              type: "",
              health: 0,
            },
            visible: true,
          }
        } else {
          tile = {
            type: "field",
            contains: {
              type: "",
              health: 0,
            },
            visible: true,
          }
        }
        this.map.board[i].push(tile);
      }
    }
    this.setState({
      map: this.map,
    });
  }
  render() {
    if(this.state.map.board.length > 0){
      return (
        <div className="map-view">

          <Map map={this.state.map} handleClick={this.handleClick}/>
          <Buttons handleChange={this.handleChange}/>
          <div id="result">{JSON.stringify(this.map.board)}</div>
          </div>
        );
    } else {
      return (
        <div className="map-view">
          <Map map={this.state.map} handleClick={this.handleClick} />
          <Buttons handleChange={this.handleChange} />
          <div id="result"></div>
          </div>
        );
      }
    }
}
class Buttons extends Component {
  render() {
    return (
      <div className="buttons">
        <div id="field" onClick={this.props.handleChange}>Field</div>
        <div id="wall" onClick={this.props.handleChange}>Wall</div>

      </div>
    );
  }
}
class Map extends Component {
  render() {
    if(this.props.map.board.length > 0){
      var mapBoard = [];
      for(let i = 0; i < this.props.map.rows; i++){
        for(let j = 0; j < this.props.map.cols; j++){
          mapBoard.push(<Tile class="tile" key={i.toString()+"_"+j.toString()} id={i.toString()+"_"+j.toString()} tile={this.props.map.board[i][j]} onClick={this.props.handleClick}/>);
        }
      }
    }

    return (

      <div className="map">
        {mapBoard}
      </div>

    );
  }
}
class Tile extends Component {
  render() {
    var background;
    if(this.props.tile.type === "wall"){
      background = "url('images/wall.png')";
    } else if(this.props.tile.type === "exit"){
        background = "url('images/player.png')";
    } else {
      switch(this.props.tile.contains.type) {
        case "player":
          background = "url('images/player.png')";
          break;
        case "enemy":
          background = "url('images/enemy.png')";
          break;
        case "health":
          background = "url('images/health.png')";
          break;
        case "weapon":
          background = "url('images/axe.png')";
          break;
        default:
          background = "url('images/floor.png')";
        }
    }
    this.style={
      visibility: this.props.tile.visible ? "visible" : "hidden",
      background: background,
    }
    return (
      <div id={this.props.id} className="tile" style={this.style} onClick={this.props.onClick}>
      </div>
    );
  }
}
export default App;
