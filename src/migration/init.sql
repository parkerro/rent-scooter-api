--使用者表
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--電動車表
CREATE TABLE scooters(
    id SERIAL PRIMARY KEY,
    model VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK(status IN('available', 'in_use', 'maintenance')) DEFAULT 'available',
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    battery_level INT NOT NULL CHECK(
        battery_level BETWEEN 0
        AND 100
    ),
    serial_number VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--租借記錄表
CREATE TABLE rent_records(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    scooter_id INT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP WITH TIME ZONE,
    start_latitude DECIMAL(10, 8),
    start_longitude DECIMAL(11, 8),
    end_latitude DECIMAL(10, 8),
    end_longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(scooter_id) REFERENCES scooters(id),
    CONSTRAINT unique_active_rental UNIQUE(user_id, scooter_id, end_time)
);