const firebaseConfig = {
    apiKey: "AIzaSyDb83BTNTA4izOk1C-1DzynfgikYX25XJA",
    authDomain: "messagingform-26394.firebaseapp.com",
    databaseURL: "https://messagingform-26394-default-rtdb.firebaseio.com",
    projectId: "messagingform-26394",
    storageBucket: "messagingform-26394.appspot.com",
    messagingSenderId: "428324335839",
    appId: "1:428324335839:web:758f8ab1483d691f65796a",
    measurementId: "G-2RXZVK0QX3"
  };
  
  firebase.initializeApp(firebaseConfig);

 var messagingFormDB = firebase.database().ref('messagingForm');

 document.getElementById('messagingForm').addEventListener('submit', submitForm);

 function submitForm(e){
  e.preventDefault();

  var name = getElementVal('name');
  var email = getElementVal('email');
  var number = getElementVal('number');
  var message = getElementVal('message');

  saveMessages(name, email, number, message);

  document.querySelector('.alert').style.display = 'block';

  setTimeout(() => {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

  document.getElementById("messagingForm").reset();
 }

 const saveMessages = (name, email, number, message) => {
  var newMessagingForm = messagingFormDB.push();

  newMessagingForm.set({
    name : name,
    email : email,
    number: number,
    message : message,
  })
 }

 const getElementVal = (id) => {
  return document.getElementById(id).value;
 }