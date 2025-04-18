// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { PaperService } from '../../services/paper.service';
// import { Paper } from '../../models/paper.model';

// @Component({
//   selector: 'app-paper-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   template: `
//     <div class="paper-form-container">
//       <h2>{{ isEditMode ? 'Edit Paper' : 'Submit New Paper' }}</h2>
      
//       <form [formGroup]="paperForm" (ngSubmit)="onSubmit()">
//         <div class="form-group">
//           <label for="title">Title</label>
//           <input 
//             type="text" 
//             id="title" 
//             formControlName="title" 
//             placeholder="Enter paper title">
//           <div *ngIf="paperForm.get('title')?.invalid && paperForm.get('title')?.touched" class="error">
//             Title is required
//           </div>
//         </div>
        
//         <div class="form-group">
//           <label>Authors</label>
//           <div formArrayName="authors">
//             <div *ngFor="let author of authors.controls; let i=index" class="author-input">
//               <input 
//                 type="text" 
//                 [formControlName]="i" 
//                 placeholder="Author name">
//               <button 
//                 type="button" 
//                 class="remove-btn" 
//                 (click)="removeAuthor(i)" 
//                 *ngIf="authors.length > 1">
//                 Remove
//               </button>
//             </div>
//           </div>
//           <button type="button" class="add-btn" (click)="addAuthor()">Add Author</button>
//         </div>
        
//         <div class="form-group">
//           <label for="abstract">Abstract</label>
//           <textarea 
//             id="abstract" 
//             formControlName="abstract" 
//             rows="5" 
//             placeholder="Enter paper abstract"></textarea>
//           <div *ngIf="paperForm.get('abstract')?.invalid && paperForm.get('abstract')?.touched" class="error">
//             Abstract is required
//           </div>
//         </div>
        
//         <div class="form-group">
//           <label>Keywords</label>
//           <div formArrayName="keywords">
//             <div *ngFor="let keyword of keywords.controls; let i=index" class="keyword-input">
//               <input 
//                 type="text" 
//                 [formControlName]="i" 
//                 placeholder="Keyword">
//               <button 
//                 type="button" 
//                 class="remove-btn" 
//                 (click)="removeKeyword(i)" 
//                 *ngIf="keywords.length > 1">
//                 Remove
//               </button>
//             </div>
//           </div>
//           <button type="button" class="add-btn" (click)="addKeyword()">Add Keyword</button>
//         </div>
        
//         <div class="form-group">
//           <label for="content">Paper Content</label>
//           <textarea 
//             id="content" 
//             formControlName="content" 
//             rows="15" 
//             placeholder="Enter paper content"></textarea>
//           <div *ngIf="paperForm.get('content')?.invalid && paperForm.get('content')?.touched" class="error">
//             Content is required
//           </div>
//         </div>
        
//         <div class="form-group">
//           <label for="file">Upload Paper (PDF)</label>
//           <input 
//             type="file" 
//             id="file" 
//             accept=".pdf"
//             (change)="onFileSelected($event)">
//         </div>
        
