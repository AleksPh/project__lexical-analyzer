class Lexer {
  constructor() {
    this.tables = {
      numbers: [],
      strings: [],
      preprocessor: [],
      comments: [],
      keywords: [],
      operators: [],
      delimiters: [],
      identifiers: [],
      unknown: []
    };
    
    this.keywords = ['if', 'else', 'while', 'return', 'int', 'float', 'char', 'void', 'var', 'let', 'const', 'function', 'for'];
    this.operators = ['+', '-', '*', '/', '=', '==', '!=', '<', '>', '<=', '>='];
    this.delimiters = [';', ',', '(', ')', '{', '}', '[', ']'];
  }

  analyze(input) {
    for (let key in this.tables) {
      this.tables[key] = [];
    }

    let tokens = input.match(/"([^"]*)"|'([^']*)'|\/\/.*|\/\*[\s\S]*?\*\/|[a-zA-Z_]\w*|\d+(\.\d+)?|0x[\da-fA-F]+|[+\-*/=<>!]+|[\(\){}[\],;]|#.*|\S/g);


    for (let token of tokens) {
      if (this.isNumber(token)) {
        this.tables.numbers.push(token);
      } else if (this.isString(token)) {
        this.tables.strings.push(token);
      } else if (this.isPreprocessorDirective(token)) {
        this.tables.preprocessor.push(token);
      } else if (this.isComment(token)) {
        this.tables.comments.push(token);
      } else if (this.isKeyword(token)) {
        this.tables.keywords.push(token);
      } else if (this.isOperator(token)) {
        this.tables.operators.push(token);
      } else if (this.isDelimiter(token)) {
        this.tables.delimiters.push(token);
      } else if (this.isIdentifier(token)) {
        this.tables.identifiers.push(token);
      } else {
        this.tables.unknown.push(token);
      }
    }

    this.displayTables();
  }

  isNumber(token) {
    return /^\d+(\.\d+)?$/.test(token) || /^0x[0-9a-fA-F]+$/.test(token);
  }

  isString(token) {
    return /^"[^"]*"$/.test(token) || /^'[^']*'$/.test(token);
  }

  isPreprocessorDirective(token) {
    return /^#/.test(token);
  }

  isComment(token) {
    return /^\/\//.test(token) || /^\/\*[\s\S]*\*\/$/.test(token);
  }

  isKeyword(token) {
    return this.keywords.includes(token);
  }

  isOperator(token) {
    return this.operators.includes(token);
  }

  isDelimiter(token) {
    return this.delimiters.includes(token);
  }

  isIdentifier(token) {
    return /^[a-zA-Z_]\w*$/.test(token);
  }

  displayTables() {
    const container = document.getElementById('tablesContainer');
    container.innerHTML = ''; 

    for (let key in this.tables) {
      const wrapperDiv = document.createElement('div'); 
      wrapperDiv.classList.add('table-wrapper'); 

      const tableTitle = document.createElement('h3');
      tableTitle.textContent = `Table ${key}`;

      const table = document.createElement('table');
      const headerRow = document.createElement('tr');
      const header = document.createElement('th');
      header.textContent = `${key}`;
      headerRow.appendChild(header);
      table.appendChild(headerRow);

      this.tables[key].forEach(token => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = token;
        row.appendChild(cell);
        table.appendChild(row);
      });

      wrapperDiv.appendChild(tableTitle); 
      wrapperDiv.appendChild(table); 

      container.appendChild(wrapperDiv); 
    }
  }
}

const lexer = new Lexer();

document.getElementById('analyzeButton').addEventListener('click', () => {
  const code = document.getElementById('codeInput').value;
  lexer.analyze(code);
});

const button1 = document.getElementById('test1');
const button2 = document.getElementById('test2');
const button3 = document.getElementById('test3');
const button4 = document.getElementById('test4');
const button5 = document.getElementById('test5');
const textarea = document.getElementById('codeInput');

button1.addEventListener('click', function() {
  textarea.value = `int main() {
    int a = 5;
    if (a > 3) {
        a = a + 1;
    }
    return a;
}`;
});
button2.addEventListener('click', function() {
  textarea.value = `#include <stdio.h>
//Коментар для тесту
int x = 10;
`;
});
button3.addEventListener('click', function() {
  textarea.value = `let str = "Hello, world!";
let result = str + " How are you?";
`;
});
button4.addEventListener('click', function() {
  textarea.value = `for (let i = 0; i < 10; i++) {
    console.log(i * 2);
}
`;
});
button5.addEventListener('click', function() {
  textarea.value = `int number = 0x1A3F;
unknown_token ?= "invalid!";
`;
});
