import { Component } from '@angular/core';
import { SelectItem, PrimeNGConfig, TreeNode } from 'primeng/api';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService],
})
export class AppComponent {
  selectedGroupes: string[] = [];
  items: SelectItem[];
  item: string;
  users: any[];
  groupeContrats: any[];
  contrats: Array<string>;
  files: TreeNode[] = [];
  selectedFile: TreeNode;

  constructor(
    private apiService: ApiService,
    private primengConfig: PrimeNGConfig
  ) {
    this.items = [];

    this.apiService.getUsers().then((users) => {
      this.users = users;
      this.apiService.getContrats().then((groupeContrats) => {
        this.groupeContrats = groupeContrats;
        users.forEach((user) => {
          const pere = {
            label: user.label,
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder',
            expanded: true,
            children: [],
          };
          if (user.items) {
            user.items.forEach((item) => {
              const contrats = groupeContrats.find(
                (groupeContrat) => groupeContrat.value === item.value
              ).items;
              const groupe = {
                expanded: true,
                label: item.label,
                expandedIcon: 'pi pi-folder-open',
                collapsedIcon: 'pi pi-folder',
                children: [],
              };
              if (contrats) {
                contrats.forEach((contrat) => {
                  const c = {
                    label: contrat.label,
                  };
                  groupe.children.push(c);
                });
              }
              pere.children.push(groupe);
            });
          }
          this.files.push(pere);
        });
      });
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  gererContrats() {
    this.contrats = [];
    this.contrats = this.groupeContrats
      .filter((groupe) => this.selectedGroupes.includes(groupe.value))
      .map((groupe) => {
        return groupe.items.map((item) => item.label);
      });
    console.log(this.contrats);
  }
}
