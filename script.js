const paragraphs = [
    "print('Hello,Word!')",
    "def add(a,b): return a + b",
    "for i in range(5): print(i)",
    "if x > 10: print('x is greater than 10')",
    "class Dog: def bark(self) : print('wolf!')",
    "import math; print(math.sqrt(16))",
    "def factorial(n): return 1 if n== 0 else n*factorial(n-1)",
    "with open('file.txt', 'r') as file: print(file.read())",
    "try: x = 1 / 0  except ZeroDivisionError: print(file.read())",
    "def fibonacci(n): return in if n =< 1 else finbonacci(n-1) + fiboncacci(n-2)",
    "print((x[x**2 for x in range(10)])"
];

const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML="";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        typingText.innerHTML += span;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());

}



function initTyping(){
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft  > 0){
    if(!isTyping){
        timer = setInterval(initTimer,1000);
        isTyping = true;        

    }
    if(typedChar == null){
        if (charIndex > 0){
            charIndex--;
            if (characters[charIndex].classList.contains("incorret")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct","incorrect");
        }
        }else{
            if (characters[charIndex].innerHTML == typedChar){
                characters[charIndex].classList.add("correct");

            }else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");

            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        if (charIndex < characters.length){
            characters[charIndex].classList.add("active");
        }
        
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime-timeLeft) * 60);
    wpm = wpm < 0 || !wpm || wpm == Infinity ? 0: wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
 
}  else{
    clearInterval(timer);
    inpField.value = "";
}
    }
function initTimer(){
    if (timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else{
        clearInterval(timer);
    }
}

function restGame(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping  = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText= 0;
    cpmTag.innerText = 0;
}
loadParagraph();
inpField.addEventListener("input",initTyping);
tryAgainBtn.addEventListener("click",restGame);
  



