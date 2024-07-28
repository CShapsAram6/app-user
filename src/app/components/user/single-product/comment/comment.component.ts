import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  imageUrls: { url: string; index: number; file: File }[] = [];
  ngOnInit(): void {}
  onFilesSelected(event: any) {
    this.imageUrls = [];
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrls.push({
          url: reader.result as string,
          index: i,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
    console.log(this.imageUrls);
  }
  RemoveItem(index: number) {
    this.imageUrls.splice(index, 1);
    for (let i = 0; i < this.imageUrls.length; i++) {
      this.imageUrls[i].index = i;
    }
  }
}
