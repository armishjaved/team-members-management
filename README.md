# 🏢 Team Member Management System

A **Full-Stack** web application built with **Django REST Framework** for the backend and **React.js** for the frontend. It allows users to **view, add, edit, and delete** team members.

---

## 🚀 Features

✅ View all team members and admin.  
✅ Add new team members with role selection.  
✅ Edit existing team member details.  
✅ Delete team members (Only Admins can delete).
✅ Responsive **Single Page Application (SPA)** using **React.js**.  

---

## 🛠️ Technologies Used

### **Backend:**
- **Django** 
- **Django REST Framework** (DRF) 
- **SQLite** (for database)
- **CORS Headers** (to allow frontend-backend communication)

### **Frontend:**
- **React.js** 
- **React Router** (for navigation)
- **Axios** (for API calls)
- **Tailwind CSS** (for styling)

---

## 🏗️ Project Structure
```bash
team-members-management/
  │── teamMemberManagementApp/ # Django Backend (API)
  │── teamMemberManagementApp_api/ # Django API Implementation
  │── teammembers/ # React Frontend (SPA)
  │── manage.py # Django Manager
  │── db.sqlite3 # Database
  │── requirements.txt # Python dependencies
  │── README.md # Documentation
```

---

## 🔧 Installation Guide

1. Clone the Git Repository:
   ```git clone https://github.com/armishjaved/team-members-management.git```
2. cd team-members-management
3. install requirements using:
   ``` pip install -r requirements.txt ```

To run the app:

Server-side
1. python manage.py runserver
- The API should now be running at:
➡️ http://127.0.0.1:8000/api/team-members/

Client-side

1. cd teammembers
2. npm install
3. npm run dev
- The frontend should now be running at:
➡️ http://localhost:3000/

