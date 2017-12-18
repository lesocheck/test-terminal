import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import createNumberMask from '../../../../node_modules/text-mask-addons/dist/createNumberMask'

@Component({
  selector: 'app-operator-detail',
  templateUrl: './operator-detail.component.html',
  styleUrls: ['./operator-detail.component.scss']
})
export class OperatorDetailComponent implements OnInit {

  @Input() operator: any;
  @Output() onChanged = new EventEmitter<boolean>();


  public phoneValidate: boolean = false;
  public response: string = '';
  public responseError:  string = '';
  public phone: string = '';
  public sum: string = '';
  public maskPhone:any = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  public codes:any[] = [];
  public maskSum = createNumberMask({
    suffix: ' р.',
    prefix: '',
    thousandsSeparatorSymbol: ' ',
    integerLimit: 4
  });
  public error:string = '';


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  checkSum(newValue) {
    let newVal = newValue.slice(0,-3).replace(' ', '')*1;
    if(newVal > 1000) this.sum = '1 000 р.';
    if(newVal === 0) this.sum = ''
  }

  checkPhone(newValue) {
    let newVal = newValue.substr(1,3);
    let validNumber = newValue.replace(/( )|(-)|(\()|(\)|(_))/g, '');

    if(this.operator.codes.indexOf(newVal) === -1 && validNumber){
      this.error = 'Неправильный код';
      this.phoneValidate = false
    } else if(validNumber.length<10 && validNumber){
      this.error = 'Неполный номер';
      this.phoneValidate = false
    } else if(validNumber.length === 0) {
      this.error = null;
      this.phoneValidate = false
    } else {
      this.error = null;
      this.phoneValidate = true
    }
  }


  save() {
    let params:any = {
      id: this.operator.id,
      phone: this.phone,
      sum: this.sum
    };
    this.payment(params)
  }

  private payment(params) {
    this.apiService.payment(params).subscribe(response => {
      this.response = response.statusText;
      setTimeout(() => {
        this.response = null;
        this.onChanged.emit(false);
      }, 2000);
    }, (error: any) => {
      this.responseError = error.statusText;
      setTimeout(() => {
        this.responseError = null;
      }, 2000);
    });
  }

}
