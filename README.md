# 🖨️ PrintEase - VNRVJIET Campus Printing & Stationery Hub

**PrintEase** is a modern web application designed to streamline the document printing and stationery procurement process for students and faculty at **VNRVJIET**. Skip the long bookstore queues by uploading documents, customizing print options, and ordering stationery online.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React-61dafb.svg)
![Tailwind](https://img.shields.io/badge/styling-Tailwind_CSS_4-38b2ac.svg)

---

## 🌟 Key Features

### 🎓 For Students
- **Smart File Upload**: Drag-and-drop uploader for PDF, DOCX, and Images.
- **Granular Print Customization**: Choose between B&W/Color, Paper Size (A4, A3), Binding types, and more.
- **Real-time Cost Calculation**: Instant price updates as you modify print options.
- **Stationery Shop**: Integrated catalog for pens, notebooks, and folders.
- **Live Order Tracking**: Visual progress bar from "Placed" to "Ready for Pickup".
- **Dashboard**: personalized view of order history and status.

### 🛡️ For Administrators
- **Order Queue Management**: Process incoming orders and update statuses in real-time.
- **Inventory Controller**: Manage stationery stock levels and receive low-stock alerts.
- **Analytics**: Visualization of daily orders, revenue, and status distribution.
- **Student Notifications**: Notify students immediately when orders are ready.

---

## 🚀 Tech Stack

- **Framework**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (Vibrant Blue & Orange Theme)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context API (Auth & State)
- **Notifications**: React Hot Toast

---

## 📦 Project Structure

```text
src/
├── components/         # Reusable UI, Navbars, AdminLayout, Route Guards
├── context/            # AuthContext (Mock Authentication logic)
├── pages/              # Core Views
│   ├── admin/          # Dashboard, Orders, Inventory Management
│   ├── LandingPage.jsx  # Hero, Features, How it Works
│   ├── NewOrder.jsx    # 4-Step Checkout Wizard
│   └── Dashboard.jsx   # Student Profile & Order Analytics
└── index.css           # Global Styles & Tailwind 4 Theme Configuration
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ashwithh7/prinTease-frontend.git
   ```
2. Navigate to the directory:
   ```bash
   cd prinTease-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🛡️ Admin Credentials (Demo)
- **Email**: `admin@vnrvjiet.in`
- **Password**: `Admin@123`

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---
Created with ❤️ for VNRVJIET.
