import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataTableBodyCellComponent, DatatableComponent } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Contact, ContactList } from 'src/app/models/contact/contact';
import { ContactService } from 'src/app/services/contact/contact.service';
import { ContactEditorComponent } from '../contact-editor/contact-editor.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  @ViewChild(DatatableComponent, {static: true}) table: DatatableComponent;
  @ViewChild('actionsTemplate', { static: true }) actionsTemplate: TemplateRef<DataTableBodyCellComponent>;

  columns: Array<any> = [];
  rows: Array<any> = [];
  modalRef: BsModalRef;
  subscriptions : Subscription[] = [];
  
  constructor(
    private contactService: ContactService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.setColumns();
    this.initData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setColumns(): void {
    this.columns = [
      { id: 1, prop: 'firstName', name: 'First Name' },
      { id: 2, prop: 'lastName', name: 'Last Name' },
      { id: 3, prop: 'phoneNumber', name: 'Phone Number' },
      { id: 4, prop: 'email', name: 'E-mail' },
      { id: 5, prop: '', name: 'Actions', cellTemplate: this.actionsTemplate },
    ]
  }

  initData(): void {
    this.subscriptions.push(
      this.contactService.getContactList().subscribe((response: ContactList): void =>{
        this.rows = response.items;
      })
    );
    this.subscriptions.push(
      this.contactService.getContactData().subscribe((response : Contact) => {
        this.updateOrAddRow(response);
      })
    )
  }

  manageContact(row?: Contact): void {
    const initialState = row ? row : null;
    const modalConfig = {
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        data: initialState
      }
    };
    this.modalRef = this.modalService.show(ContactEditorComponent, modalConfig);
  }

  deleteContact(row: Contact): void {
    this.rows = this.rows.filter(item => item !== row);
  }

  updateOrAddRow(row: Contact): void {
    if (row.id !== -1){
      const oldItem = this.rows.find(item => item.id === row.id);
      const index = this.rows.indexOf(oldItem);
      this.rows[index] = row;
    }else {
      row.id = new Date().getMilliseconds();
      this.rows.push(row);
    }
    this.rows = [...this.rows];
  }
}
