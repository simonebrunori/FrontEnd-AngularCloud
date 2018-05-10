import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
declare var $: any;

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;

  constructor() { }

  ngOnInit() {
    $('#summernote').summernote();

    this.exampleData = [
      {
        id: 'basic1',
        text: 'Basic 1'
      },
      {
        id: 'basic2',
        disabled: true,
        text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];



    this.options = {
      multiple: true
    }
  }

}
