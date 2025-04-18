// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { Paper } from '../models/paper.model';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class PaperService {

//   private base = `${environment.apiUrl}/papers`;
//   private papers: Paper[] = [
//     {
//       id: '1',
//       title: 'Advances in Machine Learning',
//       authors: ['John Doe', 'Jane Smith'],
//       abstract: 'This paper discusses recent advances in machine learning techniques.',
//       keywords: ['machine learning', 'AI', 'deep learning'],
//       content: 'Content of the paper goes here...',
//       publicationDate: new Date('2025-01-15'),
//       status: 'published'
//     },
//     {
//       id: '2',
//       title: 'Quantum Computing: A New Era',
//       authors: ['Robert Johnson', 'Lisa Wang'],
//       abstract: 'An overview of quantum computing and its applications.',
//       keywords: ['quantum computing', 'quantum physics', 'computing'],
//       content: 'Content of the paper goes here...',
//       publicationDate: new Date('2025-02-20'),
//       status: 'published'
//     }
//   ];
//   constructor(private http: HttpClient) {}
//   private papersSubject = new BehaviorSubject<Paper[]>(this.papers);

//   get(id: string): Observable<Paper> {
//     return this.http.get<Paper>(`${this.base}/${id}`);
//   }

  
//   getPapers(): Observable<Paper[]> {
//     return this.papersSubject.asObservable();
//   }

//   getPaperById(id: string): Observable<Paper | undefined> {
//     const paper = this.papers.find(p => p.id === id);
//     return of(paper);
//   }

//   addPaper(paper: Paper): void {
//     paper.id = Date.now().toString();
//     paper.status = 'draft';
//     this.papers.push(paper);
//     this.papersSubject.next([...this.papers]);
//   }

//   updatePaper(updatedPaper: Paper): void {
//     const index = this.papers.findIndex(p => p.id === updatedPaper.id);
//     if (index !== -1) {
//       this.papers[index] = updatedPaper;
//       this.papersSubject.next([...this.papers]);
//     }
//   }

//   submitPaper(paperId: string): void {
//     const paper = this.papers.find(p => p.id === paperId);
//     if (paper && paper.status === 'draft') {
//       paper.status = 'submitted';
//       this.papersSubject.next([...this.papers]);
//     }
//   }

//   // src/app/services/paper.service.ts
// save(data: FormData, id?: string) {
//   if (id) {
//     return this.http.put<Paper>(`${this.base}/${id}`, data);
//   } else {
//     return this.http.post<Paper>(this.base, data);
//   }
// }


// // src/app/services/paper.service.ts
// // submitPaper(id: string) {
// //   // send a JSON patch to update status
// //   return this.http.put<Paper>(`${this.base}/${id}`, { status: 'submitted' });
// // }


//   searchPapers(query: string): Observable<Paper[]> {
//     if (!query.trim()) {
//       return of(this.papers);
//     }
    
//     const filteredPapers = this.papers.filter(paper => 
//       paper.title.toLowerCase().includes(query.toLowerCase()) ||
//       paper.abstract.toLowerCase().includes(query.toLowerCase()) ||
//       paper.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase())) ||
//       paper.authors.some(author => author.toLowerCase().includes(query.toLowerCase()))
//     );
    
//     return of(filteredPapers);
//   }
// }


// src/app/services/paper.service.ts
// src/app/services/paper.service.ts

// src/app/services/paper.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

import { Paper } from '../models/paper.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaperService {
  // Base URL for the API
  private base = `${environment.apiUrl}/papers`;

  /**
   * GET: list all papers
   */
  list(): Observable<Paper[]> {
    return ajax.getJSON<Paper[]>(this.base);
  }

  /**
   * GET: fetch a single paper by ID
   */
  get(id: string): Observable<Paper> {
    return ajax.getJSON<Paper>(`${this.base}/${id}`);
  }

  /**
   * POST or PUT multipart/form-data
   * Uses FormData to include file uploads
   */
  save(data: FormData, id?: string): Observable<Paper> {
    const url = id ? `${this.base}/${id}` : this.base;
    const method: 'POST' | 'PUT' = id ? 'PUT' : 'POST';

    return ajax<Paper>({ url, method, body: data }).pipe(
      map((res: AjaxResponse<Paper>) => res.response)
    );
  }

  /**
   * PUT: update paper status to "submitted"
   */
  submitPaper(id: string): Observable<Paper> {
    return ajax<Paper>({
      url: `${this.base}/${id}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: { status: 'submitted' }
    }).pipe(
      map((res: AjaxResponse<Paper>) => res.response)
    );
  }

  /**
   * DELETE: remove a paper
   */
  delete(id: string): Observable<void> {
    return ajax<void>({ url: `${this.base}/${id}`, method: 'DELETE' }).pipe(
      map((res: AjaxResponse<void>) => res.response)
    );
  }

  /**
   * GET: search papers via backend text-search
   */
  searchPapers(query: string): Observable<Paper[]> {
    const url = query
      ? `${this.base}?query=${encodeURIComponent(query)}`
      : this.base;
    return ajax.getJSON<Paper[]>(url);
  }
}


