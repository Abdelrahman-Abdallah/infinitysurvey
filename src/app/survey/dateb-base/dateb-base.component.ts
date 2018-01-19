import { SurveyComponentControlService } from './../survey-component-control.service';
import { SurveyComponent } from './../survey.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators , FormBuilder , FormArray} from '@angular/forms';
import * as XLSX from 'xlsx';
import { log } from 'util';
// import { AOA2SheetOpts } from 'xlsx';
// import{ boot}

@Component({
  selector: 'app-dateb-base',
  templateUrl: './dateb-base.component.html',
  styleUrls: ['./dateb-base.component.css']
})
export class DatebBaseComponent implements OnInit {

  
 
  fileNameWarning = 'Please Upload Excel sheet Only!';
  danger:boolean = false;
  display: Boolean = false;
  data :any;
  fileName = '';
  durationForm: FormGroup;
  test;
  finalArray;
  
  
  constructor(private componetControl: SurveyComponentControlService,
    private formbuilder: FormBuilder) {  }
      

  ngOnInit() {
    
    this.componetControl.databaseProcessing.subscribe(() => {
      console.log("Event Subscribed");
    //   console.log("xsls : " ,XLSX);
      this.display = true;
      
    });
    this.durationForm = this.formbuilder.group({
        'duration': ['0', Validators.min(1)]
      });
   
}
onFileChange(evt: any) {
    /* wire up file reader */
    console.log(evt.target);
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    // console.log(evt.target.files[0].type);
    if(evt.target.files[0].type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        this.danger = true;
    }
    else{
        this.danger = false;
        this.fileNameWarning = '';
        this.fileName = evt.target.files[0].name;
        reader.readAsBinaryString(target.files[0]);
    }
    
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      console.log("Ws : ",XLSX.utils.sheet_to_json(ws,{header:1}));
      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws));
      
    //   console.log(XLSX.utils);
    //   console.log(this.data);
    // // console.log(ws);
      
    };
    // console.log(target.files[0]);
    
  }
    

// filesToUpload: Array<File>;
submit(){
    
    if(this.data != undefined){
        this.componetControl.question.database = this.data;
    }
    else{
        this.componetControl.question.database = [];
    }
    
    var time = new Date().getTime();
    var dur = this.durationForm.value.duration;
    var surveyDeadline = time + dur * 86400 *1000;
    this.test = surveyDeadline;
    this.componetControl.question.expireDate = this.test;
    console.log("Time Before: ",new Date(time));
    console.log("Time After : ",new Date(surveyDeadline));
    
    
    console.log(this.componetControl.question);
    this.finalArray = this.componetControl.question;

}

close(){
  this.data = [];
  this.fileName = '';
  this.fileNameWarning = '';
  this.durationForm.get('duration').setValue(0);
this.display = false;
}

// upload() {
//     this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then((result) => {
//         console.log(result);
//     }, (error) => {
//      console.log("Error accured")
//         console.error(error);
//     });
// }

// fileChangeEvent(fileInput: any){
//     this.filesToUpload = <Array<File>> fileInput.target.files;
// }

// makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
//     return new Promise((resolve, reject) => {
//         var formData: any = new FormData();
//         var xhr = new XMLHttpRequest();
//         for(var i = 0; i < files.length; i++) {
//             formData.append("uploads[]", files[i], files[i].name);
//         }
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState == 4) {
//                 if (xhr.status == 200) {
//                     resolve(JSON.parse(xhr.response));
//                 } else {
//                     reject(xhr.response);
//                 }
//             }
//         }
//         xhr.open("POST", url, true);
//         xhr.send(formData);
//     });
// }





 
  
}
