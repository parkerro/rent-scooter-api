import { registerAs } from '@nestjs/config';
import { BooleanHelper } from 'src/common/helpers/boolean.helper';

export default registerAs('config', () => ({
    app: {
        port: parseInt(process.env['APP_PORT'], 10) || 3000,
    },
    database: {
        type: 'postgres',
        host: process.env['DB_HOST'],
        port: parseInt(process.env['DB_PORT']) || 5432,
        username: process.env['DB_USERNAME'],
        password: process.env['DB_PASSWORD'],
        database: process.env['DB_NAME'],
        synchronize: BooleanHelper.isTrue(process.env['DB_SYNCHRONIZE']),
        logging: BooleanHelper.isTrue(process.env['DB_LOGGING']),
    }
}))