# OT Data Collection & Business Plan Application

This repository contains a web application for collecting, processing, and exporting business plan data related to manufacturing sectors. The backend is built using Flask with MySQL for data storage. The frontend provides a responsive and modern UI for data entry, summary viewing, and Excel export.

## Features

- Sector and subsector-based data entry forms with validation
- Complex data calculations and capacity planning logic in backend
- Data storage organized by sector and subsector in MySQL tables
- Export submitted data to Excel files for offline analysis
- Responsive frontend with dynamic form fields and download options

## Tech Stack

- Python 3.x with Flask framework
- MySQL database
- Pandas for data processing and Excel export
- Frontend: HTML5, CSS3, JavaScript
- CORS enabled for local frontend development on port 5500

## Usage

### Running the Backend

1. Ensure MySQL server is running and accessible with credentials set in `app.py`.
2. Install Python dependencies:
   ```bash
   pip install flask flask-mysqldb flask-cors pandas mysql-connector-python xlsxwriter
