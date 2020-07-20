import React from 'react';
import Cell from './cell';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
class SudokuUI extends React.Component{
    constructor(props){
        super(props);
        this.state={
            board: new Array(81).fill(0),
            loading: false
        }
    }
    onClick = () => {
        let ajaxCall = async function (url,method,body,onSuccess) {
            let params = {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            if(method.toString().toLowerCase().localeCompare("post")===0){
                params["body"] = JSON.stringify(body);
            }
            console.log(params);
            fetch(url,params).then(function(response){
                if(response.status===200)
                    return response.json();
                else
                    throw new Error("Response Code not 200");
            }).then((data)=>{
                onSuccess(data);
            }).catch(function(error){
                console.log(error);
                alert("Something went wrong");
            });
        }
        ajaxCall("https://sudoku.gokuafrica.com/api/solve","post",this.state,this.setBoard);
        this.setState({
            loading: true
        });
    }
    setBoard = (data) => {
        this.setState(data);
        this.setState({
            loading: false
        });
    }
    setCellValue = (value,id) => {
        let board = this.state.board;
        board[id]=value;
        this.setState({
            board: board
        });
    }
    getCellValue = (id) => {
        return this.state.board[id];
    }
    generateRow = (rowid) => {
        return (
            <tr>
                <td> <Cell id={rowid*9+0} setState={this.setCellValue}  getValue={this.getCellValue}/> </td>
                <td> <Cell id={rowid*9+1} setState={this.setCellValue}  getValue={this.getCellValue}/> </td>
                <td> <Cell id={rowid*9+2} setState={this.setCellValue}  getValue={this.getCellValue}/> </td>
                <td> <Cell id={rowid*9+3} setState={this.setCellValue}  getValue={this.getCellValue}/> </td>
                <td> <Cell id={rowid*9+4} setState={this.setCellValue}  getValue={this.getCellValue}/> </td>
                <td> <Cell id={rowid*9+5} setState={this.setCellValue}  getValue={this.getCellValue}/> </td>
                <td> <Cell id={rowid*9+6} setState={this.setCellValue}  getValue={this.getCellValue}/> </td>
                <td> <Cell id={rowid*9+7} setState={this.setCellValue}  getValue={this.getCellValue}/> </td>
                <td> <Cell id={rowid*9+8} setState={this.setCellValue}  getValue={this.getCellValue}/> </td>
            </tr>
        );
    }
    render(){
        const override = css`
        display: block;
        margin: 0 auto;
        border-color:  #008CBA;
        `;
        if(this.state.loading)
            return (
                <ClipLoader
                    css={override}
                    size={150}
                    color={"#008CBA"}
                    loading={this.state.loading}
                />
            );
        else
        return(
            <div>
            <table>
                <tbody>
                {this.generateRow(0)}
                {this.generateRow(1)}
                {this.generateRow(2)}
                {this.generateRow(3)}
                {this.generateRow(4)}
                {this.generateRow(5)}
                {this.generateRow(6)}
                {this.generateRow(7)}
                {this.generateRow(8)}
                </tbody>
            </table>
            <button className="btn btn-primary solve-button" onClick={this.onClick}>Solve</button>
            </div>
        );
    }
}

export default SudokuUI;