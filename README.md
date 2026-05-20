# PopX React JS Frontend Assignment

This repository is a pixel-perfect, highly responsive React JS mobile app layout implementation of the **PopX** frontend assignment, styled exactly like the provided design specifications.

## 🚀 Key Features

- **Centred Desktop Experience**: Maintains a mobile-realistic mockup container (`375px` width) centered in the desktop viewport, with a soft background behind it.
- **Fluid Mobile Display**: Adapts seamlessly to real mobile phone viewports, taking up 100% of the screen.
- **Custom Floating Labels**: Implements standard, modern form fields with floating/overlapping outline label states that animate on focus and input fill.
- **Frontend Form Validation**:
  - Checks for required fields.
  - Verifies valid email patterns.
  - Ensures password satisfies minimum character length (>= 6 characters).
  - Validation-reactive submission: Submit buttons automatically disable until inputs are valid.
- **Mock Account State Persistence**: Saves new account details during sign-up to `localStorage` and checks details on login, creating a functional registration-to-profile workflow.
- **Clean Component Modularization**: Keeps styles separate using **CSS Modules** (`*.module.css`) to prevent styles leakage.

---

## 📁 Folder Structure

```text
src/
 ├── components/
 │    ├── Button.jsx           # Reusable CTA button (primary & secondary states)
 │    ├── Button.module.css
 │    ├── Input.jsx            # Custom floating/overlapping label inputs
 │    └── Input.module.css
 ├── pages/
 │    ├── Welcome.jsx          # Welcome screen (register/login choices)
 │    ├── Welcome.module.css
 │    ├── Register.jsx         # Sign up form with custom radio controls
 │    ├── Register.module.css
 │    ├── Login.jsx            # Sign in form with input validations
 │    ├── Login.module.css
 │    ├── Profile.jsx          # Account settings showcase screen
 │    └── Profile.module.css
 ├── styles/
 │    ├── variables.css        # Global CSS variables (theme, colors, shadows)
 │    └── global.css           # Global layout reset and container centering
 ├── App.jsx                   # React Router wrapper configuration
 └── main.jsx                  # Root client-side render
```
---

## 🛠️ Project Setup Instructions

Follow these quick steps to get the project running locally:

### 1. Prerequisites
Ensure you have **Node.js** (v16.0.0 or higher) installed on your system.

### 2. Install Dependencies
Navigate into the project directory and install the necessary dependencies:
```bash
npm install
```

### 3. Run the Development Server
Launch the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 4. Build for Production
To generate a production-ready, highly optimized build bundle in the `/dist` folder, run:
```bash
npm run build
```

---

## 🔐 Mock Testing Account
If you want to skip registration and test the login page directly, you can use the pre-configured credential:
- **Email**: `test@popx.com`
- **Password**: `123456`
