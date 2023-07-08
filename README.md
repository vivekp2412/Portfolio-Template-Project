

# **Portfolio Template Project**

The project is a single-page application (SPA) that includes several sections such as Home, Products, Navbar , Work and Contact Us. It provides features like sorting, searching, filtering, and dynamic content management for the product section. The application allows users to view and interact with product cards, access detailed information about each product, and submit queries through a contact form or via WhatsApp/Gmail.

URL:-https://portfolio-template-vivek-ss.netlify.app/

## **Installation and Setup**

Provide instructions for installing and setting up the project on a local development environment.

1. Clone the repository:

```jsx
git clone https://github.com/vivekp2412/Portfolio-Template-Project.git
```

1. Install dependencies:

```jsx
npm install
```

1. Configure Firebase:
- Create a Firebase project in the Firebase Console (**https://console.firebase.google.com/**)
- Retrieve the Firebase Realtime Database And Authenticaion configuration object for your project.
- Create .env  file in Root and make the corresponding Variables with your configurations.
- Save the **`.env`** file.
1. Run the project:

```jsx
npm run dev
```

4.Access the application:

Open your web browser and visit [http://localhost/5173](http://localhost/)

## **Features**

List the main features of the project, including estimated time for completion for each feature:

1. Navbar 
    - Navigation Links: Enable users to navigate to different sections of the application.
2. Home Section
    - Carousel: A dynamic carousel displaying  images that can be changed by the admin.
3. Product Section
    - Product Cards: Display various product cards showcasing different products.
    - Detailed Product View: Allow users to view detailed information about each product, including Sharing the URL of Product.
    - Search,Sort and Filter Functionality for Products
4. My Work Section 
    - Display a dynamic section showcasing sample work completed.
5. Contact Us Section
    - Query Form: Provide a form for users to submit inquiries or feedback.
6. Authentication 
    - Implement authentication functionality for secure access to admin features
7. Dynamic Admin Management (Admin) 
    - Admin-Home Section: Show the Preview Table for All the Carousel Image along with Switch to Hide/show a Particular Image and Delete and Add Functionality
    - Admin-Product Section:-Show the Preview Table for All the Product and also Add,Delete,Edit Product Functionality
    - Admin-Work Section:-Shows the Preview Table for All the Work and also Add,Delete,Edit Work Functionality
    - Admin-Contact Section : Shows a Editable Form for the Contact Detail like Email,Address and Checkbox for Recieving in User in Whatsapp/Email