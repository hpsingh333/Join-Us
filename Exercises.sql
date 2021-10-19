-- Earliest date of users
SELECT
    DATE_FORMAT(MIN(created_at), "%M %D %Y") AS earliest_date
FROM
    users;

-- Email of First (earliest) user
SELECT
    *
FROM
    users
WHERE
    created_at = (
        SELECT
            MIN(created_at)
        FROM
            users
    );

-- Users according to month they joined
SELECT
    MONTHNAME(created_at) AS month_name,
    COUNT(*) AS total
FROM
    users
GROUP BY
    month_name
ORDER BY
    total DESC;

-- Count number of users with Yahoo eamails
SELECT
    COUNT(*) AS yahoo_users
FROM
    users
WHERE
    email REGEXP '@yahoo\.com[[:>:]]';

-- Count total number of users for each email host
SELECT
    DISTINCT SUBSTRING_INDEX(SUBSTRING_INDEX(email, '@', -1), '.', 1) AS providers,
    COUNT(*) AS total_users
FROM
    users
GROUP BY
    providers
ORDER BY
    total_users DESC;