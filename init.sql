-- Create the events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    type VARCHAR(255) DEFAULT 'offline',
    description TEXT,
    image VARCHAR(255),
    link VARCHAR(255)
);

-- Insert sample data
INSERT INTO events (
    title, date, type, description, image, link
) VALUES (
    'AI Driven India Hackathon 2024', '2024-11-15', 'offline', 'The AI-Driven India Hackathon is proudly organized by XLRI Jamshedpur in collaboration with Vipas.AI, empowering AI creators to create and showcase innovative AI solutions.', '/images/onlineEvents/ai_driven_india_hackathon.png', 'https://vipas.ai/hackathon/register'
);

INSERT INTO events (
    title, date, type, description, image, link
) VALUES (
    'Flutter Conf India 2023', '2023-12-09', 'offline', 
    'Get ready to dive deep into the world of Dart and Flutter at Flutter Conf India, the country''s leading conference dedicated to top-quality content.', '/images/onlineEvents/flutterconfin.png', 'https://konfhub.com/flutterconfin'
);

INSERT INTO events (
    title, date, type, description, image, link
) VALUES (
    'CYBERX INDIA ROADSHOW 2023', '2023-11-03', 'offline', 'Join over 200+ leading cybersecurity experts with this Roadshow in Delhi and Bangalore for insightful and cutting-edge discussions on latest cybersecurity trends in INDIA.', '/images/onlineEvents/cyberx.png', 'https://www.cyberxindia.com/'
);

INSERT INTO events (
    title, date, type, description, image, link) 
    VALUES ('Flutter Conf India 2023', '2023-12-09', 'online', 'Get ready to dive deep into the world of Dart and Flutter at Flutter Conf India, the country''s leading conference dedicated to top-quality content.', '/images/offlineEvents/flutterconfin.png', 'https://konfhub.com/flutterconfin');

INSERT INTO events 
    (title, date, type, description, image, link) 
    VALUES ('CYBERX INDIA ROADSHOW 2023', '2023-11-03', 'online', 'Join over 200+ leading cybersecurity experts with this Roadshow in Delhi and Bangalore for insightful and cutting-edge discussions on latest cybersecurity trends in INDIA.', '/images/offlineEvents/cyberx.png', 'https://www.cyberxindia.com/');