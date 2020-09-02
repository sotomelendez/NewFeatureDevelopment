import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  showFile = false;
  files: string[] = [];
  page: number = 1;
  showLoadMore = true;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.loadFiles(true);
  }

  loadFiles(enable: boolean) {
    this.showFile = enable;

    this.uploadService.getFilesPage(this.page)
      .toPromise().then((response) => {
        response.forEach(element => {
          this.files.push(element);
        });
        this.page++;
        if(response.length < 20)
          this.showLoadMore = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // showFiles(enable: boolean) {
  //   this.showFile = enable;

  //   if (enable) {
  //     this.fileUploads = this.uploadService.getFiles();
  //   }
  // }
}
