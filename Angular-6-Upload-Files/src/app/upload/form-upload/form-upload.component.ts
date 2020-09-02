import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  result: string;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).toPromise()
    .then((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.result = 'Success!';
      }
    })
    .catch((err) => {
      console.log(err); 
      if(err.status === 400){
        let response: any = err;
        let error = JSON.parse(response.error);
        console.log(error.msg.toString());
        this.result = error.msg.code && error.msg.code.includes('LIMIT_FILE_SIZE') ? 'Error: File too large' : error.msg;
      }
      else if(err.status === 500) {
        this.result = 'Unexpected error';
      }
    })
    this.selectedFiles = undefined;
  }

}
