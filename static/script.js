const UserInp = document.getElementById('user-inp');
const AllButtons = document.getElementsByTagName('button');
const NumButtons = Array.from(document.getElementsByClassName('nbtn'));
const NotNumBtn = Array.from(document.getElementsByClassName('btn'));

let visible_content = '';
let operator = '' 
let OperatorArray = ['+','-','*','/']; 
let NumberArray = ['.','0','1','2','3','4','5','6','7','8','9']

NumButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.textContent;
        visible_content += content
        UserInp.textContent = visible_content;
    });
});


NotNumBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.textContent;
       if (OperatorArray.includes(content) && visible_content.length !== 0 && operator.length === 0){
            operator = content
            visible_content += operator
            UserInp.textContent = visible_content;
       }else if (operator.length === 1){ Answer(); } 
    });
});


document.getElementById('lbtn-de').addEventListener('click', () => {DeleteWord();});
document.getElementById('lbtn-ac').addEventListener('click', () => {AllClear();});
document.getElementById('rbtn-e').addEventListener('click', () => {Answer();});

document.addEventListener('keydown', (event) => {
    if (OperatorArray.includes(event.key) && visible_content.length !== 0){
            if (operator.length === 0){
                operator = event.key
                visible_content += operator
                UserInp.textContent = visible_content;
            }else if (operator.length === 1){ Answer(); }
        }
    else if (NumberArray.includes(event.key)){
        visible_content += event.key
        UserInp.textContent = visible_content;
    }
    
    if (event.key === 'Enter'){ Answer(); }
    else if (event.key === 'Escape'){ AllClear(); }
    else if (event.key === 'Backspace'){ DeleteWord(); }
});

function DeleteWord(){
    if (visible_content.length !== 0){
        if (visible_content.at(-1) === operator){
            operator = '';
        }
        visible_content = visible_content.slice(0,-1)
        UserInp.textContent = visible_content;
    }
    return false
};

function AllClear(){
    if (visible_content.length !== 0){
        visible_content = '';
        UserInp.textContent = visible_content;
        operator = '';
    }
    return false
};

function Answer(){
    console.log("Operator: ",operator)
    if (operator.length === 1){
        let ContentArray = visible_content.split(`${operator}`);
        console.log("Number Array: ",ContentArray)
        if (ContentArray.length === 2 && ContentArray.at(-1) !== ''){
            SolveExpression(visible_content).then(result => {
                visible_content = result
                UserInp.textContent = visible_content;
                operator = '';
            });
        }
    }
    return false
};

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