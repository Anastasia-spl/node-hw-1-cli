const path = require("path");
const fs = require("fs").promises;
const { uid } = require('uid');

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try { 
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  } catch (err) {
    console.error(err)
  } 
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactToFind = contacts.find((contact) => contact.id === Number(contactId));
  return contactToFind;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter((contact) => contact.id !== Number(contactId));
  fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8');
  return newContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = uid();
  const contactToAdd = { id, name, email, phone };
  const newContacts = [...contacts, contactToAdd ];
  fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
  return contactToAdd;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact
}