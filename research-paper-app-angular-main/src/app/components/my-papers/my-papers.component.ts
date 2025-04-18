import { Component, OnInit } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { RouterLink }      from '@angular/router';
import { PaperService }    from '../../services/paper.service';
import { Paper }           from '../../models/paper.model';

@Component({
  selector: 'app-my-papers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="my-papers-container">
      <h2>My Papers</h2>
      
      <div class="paper-status-nav">
        <button [class.active]="currentStatus === 'all'" (click)="filterPapers('all')">All</button>
        <button [class.active]="currentStatus === 'draft'" (click)="filterPapers('draft')">Drafts</button>
        <button [class.active]="currentStatus === 'submitted'" (click)="filterPapers('submitted')">Submitted</button>
        <button [class.active]="currentStatus === 'published'" (click)="filterPapers('published')">Published</button>
        <button [class.active]="currentStatus === 'rejected'" (click)="filterPapers('rejected')">Rejected</button>
      </div>
      
      <div class="papers-grid" *ngIf="filteredPapers.length; else noPapers">
        <div 
          class="paper-card" 
          *ngFor="let paper of filteredPapers" 
          [ngClass]="paper.status">
          <h3><a [routerLink]="['/papers', paper.id!]">{{ paper.title }}</a></h3>
          <p class="paper-status">{{ paper.status | titlecase }}</p>
          <p class="paper-date" *ngIf="paper.publicationDate">{{ paper.publicationDate | date }}</p>
          <div class="paper-actions">
            <a [routerLink]="['/papers', paper.id!]" class="view-btn">View</a>
            <a *ngIf="paper.status === 'draft'" [routerLink]="['/submit', paper.id!]" class="edit-btn">Edit</a>
            <button 
              *ngIf="paper.status === 'draft'" 
              class="submit-btn" 
              (click)="submitPaper(paper.id!)">
              {{ submittingId === paper.id ? 'Submitting...' : 'Submit' }}
            </button>
          </div>
        </div>
      </div>
      
      <ng-template #noPapers>
        <div class="no-papers">
          <p>You haven't created any papers yet.</p>
          <a routerLink="/submit" class="create-btn">Create New Paper</a>
        </div>
      </ng-template>
      
      <div class="new-paper">
        <a routerLink="/submit" class="create-btn">+ Create New Paper</a>
      </div>
    </div>
  `,
  styles: [`
    .my-papers-container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .paper-status-nav {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
      border-bottom: 2px solid #eee;
    }

    .paper-status-nav button {
      background: none;
      border: none;
      padding: 8px 16px;
      font-weight: bold;
      color: #666;
      cursor: pointer;
      transition: color 0.2s, border-bottom 0.2s;
    }

    .paper-status-nav button.active {
      color: #0066cc;
      border-bottom: 3px solid #0066cc;
    }
    .paper-status-nav button:hover {
      color: #005bb5;
    }

    .papers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .paper-card {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 20px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .paper-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.1);
    }

    .paper-card.draft     { border-left: 4px solid #f8f9fa; }
    .paper-card.submitted { border-left: 4px solid #fff3cd; }
    .paper-card.published { border-left: 4px solid #d4edda; }
    .paper-card.rejected  { border-left: 4px solid #f8d7da; }

    .paper-card h3 {
      margin: 0 0 10px;
      font-size: 1.2rem;
    }
    .paper-card h3 a {
      color: #0066cc;
      text-decoration: none;
      transition: color 0.2s;
    }
    .paper-card h3 a:hover {
      color: #005bb5;
    }

    .paper-status {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      background: #f1f1f1;
      margin-bottom: 10px;
      font-size: 0.85rem;
    }

    .paper-date {
      font-size: 0.8rem;
      color: #999;
      margin-bottom: 15px;
    }

    .paper-actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
    .paper-actions a,
    .paper-actions button {
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 0.9rem;
      font-weight: bold;
      border: none;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }

    .view-btn {
      background: #e9ecef;
      color: #495057;
    }
    .view-btn:hover {
      background: #d8dbe0;
    }
    .edit-btn {
      background: #e7f5ff;
      color: #1971c2;
    }
    .edit-btn:hover {
      background: #d0ebff;
    }
    .submit-btn {
      background: #0066cc;
      color: #fff;
    }
    .submit-btn:hover {
      background: #005bb5;
    }

    .no-papers {
      text-align: center;
      padding: 40px 0;
      color: #666;
    }
    .create-btn {
      display: inline-block;
      padding: 10px 20px;
      background: #0066cc;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .create-btn:hover {
      background: #005bb5;
    }

    .new-paper {
      margin-top: 30px;
      text-align: right;
    }
  `]
})
export class MyPapersComponent implements OnInit {
  papers: Paper[] = [];
  filteredPapers: Paper[] = [];
  currentStatus = 'all';
  submittingId: string | null = null;

  constructor(private paperService: PaperService) {}

  ngOnInit(): void {
    this.paperService.list().subscribe(papers => {
      this.papers = papers;
      this.filterPapers(this.currentStatus);
    });
  }

  filterPapers(status: string): void {
    this.currentStatus = status;
    this.filteredPapers =
      status === 'all'
        ? [...this.papers]
        : this.papers.filter(p => p.status === status);
  }

  submitPaper(paperId: string): void {
    this.submittingId = paperId;
    this.paperService.submitPaper(paperId).subscribe({
      next: () => {
        const p = this.papers.find(x => x.id === paperId);
        if (p) p.status = 'submitted';
        this.filterPapers(this.currentStatus);
        this.submittingId = null;
      },
      error: () => { this.submittingId = null; }
    });
  }
}
