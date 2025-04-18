// import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [RouterLink, FormsModule],
//   template: `
//     <div class="home-container">
//       <section class="hero">
//         <h1>Welcome to the Research Paper Repository</h1>
//         <p>A platform for researchers to share and discover academic papers</p>
//         <div class="search-container">
//           <input 
//             type="text" 
//             placeholder="Search for papers..." 
//             [(ngModel)]="searchQuery"
//             (keyup.enter)="search()">
//           <button (click)="search()">Search</button>
//         </div>
//       </section>
      
//       <section class="features">
//         <div class="feature">
//           <h3>Browse Papers</h3>
//           <p>Explore our collection of academic papers across various disciplines.</p>
//           <a routerLink="/papers">Browse</a>
//         </div>
        
//         <div class="feature">
//           <h3>Submit Your Research</h3>
//           <p>Share your findings with the academic community.</p>
//           <a routerLink="/submit">Submit Paper</a>
//         </div>
        
//         <div class="feature">
//           <h3>Track Submissions</h3>
//           <p>Monitor the status of your submitted papers.</p>
//           <a routerLink="/my-papers">My Papers</a>
//         </div>
//       </section>
//     </div>
//   `,
//   styles: [`
//     .home-container {
//       text-align: center;
//     }
//     .hero {
//       margin-bottom: 40px;
//       padding: 40px 0;
//     }
//     .hero h1 {
//       font-size: 2.5rem;
//       margin-bottom: 20px;
//     }
//     .search-container {
//       max-width: 600px;
//       margin: 30px auto;
//       display: flex;
//     }
//     .search-container input {
//       flex: 1;
//       padding: 12px;
//       font-size: 16px;
//       border: 1px solid #ddd;
//       border-radius: 4px 0 0 4px;
//     }
//     .search-container button {
//       padding: 12px 24px;
//       background: #0066cc;
//       color: white;
//       border: none;
//       border-radius: 0 4px 4px 0;
//       cursor: pointer;
//     }
//     .features {
//       display: flex;
//       justify-content: space-around;
//       margin-top: 40px;
//     }
//     .feature {
//       width: 30%;
//       padding: 20px;
//       border: 1px solid #eee;
//       border-radius: 5px;
//     }
//     .feature a {
//       display: inline-block;
//       margin-top: 15px;
//       padding: 8px 16px;
//       background: #0066cc;
//       color: white;
//       text-decoration: none;
//       border-radius: 4px;
//     }
//   `]
// })
// export class HomeComponent {
//   searchQuery: string = '';
  
//   constructor(private router: Router) {}
  
//   search() {
//     if (this.searchQuery.trim()) {
//       this.router.navigate(['/papers'], { 
//         queryParams: { query: this.searchQuery } 
//       });
//     }
//   }
// }

import { Component } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="home-container">
      <section class="hero">
        <h1>Welcome to the Research Paper Repository</h1>
        <p>A platform for researchers to share and discover academic papers</p>
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Search for papers..." 
            [(ngModel)]="searchQuery"
            (keyup.enter)="search()">
          <button (click)="search()">Search</button>
        </div>
      </section>
      
      <section class="features">
        <div class="feature">
          <h3>Browse Papers</h3>
          <p>Explore our collection of academic papers across various disciplines.</p>
          <a routerLink="/papers">Browse</a>
        </div>
        
        <div class="feature">
          <h3>Submit Your Research</h3>
          <p>Share your findings with the academic community.</p>
          <a routerLink="/submit">Submit Paper</a>
        </div>
        
        <div class="feature">
          <h3>Track Submissions</h3>
          <p>Monitor the status of your submitted papers.</p>
          <a routerLink="/my-papers">My Papers</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      text-align: center;
      padding: 20px;
    }

    .hero {
      margin-bottom: 40px;
      padding: 40px 0;
      background: #f9f9f9;
      border-radius: 8px;
    }
    .hero h1 {
      font-size: 2.75rem;
      margin-bottom: 10px;
      color: #333;
    }
    .hero p {
      font-size: 1.1rem;
      color: #555;
    }

    .search-container {
      max-width: 600px;
      margin: 30px auto 0;
      display: flex;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .search-container input {
      flex: 1;
      padding: 12px 16px;
      font-size: 1rem;
      border: none;
      outline: none;
    }
    .search-container button {
      padding: 0 24px;
      background: #0066cc;
      color: #fff;
      border: none;
      cursor: pointer;
      // transition: background 0.2s ease;
    }
    .search-container button:hover {
      background: #005bb5;
    }

    .features {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      margin-top: 50px;
    }
    .feature {
      flex: 1 1 280px;
      max-width: 300px;
      padding: 20px;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .feature:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.1);
    }
    .feature h3 {
      margin-top: 0;
      color: #0066cc;
    }
    .feature p {
      color: #555;
      line-height: 1.4;
    }
    .feature a {
      display: inline-block;
      margin-top: 12px;
      padding: 8px 16px;
      background: #0066cc;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
      // transition: background 0.2s ease;
    }
    .feature a:hover {
      background: #005bb5;
    }
  `]
})
export class HomeComponent {
  searchQuery = '';

  constructor(private router: Router) {}

  search(): void {
    const query = this.searchQuery.trim();
    if (query) {
      this.router.navigate(['/papers'], { queryParams: { query } });
    }
  }
}
