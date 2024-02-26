const firebaseConfig = {
  apiKey: "AIzaSyDAtPCW1EchjWlP0_tn1OR1C4cSJeeGh10",
  authDomain: "bookingform-d2603.firebaseapp.com",
  databaseURL: "https://bookingform-d2603-default-rtdb.firebaseio.com",
  projectId: "bookingform-d2603",
  storageBucket: "bookingform-d2603.appspot.com",
  messagingSenderId: "754600957366",
  appId: "1:754600957366:web:d1de1318d7ac9965739d17"
};

firebase.initializeApp(firebaseConfig);

var bookingFormDB = firebase.database().ref('bookingForm');

document.getElementById('bookingForm').addEventListener('submit', submitbooking);

async function fetchBookedDays() {
  try {
      const snapshot = await firebase.database().ref('bookingForm').once('value');
      const existingBookings = snapshot.val();
      const bookedDays = calculateBookedDays(existingBookings);
      console.log('Booked Days:', bookedDays);
      updateBookedDaysUI(bookedDays);
  } catch (error) {
      console.error('Error fetching booked days:', error);
  }
}

function calculateBookedDays(existingBookings) {
  const bookedDays = new Array(7).fill(false);

  Object.values(existingBookings).forEach(existingBooking => {
      const bookingDate = new Date(existingBooking.date);
      bookedDays[bookingDate.getDay()] = true;
  });

  return bookedDays;
}

function updateBookedDaysUI(bookedDays) {
  console.log('Updating UI with booked days:', bookedDays);
}

async function isWithinTwoHoursOfAnotherBooking(bookingTime) {
  try {
      const existingBookings = await fetchExistingBookings();

      return Object.values(existingBookings).some(existingBooking => {
          const existingBookingTime = new Date(existingBooking.date + 'T' + existingBooking.time);
          const timeDiff = Math.abs(bookingTime - existingBookingTime);
          const diffInHours = timeDiff / (1000 * 60 * 60);

          return diffInHours < 2;
      });
  } catch (error) {
      console.error('Error checking if within two hours of another booking:', error);
      return false;
  }
}

async function submitbooking(e) {
  e.preventDefault();
  var name = getElementVal('name');
  var service = getElementVal('service');
  var date = getElementVal('date');
  var time = getElementVal('time');
  var number = getElementVal('number');

  var bookingTime = new Date(date + 'T' + time);

  if (bookingTime.getHours() < 9 || bookingTime.getHours() >= 18) {
      alert('Bookings are only available between 9am and 6pm.');
      return;
  }

  if (bookingTime.getDay() === 0 || bookingTime.getDay() === 1) {
      alert('Cannot book appointments on Monday or Sunday.');
      return;
  }

  if (await isWithinTwoHoursOfAnotherBooking(bookingTime)) {
      alert('Bookings must be at least two hours apart from other customers.');
      return;
  }

  if (getBookingsCountForDay(date) >= 4) {
      alert('All available slots for that day are booked.');
      return;
  }

  savedBookings(name, service, date, time, number);

  document.querySelector('.alert').style.display = 'block';

  setTimeout(() => {
      document.querySelector('.alert').style.display = 'none';
  }, 3000);

  document.getElementById('bookingForm').reset();

  displayCompletelyBookedDays();

  fetchBookedDays();
}

function getBookingsCountForDay(selectedDate) {
  var existingBookings = fetchExistingBookings();
  return Object.values(existingBookings).filter(existingBooking => existingBooking.date === selectedDate).length;
}

function savedBookings(name, service, date, time, number) {
  var newbookingForm = bookingFormDB.push();

  newbookingForm.set({
      name: name,
      service: service,
      date: date,
      time: time,
      number: number,
  });
}

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

const displayCompletelyBookedDays = () => {
  var existingBookings = fetchExistingBookings();
  var bookedDays = new Array(7).fill(0);

  Object.values(existingBookings).forEach(existingBooking => {
      var bookingDate = new Date(existingBooking.date);
      bookedDays[bookingDate.getDay()]++;
  });

  bookedDays.forEach((count, dayIndex) => {
      if (count >= 4) {
          console.log(`Day ${dayIndex} is completely booked.`);
          alert('Day is fully booked. Please pick another.')
      }
  });
};

async function fetchExistingBookings() {
  try {
      const snapshot = await firebase.database().ref('bookingForm').once('value');
      return snapshot.val() || {};
  } catch (error) {
      console.error('Error fetching existing bookings:', error);
      throw error;
  }
}