//         <div class="form-actions">
//           <button type="button" class="cancel-btn" (click)="cancel()">Cancel</button>
//           <button 
//             type="submit" 
//             class="save-btn" 
//             [disabled]="paperForm.invalid">
//             {{ isEditMode ? 'Update' : 'Save' }}
//           </button>
//           <button 
//             *ngIf="isEditMode && paper?.status === 'draft'" 
//             type="button" 
//             class="submit-btn" 
//             (click)="submitPaper()" 
//             [disabled]="paperForm.invalid">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   `,
//   styles: [`
//     .paper-form-container {
//       max-width: 800px;
//       margin: 0 auto;
//       padding: 20px;
//     }
//     form {
//       margin-top: 20px;
//     }
//     .form-group {
//       margin-bottom: 20px;
//     }
//     label {
//       display: block;
//       margin-bottom: 8px;
//       font-weight: bold;
//     }
//     input[type="text"], textarea {
//       width: 100%;
//       padding: 10px;
//       border: 1px solid #ddd;
//       border-radius: 4px;
//       font-size: 16px;
//     }
//     .author-input, .keyword-input {
//       display: flex;
//       gap: 10px;
//       margin-bottom: 10px;
//     }
//     .remove-btn {
//       background-color: #f8d7da;
//       border: none;
//       padding: 5px 10px;
//       border-radius: 4px;
//       cursor: pointer;
//     }
//     .add-btn {
//       background-color: #e9ecef;
//       border: none;
//       padding: 8px 15px;
//       border-radius: 4px;
//       cursor: pointer;
//       margin-top: 5px;
//     }
//     .form-actions {
//       display: flex;
//       gap: 15px;
//       margin-top: 30px;
//     }
//     .form-actions button {
//       padding: 10px 20px;
//       border: none;
//       border-radius: 4px;
//       cursor: pointer;
//       font-weight: bold;
//     }
//     .form-actions button:disabled {
//       opacity: 0.5;
//       cursor: not-allowed;
//     }
//     .cancel-btn {
//       background-color: #f8f9fa;
//       color: #495057;
//     }
//     .save-btn {
//       background-color: #4dabf7;
//       color: white;
//     }
//     .submit-btn {
//       background-color: #0066cc;
//       color: white;
//     }
//     .error {
//       color: #dc3545;
//       font-size: 0.9rem;
//       margin-top: 5px;
//     }
//   `]
// })
// export class PaperFormComponent implements OnInit {
//   paperForm!: FormGroup;
//   isEditMode = false;
//   paper?: Paper;
//   selectedFile?: File;
  
//   constructor(
//     private fb: FormBuilder,
//     private paperService: PaperService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}
  
//   ngOnInit(): void {
//     this.initForm();
    
//     this.route.paramMap.subscribe(params => {
//       const paperId = params.get('id');
//       if (paperId) {
//         this.isEditMode = true;
//         this.paperService.getPaperById(paperId).subscribe(paper => {
//           if (paper) {
//             this.paper = paper;
//             this.patchFormValues(paper);
//           }
//         });
//       }
//     });
//   }
  
//   get authors() {
//     return this.paperForm.get('authors') as FormArray;
//   }
  
//   get keywords() {
//     return this.paperForm.get('keywords') as FormArray;
//   }
  
//   initForm(): void {
//     this.paperForm = this.fb.group({
//       title: ['', Validators.required],
//       authors: this.fb.array([
//         this.fb.control('', Validators.required)
//       ]),
//       abstract: ['', Validators.required],
//       keywords: this.fb.array([
//         this.fb.control('', Validators.required)
//       ]),
//       content: ['', Validators.required]
//     });
//   }
  
//   patchFormValues(paper: Paper): void {
//     this.paperForm.patchValue({
//       title: paper.title,
//       abstract: paper.abstract,
//       content: paper.content
//     });
    
//     // Clear and rebuild authors array
//     while (this.authors.length) {
//       this.authors.removeAt(0);
//     }
//     paper.authors.forEach(author => {
//       this.authors.push(this.fb.control(author, Validators.required));
//     });
    
//     // Clear and rebuild keywords array
//     while (this.keywords.length) {
//       this.keywords.removeAt(0);
//     }
//     paper.keywords.forEach(keyword => {
//       this.keywords.push(this.fb.control(keyword, Validators.required));
//     });
//   }
  
//   addAuthor(): void {
//     this.authors.push(this.fb.control('', Validators.required));
//   }
  
//   removeAuthor(index: number): void {
//     this.authors.removeAt(index);
//   }
  
//   addKeyword(): void {
//     this.keywords.push(this.fb.control('', Validators.required));
//   }
  
//   removeKeyword(index: number): void {
//     this.keywords.removeAt(index);
//   }
  
