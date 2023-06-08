# Banking System

This is a simple banking system web application built using Express.js and MongoDB. It allows users to view a list of customers, perform transactions between customers, and view transaction history.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript templates)
- Bootstrap

## Installation

1. Clone the repository:

   ```shell
   git clone <repository_url>
   ```

2. Install the dependencies:

   ```shell
   npm install
   ```

3. Configure MongoDB:
   - Replace the connection string in `app.js` with your MongoDB Atlas connection string.
   - Make sure you have a MongoDB Atlas cluster set up with the appropriate credentials.

4. Start the application:

   ```shell
   node app.js
   ```

5. Open your browser and visit `http://localhost:3000` to access the application.

## Usage

The application provides the following features:

- Home: Displays a welcome message and an introduction to the banking system.
- Customers: Lists the customers' names, emails, and current balances.
- Payment: Allows users to initiate a payment transaction by selecting the sender, receiver, and amount.
- Transactions: Shows a list of previous transactions in descending order of timestamp.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request.

## Acknowledgements

- This project was developed as part of a web development course.
- Special thanks to the developers of the open-source libraries and frameworks used in this project.

## Contact

If you have any questions or suggestions, please feel free to contact Sandeep-Kumar-Mahato(me) at sandeepkumarmahato712@gmail.com.

---

Feel free to customize the sections and add more details as per your requirements.