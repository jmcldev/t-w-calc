import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResultsService } from '../results.service';


@Component({
  selector: 'app-deflection',
  templateUrl: './deflection.component.html',
  styleUrls: ['./deflection.component.css']
})
export class DeflectionComponent implements OnInit, OnDestroy {

  constructor(private resultsService: ResultsService) { }

  checked = true;

  v = {
    yb: "9.8",
    ye: "4.8",
    L: "70",
    b: "40",
    z: "70",
    delta: "0.2",
    E: "69000",
    F: ""
  }

  selectedOption = "Aluminum";
  options = [
    {name: "Aluminum", value: "Aluminum", E: "69000"},
    {name: "Copper/Brass/Bronze", value: "Copper", E: "117000"},
    {name: "Iron", value: "Iron", E: "210000"},
    {name: "Steel", value: "Steel", E: "200000"},
    {name: "Stainless Steel", value: "Stainless", E: "180000"},
    {name: "Titanium", value: "Titanium", E: "120000"},
    {name: "Plastic", value: "Plastic", E: "3200"},
    {name: "Wood", value: "Wood", E: "9000"},
    {name: "CUSTOM", value: "CUSTOM", E: "69000"},
  ];

  isInvalid;
  resultParams: any = {};
  calcF = "122";


  calcDefl() {
    let calcObj: any = {};

    for (let key in this.v) {
      let value = this.v[key];
      calcObj[key] = +value;
    }

    calcObj.z = calcObj.L - calcObj.z;

    if (this.v.F == "") {
      calcObj.F = +this.calcF;
    }

    if (this.v.ye == this.v.yb) {
      calcObj.yb = +this.v.yb + 0.001;
    }

    let m = (calcObj.yb - calcObj.ye) / calcObj.L;

    function ln(x) { if (x == 0) { return NaN; } else { return Math.log(x); } }; 

    let defl = 12 * calcObj.F / (calcObj.b * calcObj.E) * (calcObj.ye / (2 * Math.pow(m, 3)) * (1 / (calcObj.ye + calcObj.L * m) - 1 / (calcObj.ye + calcObj.z * m)) - ln((calcObj.ye + calcObj.z * m) / (calcObj.ye + calcObj.L * m)) / Math.pow(m, 3) + (-1*calcObj.ye/(2*Math.pow(m,2)*Math.pow(calcObj.yb,2))+1/(Math.pow(m,2)*calcObj.yb)) * (calcObj.z - calcObj.L));


    let stress = (6 * calcObj.F * calcObj.L) / (calcObj.b * Math.pow(calcObj.yb, 2));

    let tolerance = (defl * 100) / calcObj.delta;
    

    if (calcObj.z < 0) {
      defl = 0;
      stress = 0;
      tolerance = 0;

      this.isInvalid = !this.isInvalid;
    } else {
      this.isInvalid = false;
    }

    this.resultParams.defl = defl.toFixed(5);
    this.resultParams.stress = stress.toFixed(5);
    this.resultParams.tolerance = tolerance.toFixed(5);

    this.resultsService.changeMessage(this.resultParams);
  }


  onUnCheck() {
    this.checked ? this.v.F = this.calcF : this.v.F = "";
    this.calcDefl();
  }

  
  changeE(E) {
    this.v.E = E;
  }

  onSelectMaterial(selOpt) {

    let funcBind = this.calcDefl.bind(this);
    let changeEBind = this.changeE.bind(this);
    
    this.options.some(function (elem) {
      if (elem.value === selOpt) {
        
        let E = elem.E;

        changeEBind(E);

        funcBind();
 
        return true;
      }
    });
    
  }

  // store() {
  //   localStorage.defl = this.defl.toFixed(5);
  //   localStorage.stress = this.stress.toFixed(5);
  //   localStorage.removeItem("defl");
  //   console.log(localStorage.defl, localStorage.stress);
  // }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}




