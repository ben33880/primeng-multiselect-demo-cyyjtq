import { Component } from '@angular/core';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService],
})
export class AppComponent {
  selectedUser: string[] = [];
  items: SelectItem[];
  item: string;
  users: any[];
  contrats: any[];

  constructor(
    private apiService: ApiService,
    private primengConfig: PrimeNGConfig
  ) {
    this.items = [];

    this.apiService.getUsers().then((users) => {
      this.users = users;
    });

    this.apiService.getContrats().then((contrats) => {
      this.contrats = contrats;
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
