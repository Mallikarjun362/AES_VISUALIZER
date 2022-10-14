// "use strict";
// let main_message = "ghij"+"klmn"+"opqr"+"stuv"
// let main_key = "0123456789abcdef"
// let NO_OF_ROUNDS = 10


// all_internediates = {}
/*
eachstate code : "1-a"

order = [
    plaintext ,
    0-d ,
    1-a 1-b 1-c 1d ,
    ...
    9-a 9-b 9-c 9-d ,
    10-a 10-b 10-d ,
]
for idx,ele in enumerate(order):
    function_d = {
        a : SubBytes
        b : ShiftRow
        c : MixColumns
        d : AddRoundKey
    }
    previous_matrix [idx-1]
    function
    new_matrix



0
r1 - r9
r10
a b c d
each state : [
    [1,2,3,4],
    [1,2,3,4],
    [1,2,3,4],
    [1,2,3,4],
 ]
all_intermediates = {

}
*/
export function intm_to_hexm(matrix){
    let new_matrix = []
    for (let i = 0; i < 4; i++) {
        let temp = [];
        for (let j = 0; j < 4; j++) {
            temp.push(matrix[i][j].toString(16).padStart(2, '0'));
        }
        new_matrix.push(temp);
    }
    return new_matrix;
}
function hex_intermediates(dct){
    let new_dct = {}
    for (const [key, value] of Object.entries(dct)) {
        // console.log(`${key}: ${value}`);
        new_dct[key] = intm_to_hexm(value);
    }
    return new_dct;
}
//===========================================================================================================================================================================
var Sbox = [99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,
    118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,
    147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,
    7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,
    47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,
    251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,
    188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,
    100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,
    50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,
    78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,
    116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,
    158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,
    137,13,191,230,66,104,65,153,45,15,176,84,187,22];

function sbox_matrix(matrix){
    //forward sbox
    let new_matrix = []
    for (let row = 0; row < matrix.length; row++) {
        let temp = [];
        for (let col = 0; col < matrix[row].length; col++) {
            temp.push(Sbox[matrix[row][col]]);
        }
        new_matrix.push(temp);
    }
    return new_matrix;
}
function inverse_sbox_matrix(matrix){
    //forward sbox
    let new_matrix = [];
    for (let row = 0; row < matrix.length; row++) {
        let temp = [];
        for (let col = 0; col < matrix[row].length; col++) {
            temp.push(Sbox.indexOf(matrix[row][col]));
        }
        new_matrix.push(temp)
    }
}
//================================================================================================================================================================
function shiftrow(matrix){
    let new_matrix = [];
    matrix.forEach((arr,idx1)=>{
        let temp = [0,0,0,0];
        arr.forEach((ele2,idx2)=>{
            let idxx = (idx2-idx1)%4
            if(idxx <0){
                idxx += 4;
            }
            temp[idxx] = ele2;
        })
        new_matrix.push(temp);
    });
    return new_matrix;
}

function inverse_shiftrow(matrix){
    let new_matrix = [];
    matrix.forEach((arr,idx1)=>{
        let temp = [0,0,0,0];
        arr.forEach((ele2,idx2)=>{
            temp[(idx1-idx2)%4] = ele2;
        })
        new_matrix.push(temp);
    });
    return new_matrix;
}
//===========================================================================================================================================================================
function aes_mul( a, b )	{
    var res = 0;
    while( a > 0 )	{
       if ( (a&1) !== 0 )
          res = res ^ b;		// "add" to the result
       a >>>= 1;			// shift a to get next higher-order bit
       b <<= 1;			// shift multiplier also
    }
    // now reduce it modulo x**8 + x**4 + x**3 + x + 1
    var hbit = 0x10000;		// bit to test if we need to take action
    var modulus = 0x11b00;	// modulus - XOR by this to change value
    while( hbit >= 0x100 )	{
       if ( (res & hbit) !== 0 )		// if the high-order bit is set
          res ^= modulus;	// XOR with the modulus
 
       // prepare for the next loop
       hbit >>= 1;
       modulus >>= 1;
    }
    return res;
}
function mixcolumn(matrix){
    // let std_matrix = [
    //     [2,1,1,3],
    //     [3,2,1,1],
    //     [1,3,2,1],
    //     [1,1,3,2],
    // ];
    let std_matrix = [
        [2,3,1,1],
        [1,2,3,1],
        [1,1,2,3],
        [3,1,1,2],
    ];
    let new_matrix = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ]
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let row_stdm = [[i,0],[i,1],[i,2],[i,3]];
            let col_m = [[0,j],[1,j],[2,j],[3,j],];
            let sm = 0;
            for (let index = 0; index < 4; index++) {
                let li = row_stdm[index];
                let ri = col_m[index];
                let left = std_matrix[li[0]][li[1]];
                let right = matrix[ri[0]][ri[1]];

                sm ^= aes_mul(left,right);
            }
            new_matrix[i][j] = sm;
        }
        
    }
    return new_matrix;  
}
//========================================================================================================================================================================
function addRoundKey(matrix,key){
    let new_matrix = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ]
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            new_matrix[i][j] = key[i][j] ^ matrix[i][j];
        }
    }
    return new_matrix;
}

