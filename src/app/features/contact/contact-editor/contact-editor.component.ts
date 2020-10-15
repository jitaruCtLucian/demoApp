import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Contact } from 'src/app/models/contact/contact';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.scss']
})
export class ContactEditorComponent implements OnInit {
  contactFormCtrl : FormGroup;
  data: Contact;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.initContactForm();
    this.initFormData();
  }

  initContactForm(): void {
    this.contactFormCtrl = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      id: [-1]
    });
  }

  initFormData(): void {
    const data = this.data !== null ? this.data : new Contact();
    this.contactFormCtrl.setValue(data)
  }

  saveContact(): void {
    this.contactService.setContactData(new Contact(this.contactFormCtrl.getRawValue()));
    this.modalService.hide();
  }

  closeEditor(): void {
    this.modalService.hide();    
  }
}
