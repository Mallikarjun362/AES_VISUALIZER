import React, { Component } from 'react';
import './FunctionButton.css';

class FunctionButton extends Component {
    render() {
        return (
            <button onClick={this.props.onclick} className="my-fbutton text-lg text-red-700 px-[10px] py-[3px] min-w-fit rounded-md m-0 bg-yellow-400 select-none">
                {this.props.text} <span className='text-[30px]'>&#8659;</span>
            </button>
        );
    }
}

export default FunctionButton;