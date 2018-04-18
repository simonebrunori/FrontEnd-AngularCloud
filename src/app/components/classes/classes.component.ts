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
  students=[];

  constructor(private classService: ClassService) { }

   //Function to get all teacher's classes
   getAllMyClasses(){
    //Call the function getTeacherClasses() of classService
    this.classService.getTeacherClasses().subscribe(data=>{
      this.classes= data.classes[0].classes;
      this.classCount= data.count;
      this.loadStudents();    //load students in array
    });
    
  }


  //Function to get all class' students
  loadStudents(){
    
    var i=0;
    //for each element in class array
    this.classes.forEach(element => {
      var str=element.year.toString()+element.section;
      console.log(str);
      //Call the function getClassStudents() of classService
      this.classService.getClassStudents(element.year,element.section).subscribe(data=>{    
              this.students[str]=data.students;
              i++;
            });
      
    });
    

  }


  ngOnInit() {

      this.getAllMyClasses();   //get all teacher's classes
  }

}
