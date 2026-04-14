// AUTH DATA
export const user = {
  validUser: {
    email: 'testuser01@email.com',
    password: 'Password123'
  },

  invalidUser: {
    email: 'testuser01@email.com',
    password: 'WrongPassword'
  },

  newUser: {
    email: `user_${Date.now()}@email.com`, // กันซ้ำ
    password: 'Password123',
    fullName: 'Test User',
    phone: '0812345678'
  }
};


// RESERVATION DATA
export const reservationData = {
  valid: {
    date: '2026-05-20',
    time: '18:00',
    guests: '4'
  },

  pastDate: {
    date: '2020-01-01',
    time: '18:00',
    guests: '2'
  },

  outsideHours: {
    date: '2026-05-20',
    time: '03:00',
    guests: '2'
  },

  exceedCapacity: {
    date: '2026-05-20',
    time: '18:00',
    guests: '10'
  },

  doubleBooking: {
    date: '2026-05-20',
    time: '19:00',
    guests: '2'
  }
};


// STAFF DATA
export const staffData = {
  walkInCustomer: {
    name: `WalkIn_${Date.now()}` 
  },

  tableStatusOptions: [
    'Available',
    'Occupied',
    'Out of Service'
  ],

  defaultStatus: {
    status: 'Occupied'
  }
};


export const commonData = {
  messages: {
    loginError: 'Invalid',
    reservationSuccess: 'Reservation confirmed',
    cancelSuccess: 'CANCELLED',
    tableUnavailable: 'Table not available',
    genericError: 'error'
  }
};