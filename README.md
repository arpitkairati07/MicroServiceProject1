🎵  __Music App__

A  music streaming application built using TypeScript with a __microservices-based__ backend and a React frontend.

🚀 __Features__

🎧 Play, pause, and stream songs

  + 📂 Manage albums, artists, and tracks (Admin panel)
  
  + 👤 User authentication & profile management
  
  + 🎶 Create and manage playlists
  
  + 🔎 Search songs, albums, and artists
  
  + ⚡ Scalable microservices architecture.

    ___

    🏗️ Project Architecture

    Music_App/
<pre>
  │── admin-service/                              # Admin microservice (manage songs, albums, artists)
  │── user-service/                               # User microservice (auth, playlists, profiles)
  │── song-service/                               # Song microservice (song metadata, streaming, search) 
  │── frontend/                                   # React + TypeScript frontend  
  │── README.md                                   # Project documentation </pre>

+ Admin Service → Handles CRUD for albums, songs, and artists

+ User Service → Manages authentication, user profiles, and playlists

+ Song Service → Handles song storage, metadata, and streaming

+ Frontend → Built with React + TypeScript, consumes backend APIs

  ___

  ⚙️ Tech Stack
        Frontend
        
           React / TypeScript
          
           Axios / Fetch for API calls
          
           TailwindCSS 
        
  Backend (Microservices)
        
          Node.js + Express (TypeScript)
          
           REST APIs
          
           Database (MongoDB / Redis / PostgreSQL 
          
           JWT Authentication
          
           Microservice communication

  ___
  📦 Installation & Setup
  
  1️⃣ Clone the repository
          <pre>git clone https://github.com/your-username/Spotify_Clone.git
          cd Spotify_Clone </pre>

  2️⃣ Install dependencies

  For each service and frontend:

          cd admin-service && npm install
          cd ../user-service && npm install
          cd ../song-service && npm install
          cd ../frontend && npm install
