export interface ContactModelApi {
    first_name: string,
    last_name: string,
    phone_number: number,
    email: string,
    id: number
}

export interface ContactListModelApi {
    items: Array<ContactModelApi>
}

export interface ContactModel {
    firstName: string,
    lastName: string,
    phoneNumber: number,
    email: string,
    id: number
}

export class Contact implements ContactModel {
    firstName = '';
    lastName = '';
    phoneNumber = -1;
    email = '';
    id = -1;

    constructor(dto?: ContactModel) {
        if (!dto) {
            return;
        }
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
        this.phoneNumber = dto.phoneNumber;
        this.email = dto.email;
        this.id = dto.id;
    }
}

export interface ContactListModel {
    items: Array<ContactModel>
}

export class ContactList implements ContactListModel {
    items = [];
    constructor(dto?: ContactListModel) {
        if (!dto) {
            return;
        }
        this.items = dto.items;
    }
}