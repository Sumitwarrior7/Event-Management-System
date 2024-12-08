# Prakash Events

**Prakash Events** is a full-stack event management platform that allows users to create events by selecting vendors offering various services. Vendors can manage their products via a dedicated dashboard, while administrators oversee the approval and management of vendors and users.

## Features

- **User Dashboard**: 
  - Create and manage events by selecting vendors from different categories.
  
- **Vendor Dashboard**: 
  - Add, update, and manage the products or services provided for events.
  
- **Admin Dashboard**: 
  - Approve or remove vendors and users.
  - Manage overall platform settings.

## Tech Stack

- **Frontend**: 
  - React.js
  - TailwindCSS

- **Backend**: 
  - Node.js
  - Express.js
  - Firestore

## Installation

To run this project locally, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/Prakash-Events.git
```

### 2. Install dependencies:

#### Frontend
Go to the frontend directory and install the required packages:

```bash
cd frontend
npm install
```

#### Backend
Go to the backend directory and install the required packages:

```bash
cd backend
npm install
```

### 3. Set up Firebase

- Create a Firebase project and configure Firestore.
- Download the Firebase configuration and add it to the backend project.
- Set up Firebase Admin SDK for server-side authentication and database management.

### 4. Run the project

#### For Frontend:

```bash
cd frontend
npm start
```

#### For Backend:

```bash
cd backend
nodemon server.js
```

The backend should be running on `http://localhost:8000`, and the frontend should be accessible at `http://localhost:3000`.

## Usage

- **As a User**: Create an event by selecting a vendor for each service. Track your event details easily.
- **As a Vendor**: Add or update your services through the vendor dashboard. Ensure your offerings are displayed for event creators.
- **As an Admin**: Approve or reject vendor applications. Manage users and vendors for smooth operations.

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-branch
   ```

3. Make your changes and commit:

   ```bash
   git commit -m 'Add new feature'
   ```

4. Push your branch:

   ```bash
   git push origin feature-branch
   ```

5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries or issues, please reach out to us at [contact@prakash-events.com](mailto:contact@prakash-events.com).
