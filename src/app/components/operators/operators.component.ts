import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {

  public operatorDetailView: boolean = false;

  public operators: any;
  public operatorDetails: any;
  public indexOperatorUpdating: any;
  private subscriptions: any[] = [];



  constructor(
    private apiService: ApiService
  ) {  }

  ngOnInit() {
    this.subscriptions.push(
      this.fetchOperators()
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  viewOperatorDetails(operator, index) {
    this.operatorDetails = operator;
    this.indexOperatorUpdating = index;
    this.fetchOperatorDetails(operator.id);
  }

  private fetchOperators() {
    this.apiService.fetchOperators().subscribe(response => {
      if(response){
        this.operators = response.json();
      }
    }, (error: any) => {
      console.error(error.json());
    });
  }

  private fetchOperatorDetails(id) {
    this.apiService.fetchOperatorDetails(id).subscribe(response => {
      if(response){
        this.operatorDetails = response.json();
      }
      this.operatorDetailView = true;
    }, (error: any) => {
      console.error(error.json());
    });
  }

  onChanged(update:boolean){
    if(update == false ){
      this.operatorDetailView = false;
    }
  }


}
