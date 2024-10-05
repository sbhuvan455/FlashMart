
# FlashMart - Quick Commerce Website

FlashMart is a full-stack quick commerce platform designed to provide a seamless online shopping experience. The website is built using modern technologies like Next.js, shadcn component library, MongoDB, Firebase, and Stripe for handling payments.

## Deployment

The project is deployed and live at [FlashMart](https://flash-mart-chi.vercel.app/). It is hosted on Vercel for optimized performance and scalability.

## Test User Credentials

To experience the platform, you can log in using the test credentials below:

- **Email**: `test_user_1@gmail.com`
- **Password**: `test_user_1`

## Features

- **Product Browsing**: Users can easily explore products categorized for quick navigation.
- **User Authentication**: Secure login and registration.
- **Payment Integration**: Stripe handles secure and reliable payments.
- **Responsive Design**: Optimized for all devices, providing a smooth user experience on mobile, tablet, and desktop.
- **Fast & Scalable**: Built with Next.js for both frontend and backend, ensuring high performance and scalability.
  
## Tech Stack

1. **Next.js**  
   - A React framework that powers both the frontend and backend of the application, enabling server-side rendering and API routes for optimized performance.

2. **shadcn**  
   - A flexible and highly customizable component library built on React, used to style and build the user interface of the website.

3. **MongoDB**  
   - NoSQL database used to store all product, user, and order-related data.

4. **Firebase**  
   - Firebase is used as an object storage solution to store product images other media.

5. **Stripe**  
   - Stripe is integrated to provide a reliable and secure payment gateway for handling transactions.

## Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sbhuvan455/FlashMart.git
   ```

2. Navigate to the project directory:

   ```bash
   cd FlashMart
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables. Create a `.env.local` file in the root of your project and add the necessary configurations:

   ```env
   MONGO_URI=your_mongo_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_string
   NEXT_PUBLIC_STRIPE_PUBLISHER_KEY=your_stripe_public_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_APP_ID=your_firebase_app_id
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Visit the application at `http://localhost:3000`.