//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files?.length) {
//       this.selectedFile = input.files[0];
//     }
//   }
  
 
//   onSubmit() {
//     // 1) Collect form values
//     const raw = this.paperForm.value;
//     const form = new FormData();
//     form.append('title', raw.title);
//     form.append('authors', JSON.stringify(raw.authors));       // array → JSON
//     form.append('abstract', raw.abstract);
//     form.append('keywords', JSON.stringify(raw.keywords));     // array → JSON
//     form.append('content', raw.content);
//     form.append('status', raw.status);
  
//     // 2) File upload
//     const fileInput = (document.querySelector('#fileInput') as HTMLInputElement);
//     if (fileInput.files?.[0]) {
//       form.append('file', fileInput.files[0], fileInput.files[0].name);
//     }
  
//     // 3) Call save() instead of submitPaper()
//     const id = this.isEditMode ? this.paperForm.get('id')?.value : undefined;
//     this.paperService.save(form, id).subscribe(() => {
//       this.router.navigate(['/papers']);
//     });
//   }
  
  
//   submitPaper(): void {
//     this.onSubmit();
//     if (this.paper?.id) {
//       this.paperService.submitPaper(this.paper.id);
//       this.router.navigate(['/papers', this.paper.id]);
//     }
//   }
  
//   cancel(): void {
//     if (this.isEditMode && this.paper?.id) {
//       this.router.navigate(['/papers', this.paper.id]);
//     } else {
//       this.router.navigate(['/']);
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaperService } from '../../services/paper.service';
import { Paper } from '../../models/paper.model';

