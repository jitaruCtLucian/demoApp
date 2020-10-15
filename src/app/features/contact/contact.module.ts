import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { ContactRoutingModule } from './contact-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContactsListComponent, 
    ContactEditorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ContactRoutingModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
  ],
  exports: [
    ModalModule
  ]
})
export class ContactModule { }
