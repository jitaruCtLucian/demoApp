import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact, ContactList, ContactListModelApi } from 'src/app/models/contact/contact';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contact: BehaviorSubject<Contact> = new BehaviorSubject(new Contact());
  currentContact: Observable<Contact> = this.contact.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  setContactData(contact: Contact): void {    
    this.contact.next(contact);
  }

  getContactData(): Observable<Contact> {
    return this.contact;
  }

  getContactList(): Observable<ContactList> {
    return this.http.get('assets/dummyData/contacts.json')
    .pipe(map(this.mapContactList));
  }

  private mapContactList = (response: ContactListModelApi): ContactList => {
    const mappedContacts: Array<Contact> = [];
    for (const item of response.items){
      mappedContacts.push(new Contact({
        firstName : item.first_name,
        lastName  : item.last_name,
        email : item.email,
        phoneNumber : item.phone_number,
        id : item.id
      }))
    }
    
    return new ContactList({
      items : [...mappedContacts]
    });
  }
}
