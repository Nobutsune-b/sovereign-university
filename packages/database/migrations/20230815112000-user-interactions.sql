-- Path: packages/database/migrations/20230815112000-user-interactions.sql

-- Users course avancement
CREATE TABLE IF NOT EXISTS users.course_avancement (
  account_id UUID NOT NULL REFERENCES users.accounts(id) ON DELETE CASCADE,
  course_id VARCHAR(20) NOT NULL REFERENCES content.courses(id) ON DELETE CASCADE,
  current_chapter INTEGER,
  finished BOOLEAN SET DEFAULT FALSE NOT NULL,
  score INT,
  comment TEXT,
  
  CHECK (score BETWEEN 1 AND 10),

  PRIMARY KEY (account_id, course_id)
);

-- Users resource rating
CREATE TABLE IF NOT EXISTS users.resource_rating (
  account_id UUID NOT NULL REFERENCES users.accounts(id) ON DELETE CASCADE,
  resource_id INTEGER NOT NULL REFERENCES content.resources(id) ON DELETE CASCADE,
  score INT NOT NULL,
  comment TEXT,
  
  CHECK (score BETWEEN 1 AND 10),
  
  PRIMARY KEY (account_id, resource_id)
);

-- Users tutorial rating
CREATE TABLE IF NOT EXISTS users.tutorial_rating (
  account_id UUID NOT NULL REFERENCES users.accounts(id) ON DELETE CASCADE,
  tutorial_id INTEGER NOT NULL REFERENCES content.tutorials(id) ON DELETE CASCADE,
  score INT NOT NULL,
  comment TEXT,
  
  CHECK (score BETWEEN 1 AND 10),
  
  PRIMARY KEY (account_id, tutorial_id)
);
