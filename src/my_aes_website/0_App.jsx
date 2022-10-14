import React from "react";
import TakeInput from "./4_TakeInput";
import EncryptionPage from "./1_Encryption";
import './App.css';
import aes_encryption_intermediate_rounds, { linear_to_matrix, intm_to_hexm } from './aes_implementation';


class App extends React.Component {

    constructor(props) {
        super(props);
        let dummy_m = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        let temp = aes_encryption_intermediate_rounds({ main_message: "ATTACK AT DAWN!0", main_key: "SOME 128 BIT KEY" })
        this.state = {
            input_message_str: 'ATTACK AT DAWN!0',
            input_key_str: 'SOME 128 BIT KEY',
            encrypted_text: temp['encrypted_text'],
            all_intermediate_states: temp['all_internediate_states_hex'],
            all_round_keys: temp['all_rounds_keys_hex'],
            key_matrix: temp['all_rounds_keys_hex'][0],
            message_matrix: temp['all_internediate_states_hex']['plaintext'],
        }
    }

    get_data_from_user = ({ key, message }) => {
    
        let temp = aes_encryption_intermediate_rounds({ main_message: message, main_key: key });

        let key_matrix = intm_to_hexm(linear_to_matrix(key));
        let message_matrix = intm_to_hexm(linear_to_matrix(message));

        this.setState({
            input_key_str: key,
            input_message_str: message,
            encrypted_text: temp['encrypted_text'],
            all_intermediate_states: temp['all_internediate_states_hex'],
            all_round_keys: temp['all_rounds_keys_hex'],
            key_matrix: key_matrix,
            message_matrix: message_matrix,
        });
    };
    render() {
        return (<div>
            <main>
                <h1 className="myh1">AES Visualizer</h1>
                <p className="ml-[40px]">AES-128 Bit Encryption</p>
                <center><TakeInput onSubmit={this.get_data_from_user} fields_data={{ message: this.state.input_message_str, key: this.state.input_key_str }} /></center>
                <EncryptionPage data={{
                    strr: {
                        key: this.state.input_key_str,
                        message: this.state.input_message_str,
                        encrypted_text: this.state.encrypted_text,
                    },
                    key_matrix: this.state.key_matrix,
                    message_matrix: this.state.message_matrix,
                    all_intermediate_states: this.state.all_intermediate_states,
                    all_round_keys: this.state.all_round_keys,
                }} />
            </main>
        </div>);
    }
}

export default App;