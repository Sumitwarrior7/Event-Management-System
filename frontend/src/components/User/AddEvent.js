import React, { useState } from 'react';


const AddEvent = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [selectedVendors, setSelectedVendors] = useState([]);
    const [popupVendorItems, setPopupVendorItems] = useState(null);

    const vendors = [
        {
            id: 1,
            name: 'Vendor A',
            price: 500,
            items: [
                { name: 'Item 1', image: 'https://via.placeholder.com/50' },
                { name: 'Item 2', image: 'https://via.placeholder.com/50' },
            ],
        },
        {
            id: 2,
            name: 'Vendor B',
            price: 700,
            items: [
                { name: 'Item 3', image: 'https://via.placeholder.com/50' },
                { name: 'Item 4', image: 'https://via.placeholder.com/50' },
            ],
        },
        // Add more vendors as needed
    ];

    const handleSelectVendor = (vendorId) => {
        if (!selectedVendors.includes(vendorId)) {
            setSelectedVendors([...selectedVendors, vendorId]);
        }
    };

    const calculateTotalAmount = () => {
        return selectedVendors.reduce((total, vendorId) => {
            const vendor = vendors.find(v => v.id === vendorId);
            if (vendor) {
                return total + vendor.price;
            }
            return total;
        }, 0);
    };

    const handleShowItems = (vendor) => {
        setPopupVendorItems(vendor);
    };

    const closePopup = () => {
        setPopupVendorItems(null);
    };

    return (
        <div className="add-event">
            <h1>Add Event</h1>
            <div className="form">
                <div>
                    <label>Event Name:</label>
                    <input
                        type="text"
                        placeholder="Event Name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event Date:</label>
                    <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                </div>
            </div>

            <h2>Total Amount: {calculateTotalAmount()} ₹</h2>

            <div className="vendor-cards">
                {vendors.map((vendor) => (
                    <div key={vendor.id} className="vendor-card">
                        <h3>{vendor.name}</h3>
                        <p>Price: {vendor.price} ₹</p>
                        <button onClick={() => handleShowItems(vendor)}>See Items</button>
                        <button onClick={() => handleSelectVendor(vendor.id)}>Select Vendor</button>
                    </div>
                ))}
            </div>

            {popupVendorItems && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Items from {popupVendorItems.name}</h2>
                        <button className="close-popup" onClick={closePopup}>Close</button>
                        <ul>
                            {popupVendorItems.items.map((item, index) => (
                                <li key={index} className="item">
                                    <img src={item.image} alt={item.name} />
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddEvent;
