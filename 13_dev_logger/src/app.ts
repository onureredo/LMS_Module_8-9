import { MODE } from '#config';
import { logger } from '#utils';

logger(`[${MODE.toUpperCase()}] | App is running in ${MODE} mode`);
