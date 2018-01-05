DROP TABLE scraped_car;
DROP TABLE failed_car;
DROP TABLE scrape_run;
DROP TYPE scrape_type;

CREATE TYPE scrape_type AS ENUM ('nearly-new', 'used');

CREATE TABLE scrape_run (
    id serial8 primary key,
    scrape_type scrape_type,
    started_at timestamp default current_timestamp,
    finished_at timestamp
);

CREATE TABLE scraped_car (
    attributes jsonb,
    scrape_run_id int8 references scrape_run(id)
);

CREATE TABLE failed_car (
    car_url text,
    error_message text,
    scrape_run_id int8 references scrape_run(id)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO :user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO :user;
