import React, { Component } from 'react';
import './DisplayTable.css';

class DisplayTable extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let color = this.props.color ? this.props.color : this.props.my_table_code <= this.props.table_state ? '#000000' : '#999999';
        this.bgcolor = color + '00';

        color += this.props.my_table_code <= this.props.table_state ? 'ff' : '00';

        let boxshadow_class = this.props.my_table_code === this.props.table_state ? 'display-table-div-1' : '';
        boxshadow_class = this.props.my_table_code + 1 === this.props.table_state ? 'display-table-div-2' : boxshadow_class;

        let mode_class = this.props.mode === 'bold' ? 'bold-mode' : 'normal-mode';


        // console.log(this.props);
        return (
            <div className='text-md my-[10px] text-center'>
            <div className={`${boxshadow_class} text-[17px] my-[10px] text-center`}>
                <table className='my-display-table ' style={{color : color, backgroundColor: this.bgcolor }} >
                    {/* <tbody> */}
                        <tr>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[0][0] : ' ' } </td>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[0][1] : ' ' } </td>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[0][2] : ' ' } </td>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[0][3] : ' ' } </td>
                        </tr>
                        <tr>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[1][0] : ' ' } </td>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[1][1] : ' ' } </td>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[1][2] : ' ' } </td>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[1][3] : ' ' } </td>
                        </tr>
                        <tr>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[2][0] : ' ' } </td>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[2][1] : ' ' } </td>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[2][2] : ' ' } </td>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[2][3] : ' ' } </td>
                        </tr>
                        <tr>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[3][0] : ' ' } </td>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[3][1] : ' ' } </td>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[3][2] : ' ' } </td>
                            <td className={`${mode_class}`} style={{borderColor : color}}>    { this.props.given_matrix ? this.props.given_matrix[3][3] : ' ' } </td>
                        </tr>
                    {/* </tbody> */}
                </table>
                {/* <p className='pt-[5px]' style={{ color : color}}>{this.props.table_state}</p> */}
            </div>
                <p className='pt-[5px]' style={{ color : color}}>{this.props.title} </p>
            </div>
        );
    }
}

export default DisplayTable;