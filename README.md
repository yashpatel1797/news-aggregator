# News Aggregator

A React-based news aggregator that pulls articles from multiple sources including NewsAPI, The Guardian, and New York Times.

## Features

- Real-time article search
- Filter by category and source
- Date range filtering
- Personalized news feed preferences
- Infinite scroll for loading more articles
- Mobile responsive design
- Docker containerization

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Vite
- Docker
- News APIs (NewsAPI, Guardian, NY Times)

## Prerequisites

- Node.js v18+
- npm or yarn
- Docker (for containerization)
- API Keys from:
  - [NewsAPI](https://newsapi.org/)
  - [The Guardian](https://open-platform.theguardian.com/)
  - [NY Times](https://developer.nytimes.com/)

## Local Development

1. Clone the repository
```bash
git clone [repository-url]
cd news-aggregator
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in root directory
```env
VITE_NEWS_API_KEY=your_news_api_key
VITE_GUARDIAN_API_KEY=your_guardian_api_key
VITE_NYTIMES_API_KEY=your_nytimes_api_key
```

4. Start development server
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## Docker Deployment

1. Build Docker image
```bash
docker build -t news-aggregator --build-arg VITE_NEWS_API_KEY=your_news_api_key --build-arg VITE_GUARDIAN_API_KEY=your_guardian_api_key --build-arg VITE_NYTIMES_API_KEY=your_nytimes_api_key .
```

2. Run Docker container
```bash
docker run -p 3000:80 news-aggregator
```

3. Access the application at http://localhost:3000

## Sharing Docker Image

1. Create Docker Hub account at [https://hub.docker.com/](https://hub.docker.com/)

2. Login to Docker Hub
```bash
docker login
```

3. Tag your image
```bash
docker tag news-aggregator yourusername/news-aggregator:latest
```

4. Push to Docker Hub
```bash
docker push yourusername/news-aggregator:latest
```

5. Share with interviewer
```
# Instructions for interviewer
docker pull yourusername/news-aggregator:latest
docker run -p 3000:80 yourusername/news-aggregator:latest
```

## Project Structure
```
news-aggregator/
├── src/
│   ├── components/
│   │   ├── Articles/
│   │   ├── Filters/
│   │   ├── Layout/
│   │   └── shared/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── utils/
├── public/
├── .env
├── Dockerfile
└── README.md
```

## API Integration

The application integrates with three news APIs:
- NewsAPI: For general news articles
- The Guardian: For The Guardian's news content
- NY Times: For New York Times articles

## Features Explained

1. **Article Search and Filtering**
   - Real-time search with debouncing
   - Category and source filters
   - Date range selection

2. **Personalized News Feed**
   - Save preferred sources
   - Save preferred categories
   - Persistent preferences

3. **Mobile Responsiveness**
   - Responsive design
   - Mobile navigation
   - Adaptive layouts

## Troubleshooting

1. **API Limits**
   - NewsAPI has rate limits
   - NY Times has request quotas
   - Guardian API has usage limits