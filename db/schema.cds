namespace com.sap.learning;

// Aspects
using {
    cuid,
    managed,
    Currency,
    Country,
    sap.common.CodeList
} from '@sap/cds/common';

entity Books : cuid, managed {
    title       : localized String(255);
    author      : Association to Authors;
    genre       : Genre;
    publCountry : Country;
    stock       : NoOfBooks;
    price       : Price;
    isHardcover : Boolean;
}

// Enumerations
type Genre     : Integer enum {
    fiction = 1;
    non_fiction = 2;
}

// Simple Types
type NoOfBooks : Integer;

// Structured Types
type Price {
    amount   : Decimal;
    currency : Currency;
}

entity Authors : cuid, managed {
    name        : String(100);
    dateOfBirth : Date;
    dateOfDeath : Date;
    epoch       : Association to Epochs;
    books       : Association to many Books
                      on books.author = $self;
}

entity Epochs {
    key ID    : Integer;
        name  : localized String(255);
        descr : localized String(1000);
}
