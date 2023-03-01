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
  selectedGroupes: any[] = [];
  selectedGroupes2: any[] = [];
  selectedUsers: any[];
  selectedUsers2: any[];
  items: SelectItem[];
  item: string;
  users: any[];
  groupeContrats: any[];
  users2: any[];
  groupeContrats2: any[];
  contrats: any[];
  tree: TreeNode[] = [];
  selectedFile: TreeNode;
  selectedContrat: any[];
  selectedContrats: any[];

  constructor(
    private apiService: ApiService,
    private primengConfig: PrimeNGConfig
  ) {
    this.items = [];

    this.apiService.getUsers().then((users) => {
      this.users = users;
      this.users2 = users;
      this.apiService.getContrats().then((groupeContrats) => {
        this.groupeContrats = groupeContrats;
        this.groupeContrats2 = groupeContrats;
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
          this.tree.push(pere);
        });
      });
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  gererContrats() {
    this.contrats = [];
    const cs = this.groupeContrats
      .filter((groupe) => this.selectedGroupes.includes(groupe.value))
      .map((groupe) => {
        return groupe.items.map((item) => item);
      });

    this.contrats = cs.reduce((acc, val) => acc.concat(val), []);
    this.selectedContrat = this.contrats;
    console.log(this.selectedContrat);
  }

  gererUsers() {
    const cs = this.selectedUsers2.map((user) => {
      return user.items.map((item) =>
        this.groupeContrats2.find((groupe) => groupe.value === item.value)
      );
    });

    this.selectedGroupes2 = cs
      .reduce((acc, val) => acc.concat(val), [])
      .reduce((acc, val) => {
        if (!acc.includes(val)) {
          acc.push(val);
        }
        return acc;
      }, []);

    console.log(this.selectedGroupes2);
  }

  gererGroupes() {
    this.selectedUsers2 = this.users2.filter((user) =>
      user.items.some((groupe) =>
        this.selectedGroupes2.some((select) => select.value === groupe.value)
      )
    );

    console.log(this.selectedUsers2);
  }
}
