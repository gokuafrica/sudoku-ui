import React from 'react';

class CellInput extends React.Component{
    handleChange = (event) => {
        let val = event.target.value;
        val=val.replace(/[^1-9]/g,'');
        this.props.setState(Number.parseInt(val)||0,this.props.id);
    }
    showValue = () => {
        let value = this.props.getValue(this.props.id);
        if(value===0)
            return "";
        else
            return value;
    }
    render(){
        return <input inputMode="numeric" pattern="[0-9]*" value={this.showValue()} type="text" maxLength="1" onChange={this.handleChange}/>
    }
}

export default CellInput;