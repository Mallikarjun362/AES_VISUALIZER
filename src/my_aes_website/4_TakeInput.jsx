import React from "react";
import './TakeInput.css';

class TakeInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message_count: 0,
            key_count: 0,
            key_error_display : 'hidden',
        };
        this.key_input_ref = React.createRef();
        this.message_input_ref = React.createRef();
    }

    toggle_error_msg = () =>{

    }
    take_input_key = (cmp) => this.setState({ key_count: parseInt(cmp.current.value.length) });
    take_input_message = (cmp) => this.setState({ message_count: parseInt(cmp.current.value.length) });
    complete_input = () => {
        let key = this.key_input_ref.current.value;
        let message = this.message_input_ref.current.value;
        if(key === ''){
            key = "SOME 128 BIT KEY";
        }
        if(message ===''){
            message = "ATTACK AT DAWN!"
        }
        if(key.length <16 ){
            this.setState({key_error_display : 'visible'});
            return;
        }else{
            this.setState({key_error_display : 'hidden'});
        }

        if(message.length < 16){
            message = message.padEnd(16,'0');
        }

        this.props.onSubmit({ key, message });
    };

    render() {
        return (
            <div className="main-content">
                <div className="input-div p-[10px] m-[20px] select-none">
                    {/* <form action="none"> */}
                        <table>
                            {/* ---------------------------------------------------------KEY------------------------------------------------------ */}
                            <tr>
                                <td><label htmlFor="message">Key</label></td><td>:</td>
                                <td>
                                    <input
                                        type="text" id="message" className="initial_input" maxLength={16} minLength={16}
                                        ref={this.key_input_ref} onChange={() => { this.take_input_key(this.key_input_ref) }}
                                        name="aes_key_input" autoComplete="on" placeholder="SOME 128 BIT KEY"
                                    />
                                    <div className="flex justify-between pr-[5px]">
                                        <p>16-Byte (128-Bit) Key</p>
                                        <p>{this.state.key_count}</p>
                                    </div>
                                </td>
                            </tr>
                            {/* ------------------------------------------------------MESSAGE---------------------------------------------------- */}
                            <tr>
                                <td><label htmlFor="message">Message</label></td><td>:</td>
                                <td>
                                    <input type="text" id="key" className="initial_input" maxLength={16} minLength={16}
                                        ref={this.message_input_ref} onChange={() => { this.take_input_message(this.message_input_ref) }}
                                        name="aes_message_input" autoComplete="on" placeholder="ATTACK AT DAWN!"
                                    />
                                    <div className="flex justify-between pr-[5px]">
                                        <p>16-Byte (128-Bit) Message</p>
                                        <p>{this.state.message_count}</p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <button className="btn-submit" onClick={this.complete_input}>Submit</button>
                    {/* </form> */}
                    <p style={{visibility : this.state.key_error_display , color : "red" }} >Key is not enough size</p>
                </div>
                <br />
            </div>
        );
    }
}

export default TakeInput;