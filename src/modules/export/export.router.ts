import { Request, Response, Router } from 'express';
import path from 'path';

import { IRouter } from '../router.interface';

const router = Router();

export class ExportRouter implements IRouter {
    get routes() {
		router.get(
			'/schedule',
			async (req: Request, res: Response) => {
                // TODO rework this
				try {
                    const filePath = path.join(__dirname, '..', '..', '..', '..', 'assets','schedule.xls');
					return res.sendFile(filePath);
				} catch (err) {
					throw err;
				}
			},
        );

        return router;
    }
}
