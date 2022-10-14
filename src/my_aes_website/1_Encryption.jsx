import React from "react";
import ShowGivenData from './3_ShowGivenData';
import AESRound from "./6_AESRound";

import './Encryption.css';
/*
<EncryptionPage data={{
    strr : {
        key : this.state.input_key_str,
        message : this.state.input_message_str,
    },
    key_matrix:this.state.key_matrix,
    message_matrix:this.state.message_matrix,
    all_intermediate_states:this.state.all_intermediate_states,
    all_round_keys : this.state.all_round_keys,
}}/>
*/


class EncryptionPage extends React.Component {
    constructor(props) {
        // 3 arguments : in data
        // 1. key_matrix // never changes
        // 2. message_matrix // never changes
        // 3. all_intermediate_states // never changes
        super(props);
        this.states_order_sections = [
            ['0-d'],
            ['1-a', '1-b', '1-c', '1-d'],
            ['2-a', '2-b', '2-c', '2-d'],
            ['3-a', '3-b', '3-c', '3-d'],
            ['4-a', '4-b', '4-c', '4-d'],
            ['5-a', '5-b', '5-c', '5-d'],
            ['6-a', '6-b', '6-c', '6-d'],
            ['7-a', '7-b', '7-c', '7-d'],
            ['8-a', '8-b', '8-c', '8-d'],
            ['9-a', '9-b', '9-c', '9-d'],
            ['10-a', '10-b', '10-d']
        ]
        this.states_order_index = ['plaintext'];
        for (let index = 0; index < this.states_order_sections.length; index++) {
            const element = this.states_order_sections[index];
            this.states_order_index = this.states_order_index.concat(element);
        }
        this.state = {
            table_state: 1,
        };

    }
    setTableStateNum = (n = 16) => {
        this.setState({ table_state: n });
    }
    render() {
        return (<div className="main-div" id="encryption-display">
            <p>Intermediate Stages of AES Encryption in "<b>128-bit (16-Byte)</b> Block size" and  "<b>128-bit (16-Byte)</b> key size" with 10 rounds</p>
            <br /><br />
            <ShowGivenData data={{
                strr: this.props.data.strr,
                key_matrix: this.props.data.key_matrix,
                message_matrix: this.props.data.message_matrix,
                encrypted_matrix: this.props.data.all_intermediate_states['10-d']
            }} />
            <br />
            <hr style={{ borderTop: " 2px dotted black", margin: "20px" }} />
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------- */}
            <center>
                <table className="aes-table">
                    {
                        this.states_order_sections.map((val, idx) => {
                            return <AESRound
                                val={val}
                                idx={idx}
                                key={`s${idx}`}
                                current_table_state={this.state.table_state}
                                all_intermediate_states={this.props.data.all_intermediate_states}
                                states_order_index={this.states_order_index}
                                setTableStateNum={this.setTableStateNum}

                                this_round_key={this.props.data.all_round_keys[idx]}
                            />;
                        })
                    }
                </table>
            </center>
            <div className="h-[500px]"></div>
        </div>);
    }
}

export default EncryptionPage;