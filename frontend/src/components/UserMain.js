// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import Vendor from './User/Vendor';
// import Cart from './User/Cart';
// import GuestList from './User/GuestList';
// import OrderStatus from './User/OrderStatus';

// function UserMain() {
//   return (
//     <div>
//       <h1>User Main Page</h1>
//       <nav>
//         <ul>
//           <li><Link to="vendor">Vendor</Link></li>
//           <li><Link to="cart">Cart</Link></li>
//           <li><Link to="guest-list">Guest List</Link></li>
//           <li><Link to="order-status">Order Status</Link></li>
//         </ul>
//       </nav>

//     </div>
//   );
// }

// export default UserMain;


import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Example data for events
const eventsData = [
  {
    id: 1,
    name: "Tech Conference 2024",
    date: "12-12-2024",
    vendors: [
      { name: "Vendor 1", link: "/vendor1" },
      { name: "Vendor 2", link: "/vendor2" }
    ]
  },
  {
    id: 2,
    name: "Art Exhibition",
    date: "15-12-2024",
    vendors: [
      { name: "Vendor 3", link: "/vendor3" },
      { name: "Vendor 4", link: "/vendor4" }
    ]
  },
  {
    id: 3,
    name: "Sports Fest",
    date: "21-12-2024",
    vendors: [
      { name: "Vendor 1", link: "/vendor1" },
      { name: "Vendor 4", link: "/vendor4" }
    ]
  },
  {
    id: 3,
    name: "Shaadi",
    date: "24-12-2024",
    vendors: [
      { name: "Vendor 1", link: "/vendor1" },
      { name: "Vendor 3", link: "/vendor3" }
    ]
  }
];

function UserMain() {
  return (  
    <div>
      <h1>User Events</h1>
      <button>
        <Link to="/vendor/add-event">Add an Event</Link>
      </button>

      <div>
        {eventsData.map((event) => (
          <div key={event.id} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>{event.name}</h2>
            <p>Date: {event.date}</p>

            <div>
              <h3>Vendors:</h3>
              <ul>
                {event.vendors.map((vendor, index) => (
                  <li key={index}>
                    <Link to={vendor.link}>{vendor.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserMain;

