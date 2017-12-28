CREATE TYPE scrape_type AS ENUM ('nearly-new', 'used');

CREATE TABLE scraped_car_details (
    details jsonb,
    scrape_type scrape_type
);
