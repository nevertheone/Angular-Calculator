import { NumberFormatStyle } from '@angular/common';
import { ConstantPool } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  calcbuttons: Calcitems[] = [
    { label: '7', type: Enumtype.Number },
    { label: '8', type: Enumtype.Number },
    { label: '9', type: Enumtype.Number },
    { label: '-', type: Enumtype.Operator },
    { label: '4', type: Enumtype.Number },
    { label: '5', type: Enumtype.Number },
    { label: '6', type: Enumtype.Number },
    { label: '+', type: Enumtype.Operator },
    { label: '1', type: Enumtype.Number },
    { label: '2', type: Enumtype.Number },
    { label: '3', type: Enumtype.Number },
    { label: '*', type: Enumtype.Operator },
    { label: '.', type: Enumtype.Operator },
    { label: '0', type: Enumtype.Number },
    { label: '=', type: Enumtype.Operator },
    { label: '/', type: Enumtype.Operator },
  ];
  calc: string = '';
  A = '+';
  S = '-';
  M = '*';
  D = '/';
  do = '.';

  c(num: Number) {
    this.calc = this.calc + num;
  }

  cO(operator: string) {
    if (this.calc != '') {
      const lastoperator = this.calc[this.calc.length - 1];
      if (operator == '.') {
        if (this.calc != '') {
          const lastNum = this.getLastFN();
          console.log(lastNum.lastIndexOf('.'));
          if (lastNum.lastIndexOf('.') >= 0) return;
        }
      }

      if (
        lastoperator === '+' ||
        lastoperator === '-' ||
        lastoperator === '*' ||
        lastoperator === '/' ||
        lastoperator === '.'
      ) {
        return;
      }

      this.calc = this.calc + operator;
    }
  }
  clear() {
    this.calc = '';
  }
  clearL() {
    this.calc = this.calc.slice(0, -1);
  }
  calculate() {
    let formula = this.calc;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+' ||
      lastKey === '.'
    ) {
      formula = formula.substr(0, formula.length - 1);
    }
    this.calc = eval(formula);
  }
  getLastFN() {
    let pos: number;
    console.log(this.calc);
    pos = this.calc.toString().lastIndexOf('+');
    if (this.calc.toString().lastIndexOf('-') > pos)
      pos = this.calc.lastIndexOf('-');
    if (this.calc.toString().lastIndexOf('*') > pos)
      pos = this.calc.lastIndexOf('*');
    if (this.calc.toString().lastIndexOf('/') > pos)
      pos = this.calc.lastIndexOf('/');
    console.log('Last ' + this.calc.substr(pos + 1));
    return this.calc.substr(pos + 1);
  }

  click(item: Calcitems) {
    switch (item.type) {
      case Enumtype.Operator:
        if (item.label == '=') {
          this.calculate();
        } else {
          this.cO(item.label);
        }

        break;
      case Enumtype.Number:
        this.c(parseInt(item.label));
        break;
      default:
        this.calculate();
    }
  }
}

interface Calcitems {
  label: string;
  type: Enumtype;
}

enum Enumtype {
  Number = 'Number',
  Operator = 'Operator',
  Result = 'Result',
}
