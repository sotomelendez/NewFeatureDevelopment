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
  type: string = '';
  showLoadMore = true;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.loadFiles(true);
  }

  loadFiles(enable: boolean) {
    if(this.type === undefined || this.type === '')
      this.loadFilesPage(enable);
    else
      this.loadFilesPageByType(enable);
  }

  loadFilesPage(enable: boolean) {
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

  loadFilesPageByType(enable: boolean) {
    this.showFile = enable;

    this.uploadService.getFilesPageByType(this.page, this.type)
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

  filterByType($event) {
    this.type = $event.target.value;
    this.page = 1;
    this.files = [];
    this.showLoadMore = true;
    this.loadFiles(true);
  }

}
