const TopOut = document.getElementById('top-out');
const UserOut = document.getElementById('user-out');
const AllButtons = document.getElementsByTagName('button');
const NumButtons = Array.from(document.getElementsByClassName('nbtn'));
const NotNumBtn = Array.from(document.getElementsByClassName('btn'));

let top_exp = '';
let bottom_content = '';
let operator = '' 
let last_op = ''
let OperatorArray = ['+','-','*','/']; 
let NumberArray = ['.','0','1','2','3','4','5','6','7','8','9']

NumButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.textContent;
        if (!(content === '.' && bottom_content.includes(content))){
            bottom_content += content 
            UserOut.textContent = bottom_content;
        }
    });
});


NotNumBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.textContent;
       if (OperatorArray.includes(content) && bottom_content.length !== 0 && bottom_content !== '.' && operator.length === 0){
            operator = content;
            top_exp = bottom_content + operator;
            TopOut.textContent = top_exp;
            bottom_content = "";
            UserOut.textContent = bottom_content;
       }else if (operator.length === 1){ 
        last_op = content !== '=' ? content : '';
        Answer(); 
    } 
    });
});


document.getElementById('lbtn-de').addEventListener('click', () => {DeleteWord();});
document.getElementById('lbtn-ac').addEventListener('click', () => {AllClear();});
document.getElementById('rbtn-e').addEventListener('click', () => {Answer();});

document.addEventListener('keydown', (event) => {
    if (OperatorArray.includes(event.key) && bottom_content.length !== 0 && bottom_content !== '.'){
            if (operator.length === 0){
                operator = event.key;
                top_exp = bottom_content + operator;
                TopOut.textContent = top_exp;
                bottom_content = "";
                UserOut.textContent = bottom_content;
            }else if (operator.length === 1){
                last_op = event.key;
                Answer(); 
            }
        }
    else if (NumberArray.includes(event.key) && !(event.key === '.' && bottom_content.includes(event.key))){
        bottom_content += event.key;
        UserOut.textContent = bottom_content;
    }
    
    if (event.key === 'Enter'){ Answer(); }
    else if (event.key === 'Escape'){ AllClear(); }
    else if (event.key === 'Backspace'){ DeleteWord(); }
});

function DeleteWord(){
    if (bottom_content.length !== 0){
        if (bottom_content.at(-1) === operator){
            operator = '';
        }
        bottom_content = bottom_content.slice(0,-1)
        UserOut.textContent = bottom_content;
    }
    return false
};

function AllClear(){
    if (bottom_content.length !== 0 || top_exp !== 0){
        bottom_content = '';
        top_exp = '';
        TopOut.textContent = top_exp;
        UserOut.textContent = bottom_content;
        operator = '';
    }
    return false
};

function Answer(){
    console.log("Operator: ",operator)
    if (operator.length === 1){
        let ContentArray = [top_exp.slice(0,-1),operator,bottom_content]
        console.log("Number Array: ",ContentArray)
        if (ContentArray.length === 3 && ContentArray.at(-1) !== ''){
            // SolveExpression(exp = top_exp + bottom_content).then(result => {
            //     top_exp = '';
            //     TopOut.textContent = top_exp;
            //     bottom_content = result;
            //     UserOut.textContent = bottom_content;
            //     operator = '';
            // });
            const result = eval(x = top_exp + bottom_content)
            top_exp = ''
            TopOut.textContent = top_exp;
            operator = last_op;
            bottom_content = operator ? result + operator : result;
            UserOut.textContent = bottom_content;
            last_op = ''
        }
    }
    return false
}

async function SolveExpression(exp) {
    try{
        const response =  await fetch(`/calculate`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({val:exp})
        });
        if (!response.ok){
            throw new Error('Error! during response')
        }
        const data = await response.json();
        return String(data.value)

    } catch (error){
        console.error(error)
    }
};