import React, { Component } from 'react';
import DisplayTable from './5_DisplayTable';
import FunctionButton from './7_FunctionButton';
import './AESRound.css';


/*
    val={val} 
    idx={idx} 
    key={`s${idx}`}
    current_table_state={this.state.table_state}
    all_intermediate_states={this.props.data.all_intermediate_states} 
    states_order_index={this.states_order_index}
    setTableStateNum={this.setTableStateNum}
*/

class AESRound extends Component {
    render() {
        const fcode = {
            'a':'SB',
            'b':'SR',
            'c':'MC',
            'd':'AK',
        }
        const ftext = {
            'a':'Sub Bytes',
            'b':'Shift Rows',
            'c':'Mix Columns',
            'd':'Add Round Key',
        }
        // console.log(this.props.all_intermediate_states);
        // console.log(this.props.val[0]);
        // console.log(this.props.all_intermediate_states[this.props.states_order_index[this.props.states_order_index.indexOf(this.props.val[0]) -1]]);
        return (
            <tr className='aes-round-section'>
                <td>
                    <DisplayTable 
                        given_matrix={this.props.this_round_key}
                        my_table_code={0} 
                        table_state={10}
                        title={<i className='text-[25px] font-bold' >sk<sub>{this.props.idx}</sub></i> }
                        color = "#BD22A8"
                        mode = 'bold'
                    />
                </td>
                <td className='text-3xl '>
                    round {this.props.idx}
                </td>
{/* ====================================================================================================================================================================== */}
                {/* <td>
                    <DisplayTable 
                        given_matrix={
                            this.props.all_intermediate_states[this.props.states_order_index[this.props.states_order_index.indexOf(this.props.val[0]) -1]]
                        }
                        my_table_code={this.props.states_order_index.indexOf(this.props.val[0])} 
                        table_state={this.props.current_table_state}
                        title={this.props.states_order_index[this.props.states_order_index.indexOf(this.props.val[0]) -1]}
                        color = "#BD22A8"
                    />
                </td> */}
{/* ====================================================================================================================================================================== */}
                <td className='flex justify-evenly'>
                    {
                        this.props.val.map((val,idx)=>{
                            
                            let [r,fc]=val.split('-');
                            let symbol = fc==='d' ? <><span className='text-[black] text-[30px] pr-[7px]'>&#8853; </span> </> : <></>;

                            return (<div key={`${idx}`} className="items-center flex">
                                <FunctionButton 
                                    text={<>{symbol}{fcode[val.split('-')[1]]}</>}
                                    onclick={()=>{
                                        // console.log(this.props.states_order_index.indexOf(val));
                                        this.props.setTableStateNum(this.props.states_order_index.indexOf(val));
                                    }}
                                />
                                <DisplayTable 
                                    given_matrix={this.props.all_intermediate_states[val]}
                                    my_table_code={this.props.states_order_index.indexOf(val)} 
                                    table_state={this.props.current_table_state}
                                    title={<i className='text-[20px]'>S <sub>{r}</sub><sup>{fcode[fc]}</sup></i>}
                                />
                        </div>);
                    })}
                </td>

{/* ====================================================================================================================================================================== */}
                {/* <td>
                    <DisplayTable 
                        given_matrix={this.props.all_intermediate_states[this.props.val[0]]}
                        my_table_code={this.props.states_order_index.indexOf(this.props.val[0])} table_state={this.props.current_table_state}
                        title={this.props.val[0]} color = "#BD22A8"
                    />
                </td> */}
{/* ====================================================================================================================================================================== */}
            </tr>
        );
    }
}

export default AESRound;