//========================================================================================================================================================================
/*
Standard Elements Integers
standard format = [
    [1,2,3,4],
    [1,2,3,4],
    [1,2,3,4],
    [1,2,3,4],
]
*/
export function linear_to_matrix(s,to_hex=true){
    let arr = [];
    for (let i = 0; i < 4; i++) {
        let temp = [];
        for (let j = 0; j < 4; j++) {
            if(to_hex){
                temp.push(s[i+j*4].charCodeAt(0));
            }else{
                temp.push(s[i+j*4]);
            }
        }
        arr.push(temp);
    }
    return arr;
}

export function matrix_to_linear(int_matrix,){
    let strr = '';
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 4; row++) {
            strr += String.fromCharCode(int_matrix[row][col]);
        }
    }
    return strr;
}






























export default function aes_encryption_intermediate_rounds({main_message , main_key,NO_OF_ROUNDS = 10}){

    if((main_message.length >= 16) & (main_key.length >= 16)){
        // console.log(main_key,main_message);
    }else{
        throw Error('Not Sufficient Size');
    }

    //======================================================================================================================================================================
    //Key Generation
    let all_rounds_keys = {}
    function transpose(arr){
        arr = [...arr[0].map((_, colIndex) => arr.map(row => row[colIndex]))];
        return arr;
    }
    function get_next_key(current_key, rc){
        current_key = transpose(current_key);
        let round_const = rc;

        let last_col = [ ...current_key[3]];
        //1. last col first element to last element
        last_col = [last_col[1],last_col[2],last_col[3],last_col[0],];
        //2. sbox > 3. xor with round const
        last_col = last_col.map((val,idx)=>Sbox[val]).map( (val,idx)=>round_const[idx]^val );

        
        current_key[0] = current_key[0].map((ele,idx)=>last_col[idx]^ele); //col 0

        current_key[1] = current_key[1].map((ele,idx)=>current_key[0][idx]^ele); //col 1

        current_key[2] = current_key[2].map((ele,idx)=>current_key[1][idx]^ele); //col 2

        current_key[3] = current_key[3].map((ele,idx)=>current_key[2][idx]^ele); //col 3
        
        return transpose(current_key);
    }
    function get_all_keys_ready(){
        all_rounds_keys['0'] = linear_to_matrix(main_key);
        let rcs = [
            [],
            [0x01,0,0,0],
            [0x02,0,0,0],
            [0x04,0,0,0],
            [0x08,0,0,0],
            [0x10,0,0,0],
            [0x20,0,0,0],
            [0x40,0,0,0],
            [0x80,0,0,0],
            [0x1b,0,0,0],
            [0x36,0,0,0],

        ]
        for (let i = 1; i < 11; i++) {
            // let curr_r = 0x01;
            
            all_rounds_keys[`${i}`] = get_next_key(
                all_rounds_keys[`${i-1}`],
                // [ curr_r ,0,0,0]
                rcs[i]
            );
            // curr_r = aes_mul(curr_r,0x02);
        }
    }
    get_all_keys_ready()
    //======================================================================================================================================================================
    //ORDER
    let order = [
        'plaintext',
        '0-d',
    ]
    for (let index = 1; index < NO_OF_ROUNDS+1; index++) {
        let f = ['a','b','c','d'];
        f.forEach((val,idx)=>{
            if(index ===10 & val ==='c'){
                
            }else{
                order.push(`${index}-${val}`);
            }
        })
    }
    // const fd = {
    //     'a' : sbox_matrix,
    //     'b' : shiftrow,
    //     'c' : null,
    //     'd' : null,
    // }
    // console.log(order);


    ///MAIN PROCESS
    let all_internediate_states = {
        'plaintext' : linear_to_matrix(main_message),
    }
    for (let index = 1; index < order.length; index++) {
        let curr_state_code = order[index];
        let pre_state_code = order[index-1];
        let pre_state = all_internediate_states[pre_state_code];
        let what_function = curr_state_code.split('-')[1];

        if (what_function === 'a') {
            all_internediate_states[curr_state_code] = sbox_matrix(pre_state);
        } else if (what_function === 'b') {
            all_internediate_states[curr_state_code] = shiftrow(pre_state);
        } else if (what_function === 'c') {
            all_internediate_states[curr_state_code] = mixcolumn(pre_state);
        } else if (what_function === 'd') {
            let k = all_rounds_keys[curr_state_code.split('-')[0]];
            all_internediate_states[curr_state_code] = addRoundKey(pre_state,k);
        } 
    }
    let all_internediate_states_hex = hex_intermediates(all_internediate_states);
    //========================================================================================================================================================================
    // console.log(all_rounds_keys);
    return {
        all_internediate_states_hex:all_internediate_states_hex,
        all_rounds_keys_hex : hex_intermediates(all_rounds_keys),
        encrypted_text : matrix_to_linear(all_internediate_states['10-d'])
    };
}
