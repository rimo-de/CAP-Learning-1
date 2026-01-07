namespace com.sap.learning;

entity Books {
    key ID          : UUID;
        title       : String(255);
        author      : Association to Authors;
        genre       : Genre;
        publCountry : String(3);
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
    currency : String(3);
}

entity Authors {
    key ID          : UUID;
        name        : String(100);
        dateOfBirth : Date;
        dateOfDeath : Date;
        books       : Association to many Books on books.author = $self;
}
