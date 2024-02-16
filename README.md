# Fence Challenge for ScaDS.AI/MPS MiS

### DONE
- Python WHL Demo loaded in JavaScript
- Graphics Loaded and Rendered
- Python CV Detects Pentominos & Calculates Area
- Web App works on Laptop & Mobile
- Camera Resolution is Constrained on Mobile
- Basic Structure for CV & WebGame Modes
- Prerendering/static-serving correctly (vercel)
- Add Loading Bar on Site Loading
- Load and Initiate Pyodide on site loading
- Setup and connect to Supabse Database
- Basis setup of webgame component
- Raycaster for pentomino selection and movement

### BUGS
  - Miguel - spec out macbook camera bug

### TODO
- **By Dan (by end of Feb)**
  - **Make WebGame Work Properly**
    - Fill in Board Occupancy Matrix Correctly (so pentominos cannot overlap)
    - Correctly Align odd-shaped graphics (e.g. 2x4 size pentominos) with board
    - Add Rotations and Flips
  - **Make python CV Arrange Fence & Display Calculated Area**
    - merge python/webgame/webcam logic
    - Run GetArea code, Get Area, Colour Field through grid tiles
      - MIGUEL - Python should also return field grid tiles
  - **Upload Fence Area to Database & Get and Show Leaderboard**
    - send GET request for order/leaderboard
      - ALFREDO - Upload previously calculated areas, plus is_maximal field
    - render leaderboard
    - newLeadboardEntry modal (input name etc.)
    - send POST request to upload new leaderboard entry
    - ThankYou modal (post-submit)
  - **Misc Tasks**
    - Startup/Info Modal (renders on siteload or via. info button to give instructions, and project details)
  - Make Website/Tablet/Mobile Fully Responsive
- **Post Dan (by end of Feb)**
  - FULLY TEST ACROSS A WIDE RANGE OF DEVICES AND SCREENS
  - FULLY TEST THE PYTHON CV ON AS MANY EDGE CASES AS YOU CAN THINK OF
  - Set up a long-term solution for the backend
      - Backend - Supabase provisionally, to be rebuilt by Alfredo
      - Frontend - Vercel
  - Make Website work in Multiple Languages
  - Add Map of where people have uploaded results from

### DOCS
- Front-End
  - The front-end is hosted and served on vercel.
  - Email (d.humphries@ucl.ac.uk) for access
  - Vercel Project Link: https://vercel.com/citizen-science/fence-challenge
  - Vercel Docs: https://vercel.com/docs
- Python
  - TODO (Leaving to Miguel)
- Database
  - The back-end is managed by Alfredo
  - Email (alfredogc05@protonmail.com) for access
