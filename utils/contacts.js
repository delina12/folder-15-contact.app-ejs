
const fs = require('fs');



const folderPath = './data'
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
};
const filePath = './data/data.json';
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8')
}

// PENGELOAANN DATA/ mengambil semua data yang ada di json
const loadContact = () => {
    const file = fs.readFileSync('./data/data.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

// cari kontak berdasarkan nama 
const findContact = (nama) => {
    // membaca file/mengecek data pada file
    const contacts = loadContact();

    // mencari data di file jsonnya sesuai dengan namanya (menggunakan array method yang namanya find)
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());//method find untuk pencarian
    return contact;
}

// TAMBAH DATA
// method untuk menimpa file contacts.JSON dengan yang baru
const saveContacts = (contacts) => {
    fs.writeFileSync('./data/data.json', JSON.stringify(contacts))
}
// menambahkaan data contact baru
const addContact = (contact) => {
    const contacts = loadContact()//untuk mengambil data kontak dari jsonnya
    contacts.push(contact)
    saveContacts(contacts)
}

// Cek nama yang duplikat
const checkDuplikat = (nama) => {
    const contacts = loadContact()// ambil semua data di json
    return contacts.find((contact) => contact.nama === nama)
}

// Delete contact
const deleteContact = (nama) => {
    const contacts = loadContact();
    // menelusrusi semua kontak sampai akhir. jika ketemu kontak tertentu hapus dan tampilkan kontak baru
    const filteredContacs = contacts.filter((contact) => contact.nama !== nama)
    saveContacts(filteredContacs)
    
}

// Edit contacts, ketika sudah di klik selesai
const updateContacts = (contactBaru) =>{
// ambil dulu semua daftar contacts yang ada
const contacts = loadContact()
// telusri sampai akhir dengan filter untuk menghilangkan nama yang sama dengan nama lama
const filteredContacs = contacts.filter((contact) => contact.nama !== contactBaru.oldNama)
// delete old nama
delete contactBaru.oldNama;
// lalu push ke filtered contacts supaya masuk ke json
filteredContacs.push(contactBaru)
// lalu timpa apapun yang ada di dalam jsonnya dengan contak baru ini
saveContacts(filteredContacs)
}
module.exports = { loadContact, findContact, addContact, checkDuplikat, deleteContact, updateContacts }