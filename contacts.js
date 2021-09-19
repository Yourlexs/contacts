const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((contact) => contact.id === contactId);
      return console.log(contact);
    })
    .catch((err) => console.log(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((contact) => contact.id === contactId);

      if (!contact) {
        console.log("There is no such contact!");
        return;
      }

      const newContactsList = contacts.filter((item) => item.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(newContactsList), "utf-8");
      console.log(`Contact ${contact.name} was successfully deleted!`);
    })
    .catch((err) => console.log(err));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const generateId = contacts.length + 1;
      const contact = {
        id: generateId,
        name,
        email,
        phone,
      };

      const newContactsList = [...contacts, contact];
      fs.writeFile(contactsPath, JSON.stringify(newContactsList), "utf-8");
      return console.log(`Сontact ${contact.name} was added successfully`);;
    })
    .catch((err) => console.log(err));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};