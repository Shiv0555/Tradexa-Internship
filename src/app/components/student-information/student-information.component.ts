import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'src/app/shared/api-service.service';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.css']
})
export class StudentInformationComponent implements OnInit {

  Data!: FormGroup;
  DataModel:any;
  DataDetails:any;
  showAddBtn:boolean=true;
  showUpdateBtn:boolean=false;


  constructor(private api: ApiServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllDataDetails();
    this.createDataForm();
  }
 

  createDataForm(){
    this.Data = this.fb.group({
      userid:[''],
      id:[''],
      title:[''],
      body:['']
      
    });
  }

  getAllDataDetails(){
    this.api.getAllData().subscribe(res=>{
      this.DataDetails = res;
    }, err=>{
      console.log(err);
      
    })
  }

  onAddClick(){
    this.showAddBtn=true;
    this.showUpdateBtn=false;
  }

  postDataDetails(){
    this.DataModel = Object.assign({}, this.Data.value);

    this.api.postData(this.DataModel).subscribe(res=>{
      alert(" Information added successfully");
      let close = document.getElementById('close');
      close?.click();
      this.Data.reset();
      this.getAllDataDetails();
    }, err=>{
      alert("Error");
    })
  }

  deleteDataDetail(id:any){
  

    if(confirm(`Are you sure to delete record with id ${id}`))
    this.api.deleteData(id).subscribe(res=>{
      alert(" information deleted successfully");
      this.getAllDataDetails();
    }, err=>{
      alert("Failed to delete student information");
    })
  }

  edit(data:any){

    this.showAddBtn=false;
    this.showUpdateBtn=true;
    this.Data.controls['userid'].setValue(data.userid);
    this.Data.controls['id'].setValue(data.id);
    this.Data.controls['title'].setValue(data.title);
    this.Data.controls['body'].setValue(data.body);
    
  }

  updateDataDetails(){
    this.DataModel = Object.assign({}, this.Data.value);

    this.api.updateData(this.DataModel, this.DataModel.id).subscribe(res=>{
      alert("Student information updated successfully");
      let close = document.getElementById('close');
      close?.click();
      this.getAllDataDetails();
      this.Data.reset();
      this.DataModel={};
    }, err=>{
      alert("Error in updating student information");
    })
  }

  reset(){
    this.Data.reset();
    this.DataModel={};
  }

}
