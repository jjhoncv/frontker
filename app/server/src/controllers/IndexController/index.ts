import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (request: Request, response: Response) => {    
    response.send(__dirname);
});

export const indexController: Router = router;