@Component({
  selector: 'app-paper-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="paper-form-container">
      <h2>{{ isEditMode ? 'Edit Paper' : 'Submit New Paper' }}</h2>
      
      <form [formGroup]="paperForm" (ngSubmit)="onSubmit()">
        <!-- Title -->
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" formControlName="title" placeholder="Enter paper title">
          <div *ngIf="paperForm.get('title')?.invalid && paperForm.get('title')?.touched" class="error">
            Title is required
          </div>
        </div>
        
        <!-- Authors -->
        <div class="form-group">
          <label>Authors</label>
          <div formArrayName="authors">
            <div *ngFor="let author of authors.controls; let i = index" class="author-input">
              <input type="text" [formControlName]="i" placeholder="Author name">
              <button type="button" class="remove-btn" (click)="removeAuthor(i)" *ngIf="authors.length > 1">
                Remove
              </button>
            </div>
          </div>
          <button type="button" class="add-btn" (click)="addAuthor()">Add Author</button>
        </div>
        
        <!-- Abstract -->
        <div class="form-group">
          <label for="abstract">Abstract</label>
          <textarea id="abstract" formControlName="abstract" rows="5" placeholder="Enter paper abstract"></textarea>
          <div *ngIf="paperForm.get('abstract')?.invalid && paperForm.get('abstract')?.touched" class="error">
            Abstract is required
          </div>
        </div>
        
        <!-- Keywords -->
        <div class="form-group">
          <label>Keywords</label>
          <div formArrayName="keywords">
            <div *ngFor="let keyword of keywords.controls; let i = index" class="keyword-input">
              <input type="text" [formControlName]="i" placeholder="Keyword">
              <button type="button" class="remove-btn" (click)="removeKeyword(i)" *ngIf="keywords.length > 1">
                Remove
              </button>
            </div>
          </div>
          <button type="button" class="add-btn" (click)="addKeyword()">Add Keyword</button>
        </div>
        
        <!-- Content -->
        <div class="form-group">
          <label for="content">Paper Content</label>
          <textarea id="content" formControlName="content" rows="15" placeholder="Enter paper content"></textarea>
          <div *ngIf="paperForm.get('content')?.invalid && paperForm.get('content')?.touched" class="error">
            Content is required
          </div>
        </div>
        
        <!-- File upload -->
        <div class="form-group">
          <label for="fileInput">Upload Paper (PDF)</label>
          <input type="file" id="fileInput" accept=".pdf" (change)="onFileSelected($event)">
        </div>
        
        <!-- Actions -->
        <div class="form-actions">
          <button type="button" class="cancel-btn" (click)="cancel()">Cancel</button>
          <button type="submit" class="save-btn" [disabled]="paperForm.invalid">
            {{ isEditMode ? 'Update' : 'Save' }}
          </button>
          <button *ngIf="isEditMode && paper?.status === 'draft'" type="button" class="submit-btn" (click)="submitPaper()">
            Submit
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .paper-form-container { max-width: 800px; margin: 0 auto; padding: 20px; }
    form { margin-top: 20px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: bold; }
    input[type="text"], textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; }
    .author-input, .keyword-input { display: flex; gap: 10px; margin-bottom: 10px; }
    .remove-btn { background-color: #f8d7da; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
    .add-btn { background-color: #e9ecef; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; margin-top: 5px; }
    .form-actions { display: flex; gap: 15px; margin-top: 30px; }
    .form-actions button { padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .cancel-btn { background-color: #f8f9fa; color: #495057; }
    .save-btn { background-color: #4dabf7; color: white; }
    .submit-btn { background-color: #0066cc; color: white; }
    .error { color: #dc3545; font-size: 0.9rem; margin-top: 5px; }
  `]
})
export class PaperFormComponent implements OnInit {
  paperForm!: FormGroup;
  isEditMode = false;
  paper?: Paper;
  selectedFile?: File;
  
  constructor(
    private fb: FormBuilder,
    private paperService: PaperService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    
    this.route.paramMap.subscribe(params => {
      const paperId = params.get('id');
      if (paperId) {
        this.isEditMode = true;
        this.paperService.get(paperId).subscribe(paper => {
          this.paper = paper;
          this.patchFormValues(paper);
        });
      }
    });
  }
  
  get authors() { return this.paperForm.get('authors') as FormArray; }
  get keywords() { return this.paperForm.get('keywords') as FormArray; }
  
  initForm(): void {
    this.paperForm = this.fb.group({
      title: ['', Validators.required],
      authors: this.fb.array([ this.fb.control('', Validators.required) ]),
      abstract: ['', Validators.required],
      keywords: this.fb.array([ this.fb.control('', Validators.required) ]),
      content: ['', Validators.required]
    });
  }
  
  patchFormValues(paper: Paper): void {
    this.paperForm.patchValue({
      title: paper.title,
      abstract: paper.abstract,
      content: paper.content
    });
    
    this.authors.clear();
    paper.authors.forEach(a => this.authors.push(this.fb.control(a, Validators.required)));
    
    this.keywords.clear();
    paper.keywords.forEach(k => this.keywords.push(this.fb.control(k, Validators.required)));
  }
  
  addAuthor(): void { this.authors.push(this.fb.control('', Validators.required)); }
  removeAuthor(i: number): void { this.authors.removeAt(i); }
  addKeyword(): void { this.keywords.push(this.fb.control('', Validators.required)); }
  removeKeyword(i: number): void { this.keywords.removeAt(i); }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }
  
  onSubmit(): void {
    const raw = this.paperForm.value;
    const form = new FormData();
    form.append('title', raw.title);
    form.append('authors', JSON.stringify(raw.authors));
    form.append('abstract', raw.abstract);
    form.append('keywords', JSON.stringify(raw.keywords));
    form.append('content', raw.content);
    
    // status: keep draft on save
    form.append('status', this.isEditMode && this.paper ? this.paper.status : 'draft');

    if (this.selectedFile) {
      form.append('file', this.selectedFile, this.selectedFile.name);
    }

    const id = this.isEditMode && this.paper ? this.paper.id : undefined;
    this.paperService.save(form, id).subscribe(() => {
      this.router.navigate(['/papers']);
    });
  }
  
  submitPaper(): void {
    if (this.paper?.id) {
      this.paperService.submitPaper(this.paper.id).subscribe(() => {
        this.router.navigate(['/papers', this.paper!.id]);
      });
    }
  }
  
  cancel(): void {
    if (this.isEditMode && this.paper?.id) {
      this.router.navigate(['/papers', this.paper.id]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
