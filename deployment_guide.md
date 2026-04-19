# 🚀 Deployment Guide: Seva Bharat

This guide explains how to deploy your NGO platform to keep it public and fully functional (Payments, Emails, Database).

## 1. Prepare Your GitHub Repository

1.  Initialize a Git repository in your project folder (if you haven't already):
    ```bash
    git init
    git add .
    git commit -m "initial commit"
    ```
2.  Create a new repository on **GitHub**.
3.  Push your code to GitHub:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/seva-bharat.git
    git branch -M main
    git push -u origin main
    ```

---

## 2. Deploy the Backend (to Render)

1.  Create an account on [Render.com](https://render.com).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the settings:
    - **Language**: `Node`
    - **Root Directory**: `server`
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
5.  Click **Advanced** and add the following **Environment Variables**:
    - `RAZORPAY_KEY_ID`: (Your Razorpay Key)
    - `RAZORPAY_KEY_SECRET`: (Your Razorpay Secret)
    - `EMAIL_USER`: (Your Gmail)
    - `EMAIL_PASS`: (Your Gmail App Password)
    - `PORT`: `5000`
6.  Click **Create Web Service**. 
7.  **IMPORTANT**: Once deployed, copy your backend URL (e.g., `https://seva-bharat-api.onrender.com`).

---

## 3. Deploy the Frontend (to Vercel)

1.  Create an account on [Vercel](https://vercel.com).
2.  Click **Add New** and select **Project**.
3.  Connect your GitHub repository.
4.  Configure the settings:
    - **Framework Preset**: `Vite`
    - **Root Directory**: `.` (The root of the folder)
5.  Open **Environment Variables** and add:
    - `VITE_API_URL`: (The Render backend URL you copied in Step 2)
    - `VITE_SUPABASE_URL`: (Your Supabase URL)
    - `VITE_SUPABASE_ANON_KEY`: (Your Supabase Key)
    - `VITE_RAZORPAY_KEY_ID`: (Your Razorpay Key)
6.  Click **Deploy**.

---

## 4. Production URL

Your app is officially live at: [https://seva-bharat.vercel.app/](https://seva-bharat.vercel.app/)

## 5. Maintenance & Updates

- **Razorpay Account Update (April 2025)**: The project was migrated to a new Razorpay account. All environment variables in `.env`, Render, and Vercel have been updated.
- **Security**: The `.env` file is excluded from Git to prevent credential leaks. Always use `.env.example` as a template for new environments.

Your app is now public and up to date! 🎉
