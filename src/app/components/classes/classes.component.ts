import { Component, OnInit } from '@angular/core';
import { ClassService} from '../../services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes;
  classCount;

  constructor(private classService: ClassService) { }

  getAllMyClasses(){
    this.classService.getTeacherClasses().subscribe(data=>{
      this.classCount= data.count;
      this.classes= data.classes[0].classes;
    });
  }



  ngOnInit() {
    this.getAllMyClasses();
  }

}
