DROP TABLE scraped_car_details;
DROP TABLE scrape_run_details;
DROP TYPE scrape_type;

CREATE TYPE scrape_type AS ENUM ('nearly-new', 'used');

CREATE TABLE scrape_run_details (
    id serial8 primary key,
    created_at timestamp default current_timestamp,
    scrape_type scrape_type
);

CREATE TABLE scraped_car_details (
    details jsonb,
    scrape_type scrape_type,
    scrape_run_id int8 references scrape_run_details(id)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO :user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO :user;
