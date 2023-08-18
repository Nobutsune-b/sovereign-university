    -- Path: packages/database/migrations/20230815201542-user-chapter-finished.sql

    -- Users chapter finished
    CREATE TABLE IF NOT EXISTS users.chapter_finished (
        account_id UUID NOT NULL REFERENCES users.accounts(id) ON DELETE CASCADE,

        course_id VARCHAR(20) NOT NULL,
        language VARCHAR(10) NOT NULL,
        chapter INTEGER NOT NULL,

        FOREIGN KEY (
            course_id,
            language,
            chapter
        ) REFERENCES content.course_chapters_localized (
            course_id,
            language,
            chapter
        ) ON DELETE CASCADE,

        PRIMARY KEY (
            account_id,
            course_id,
            language,
            chapter
        )
    );
