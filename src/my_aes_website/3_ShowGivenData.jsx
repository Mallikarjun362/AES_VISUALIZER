import React from "react";
import './ShowGivenData.css';
import DisplayTable from "./5_DisplayTable";

import { linear_to_matrix } from "./aes_implementation";

class ShowGivenData extends React.Component{
    render(){
        // console.log(this.props.data.strr);
        return (
            <div className="flex justify-center items-center">


                <DisplayTable given_matrix={linear_to_matrix(this.props.data.strr.message,false)} my_table_code={1} table_state={10} title={`"${this.props.data.strr.message}"`} color={'#FF0000'}/>
                <span className="text-[30px] p-[10px] pb-[40px]">=</span>
                <DisplayTable given_matrix={this.props.data.message_matrix} my_table_code={1} table_state={10} title={'Message'} color={'#FF0000'}/>

                <div className="w-[200px]"></div>

                <DisplayTable given_matrix={linear_to_matrix(this.props.data.strr.key,false)} my_table_code={1} table_state={10} title={`"${this.props.data.strr.key}"`} color={'#0000FF'}/>
                <span className="text-[30px] p-[10px]  pb-[40px]">=</span>
                <DisplayTable given_matrix={this.props.data.key_matrix} my_table_code={1} table_state={10} title={'Key'} color={'#0000FF'}/>

                <div className="w-[200px]"></div>

                <DisplayTable given_matrix={linear_to_matrix(this.props.data.strr.encrypted_text,false)} my_table_code={1} table_state={10} title={`"${this.props.data.strr.encrypted_text}"`} color={'#0DF200'}/>
                <span className="text-[30px] p-[10px] pb-[40px]">=</span>
                <DisplayTable given_matrix={this.props.data.encrypted_matrix} my_table_code={1} table_state={10} title={'Encrypted Text'} color={'#0DF200'}/>
            </div>
        );
    }
}

export default ShowGivenData;